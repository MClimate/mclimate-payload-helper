import { commandsReadingHelper } from '@/decoders/commandsReadingHelper'
import { DeviceType } from '@/decoders/payloadParsers/types'
import { byteArrayParser } from '@/helpers'
import { CustomError } from '@/utils'

interface HTMiniData {
	sensorTemperature?: number
	relativeHumidity?: number
	batteryVoltage?: number
}

export const htMiniPayloadParser = (hexData: string) => {
	const deviceData: Record<string, unknown> = {}

	try {
		const handleKeepAliveData = (bytes: number[]) => {
			const keepaliveData: HTMiniData = {}

			// Byte 1 (bits 1:0) and Byte 2: Internal temperature sensor data
			// Formula: t[°C] = (T[9:0] - 400) / 10
			const tempHighBits = (bytes[1] & 0x03) << 8
			const tempLowBits = bytes[2]
			const tempValue = tempHighBits | tempLowBits
			keepaliveData.sensorTemperature = Number(((tempValue - 400) / 10).toFixed(2))

			// Byte 3: Relative Humidity data
			// Formula: RH[%] = (XX * 100) / 256
			keepaliveData.relativeHumidity = Number(((bytes[3] * 100) / 256).toFixed(2))

			// Byte 4: Battery Voltage
			// Battery voltage [mV] = ((XX * 2200) / 255) + 1600
			keepaliveData.batteryVoltage = Number((((bytes[4] * 2200) / 255 + 1600) / 1000).toFixed(2))

			Object.assign(deviceData, { ...deviceData }, { ...keepaliveData })
		}

		if (hexData) {
			const byteArray = byteArrayParser(hexData)
			if (!byteArray) return

			// Route the message based on the command byte
			if (byteArray[0] == 1) {
				// This is a keepalive message
				handleKeepAliveData(byteArray)
			} else {
				// parse command answers
				const data = commandsReadingHelper(hexData, 10, DeviceType.HTMini) as Record<string, unknown> | undefined
				if (!data) return
				const shouldKeepAlive = Object.prototype.hasOwnProperty.call(data, 'decodeKeepalive')
				if ('decodeKeepalive' in data) {
					delete data.decodeKeepalive
				}

				Object.assign(deviceData, { ...deviceData }, { ...data })

				// Handle the remaining keepalive data if present
				if (shouldKeepAlive) {
					// Extract the last 5 bytes which contain keepalive data for HT Mini
					const keepaliveData = hexData.slice(-10) // 5 bytes = 10 hex chars
					const dataToPass = byteArrayParser(keepaliveData)
					if (!dataToPass) return
					handleKeepAliveData(dataToPass)
				}
			}
			return deviceData
		}
	} catch (e) {
		throw new CustomError({
			message: `Unhandled data`,
			hexData: hexData,
			deviceType: 'ht_mini',
			originalError: e as Error,
		})
	}
}

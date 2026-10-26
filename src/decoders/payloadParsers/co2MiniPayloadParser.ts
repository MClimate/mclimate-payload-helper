import { commandsReadingHelper } from '@/decoders/commandsReadingHelper'
import { DeviceType } from '@/decoders/payloadParsers/types'
import { byteArrayParser } from '@/helpers'
import { CustomError } from '@/utils'

interface CO2MiniData {
	sensorTemperature?: number
	relativeHumidity?: number
	batteryVoltage?: number
	CO2?: number
}

export const co2MiniPayloadParser = (hexData: string) => {
	const deviceData: Record<string, unknown> = {}

	try {
		const handleKeepAliveData = (bytes: number[]) => {
			const keepaliveData: CO2MiniData = {}

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

			// Bytes 5-6: CO2 value in ppm
			// Byte 5: CO2 bits [7:0], Byte 6 bits 7:3: CO2 bits [12:8]
			// Formula: CO2[ppm] = ((Byte[6] & 0xF8) << 5) | Byte[5]
			keepaliveData.CO2 = ((bytes[6] & 0xf8) << 5) | bytes[5]

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
				const data = commandsReadingHelper(hexData, 14, DeviceType.CO2Mini) as Record<string, unknown> | undefined
				if (!data) return
				const shouldKeepAlive = Object.prototype.hasOwnProperty.call(data, 'decodeKeepalive')
				if ('decodeKeepalive' in data) {
					delete data.decodeKeepalive
				}

				Object.assign(deviceData, { ...deviceData }, { ...data })

				// Handle the remaining keepalive data if present
				if (shouldKeepAlive) {
					// Extract the last 7 bytes which contain keepalive data for CO2 Mini
					const keepaliveData = hexData.slice(-14) // 7 bytes = 14 hex chars
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
			deviceType: 'co2_mini',
			originalError: e as Error,
		})
	}
}

import { commandsReadingHelper } from '@/decoders/commandsReadingHelper'
import { DeviceType } from '@/decoders/payloadParsers/types'
import { byteArrayParser } from '@/helpers'
import { CustomError } from '@/utils'

interface HTPirLiteData {
	sensorTemperature?: number
	relativeHumidity?: number
	batteryVoltage?: number
	pirTriggerCount?: number
	occupied?: boolean
}

export const htPirLitePayloadParser = (hexData: string) => {
	const deviceData: Record<string, unknown> = {}

	try {
		const handleKeepAliveData = (bytes: number[]) => {
			const keepaliveData: HTPirLiteData = {}

			// Byte 1 bit 2: Occupied flag
			keepaliveData.occupied = (bytes[1] & 0x04) >> 2 === 1

			// Byte 1 (bits 1:0) and Byte 2: Internal temperature sensor data
			// Formula: t[°C] = (T[9:0] - 400) / 10
			// Extract bits 1:0 from byte 1 for the higher bits (bits 9:8)
			const tempHighBits = (bytes[1] & 0x03) << 8
			// Use all bits from byte 2 for the lower bits (bits 7:0)
			const tempLowBits = bytes[2]
			// Combine to get the full 10-bit temperature value
			const tempValue = tempHighBits | tempLowBits
			keepaliveData.sensorTemperature = Number(((tempValue - 400) / 10).toFixed(2))

			// Byte 3: Relative Humidity data
			// Formula: RH[%] = (XX * 100) / 256
			keepaliveData.relativeHumidity = Number(((bytes[3] * 100) / 256).toFixed(2))

			// Byte 4: Device battery voltage data
			// Battery voltage [mV] = ((XX * 2200) / 255) + 1600
			keepaliveData.batteryVoltage = Number((((bytes[4] * 2200) / 255 + 1600) / 1000).toFixed(2))

			// Byte 5: PIR trigger count
			keepaliveData.pirTriggerCount = bytes[5]

			Object.assign(deviceData, { ...deviceData }, { ...keepaliveData })
		}

		if (hexData) {
			const byteArray = byteArrayParser(hexData)
			if (!byteArray) return

			// Route the message based on the command byte
			if (byteArray[0] == 81) {
				// This is a keepalive message
				handleKeepAliveData(byteArray)
			} else {
				// parse command answers
				const data = commandsReadingHelper(hexData, 14, DeviceType.HTPirLite) as Record<string, unknown> | undefined
				if (!data) return
				const shouldKeepAlive = Object.prototype.hasOwnProperty.call(data, 'decodeKeepalive')
				if ('decodeKeepalive' in data) {
					delete data.decodeKeepalive
				}

				Object.assign(deviceData, { ...deviceData }, { ...data })

				// Handle the remaining keepalive data if present
				if (shouldKeepAlive) {
					// Extract the last 6 bytes which contain keepalive data for HT-PIR-Lite
					const keepaliveData = hexData.slice(-12) // 6 bytes = 12 hex chars
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
			deviceType: 'ht_pir_lite',
			originalError: e as Error,
		})
	}
}

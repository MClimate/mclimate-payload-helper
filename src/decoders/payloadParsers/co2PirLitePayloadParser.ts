import { commandsReadingHelper } from '@/decoders/commandsReadingHelper'
import { DeviceType } from '@/decoders/payloadParsers/types'
import { byteArrayParser } from '@/helpers'
import { CustomError } from '@/utils'

interface CO2PirLiteData {
	sensorTemperature?: number
	relativeHumidity?: number
	batteryVoltage?: number
	CO2?: number
	pirTriggerCount?: number
	pir?: boolean
}

export const co2PirLitePayloadParser = (hexData: string) => {
	const deviceData: Record<string, unknown> = {}

	try {
		const handleKeepAliveData = (bytes: number[]) => {
			const keepaliveData: CO2PirLiteData = {}

			// Byte 1 bit 2: PIR flag
			keepaliveData.pir = ((bytes[1] & 0x04) >> 2) === 1

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
			keepaliveData.batteryVoltage = Number(((((bytes[4] * 2200) / 255) + 1600) / 1000).toFixed(2))

			// Bytes 5-6: CO2 value in ppm
			// Byte 5: CO2 value lower bits [7:0]
			// Byte 6 bits 7:3: CO2 value higher bits [12:8]
			const co2LowBits = bytes[5]
			const co2HighBits = ((bytes[6] & 0xF8) >> 3) << 8 // Mask upper 5 bits, shift right by 3 to get bits in position, then shift left by 8
			keepaliveData.CO2 = co2HighBits | co2LowBits

			// Byte 7: PIR trigger count
			keepaliveData.pirTriggerCount = bytes[7]
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
				const data = commandsReadingHelper(hexData, 18, DeviceType.CO2PirLite) as Record<string, unknown> | undefined
				if (!data) return
				const shouldKeepAlive = Object.prototype.hasOwnProperty.call(data, 'decodeKeepalive')
				if ('decodeKeepalive' in data) {
					delete data.decodeKeepalive
				}

				Object.assign(deviceData, { ...deviceData }, { ...data })

				// Handle the remaining keepalive data if present
				if (shouldKeepAlive) {
					// Extract the last 9 bytes which contain keepalive data for CO2-PIR-Lite
					const keepaliveData = hexData.slice(-16) // 8 bytes = 16 hex chars
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
			deviceType: 'co2_pir_lite',
			originalError: e as Error,
		})
	}
}

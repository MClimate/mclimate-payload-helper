import { commandsReadingHelper } from '@/decoders/commandsReadingHelper'
import { DeviceType } from '@/decoders/payloadParsers/types'
import { byteArrayParser } from '@/helpers'
import { CustomError } from '@/utils'

interface PirMiniData {
	sensorTemperature?: number
	relativeHumidity?: number
	light?: number
	batteryVoltage?: number
	occupied?: boolean
	pirTriggerCount?: number
}

export const pirMiniPayloadParser = (hexData: string) => {
	const deviceData: Record<string, unknown> = {}

	try {
		const handleKeepAliveData = (bytes: number[]) => {
			const keepaliveData: PirMiniData = {}

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

			// Bytes 4-5: Light sensor data
			// Byte 4: Light sensor data bits [15:8]
			// Byte 5: Light sensor data bits [7:0]
			keepaliveData.light = (bytes[4] << 8) | bytes[5]

			// Byte 6: Battery Voltage
			// Battery voltage [mV] = ((XX * 2200) / 255) + 1600
			keepaliveData.batteryVoltage = Number((((bytes[6] * 2200) / 255 + 1600) / 1000).toFixed(2))

			// Byte 7 bit 0: Occupancy Flag (1 = Occupied, 0 = Unoccupied)
			keepaliveData.occupied = (bytes[7] & 0x01) === 1

			// Bytes 8-9: PIR trigger count data
			// Byte 8: PIR trigger count bits [15:8]
			// Byte 9: PIR trigger count bits [7:0]
			keepaliveData.pirTriggerCount = (bytes[8] << 8) | bytes[9]

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
				const data = commandsReadingHelper(hexData, 20, DeviceType.PirMini) as Record<string, unknown> | undefined
				if (!data) return
				const shouldKeepAlive = Object.prototype.hasOwnProperty.call(data, 'decodeKeepalive')
				if ('decodeKeepalive' in data) {
					delete data.decodeKeepalive
				}

				Object.assign(deviceData, { ...deviceData }, { ...data })

				// Handle the remaining keepalive data if present
				if (shouldKeepAlive) {
					// Extract the last 10 bytes which contain keepalive data for PIR Mini
					const keepaliveData = hexData.slice(-20) // 10 bytes = 20 hex chars
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
			deviceType: 'pir_mini',
			originalError: e as Error,
		})
	}
}

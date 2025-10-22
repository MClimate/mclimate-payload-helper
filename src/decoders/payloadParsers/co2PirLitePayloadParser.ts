import { commandsReadingHelper } from '@/decoders/commandsReadingHelper'
import { DeviceType } from '@/decoders/payloadParsers/types'
import { byteArrayParser } from '@/helpers'
import { CustomError } from '@/utils'

interface CO2PirLiteData {
	sensorTemperature?: number
	relativeHumidity?: number
	batteryVoltage?: number
	CO2?: number
	pir?: boolean
}

export const co2PirLitePayloadParser = (hexData: string) => {
	const deviceData: Record<string, unknown> = {}

	try {
		const handleKeepAliveData = (bytes: number[]) => {
			const keepaliveData: CO2PirLiteData = {}
			// Bytes 1-2: Internal temperature sensor data
			// Formula: t[°C] = (T[15:0]-400)/10
			const tempMsb = bytes[1] // bits 15:8
			const tempLsb = bytes[2] // bits 7:0
			const rawTemperature = (tempMsb << 8) | tempLsb
			keepaliveData.sensorTemperature = Number(((rawTemperature - 400) / 10).toFixed(2))

			// Byte 3: Relative Humidity data
			// Formula: RH[%] = (XX*100)/256
			keepaliveData.relativeHumidity = Number(((bytes[3] * 100) / 256).toFixed(2))

			// Bytes 4-5: Device battery voltage data
			// Battery voltage [mV]
			const batteryMsb = bytes[4] // bits 15:8
			const batteryLsb = bytes[5] // bits 7:0
			keepaliveData.batteryVoltage = Number((((batteryMsb << 8) | batteryLsb) / 1000).toFixed(2))

			// CO2 calculation from data 6 and 7
			const co2Low = bytes[6] // Lower byte of CO2
			const co2High = (bytes[7] & 0xf8) >> 3 // Mask the upper 5 bits and shift them right
			keepaliveData.CO2 = (co2High << 8) | co2Low // Shift co2High left by 8 bits and combine with co2Low

			// Byte 8: PIR sensor status (only bit 0 is used)
			// 0 - No motion detected
			// 1 - Motion detected
			const pirValue = bytes[8] & 0x01 // Extract only the last bit
			keepaliveData.pir = pirValue === 1
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
					const keepaliveData = hexData.slice(-18) // 9 bytes = 18 hex chars
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

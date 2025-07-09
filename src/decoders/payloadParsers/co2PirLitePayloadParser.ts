import { commandsReadingHelper } from '@/decoders/commandsReadingHelper'
import { DeviceType } from '@/decoders/payloadParsers/types'
import { byteArrayParser } from '@/helpers'
import { CustomError } from '@/utils'

interface CO2PirLiteData {
	sensorTemperature?: number;
	relativeHumidity?: number;
	batteryVoltage?: number;
	CO2?: number;
	pir?: boolean;
}

export const co2PirLitePayloadParser = (hexData: string) => {
	let deviceData = {}

	try {
		const handleKeepAliveData = (bytes: number[]) => {
			let keepaliveData: CO2PirLiteData = {}
			// Bytes 1-2: Internal temperature sensor data
			// Formula: t[°C] = (T[15:0]-400)/10
			var tempMsb = bytes[1]; // bits 15:8
			var tempLsb = bytes[2]; // bits 7:0
			var rawTemperature = (tempMsb << 8) | tempLsb;
			keepaliveData.sensorTemperature = Number(((rawTemperature - 400) / 10).toFixed(2));
			
			// Byte 3: Relative Humidity data
			// Formula: RH[%] = (XX*100)/256
			keepaliveData.relativeHumidity = Number(((bytes[3] * 100) / 256).toFixed(2));
			
			// Bytes 4-5: Device battery voltage data
			// Battery voltage [mV]
			var batteryMsb = bytes[4]; // bits 15:8
			var batteryLsb = bytes[5]; // bits 7:0
			keepaliveData.batteryVoltage = Number((((batteryMsb << 8) | batteryLsb) / 1000).toFixed(2));
			
			// CO2 calculation from data 6 and 7
			let co2Low = bytes[6] // Lower byte of CO2
			let co2High = (bytes[7] & 0xf8) >> 3 // Mask the upper 5 bits and shift them right
			keepaliveData.CO2 = (co2High << 8) | co2Low // Shift co2High left by 8 bits and combine with co2Low

			// Byte 8: PIR sensor status (only bit 0 is used)
			// 0 - No motion detected
			// 1 - Motion detected
			var pirValue = bytes[8] & 0x01; // Extract only the last bit
			keepaliveData.pir = pirValue === 1 ? true : false;
			Object.assign(deviceData, { ...deviceData }, { ...keepaliveData })

		}

		if (hexData) {
			let byteArray = byteArrayParser(hexData)
			if (!byteArray) return
			
			// Route the message based on the command byte
			if (byteArray[0] == 1) {
				// This is a keepalive message
				handleKeepAliveData(byteArray)
			} else {
				// parse command answers
				let data = commandsReadingHelper(hexData, 18, DeviceType.CO2PirLite)
				if (!data) return
				const shouldKeepAlive = data.hasOwnProperty('decodeKeepalive') ? true : false
				if ('decodeKeepalive' in data) {
					delete data.decodeKeepalive
				}

				Object.assign(deviceData, { ...deviceData }, { ...data })

				// Handle the remaining keepalive data if present
				if (shouldKeepAlive) {
					// Extract the last 9 bytes which contain keepalive data for CO2-PIR-Lite
					let keepaliveData = hexData.slice(-18) // 9 bytes = 18 hex chars
					let dataToPass = byteArrayParser(keepaliveData)
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

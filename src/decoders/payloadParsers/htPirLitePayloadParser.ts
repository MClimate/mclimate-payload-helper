import { commandsReadingHelper } from '@/decoders/commandsReadingHelper'
import { DeviceType } from '@/decoders/payloadParsers/types'
import { byteArrayParser } from '@/helpers'
import { CustomError } from '@/utils'

interface HTPirLiteData {
	sensorTemperature?: number;
	relativeHumidity?: number;
	batteryVoltage?: number;
	pir?: boolean;
}

export const htPirLitePayloadParser = (hexData: string) => {
	let deviceData = {}

	try {
		const handleKeepAliveData = (bytes: number[]) => {
			let keepaliveData: HTPirLiteData = {}

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
			
			// Byte 6: PIR sensor status (only bit 0 is used, other bits are reserved)
			// 0 - No motion detected
			// 1 - Motion detected
			var pirValue = bytes[6] & 0x01; // Extract only the last bit
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
				let data = commandsReadingHelper(hexData, 14, DeviceType.HTPirLite)
				if (!data) return
				const shouldKeepAlive = data.hasOwnProperty('decodeKeepalive') ? true : false
				if ('decodeKeepalive' in data) {
					delete data.decodeKeepalive
				}

				Object.assign(deviceData, { ...deviceData }, { ...data })

				// Handle the remaining keepalive data if present
				if (shouldKeepAlive) {
					// Extract the last 7 bytes which contain keepalive data for HT-PIR-Lite
					let keepaliveData = hexData.slice(-14) // 7 bytes = 14 hex chars
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
			deviceType: 'ht_pir_lite',
			originalError: e as Error,
		})
	}
}

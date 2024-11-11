import { commandsReadingHelper } from '@/decoders/commandsReadingHelper'
import { DeviceType } from '@/decoders/payloadParsers/types'
import { byteArrayParser } from '@/helpers'
import { CustomError } from '@/utils'

export const ButtonPayloadParser = (hexData: string) => {
	let deviceData = {}

	try {
		const calculateBatteryVoltage = (byte: number) => {
			return byte * 8 + 1600
		}
		const calculateTemperature = (rawData: number) => {
			return rawData / 10.0
		}
		const handleKeepAliveData = (bytes: number[]) => {
			// Byte 1: Device battery voltage
			const batteryVoltage = calculateBatteryVoltage(bytes[1]) / 1000

			// Byte 2: Thermistor operational status and temperature data (bits 9:8)
			const thermistorConnected = (bytes[2] & 0x04) === 0 // Bit 2
			const temperatureHighBits = bytes[2] & 0x03 // Bits 1:0

			// Byte 3: Thermistor temperature data (bits 7:0)
			const temperatureLowBits = bytes[3]
			const temperatureRaw = (temperatureHighBits << 8) | temperatureLowBits
			const temperatureCelsius = calculateTemperature(temperatureRaw)

			// Byte 4: Button event data
			const buttonEventData = ("0" + bytes[4]);

			// check if it is a keepalive
			const keepaliveData = {
				sensorTemperature: Number(temperatureCelsius.toFixed(1)),
				batteryVoltage: Number(batteryVoltage.toFixed(1)),
				pressEvent: buttonEventData,
				thermistorProperlyConnected: thermistorConnected,
			}
			Object.assign(deviceData, { ...deviceData }, { ...keepaliveData })
		}

		if (hexData) {
			if (parseInt(hexData[1]) == 1) {
				// its a keeapalive
				const byteArray = byteArrayParser(hexData)
				if (!byteArray) return

				handleKeepAliveData(byteArray)
			} else {
				// parse command answers
				let data = commandsReadingHelper(hexData, 10, DeviceType.MCButton)
				if (!data) return

				const shouldKeepAlive = data.hasOwnProperty('decodeKeepalive') ? true : false
				if ('decodeKeepalive' in data) {
					delete data.decodeKeepalive
				}

				Object.assign(deviceData, { ...deviceData }, { ...data })

				// get only keepalive from device response
				if (shouldKeepAlive) {
					let keepaliveData = hexData.slice(-10)
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
			deviceType: 'mc_button',
			originalError: e as Error,
		})
	}
}

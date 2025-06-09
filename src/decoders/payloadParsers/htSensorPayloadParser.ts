import { commandsReadingHelper } from '@/decoders/commandsReadingHelper'
import { DeviceType } from '@/decoders/payloadParsers/types'
import { byteArrayParser, decbin } from '@/helpers'
import { CustomError } from '@/utils'

export const htSensorPayloadParser = (hexData: string) => {
	let deviceData = {}

	try {
		const calculateTemperature = (rawData: number) => (rawData - 400) / 10
		const calculateHumidity = (rawData: number) => (rawData * 100) / 256

		const handleKeepAliveData = (data: number[]) => {
			let temperatureRaw = (data[1] << 8) | data[2]
			let sensorTemperature = Number(calculateTemperature(temperatureRaw).toFixed(2))

			let relativeHumidity = Number(calculateHumidity(data[3]).toFixed(2))

			let batteryVoltage = Number(((data[4] * 8 + 1600) / 1000).toFixed(2))
			let thermistorProperlyConnected = (data[5] & 0x04) === 0
			let extThermHigh = data[5] & 0x03 // mask out bits 1:0
			let extThermLow = data[6]
			let extThermRaw = (extThermHigh << 8) | extThermLow
			let extThermistorTemperature = thermistorProperlyConnected ? Number((extThermRaw * 0.1).toFixed(2)) : 0

			let keepaliveData = {
				sensorTemperature,
				relativeHumidity,
				batteryVoltage,
				extThermistorTemperature,
				thermistorProperlyConnected,
			}

			Object.assign(deviceData, { ...deviceData }, { ...keepaliveData })
		}

		if (hexData) {
			let byteArray = byteArrayParser(hexData)
			if (!byteArray) return

			if (byteArray[0] == 1) {
				// its a keeapalive
				handleKeepAliveData(byteArray)
			} else {
				// parse command answers
				let data = commandsReadingHelper(hexData, 14, DeviceType.HTSensor)
				if (!data) return

				const shouldKeepAlive = data.hasOwnProperty('decodeKeepalive') ? true : false
				if ('decodeKeepalive' in data) {
					delete data.decodeKeepalive
				}

				Object.assign(deviceData, { ...deviceData }, { ...data })

				// get only keepalive from device response
				if (shouldKeepAlive) {
					let keepaliveData = hexData.slice(-14)
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
			deviceType: 'ht_sensor',
			originalError: e as Error,
		})
	}
}

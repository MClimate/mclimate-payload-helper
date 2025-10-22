import { commandsReadingHelper } from '@/decoders/commandsReadingHelper'
import { DeviceType } from '@/decoders/payloadParsers/types'
import { byteArrayParser } from '@/helpers'
import { CustomError } from '@/utils'

export const htSensorPayloadParser = (hexData: string) => {
	const deviceData: Record<string, unknown> = {}

	try {
		const calculateTemperature = (rawData: number) => (rawData - 400) / 10
		const calculateHumidity = (rawData: number) => (rawData * 100) / 256

		const handleKeepAliveData = (data: number[]) => {
			const temperatureRaw = (data[1] << 8) | data[2]
			const sensorTemperature = Number(calculateTemperature(temperatureRaw).toFixed(2))

			const relativeHumidity = Number(calculateHumidity(data[3]).toFixed(2))

			const batteryVoltage = Number(((data[4] * 8 + 1600) / 1000).toFixed(2))
			const thermistorProperlyConnected = (data[5] & 0x04) === 0
			const extThermHigh = data[5] & 0x03 // mask out bits 1:0
			const extThermLow = data[6]
			const extThermRaw = (extThermHigh << 8) | extThermLow
			const extThermistorTemperature = thermistorProperlyConnected ? Number((extThermRaw * 0.1).toFixed(2)) : 0

			const keepaliveData = {
				sensorTemperature,
				relativeHumidity,
				batteryVoltage,
				extThermistorTemperature,
				thermistorProperlyConnected,
			}

			Object.assign(deviceData, { ...deviceData }, { ...keepaliveData })
		}

		if (hexData) {
			const byteArray = byteArrayParser(hexData)
			if (!byteArray) return

			if (byteArray[0] == 1) {
				// its a keeapalive
				handleKeepAliveData(byteArray)
			} else {
				// parse command answers
				const data = commandsReadingHelper(hexData, 14, DeviceType.HTSensor) as Record<string, unknown> | undefined
				if (!data) return

				const shouldKeepAlive = Object.prototype.hasOwnProperty.call(data, 'decodeKeepalive')
				if ('decodeKeepalive' in data) {
					delete data.decodeKeepalive
				}

				Object.assign(deviceData, { ...deviceData }, { ...data })

				// get only keepalive from device response
				if (shouldKeepAlive) {
					const keepaliveData = hexData.slice(-14)
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
			deviceType: 'ht_sensor',
			originalError: e as Error,
		})
	}
}

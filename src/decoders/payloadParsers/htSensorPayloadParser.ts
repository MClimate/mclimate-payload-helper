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
			let tempHex = ('0' + data[1].toString(16)).substr(-2) + ('0' + data[2].toString(16)).substr(-2)
			let tempDec = parseInt(tempHex, 16)
			let temperatureValue = calculateTemperature(tempDec)
			let humidityValue = calculateHumidity(data[3])
			let batteryTmp = ('0' + data[4].toString(16)).substr(-2)[0]
			let batteryVoltageCalculated = 2 + parseInt(`0x${batteryTmp}`, 16) * 0.1
			let sensorTemperature = temperatureValue
			let relativeHumidity = humidityValue
			let batteryVoltage = batteryVoltageCalculated
			let thermistorProperlyConnected = parseInt(decbin(data[5])[5]) == 0
			let extT1 = ('0' + data[5].toString(16)).substr(-2)[1]
			let extT2 = ('0' + data[6].toString(16)).substr(-2)
			let extThermistorTemperature = thermistorProperlyConnected ? parseInt(`0x${extT1}${extT2}`, 16) * 0.1 : 0

			// check if it is a keepalive
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

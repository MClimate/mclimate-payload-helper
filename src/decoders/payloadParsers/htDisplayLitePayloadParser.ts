import { commandsReadingHelper } from '@/decoders/commandsReadingHelper'
import { DeviceType } from '@/decoders/payloadParsers/types'
import { byteArrayParser, decbin } from '@/helpers'
import { CustomError } from '@/utils'

export const htDisplayLitePayloadParser = (hexData: string) => {
	let deviceData = {}

	try {
		const calculateTemperature = (rawData: number) => (rawData - 400) / 10
		const calculateHumidity = (rawData: number) => (rawData * 100) / 256

		const handleKeepAliveData = (data: number[]) => {
			let tempHex = ('0' + data[1].toString(16)).substr(-2) + ('0' + data[2].toString(16)).substr(-2)
			let tempDec = parseInt(tempHex, 16)
			let temperature = calculateTemperature(tempDec)
			let humidity = calculateHumidity(data[3])
			let lux = parseInt('0' + data[4].toString(16) + data[5].toString(16), 16)

			let batteryVoltageCalculated = parseInt(`${decbin(data[6])}${decbin(data[7])}`, 2) / 1000
			let sensorTemperature = Number(temperature.toFixed(2))
			let relativeHumidity = Number(humidity.toFixed(2))
			let batteryVoltage = Number(batteryVoltageCalculated.toFixed(2))

			let powerSourceStatus = data[8]
			let keepaliveData = {
				sensorTemperature,
				relativeHumidity,
				batteryVoltage,
				powerSourceStatus: powerSourceStatus,
				lux,
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
				let data = commandsReadingHelper(hexData, 18, DeviceType.HTDisplayLite)
				if (!data) return
				const shouldKeepAlive = data.hasOwnProperty('decodeKeepalive') ? true : false
				if ('decodeKeepalive' in data) {
					delete data.decodeKeepalive
				}

				Object.assign(deviceData, { ...deviceData }, { ...data })

				// get only keepalive from device response
				if (shouldKeepAlive) {
					let keepaliveData = hexData.slice(-18)
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
			deviceType: 'ht_display_lite',
			originalError: e as Error,
		})
	}
}

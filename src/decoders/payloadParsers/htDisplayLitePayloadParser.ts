import { commandsReadingHelper } from '@/decoders/commandsReadingHelper'
import { DeviceType } from '@/decoders/payloadParsers/types'
import { byteArrayParser, decbin } from '@/helpers'
import { CustomError } from '@/utils'

export const htDisplayLitePayloadParser = (hexData: string) => {
	const deviceData: Record<string, unknown> = {}

	try {
		const calculateTemperature = (rawData: number) => (rawData - 400) / 10
		const calculateHumidity = (rawData: number) => (rawData * 100) / 256

		const handleKeepAliveData = (data: number[]) => {
			const tempHex = ('0' + data[1].toString(16)).substr(-2) + ('0' + data[2].toString(16)).substr(-2)
			const tempDec = parseInt(tempHex, 16)
			const temperature = calculateTemperature(tempDec)
			const humidity = calculateHumidity(data[3])
			const lux = parseInt('0' + data[4].toString(16) + data[5].toString(16), 16)

			const batteryVoltageCalculated = parseInt(`${decbin(data[6])}${decbin(data[7])}`, 2) / 1000
			const sensorTemperature = Number(temperature.toFixed(2))
			const relativeHumidity = Number(humidity.toFixed(2))
			const batteryVoltage = Number(batteryVoltageCalculated.toFixed(2))

			const powerSourceStatus = data[8]
			const keepaliveData = {
				sensorTemperature,
				relativeHumidity,
				batteryVoltage,
				powerSourceStatus: powerSourceStatus,
				lux,
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
				const data = commandsReadingHelper(hexData, 18, DeviceType.HTDisplayLite) as Record<string, unknown> | undefined
				if (!data) return
				const shouldKeepAlive = Object.prototype.hasOwnProperty.call(data, 'decodeKeepalive')
				if ('decodeKeepalive' in data) {
					delete data.decodeKeepalive
				}

				Object.assign(deviceData, { ...deviceData }, { ...data })

				// get only keepalive from device response
				if (shouldKeepAlive) {
					const keepaliveData = hexData.slice(-18)
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
			deviceType: 'ht_display_lite',
			originalError: e as Error,
		})
	}
}

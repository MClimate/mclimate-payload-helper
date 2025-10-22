import { commandsReadingHelper } from '@/decoders/commandsReadingHelper'
import { DeviceType } from '@/decoders/payloadParsers/types'
import { decbin, toBool, byteArrayParser } from '@/helpers'
import { CustomError } from '@/utils'

export const WirelessThermostatPayloadParser = (hexData: string) => {
	const deviceData: Record<string, unknown> = {}

	try {
		const calculateTemperature = (rawData: number) => (rawData - 400) / 10
		const calculateHumidity = (rawData: number) => (rawData * 100) / 256

		const handleKeepAliveData = (data: number[]) => {
			const tempHex = ('0' + data[1].toString(16)).substr(-2) + ('0' + data[2].toString(16)).substr(-2)
			const tempDec = parseInt(tempHex, 16)
			const temperature = calculateTemperature(tempDec)
			const humidity = calculateHumidity(data[3])
			const batteryVoltageCalculated = parseInt(`${decbin(data[4])}${decbin(data[5])}`, 2) / 1000
			const sensorTemperature = Number(temperature.toFixed(2))
			const relativeHumidity = Number(humidity.toFixed(2))
			const batteryVoltage = Number(batteryVoltageCalculated.toFixed(2))

			let targetTemperature, powerSourceStatus, lux, pir
			if (data[0] == 1) {
				targetTemperature = data[6]
				powerSourceStatus = data[7]
				lux = (data[8] << 8) | data[9]
				pir = toBool(data[10])
			} else {
				targetTemperature = parseInt(`${decbin(data[6])}${decbin(data[7])}`, 2) / 10
				powerSourceStatus = data[8]
				lux = (data[9] << 8) | data[10]
				pir = toBool(data[11])
			}
			const keepaliveData = {
				targetTemperature,
				sensorTemperature,
				relativeHumidity,
				batteryVoltage,
				powerSourceStatus,
				lux,
				pir,
			}

			Object.assign(deviceData, { ...deviceData }, { ...keepaliveData })
		}

		if (hexData) {
			const byteArray = byteArrayParser(hexData)
			if (!byteArray) return
			if (byteArray[0] == 1 || byteArray[0] == 129) {
				// its a keeapalive
				handleKeepAliveData(byteArray)
			} else {
				// parse command answers
				let keepaliveLength = 22
				const potentialKeepAlive = hexData.match(/.{1,2}/g)?.slice(-24 / 2)

				if (potentialKeepAlive && potentialKeepAlive[0] == '81') keepaliveLength = 24

				const data = commandsReadingHelper(hexData, keepaliveLength, DeviceType.WirelessThermostat) as
					| Record<string, unknown>
					| undefined
				if (!data) return

				const shouldKeepAlive = Object.prototype.hasOwnProperty.call(data, 'decodeKeepalive')
				if ('decodeKeepalive' in data) {
					delete data.decodeKeepalive
				}

				Object.assign(deviceData, { ...deviceData }, { ...data })
				// get only keepalive from device response
				if (shouldKeepAlive) {
					const keepaliveData = hexData.slice(-keepaliveLength)
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
			deviceType: 'wireless_thermostat',
			originalError: e as Error,
		})
	}
}

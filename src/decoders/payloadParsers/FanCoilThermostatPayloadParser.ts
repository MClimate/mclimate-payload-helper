import { commandsReadingHelper } from '@/decoders/commandsReadingHelper'
import { DeviceType } from '@/decoders/payloadParsers/types'
import { decbin, byteArrayParser } from '@/helpers'
import { CustomError } from '@/utils'

export const FanCoilThermostatPayloadParser = (hexData: string) => {
	const deviceData: Record<string, unknown> = {}

	try {
		const calculateTemperature = (rawData: number) => (rawData - 400) / 10
		const calculateHumidity = (rawData: number) => (rawData * 100) / 256

		const handleKeepAliveData = (bytesArray: number[]) => {
			const tempDec = parseInt(`${decbin(bytesArray[1])}${decbin(bytesArray[2])}`, 2)
			const temperatureValue = calculateTemperature(tempDec)
			const humidityValue = calculateHumidity(bytesArray[3])
			const targetTemperature = parseInt(`${decbin(bytesArray[4])}${decbin(bytesArray[5])}`, 2) / 10
			const operationalMode = bytesArray[6]
			const displayedFanSpeed = bytesArray[7]
			const actualFanSpeed = bytesArray[8]
			const valveStatus = bytesArray[9]
			const deviceStatus = bytesArray[10]
			const keepaliveData = {
				sensorTemperature: Number(temperatureValue.toFixed(2)),
				relativeHumidity: Number(humidityValue.toFixed(2)),
				targetTemperature,
				operationalMode,
				displayedFanSpeed,
				actualFanSpeed,
				valveStatus,
				deviceStatus,
			}
			Object.assign(deviceData, { ...deviceData }, { ...keepaliveData })
		}

		// Q: error handling
		if (hexData) {
			const byteArray = byteArrayParser(hexData)
			if (!byteArray) return

			if (byteArray[0] == 1) {
				// its a keeapalive
				handleKeepAliveData(byteArray)
			} else {
				// parse command answers
				const data = commandsReadingHelper(hexData, 22, DeviceType.FanCoilThermostat) as Record<string, unknown> | undefined
				if (!data) return

				const shouldKeepAlive = Object.prototype.hasOwnProperty.call(data, 'decodeKeepalive')
				if ('decodeKeepalive' in data) {
					delete data.decodeKeepalive
				}

				Object.assign(deviceData, { ...deviceData }, { ...data })

				// get only keepalive from device response
				if (shouldKeepAlive) {
					const keepaliveData = hexData.slice(-22)
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
			deviceType: 'fan_coil_thermostat',
			originalError: e as Error,
		})
	}
}

import { commandsReadingHelper } from '@/decoders'
import { DeviceType } from '@/decoders/payloadParsers/types'
import { decbin, toBool, byteArrayParser } from '@/helpers'
import { CustomError } from '@/utils'

export const CO2DisplayPayloadParser = (hexData: string) => {
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

			let ppmBin = decbin(data[6])
			const ppmBin2 = decbin(data[7])
			ppmBin = `${ppmBin2.slice(0, 5)}${ppmBin}`
			const ppm = parseInt(ppmBin, 2)
			const powerSourceStatus = ppmBin2.slice(5, 8)
			const lux = (data[8] << 8) | data[9]
			const pir = toBool(data[10])

			const keepaliveData = {
				CO2: ppm,
				sensorTemperature,
				relativeHumidity,
				batteryVoltage,
				powerSourceStatus: parseInt(powerSourceStatus, 2),
				lux,
				pir,
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
				const data = commandsReadingHelper(hexData, 22, DeviceType.CO2Display) as Record<string, unknown> | undefined
				// Q: error handling
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
			deviceType: 'co2_display',
			originalError: e as Error,
		})
	}
}

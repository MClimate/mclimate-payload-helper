import { commandsReadingHelper } from '@/decoders'
import { DeviceType } from '@/decoders/payloadParsers/types'
import { decbin, toBool, byteArrayParser } from '@/helpers'
import { CustomError } from '@/utils'

export const CO2DisplayPayloadParser = (hexData: string) => {
	let deviceData = {}

	try {
		const calculateTemperature = (rawData: number) => (rawData - 400) / 10
		const calculateHumidity = (rawData: number) => (rawData * 100) / 256

		const handleKeepAliveData = (data: number[]) => {
			let tempHex = ('0' + data[1].toString(16)).substr(-2) + ('0' + data[2].toString(16)).substr(-2)
			let tempDec = parseInt(tempHex, 16)
			let temperature = calculateTemperature(tempDec)
			let humidity = calculateHumidity(data[3])
			let batteryVoltageCalculated = parseInt(`${decbin(data[4])}${decbin(data[5])}`, 2) / 1000
			let sensorTemperature = Number(temperature.toFixed(2))
			let relativeHumidity = Number(humidity.toFixed(2))
			let batteryVoltage = Number(batteryVoltageCalculated.toFixed(2))

			let ppmBin = decbin(data[6])
			let ppmBin2 = decbin(data[7])
			ppmBin = `${ppmBin2.slice(0, 5)}${ppmBin}`
			let ppm = parseInt(ppmBin, 2)
			let powerSourceStatus = ppmBin2.slice(5, 8)
			let lux = parseInt('0' + data[8].toString(16) + data[9].toString(16), 16)
			let pir = toBool(data[10])

			let keepaliveData = {
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
				let data = commandsReadingHelper(hexData, 22, DeviceType.CO2Display)
				// Q: error handling
				if (!data) return
				const shouldKeepAlive = data.hasOwnProperty('decodeKeepalive') ? true : false

				if ('decodeKeepalive' in data) {
					delete data.decodeKeepalive
				}

				Object.assign(deviceData, { ...deviceData }, { ...data })

				// get only keepalive from device response
				if (shouldKeepAlive) {
					let keepaliveData = hexData.slice(-22)
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
			deviceType: 'co2_display',
			originalError: e as Error,
		})
	}
}

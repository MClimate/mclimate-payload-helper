import { commandsReadingHelper } from '@/decoders/'
import { DeviceType } from '@/decoders/payloadParsers/types'
import { decbin, byteArrayParser } from '@/helpers'
import { CustomError } from '@/utils'

export const CO2DisplayLitePayloadParser = (hexData: string) => {
	let deviceData = {}

	try {
		const calculateTemperature = (rawData: number) => (rawData - 400) / 10
		const calculateHumidity = (rawData: number) => (rawData * 100) / 256

		const handleKeepAliveData = (data: number[]) => {
			// Temperature calculation from two data
			let temperatureRaw = (data[1] << 8) | data[2] // Shift byte[1] left by 8 bits and OR with byte[2]
			let sensorTemperature = Number(calculateTemperature(temperatureRaw).toFixed(2))

			// Humidity calculation
			let relativeHumidity = Number(calculateHumidity(data[3]).toFixed(2))

			// Battery voltage calculation from two data
			let batteryVoltageRaw = (data[4] << 8) | data[5]
			let batteryVoltage = Number((batteryVoltageRaw / 1000).toFixed(2))

			// CO2 calculation from data 6 and 7
			let co2Low = data[6] // Lower byte of CO2
			let co2High = (data[7] & 0xf8) >> 3 // Mask the upper 5 bits and shift them right
			let CO2 = (co2High << 8) | co2Low // Shift co2High left by 8 bits and combine with co2Low

			// Power source status
			let powerSourceStatus = data[7] & 0x07 // Extract the last 3 bits directly

			// Light intensity from two data
			let lightIntensityRaw = (data[8] << 8) | data[9]
			let lux = lightIntensityRaw

			let keepAliveData = {
				sensorTemperature,
				relativeHumidity,
				batteryVoltage,
				CO2,
				powerSourceStatus,
				lux,
			}

			Object.assign(deviceData, { ...deviceData }, { ...keepAliveData })
		}

		if (hexData) {
			let byteArray = byteArrayParser(hexData)
			if (!byteArray) return

			if (byteArray[0] == 1) {
				// its a keeapalive
				handleKeepAliveData(byteArray)
			} else {
				// parse command answers
				let data = commandsReadingHelper(hexData, 20, DeviceType.CO2DisplayLite)
				// Q: error handling?
				if (!data) return
				let shouldKeepAlive = data.hasOwnProperty('decodeKeepalive') ? true : false

				if ('decodeKeepalive' in data) {
					delete data.decodeKeepalive
				}

				Object.assign(deviceData, { ...deviceData }, { ...data })

				// get only keepalive from device response
				if (shouldKeepAlive) {
					let keepaliveData = hexData.slice(-20)
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
			deviceType: 'co2_display_lite',
			originalError: e as Error,
		})
	}
}

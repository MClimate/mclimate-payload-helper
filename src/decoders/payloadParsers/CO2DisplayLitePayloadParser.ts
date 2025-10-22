import { commandsReadingHelper } from '@/decoders/'
import { DeviceType } from '@/decoders/payloadParsers/types'
import { byteArrayParser } from '@/helpers'
import { CustomError } from '@/utils'

export const CO2DisplayLitePayloadParser = (hexData: string) => {
	const deviceData: Record<string, unknown> = {}

	try {
		const calculateTemperature = (rawData: number) => (rawData - 400) / 10
		const calculateHumidity = (rawData: number) => (rawData * 100) / 256

		const handleKeepAliveData = (data: number[]) => {
			// Temperature calculation from two data
			const temperatureRaw = (data[1] << 8) | data[2] // Shift byte[1] left by 8 bits and OR with byte[2]
			const sensorTemperature = Number(calculateTemperature(temperatureRaw).toFixed(2))

			// Humidity calculation
			const relativeHumidity = Number(calculateHumidity(data[3]).toFixed(2))

			// Battery voltage calculation from two data
			const batteryVoltageRaw = (data[4] << 8) | data[5]
			const batteryVoltage = Number((batteryVoltageRaw / 1000).toFixed(2))

			// CO2 calculation from data 6 and 7
			const co2Low = data[6] // Lower byte of CO2
			const co2High = (data[7] & 0xf8) >> 3 // Mask the upper 5 bits and shift them right
			const CO2 = (co2High << 8) | co2Low // Shift co2High left by 8 bits and combine with co2Low

			// Power source status
			const powerSourceStatus = data[7] & 0x07 // Extract the last 3 bits directly

			// Light intensity from two data
			const lightIntensityRaw = (data[8] << 8) | data[9]
			const lux = lightIntensityRaw

			const keepAliveData = {
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
			const byteArray = byteArrayParser(hexData)
			if (!byteArray) return

			if (byteArray[0] == 1) {
				// its a keeapalive
				handleKeepAliveData(byteArray)
			} else {
				// parse command answers
				const data = commandsReadingHelper(hexData, 20, DeviceType.CO2DisplayLite) as Record<string, unknown> | undefined
				// Q: error handling?
				if (!data) return
				const shouldKeepAlive = Object.prototype.hasOwnProperty.call(data, 'decodeKeepalive')

				if ('decodeKeepalive' in data) {
					delete data.decodeKeepalive
				}

				Object.assign(deviceData, { ...deviceData }, { ...data })

				// get only keepalive from device response
				if (shouldKeepAlive) {
					const keepaliveData = hexData.slice(-20)
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
			deviceType: 'co2_display_lite',
			originalError: e as Error,
		})
	}
}

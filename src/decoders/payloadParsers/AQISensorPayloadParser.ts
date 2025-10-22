import { commandsReadingHelper } from '@/decoders'
import { DeviceType } from '@/decoders/payloadParsers/types'
import { byteArrayParser } from '@/helpers'
import { CustomError } from '@/utils'

export const AQISensorPayloadParser = (hexData: string) => {
	const deviceData = {}

	try {
		// WARN: have refactored this - check if logic correct - we don't need to run thru byte parser twice as in original code

		const handleKeepAliveData = (byteArray: number[]) => {
			const sAQI1 = byteArray[1].toString().substr(0)
			const sAQI2 = byteArray[2].toString().slice(0, 1)
			const p1 = byteArray[6].toString()
			const p2 = byteArray[7].toString().slice(0, 3)
			const t1 = byteArray[7].toString().substr(4)
			const t2 = byteArray[8].toString().slice(0, 6)

			const keepaliveData = {
				sAQI: parseInt('' + sAQI1 + sAQI2, 2) * 16,
				AQI: parseInt(byteArray[2].toString().substring(1, 6), 2) * 16,
				CO2eq: parseInt('' + byteArray[2].toString().slice(6, 8) + byteArray[3].toString(), 2) * 32,
				VOC: parseInt(byteArray[4].toString(), 2) * 4,
				relative_humidity: (parseInt(byteArray[5].toString(), 2) * 4) / 10,
				pressure: (parseInt('' + p1 + p2, 2) * 40 + 30000) / 100,
				temperature: (parseInt('' + t1 + t2, 2) - 400) / 10,
				accuracy_aqi: parseInt(byteArray[8].toString().substr(-2), 2),
				voltage: (parseInt(byteArray[9].toString(), 2) * 8 + 1600) / 1000,
			}

			Object.assign(deviceData, { ...deviceData }, { ...keepaliveData })
		}

		if (hexData) {
			const byteArray = byteArrayParser(hexData)
			if (!byteArray) return

			if (byteArray[0] == 1) {
				handleKeepAliveData(byteArray)
			} else {
				// parse command answers
				const data = commandsReadingHelper(hexData, 20, DeviceType.AQISensor)
				Object.assign(deviceData, { ...deviceData }, { ...data })

				// get only keepalive from device response
				const keepaliveData = hexData.slice(-20)

				const dataToPass = byteArrayParser(keepaliveData)
				if (!dataToPass) return

				handleKeepAliveData(dataToPass)
			}

			return deviceData
		}
	} catch (e) {
		throw new CustomError({
			message: `Unhandled data`,
			hexData: hexData,
			deviceType: 'aqi_sensor',
			originalError: e as Error,
		})
	}
}

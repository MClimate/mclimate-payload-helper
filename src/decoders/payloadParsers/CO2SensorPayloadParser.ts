import { commandsReadingHelper } from '@/decoders'
import { DeviceType } from '@/decoders/payloadParsers/types'
import { byteArrayParser } from '@/helpers'
import { CustomError } from '@/utils'

export const CO2SensorPayloadParser = (hexData: string) => {
	let deviceData = {}

	try {
		const handleKeepAliveData = (byteArray: number[]) => {
			const co2 = parseInt(byteArray[1].toString(16).padStart(2, '0') + byteArray[2].toString(16).padStart(2, '0'), 16)

			const tempHex = byteArray[3].toString(16).padStart(2, '0') + byteArray[4].toString(16).padStart(2, '0')
			const temperature = (parseInt(tempHex, 16) - 400) / 10

			const humidity = Number(((byteArray[5] * 100) / 256).toFixed(2))
			const voltage = Number(((byteArray[6] * 8 + 1600) / 1000).toFixed(2))

			let keepaliveData = {
				CO2: co2,
				temperature: temperature,
				humidity: humidity,
				voltage: voltage,
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
				const data = commandsReadingHelper(hexData, 14, DeviceType.CO2Sensor)
				// Q: error handling
				if (!data) return

				const shouldKeepAlive = data.hasOwnProperty('decodeKeepalive') ? true : false
				if ('decodeKeepalive' in data) {
					delete data.decodeKeepalive
				}

				Object.assign(deviceData, { ...deviceData }, { ...data })
				if (shouldKeepAlive) {
					const keepaliveData = hexData.slice(-14)

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
			deviceType: 'co2_sensor',
			originalError: e as Error,
		})
	}
}

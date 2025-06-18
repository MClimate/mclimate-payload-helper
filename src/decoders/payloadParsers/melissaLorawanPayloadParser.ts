import { commandsReadingHelper } from '@/decoders/commandsReadingHelper'
import { DeviceType, RelayKeepAliveData } from '@/decoders/payloadParsers/types'
import { byteArrayParser } from '@/helpers'
import { CustomError } from '@/utils'

export const melissaLorawanPayloadParser = (hexData: string) => {
	let deviceData = {}

	try {
		const handleKeepAliveData = (bytes: number[]) => {
			let keepaliveData: RelayKeepAliveData = {}

			// Internal temperature sensor
			const isNegative = (bytes[1] & 0x80) !== 0; // Check the 7th bit for the sign
			let temperature = bytes[1] & 0x7F; // Mask out the 7th bit to get the temperature value
			keepaliveData.internalTemperature = isNegative ? -temperature : temperature;

			// Energy data
			keepaliveData.energy = ((bytes[2] << 24) | (bytes[3] << 16) | (bytes[4] << 8) | bytes[5]) / 1000

			// Power data
			keepaliveData.power = (bytes[6] << 8) | bytes[7]

			// AC voltage
			keepaliveData.acVoltage = bytes[8]

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
				let data = commandsReadingHelper(hexData, 18, DeviceType.MelissaLorawan)
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
			// console.log(deviceData)
			return deviceData
		}
	} catch (e) {
		throw new CustomError({
			message: `Unhandled data`,
			hexData: hexData,
			deviceType: 'melissa_lorawan',
			originalError: e as Error,
		})
	}
}

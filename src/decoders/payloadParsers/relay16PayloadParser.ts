import { commandsReadingHelper } from '@/decoders/commandsReadingHelper'
import { DeviceType, RelayKeepAliveData } from '@/decoders/payloadParsers/types'
import { byteArrayParser } from '@/helpers'
import { CustomError } from '@/utils'

export const relay16PayloadParser = (hexData: string) => {
	let deviceData = {}

	try {
		const handleKeepAliveData = (bytes: number[]) => {
			let keepaliveData: RelayKeepAliveData = {}

			// Internal temperature sensor
			keepaliveData.internalTemperature = bytes[1]

			// Energy data
			keepaliveData.energy = ((bytes[2] << 24) | (bytes[3] << 16) | (bytes[4] << 8) | bytes[5]) / 1000

			// Power data
			keepaliveData.power = (bytes[6] << 8) | bytes[7]

			// AC voltage
			keepaliveData.acVoltage = bytes[8]

			// AC current data
			keepaliveData.acCurrent = (bytes[9] << 8) | bytes[10]

			// Relay state
			keepaliveData.relayState = bytes[11] === 0x01

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
				let data = commandsReadingHelper(hexData, 24, DeviceType.Relay16)
				if (!data) return
				const shouldKeepAlive = data.hasOwnProperty('decodeKeepalive') ? true : false
				if ('decodeKeepalive' in data) {
					delete data.decodeKeepalive
				}

				Object.assign(deviceData, { ...deviceData }, { ...data })

				// get only keepalive from device response
				if (shouldKeepAlive) {
					let keepaliveData = hexData.slice(-24)
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
			deviceType: 'relay_16',
			originalError: e as Error,
		})
	}
}

import { commandsReadingHelper } from '@/decoders/commandsReadingHelper'
import { DeviceType, RelayKeepAliveData } from '@/decoders/payloadParsers/types'
import { byteArrayParser } from '@/helpers'
import { CustomError } from '@/utils'

export const relay16DryPayloadParser = (hexData: string) => {
	const deviceData: Record<string, unknown> = {}

	try {
		const handleKeepAliveData = (bytes: number[]) => {
			const keepaliveData: RelayKeepAliveData = {}

			// Temperature sign and internal temperature
			const isNegative = (bytes[1] & 0x80) !== 0 // Check the 7th bit for the sign

			const temperature = bytes[1] & 0x7f // Mask out the 7th bit to get the temperature value
			keepaliveData.internalTemperature = isNegative ? -temperature : temperature

			// Relay state
			keepaliveData.relayState = bytes[2] === 0x01

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
				const data = commandsReadingHelper(hexData, 6, DeviceType.Relay16) as Record<string, unknown> | undefined
				if (!data) return
				const shouldKeepAlive = Object.prototype.hasOwnProperty.call(data, 'decodeKeepalive')
				if ('decodeKeepalive' in data) {
					delete data.decodeKeepalive
				}

				Object.assign(deviceData, { ...deviceData }, { ...data })

				// get only keepalive from device response
				if (shouldKeepAlive) {
					const keepaliveData = hexData.slice(-6)
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
			deviceType: 'relay_16_dry',
			originalError: e as Error,
		})
	}
}

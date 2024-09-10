import { commandsReadingHelper } from '@/decoders/commandsReadingHelper'
import { DeviceType } from '@/decoders/payloadParsers/types'
import { byteArrayParser, decbin } from '@/helpers'
import { CustomError } from '@/utils'

// WARN: no tests found for below
export const DskDevicePayloadParser = (hexData: string) => {
	let deviceData = {}

	try {
		const handleKeepAliveData = (data: string) => {
			const hexArray = byteArrayParser(data)

			if (!hexArray) return

			let powerSupplyVoltage = ((hexArray[1] * 8 + 1600) / 1000).toFixed(2)

			let thermistorProperlyConnected = parseInt(decbin(hexArray[2])[5]) == 0

			let extT1 = ('0' + hexArray[2].toString(16)).substr(-2)[1]
			let extT2 = ('0' + hexArray[3].toString(16)).substr(-2)
			let sensorTemperature = thermistorProperlyConnected ? (parseInt(`0x${extT1}${extT2}`, 16) * 0.1).toFixed(2) : 0
			let status = hexArray[4]

			let keepaliveData = {
				sensorTemperature: Number(sensorTemperature),
				powerSupplyVoltage: Number(powerSupplyVoltage),
				status,
				thermistorProperlyConnected,
			}
			Object.assign(deviceData, { ...deviceData }, { ...keepaliveData })
		}

		if (hexData) {
			if (parseInt(hexData[1]) == 1) {
				// its a keeapalive
				handleKeepAliveData(hexData)
			} else {
				// parse command answers
				let decodeKeepalive = hexData.length <= 84
				let data = commandsReadingHelper(hexData, 10, DeviceType.DskDevice)
				Object.assign(deviceData, { ...deviceData }, { ...data })

				// get only keepalive from device response
				let keepaliveData = hexData.slice(-10)

				if (decodeKeepalive) handleKeepAliveData(keepaliveData)
			}
			return deviceData
		}
	} catch (e) {
		throw new CustomError({
			message: `Unhandled data`,
			hexData: hexData,
			deviceType: 'dsk_device',
			originalError: e as Error,
		})
	}
}

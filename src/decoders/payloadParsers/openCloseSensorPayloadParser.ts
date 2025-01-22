import { commandsReadingHelper } from '@/decoders/commandsReadingHelper'
import { DeviceType } from '@/decoders/payloadParsers/types'
import { byteArrayParser, decbin } from '@/helpers'
import { CustomError } from '@/utils'

export const openCloseSensorPayloadParser = (hexData: string) => {
	let deviceData = {}

	try {
		const handleKeepAliveData = (data: string) => {
			const hexArray = byteArrayParser(data)
			if (!hexArray) return

			const batteryTmp = '0' + hexArray[1].toString(16).substr(-2)
			const batteryVoltageCalculated = (parseInt('0x' + batteryTmp, 16) * 8 + 1600) / 1000
			const thermistorProperlyConnected = parseInt(decbin(hexArray[2])[5]) == 0
			const extT1 = ('0' + hexArray[2].toString(16)).substr(-2)[1]
			const extT2 = '0' + hexArray[3].toString(16).substr(-2)
			const temperature = (thermistorProperlyConnected ? parseInt(`0x${extT1}${extT2}`, 16) * 0.1 : 0).toFixed(2)
			const counter = ((hexArray[4] << 16) | (hexArray[5] << 8) | hexArray[6])
			const status = hexArray[7]

			const events: { [key: string]: string } = { '01': 'keepalive', '32': 'reed switch', '33': 'push button' }
			const eventKey = hexArray[0].toString().padStart(2, '0')
			const event = events[eventKey]

			let keepaliveData = {
				event,
				status: status,
				counter: counter,
				batteryVoltage: batteryVoltageCalculated,
				thermistorProperlyConnected: thermistorProperlyConnected,
				sensorTemperature: Number(temperature),
			}
			Object.assign(deviceData, { ...deviceData }, { ...keepaliveData })
		}

		if (hexData) {
			if (hexData.substr(0, 2) == '01' || hexData.substr(0, 2) == '20' || hexData.substr(0, 2) == '21') {
				// its a keeapalive
				handleKeepAliveData(hexData)
			} else {
				// parse command answers
				const data = commandsReadingHelper(hexData, 16, DeviceType.OpenCloseSensor)
				if (!data) return

				const shouldKeepAlive = data.hasOwnProperty('decodeKeepalive') ? true : false
				if ('decodeKeepalive' in data) {
					delete data.decodeKeepalive
				}

				Object.assign(deviceData, { ...deviceData }, { ...data })

				// get only keepalive from device response
				if (shouldKeepAlive) {
					let keepaliveData = hexData.slice(-16)
					handleKeepAliveData(keepaliveData)
				}
			}
			return deviceData
		}
	} catch (e) {
		throw new CustomError({
			message: `Unhandled data`,
			hexData: hexData,
			deviceType: 'open_close_sensor',
			originalError: e as Error,
		})
	}
}

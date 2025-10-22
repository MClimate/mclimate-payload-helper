import { commandsReadingHelper } from '@/decoders/commandsReadingHelper'
import { DeviceType } from '@/decoders/payloadParsers/types'
import { toBool } from '@/helpers'
import { CustomError } from '@/utils'

export const tFloodPayloadParser = (hexData: string) => {
	const deviceData = {}

	try {
		const handleKeepAliveData = (hexData: string) => {
			const byteArray = hexData.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16).toString(2).padStart(8, '0'))
			if (!byteArray) return

			const messageTypes = ['keepalive', 'testButtonPressed', 'floodDetected', 'fraudDetected', 'fraudDetected']

			const shortPackage = (byteArray: string[]) => {
				const keepaliveData = {
					reason: messageTypes[parseInt(byteArray[0].slice(0, 3), 2)],
					boxTamper: toBool(byteArray[0][4]),
					flood: toBool(byteArray[0][6]),
					battery: (parseInt(byteArray[1], 2) * 16) / 1000,
				}
				Object.assign(deviceData, { ...deviceData }, { ...keepaliveData })
			}
			const longPackage = (byteArray: string[]) => {
				const keepaliveData = {
					reason: messageTypes[parseInt(byteArray[0].slice(0, 3), 2)],
					boxTamper: toBool(byteArray[0][4]),
					flood: toBool(byteArray[0][6]),
					battery: (parseInt(byteArray[1], 2) * 16) / 1000,
					temperature: parseInt(byteArray[2], 2),
				}
				Object.assign(deviceData, { ...deviceData }, { ...keepaliveData })
			}

			if (byteArray.length > 2) {
				longPackage(byteArray)
			} else {
				shortPackage(byteArray)
			}
		}

		if (hexData) {
			if (hexData.length > 6) {
				const data = commandsReadingHelper(hexData, 6, DeviceType.TFlood)
				Object.assign(deviceData, { ...deviceData }, { ...data })
				// get only keepalive from device response
				const keepaliveData = hexData.slice(-6)
				// let dataToPass = keepaliveData.match(/.{1,2}/g).map(byte => { return parseInt(byte, 16) });
				handleKeepAliveData(keepaliveData)
			} else {
				handleKeepAliveData(hexData)
			}
			// console.log(deviceData)
			return deviceData
		}
	} catch (e) {
		throw new CustomError({
			message: `Unhandled data`,
			hexData: hexData,
			deviceType: 't_flood',
			originalError: e as Error,
		})
	}
}

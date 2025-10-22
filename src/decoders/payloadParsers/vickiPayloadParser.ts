import { commandsReadingHelper } from '@/decoders'
import { CustomError } from '@/utils'
import { VickiKeepAliveData, DeviceType } from '@/decoders/payloadParsers/types'
import { byteArrayParser, toBool, decbin } from '@/helpers'

export const vickiPayloadParser = (hexData: string) => {
	const deviceData: Record<string, unknown> = {}

	try {
		const handleKeepAliveData = (byteArray: number[]) => {
			const tmp = ('0' + byteArray[6].toString(16)).substr(-2)
			const motorRange1 = tmp[1]
			const motorRange2 = ('0' + byteArray[5].toString(16)).substr(-2)
			const motorRange = parseInt(`0x${motorRange1}${motorRange2}`, 16)

			const motorPos2 = ('0' + byteArray[4].toString(16)).substr(-2)
			const motorPos1 = tmp[0]
			const motorPosition = parseInt(`0x${motorPos1}${motorPos2}`, 16)

			const batteryTmp = ('0' + byteArray[7].toString(16)).substr(-2)[0]
			const batteryVoltageCalculated = 2 + parseInt(`0x${batteryTmp}`, 16) * 0.1

			const byte7Bin = decbin(byteArray[7])
			const openWindow = byte7Bin[4]
			const highMotorConsumption = byte7Bin[5]
			const lowMotorConsumption = byte7Bin[6]
			const brokenSensor = byte7Bin[7]
			const byte8Bin = decbin(byteArray[8])
			const childLock = byte8Bin[0]
			const calibrationFailed = byte8Bin[1]
			const attachedBackplate = byte8Bin[2]
			const perceiveAsOnline = byte8Bin[3]
			const antiFreezeProtection = byte8Bin[4]

			let sensorTemp
			if (byteArray[0] == 1) {
				sensorTemp = (byteArray[2] * 165) / 256 - 40
			}
			if (byteArray[0] == 129) {
				sensorTemp = (byteArray[2] - 28.33333) / 5.66666
			}

			const keepaliveData: VickiKeepAliveData = {
				reason: byteArray[0],
				targetTemperature: byteArray[1],
				sensorTemperature: sensorTemp,
				relativeHumidity: (byteArray[3] * 100) / 256,
				motorRange: motorRange,
				motorPosition: motorPosition,
				batteryVoltage: batteryVoltageCalculated,
				openWindow: toBool(openWindow),
				highMotorConsumption: toBool(highMotorConsumption),
				lowMotorConsumption: toBool(lowMotorConsumption),
				brokenSensor: toBool(brokenSensor),
				childLock: toBool(childLock),
				calibrationFailed: toBool(calibrationFailed),
				attachedBackplate: toBool(attachedBackplate),
				perceiveAsOnline: toBool(perceiveAsOnline),
				antiFreezeProtection: toBool(antiFreezeProtection),
				valveOpenness: motorRange != 0 ? Math.round((1 - motorPosition / motorRange) * 100) : 0,
			}
			if (!Object.prototype.hasOwnProperty.call(deviceData, 'targetTemperatureFloat')) {
				keepaliveData.targetTemperatureFloat = byteArray[1].toFixed(2)
			}
			Object.assign(deviceData, { ...deviceData }, { ...keepaliveData })
		}

		if (hexData) {
			const byteArray = hexData.match(/.{1,2}/g)?.map((byte) => {
				return parseInt(byte, 16)
			})

			// Q: how do we handle these?
			if (!byteArray) return

			if (byteArray[0] == 1 || byteArray[0] == 129) {
				// its a keeapalive
				handleKeepAliveData(byteArray)
			} else {
				// parse command answers
				const data = commandsReadingHelper(hexData, 18, DeviceType.Vicki) as Record<string, unknown> | undefined
				if (!data) return

				const shouldKeepAlive = Object.prototype.hasOwnProperty.call(data, 'decodeKeepalive')

				if ('decodeKeepalive' in data) {
					delete data.decodeKeepalive
				}

				Object.assign(deviceData, { ...deviceData }, { ...data })

				// get only keepalive from device response
				if (shouldKeepAlive) {
					const keepaliveData = hexData.slice(-18)
					const dataToPass = byteArrayParser(keepaliveData)
					// Q: how do we handle these?
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
			deviceType: 'vicki',
			originalError: e as Error,
		})
	}
}

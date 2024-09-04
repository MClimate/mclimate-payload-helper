import { commandsReadingHelper } from '@/decoders'
import { CustomError } from '@/utils'
import { VickiKeepAliveData, DeviceType } from '@/decoders/payloadParsers/types'
import { byteArrayParser, toBool, decbin } from '@/helpers'

export const vickiPayloadParser = (hexData: string) => {
	let deviceData = {}

	try {
		const handleKeepAliveData = (byteArray: number[]) => {
			let tmp = ('0' + byteArray[6].toString(16)).substr(-2)
			let motorRange1 = tmp[1]
			let motorRange2 = ('0' + byteArray[5].toString(16)).substr(-2)
			let motorRange = parseInt(`0x${motorRange1}${motorRange2}`, 16)

			let motorPos2 = ('0' + byteArray[4].toString(16)).substr(-2)
			let motorPos1 = tmp[0]
			let motorPosition = parseInt(`0x${motorPos1}${motorPos2}`, 16)

			let batteryTmp = ('0' + byteArray[7].toString(16)).substr(-2)[0]
			let batteryVoltageCalculated = 2 + parseInt(`0x${batteryTmp}`, 16) * 0.1

			let byte7Bin = decbin(byteArray[7])
			let openWindow = byte7Bin[4]
			let highMotorConsumption = byte7Bin[5]
			let lowMotorConsumption = byte7Bin[6]
			let brokenSensor = byte7Bin[7]
			let byte8Bin = decbin(byteArray[8])
			let childLock = byte8Bin[0]
			let calibrationFailed = byte8Bin[1]
			let attachedBackplate = byte8Bin[2]
			let perceiveAsOnline = byte8Bin[3]
			let antiFreezeProtection = byte8Bin[3]

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
			if (!deviceData.hasOwnProperty('targetTemperatureFloat')) {
				keepaliveData.targetTemperatureFloat = byteArray[1].toFixed(2)
			}
			Object.assign(deviceData, { ...deviceData }, { ...keepaliveData })
		}

		if (hexData) {
			let byteArray = hexData.match(/.{1,2}/g)?.map((byte) => {
				return parseInt(byte, 16)
			})

			// Q: how do we handle these?
			if (!byteArray) return

			if (byteArray[0] == 1 || byteArray[0] == 129) {
				// its a keeapalive
				handleKeepAliveData(byteArray)
			} else {
				// parse command answers
				let data = commandsReadingHelper(hexData, 18, DeviceType.Vicki)
				if (!data) return

				const shouldKeepAlive = data.hasOwnProperty('decodeKeepalive') ? true : false

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

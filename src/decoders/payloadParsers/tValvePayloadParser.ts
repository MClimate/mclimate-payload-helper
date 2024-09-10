import { commandsReadingHelper } from '@/decoders/commandsReadingHelper'
import { DeviceType } from '@/decoders/payloadParsers/types'
import { byteArrayParser } from '@/helpers'
import { CustomError } from '@/utils'

export const tValvePayloadParser = (hexData: string) => {
	let deviceData = {}

	try {
		let messageTypes = ['keepalive', 'testButtonPressed', 'floodDetected', 'controlButtonPressed', 'fraudDetected']
		const shortPackage = (byteArray: number[]) => {
			let keepaliveData = {
				reason: 'keepalive',
				waterTemp: (byteArray[0] & 0xff) / 2, // Extract all 8 bits (7:0) from byte 0 and divide by 2
				valveState: !!(byteArray[1] & 0b10000000), // Extract bit 7 from byte 1
				ambientTemp: ((byteArray[1] & 0b01111111) - 20) / 2, // Extract bits 6:0 from byte 1, subtract 20, and divide by 2
			}
			Object.assign(deviceData, { ...deviceData }, { ...keepaliveData })
		}
		const longPackage = (byteArray: number[]) => {
			let keepaliveData = {
				reason: messageTypes[(byteArray[0] >> 5) & 0b111], // Extract bits 7:5 using right shift and mask
				boxTamper: !!(byteArray[0] & (1 << 3)), // Extract bit 3
				floodDetectionWireState: !!(byteArray[0] & (1 << 2)), // Extract bit 2
				flood: !!(byteArray[0] & (1 << 1)), // Extract bit 1
				magnet: !!(byteArray[0] & 1), // Extract bit 0
				alarmValidated: !!(byteArray[1] & (1 << 7)), // Extract bit 7
				manualOpenIndicator: !!(byteArray[1] & (1 << 6)), // Extract bit 6
				manualCloseIndicator: !!(byteArray[1] & (1 << 5)), // Extract bit 5
				manualControl: { enableOpen: !!(byteArray[1] & (1 << 6)), enableClose: !!(byteArray[1] & (1 << 5)) },
				deviceVersions: { software: byteArray[1] & 0b11111, hardware: 0 }, // Extract bits 4:0
				closeTime: byteArray[2], // Byte 2
				openTime: byteArray[3], // Byte 3
				openCloseTime: { openingTime: byteArray[3], closingTime: byteArray[2] },
				battery: (byteArray[4] * 8 + 1600) / 1000, // Byte 4, battery calculation
			}
			Object.assign(deviceData, { ...deviceData }, { ...keepaliveData })
		}

		if (hexData) {
			let bytes = byteArrayParser(hexData)
			if (!bytes) return

			if (bytes.length == 5) {
				longPackage(bytes)
			} else if (bytes.length == 2) {
				shortPackage(bytes)
			} else {
				bytes = bytes.slice(0, 5)
				longPackage(bytes)

				const keepaliveData = hexData.slice(10)
				const data = commandsReadingHelper(keepaliveData, 10, DeviceType.TValve)
				if (!data) return
				if ('decodeKeepalive' in data) {
					delete data.decodeKeepalive
				}

				Object.assign(deviceData, { ...deviceData }, { ...data })
			}
			return deviceData
		}
	} catch (e) {
		throw new CustomError({
			message: `Unhandled data`,
			hexData: hexData,
			deviceType: 't_valve',
			originalError: e as Error,
		})
	}
}

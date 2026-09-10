import { commandsReadingHelper } from '@/decoders/commandsReadingHelper'
import { DeviceType } from '@/decoders/payloadParsers/types'
import { byteArrayParser } from '@/helpers'
import { CustomError } from '@/utils'

type MelissaPowerSource = 'usb' | 'battery'
type MelissaLorawanClass = 'A' | 'C'

interface MelissaKeepAliveData {
	sensorTemperature?: number
	relativeHumidity?: number
	isIrCodeRecordingRequested?: boolean
	occupied?: boolean
	powerSource?: MelissaPowerSource
	lorawanClass?: MelissaLorawanClass
	lux?: number
	pirTriggerCount?: number
	batteryVoltage?: number
}

// Melissa LoRaWAN keep-alive (command 0x01) is 10 bytes long -> 20 hex characters
const KEEPALIVE_HEX_LENGTH = 20

export const melissaLorawanPayloadParser = (hexData: string) => {
	const deviceData: Record<string, unknown> = {}

	try {
		const handleKeepAliveData = (bytes: number[]) => {
			const keepaliveData: MelissaKeepAliveData = {}

			// Bytes 1-2: internal temperature sensor, t[°C] = (T[15:0] - 400) / 10
			const rawTemperature = (bytes[1] << 8) | bytes[2]
			keepaliveData.sensorTemperature = Number(((rawTemperature - 400) / 10).toFixed(2))

			// Byte 3: relative humidity, RH[%] = (XX * 100) / 256
			keepaliveData.relativeHumidity = Number(((bytes[3] * 100) / 256).toFixed(2))

			// Byte 4: device status
			//   bit 7: 1 if IR code recording is requested
			//   bit 6: occupancy flag (1 = occupied, 0 = unoccupied)
			//   bit 5: power source / LoRaWAN class (0 = USB, class C; 1 = batteries, class A)
			//   bits 4:0: reserved
			keepaliveData.isIrCodeRecordingRequested = (bytes[4] & 0x80) !== 0
			keepaliveData.occupied = (bytes[4] & 0x40) !== 0
			const onBatteries = (bytes[4] & 0x20) !== 0
			keepaliveData.powerSource = onBatteries ? 'battery' : 'usb'
			keepaliveData.lorawanClass = onBatteries ? 'A' : 'C'

			// Bytes 5-6: light intensity, directly in lux
			keepaliveData.lux = (bytes[5] << 8) | bytes[6]

			// Bytes 7-8: PIR motion counter
			keepaliveData.pirTriggerCount = (bytes[7] << 8) | bytes[8]

			// Byte 9: device supply voltage, V[mV] = XX * 16 + 1600 (USB supply when powered over USB-C)
			keepaliveData.batteryVoltage = Number(((bytes[9] * 16 + 1600) / 1000).toFixed(3))

			Object.assign(deviceData, { ...deviceData }, { ...keepaliveData })
		}

		if (hexData) {
			const byteArray = byteArrayParser(hexData)
			if (!byteArray) return
			if (byteArray[0] == 1) {
				// its a keepalive
				handleKeepAliveData(byteArray)
			} else {
				// parse command answers
				const data = commandsReadingHelper(hexData, KEEPALIVE_HEX_LENGTH, DeviceType.MelissaLorawan) as
					| Record<string, unknown>
					| undefined
				if (!data) return
				const shouldKeepAlive = Object.prototype.hasOwnProperty.call(data, 'decodeKeepalive')
				if ('decodeKeepalive' in data) {
					delete data.decodeKeepalive
				}

				Object.assign(deviceData, { ...deviceData }, { ...data })

				// get only keepalive from device response
				if (shouldKeepAlive) {
					const keepaliveData = hexData.slice(-KEEPALIVE_HEX_LENGTH)
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
			deviceType: 'melissa_lorawan',
			originalError: e as Error,
		})
	}
}

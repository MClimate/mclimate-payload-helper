import { commandsReadingHelper } from '@/decoders/commandsReadingHelper'
import { DeviceType } from '@/decoders/payloadParsers/types'
import { byteArrayParser } from '@/helpers'
import { CustomError } from '@/utils'

interface MelissaKeepAliveData {
	sensorTemperature?: number
	relativeHumidity?: number
	isIrCodeRecordingRequested?: boolean
}
export const melissaLorawanPayloadParser = (hexData: string) => {
	const deviceData: Record<string, unknown> = {}

	try {
		const handleKeepAliveData = (bytes: number[]) => {
			const keepaliveData: MelissaKeepAliveData = {}
			// Internal temperature sensor data from bytes 1-2 (16 bits)
			// According to the screenshot: t[°C] = (T[15:0] - 400) / 10
			const rawTemperature = (bytes[1] << 8) | bytes[2]
			keepaliveData.sensorTemperature = Number(((rawTemperature - 400) / 10).toFixed(2))

			// Relative Humidity from byte 3
			// According to the screenshot: RH[%] = (XX * 100) / 256
			keepaliveData.relativeHumidity = Number(((bytes[3] * 100) / 256).toFixed(2))

			// Device status information (byte 4)
			// Bit 7 indicates if IR code recording is requested (1) or not (0)
			keepaliveData.isIrCodeRecordingRequested = (bytes[4] & 0x80) !== 0

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
				const data = commandsReadingHelper(hexData, 10, DeviceType.MelissaLorawan) as Record<string, unknown> | undefined
				if (!data) return
				const shouldKeepAlive = Object.prototype.hasOwnProperty.call(data, 'decodeKeepalive')
				if ('decodeKeepalive' in data) {
					delete data.decodeKeepalive
				}

				Object.assign(deviceData, { ...deviceData }, { ...data })

				// get only keepalive from device response
				if (shouldKeepAlive) {
					const keepaliveData = hexData.slice(-10)
					const dataToPass = byteArrayParser(keepaliveData)
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

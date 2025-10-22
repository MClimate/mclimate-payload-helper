import { commandsReadingHelper } from '@/decoders/commandsReadingHelper'
import { DeviceType } from '@/decoders/payloadParsers/types'
import { byteArrayParser } from '@/helpers'
import { CustomError } from '@/utils'

type KeepaliveEvent = 'keepalive' | 'reed switch' | 'push button' | undefined

export const openCloseSensorPayloadParser = (hexData: string) => {
	const deviceData: Record<string, unknown> = {}

	try {
		// Calculate battery voltage from raw value
		const calculateBatteryVoltage = (byte: number): number => {
			return byte * 8 + 1600
		}

		// Calculate temperature from raw temperature value
		const calculateTemperature = (rawTemp: number): number => {
			return rawTemp / 10.0
		}

		const handleKeepalive = (bytes: number[]) => {
			// Byte 1: Device battery voltage
			const batteryVoltage = calculateBatteryVoltage(bytes[1]) / 1000
			const batteryVoltageFormatted = Number(batteryVoltage.toFixed(2))

			// Byte 2: Thermistor operational status and temperature data (bits 9:8)
			const thermistorConnected = (bytes[2] & 0x04) === 0 // Bit 2
			const temperatureHighBits = bytes[2] & 0x03 // Bits 1:0

			// Byte 3: Thermistor temperature data (bits 7:0)
			const temperatureLowBits = bytes[3]
			const temperatureRaw = (temperatureHighBits << 8) | temperatureLowBits
			const temperatureCelsius = calculateTemperature(temperatureRaw)
			const sensorTemperature = Number(temperatureCelsius.toFixed(2))

			// Byte 4-6: Counter data
			const counter = (bytes[4] << 16) | (bytes[5] << 8) | bytes[6]

			// Byte 7: Status and event code
			const status = bytes[7]
			const events: Record<string, KeepaliveEvent> = { '01': 'keepalive', '32': 'reed switch', '33': 'push button' }
			const eventKey = bytes[0].toString().padStart(2, '0')
			const event = events[eventKey]

			return {
				batteryVoltage: batteryVoltageFormatted,
				thermistorProperlyConnected: thermistorConnected,
				sensorTemperature,
				counter,
				status,
				event,
			}
		}

		// Handler for keepalive data that adapts the string input to the new function
		const handleKeepAliveData = (data: string) => {
			const hexArray = byteArrayParser(data)
			if (!hexArray) return

			const keepaliveData = handleKeepalive(hexArray)
			Object.assign(deviceData, { ...deviceData }, { ...keepaliveData })
		}

		if (hexData) {
			if (hexData.slice(0, 2) == '01' || hexData.slice(0, 2) == '20' || hexData.slice(0, 2) == '21') {
				// its a keeapalive
				handleKeepAliveData(hexData)
			} else {
				// parse command answers
				const data = commandsReadingHelper(hexData, 16, DeviceType.OpenCloseSensor) as Record<string, unknown> | undefined
				if (!data) return

				const shouldKeepAlive = Object.prototype.hasOwnProperty.call(data, 'decodeKeepalive')
				if ('decodeKeepalive' in data) {
					delete data.decodeKeepalive
				}

				Object.assign(deviceData, { ...deviceData }, { ...data })

				// get only keepalive from device response
				if (shouldKeepAlive) {
					const keepaliveData = hexData.slice(-16)
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

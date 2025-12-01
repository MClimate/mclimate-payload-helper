import { commandsReadingHelper } from '@/decoders'
import { CustomError } from '@/utils'
import { DeviceType } from '@/decoders/payloadParsers/types'
import { byteArrayParser } from '@/helpers'

// Multisensor payload parser (uplink). Structure mirrors other parsers in this folder.
export const multisensorPayloadParser = (hexData: string) => {
	const deviceData: Record<string, unknown> = {}

	try {
		if (!hexData) return

		const bytes = byteArrayParser(hexData)
		if (!bytes || !bytes.length) return

		const handleKeepAliveData = (barr: number[]) => {
			// Verify it's a keepalive message (command byte should be 0x82)
			if (barr[0] !== 0x82 && barr[0] !== 0x81) {
				throw new Error('Not a keepalive message')
			}
			// Byte 2, bit 0 and Byte 3: Average temperature
			// Formula: Average temperature, [°C] = [8:0] / 10
			// Extract bit 0 from byte 2 for the higher bit (bit 8)
			const avgTempHighBit = (barr[2] & 0x01) << 8
			// Use all bits from byte 3 for the lower bits (bits 7:0)
			const avgTempLowBits = barr[3]
			// Combine to get the full 9-bit temperature value
			const avgTempRaw = avgTempHighBit | avgTempLowBits
			const avgTempC = Number((avgTempRaw / 10).toFixed(1))

			// Calculate min and max temperature based on deltas
			let minTempC = null
			let maxTempC = null

			// Byte 1, bits 6:0: Delta temperature min in °C
			// Formula: ΔT min, [°C] = [6:0] / 10
			if ((barr[1] & 0x7f) !== 0xff) {
				// Check if field is used (not 0xFF)
				const deltaMin = Number(((barr[1] & 0x7f) / 10).toFixed(1))
				minTempC = Number((avgTempC - deltaMin).toFixed(1))
			}

			// Byte 2, bits 7:1: Delta temperature max in °C
			// Formula: ΔT max, [°C] = [7:1] / 10
			if (((barr[2] >> 1) & 0x7f) !== 0xff) {
				// Check if field is used (not 0xFF)
				const deltaMax = Number((((barr[2] >> 1) & 0x7f) / 10).toFixed(1))
				maxTempC = Number((avgTempC + deltaMax).toFixed(1))
			}

			// Byte 4: Relative Humidity data
			// Formula: RH[%] = XX
			const relativeHumidity = barr[4]

			// Byte 5: Pressure (Atmospheric)
			// Formula: Pressure (Atmospheric), [mb] = ((XX * 390) / 255) + 700
			const pressureMbar = Number(((barr[5] * 390) / 255 + 700).toFixed(2))

			// Byte 6: Static AQI
			// Formula: Static AQI = (XX * 500) / 255
			const staticAQI = Math.round((barr[6] * 500) / 255)

			// Byte 7: eCO2
			// Formula: eCO2, [ppm] = ((XX * 4600) / 255) + 400
			const eCO2ppm = Number(((barr[7] * 4600) / 255 + 400).toFixed(2))

			// Byte 8 & 9: bVOC data
			// Byte 8 contains bits [15:8] of bVOC data
			// Byte 9 contains bits [7:0] of bVOC data
			// Formula: bVOC, [ppb] = [15:0]
			const tvocRaw = (barr[8] << 8) | barr[9]

			// Byte 10: Light level
			// Formula: Light level, [Lux] = (XX * 1000) / 255
			const lightLux = Math.round((barr[10] * 1000) / 255)

			// Byte 11: Noise level, [dB]
			const noiseDb = barr[11]

			// Byte 12: PIR trigger count
			const pirTriggerCount = barr[12]

			// Byte 13: Battery Voltage
			// Formula: Battery Voltage, [mV] = ((XX * 2200) / 255) + 1600
			const deviceVoltageMv = Math.round((barr[13] * 2200) / 255 + 1600)
			const deviceVoltage = Number((deviceVoltageMv / 1000).toFixed(2))

			// Byte 14 - Bit positions for different flags and settings
			const byte14 = barr[14]

			// Bit 4: PIR sensor event flag
			const pir = ((byte14 >> 4) & 0x01) === 1

			// Bit 3: Hall sensor event flag
			const hallSensorEvent = ((byte14 >> 3) & 0x01) === 1

			// Bits 2:1: Static AQI accuracy
			const staticAQIAccuracy = (byte14 >> 1) & 0x03

			// Bit 0: Device power source (0 - Battery, 1 - External)
			const powerSourceStatus = byte14 & 0x01
			const keepaliveData = {
				averageTemperature: avgTempC,
				minTemperature: minTempC,
				maxTemperature: maxTempC,
				relativeHumidity,
				pressure: pressureMbar,
				staticAQI,
				eCO2: eCO2ppm,
				bVOC: tvocRaw,
				lightLevel: lightLux,
				noiseLevel: noiseDb,
				pirTriggerCount,
				batteryVoltage: deviceVoltage,
				pir,
				hallSensorEvent,
				staticAQIAccuracy,
				powerSourceStatus,
			}
			Object.assign(deviceData, { ...deviceData }, { ...keepaliveData })
		}

		if (hexData.slice(0, 2).toLowerCase() === '82' || hexData.slice(0, 2).toLowerCase() === '81') {
			// keep-alive packet
			handleKeepAliveData(bytes)
		} else {
			// parse command answers via helper
			const data = commandsReadingHelper(hexData, 30, DeviceType.MultiSensor) as Record<string, unknown> | undefined
			if (!data) return

			const shouldKeepAlive = Object.prototype.hasOwnProperty.call(data, 'decodeKeepalive')
			if ('decodeKeepalive' in data) {
				delete data.decodeKeepalive
			}

			Object.assign(deviceData, { ...deviceData }, { ...data })

			// If device response includes keepalive, decode last 15 bytes (30 hex chars)
			if (shouldKeepAlive) {
				const keepaliveHex = hexData.slice(-30)
				const keepaliveBytes = byteArrayParser(keepaliveHex)
				if (keepaliveBytes) handleKeepAliveData(keepaliveBytes)
			}
		}

		return deviceData
	} catch (e) {
		throw new CustomError({
			message: `Unhandled data`,
			hexData: hexData,
			deviceType: 'multisensor',
			originalError: e as Error,
		})
	}
}

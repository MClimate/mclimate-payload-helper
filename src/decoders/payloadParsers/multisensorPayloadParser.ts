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
			// Decode according to provided example indexing
			const b = (i: number, d = 0) => (typeof barr[i] === 'number' ? barr[i] : d)

			// Byte 1..14 mapping per example
			const deltaTMinC = b(1) / 10
			const deltaTMaxC = b(2) / 10
			const avgTempC = Number((b(3) / 10).toFixed(1))
			const relativeHumidity = b(4)
			// Pressure: matches example (A8 -> 956.94): scale = 390
			const pressureMbar = Number(((b(5) * 390) / 255 + 700).toFixed(2))
			const staticAQI = Number(((b(6) * 500) / 255).toFixed(2))
			// eCO2: matches example (06 -> 508.23): scale = 4600
			const eCO2ppm = Number(((b(7) * 4600) / 255 + 400).toFixed(2))
			const tvocRaw = ((b(8) & 0xff) << 8) | (b(9) & 0xff)
			const tvocPpbApprox = tvocRaw
			const lightLux = Math.round((b(10) * 1000) / 255)
			const noiseDb = b(11)
			const pirTriggerCount = b(12)
			const deviceVoltageMv = Math.round((b(13) * 2200) / 255 + 1600)
			const deviceVoltage = Number((deviceVoltageMv / 1000).toFixed(2))
			const powerSourceRaw = b(14)
			const powerSource = powerSourceRaw === 1 ? 'USB' : 'Battery'

			const keepaliveData = {
				deltaTMinC,
				deltaTMaxC,
				avgTempC,
				relativeHumidity,
				pressureMbar,
				staticAQI,
				eCO2ppm,
				tvocRaw,
				tvocPpbApprox,
				lightLux,
				noiseDb,
				pirTriggerCount,
				deviceVoltageMv,
				deviceVoltage,
				powerSourceRaw,
				powerSource,
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

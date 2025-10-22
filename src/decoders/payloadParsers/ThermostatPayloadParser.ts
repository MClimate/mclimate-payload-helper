import { byteArrayParser } from '@/helpers'
import { CustomError } from '@/utils'

export const ThermostatPayloadParser = (hexData: string) => {
	const deviceData: Record<string, unknown> = {}

	try {
		const handleKeepAliveData = (byteArray: number[]) => {
			const reason = byteArray[0]
			const currentTemp1 = byteArray[1]
			const currentTemp2 = byteArray[2]
			const currentTemperature = (currentTemp2 * 256 + currentTemp1) / 10

			const relayStatus = byteArray[2] === 1
			const desiredTemp1 = byteArray[4]
			const desiredTemp2 = byteArray[5]
			const targetTemperature = (desiredTemp2 * 256 + desiredTemp1) / 10

			const batteryStatus = byteArray[6] // in %

			const keepaliveData = {
				reason,
				target_temperature: targetTemperature,
				temperature: currentTemperature,
				relay_status: relayStatus,
				battery_status: batteryStatus,
			}
			Object.assign(deviceData, { ...deviceData }, { ...keepaliveData })
		}

		const handleFirstData = (byteArray: number[]) => {
			const reason = byteArray[0]
			const loraPeriod = byteArray[1] // in minutes
			const tempSpan = byteArray[2] // divide by 10 (/10) for final value
			const tempSampling = byteArray[3] // in minutes
			const desiredTemp1 = byteArray[4]
			const desiredTemp2 = byteArray[5]
			const targetTemperature = desiredTemp2 > 0 ? (desiredTemp1 + 256) / 10 : desiredTemp1 / 10
			const batteryStatus = byteArray[6] // in %

			const keepaliveData = {
				reason,
				temp_span: tempSpan,
				temp_sampling: tempSampling,
				target_temperature: targetTemperature,
				battery_status: batteryStatus,
				keepAliveTime: loraPeriod,
			}
			Object.assign(deviceData, { ...deviceData }, { ...keepaliveData })
		}
		if (hexData) {
			const byteArray = byteArrayParser(hexData)
			if (!byteArray) return

			if (byteArray[0] == 0 || byteArray[0] == 1) {
				handleKeepAliveData(byteArray)
			} else if (byteArray[0] == 255) {
				handleFirstData(byteArray)
			}
			return deviceData
		}
	} catch (e) {
		throw new CustomError({
			message: `Unhandled data`,
			hexData: hexData,
			deviceType: 'lote_thermostat',
			originalError: e as Error,
		})
	}
}

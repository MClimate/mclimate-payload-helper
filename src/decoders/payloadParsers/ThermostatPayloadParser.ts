import { byteArrayParser } from '@/helpers'
import { CustomError } from '@/utils'

export const ThermostatPayloadParser = (hexData: string) => {
	let deviceData = {}

	try {
		const handleKeepAliveData = (byteArray: number[]) => {
			let reason = byteArray[0]
			let current_temperature

			let current_temp_1 = byteArray[1]
			let current_temp_2 = byteArray[2]

			current_temperature = (current_temp_2 * 256 + current_temp_1) / 10

			let relay_status = byteArray[2] == 1 ? true : false
			let desired_temp_1 = byteArray[4]
			let desired_temp_2 = byteArray[5]
			let target_temperature

			target_temperature = (desired_temp_2 * 256 + desired_temp_1) / 10

			let battery_status = byteArray[6] // in %

			let keepaliveData = {
				reason: reason,
				target_temperature: target_temperature,
				temperature: current_temperature,
				relay_status: relay_status,
				battery_status: battery_status,
			}
			Object.assign(deviceData, { ...deviceData }, { ...keepaliveData })
		}

		const handleFirstData = (byteArray: number[]) => {
			let reason = byteArray[0]
			let lora_period = byteArray[1] // in minutes
			let temp_span = byteArray[2] // if you want to get the final data for temp span (0,5; 1; etc) just divide by 10 (/10)
			let temp_sampling = byteArray[3] // in minutes
			let desired_temp_1 = byteArray[4]
			let desired_temp_2 = byteArray[5]
			let target_temperature
			if (desired_temp_2 > 0) {
				target_temperature = (desired_temp_1 + 256) / 10 //using the 2 bytes to get the target temperature
			} else {
				target_temperature = desired_temp_1 / 10
			}
			let battery_status = byteArray[6] // in %

			let keepaliveData = {
				reason: reason,
				temp_span: temp_span,
				temp_sampling: temp_sampling,
				target_temperature: target_temperature,
				battery_status: battery_status,
				keepAliveTime: lora_period,
			}
			Object.assign(deviceData, { ...deviceData }, { ...keepaliveData })
		}
		if (hexData) {
			let byteArray = byteArrayParser(hexData)
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

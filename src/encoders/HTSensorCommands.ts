import { BaseCommand } from '@/encoders/BaseCommand'
import { GeneralCommands } from '@/encoders/GeneralCommands'
import { HTSensorCommandTypes, DeviceCommandSchemas } from '@/encoders/types'
import { decToHex, CustomError } from '@/utils'
import { ZodError } from 'zod'

export class HTSensorCommands extends GeneralCommands {
	static setTemperatureCompensation(params: HTSensorCommandTypes.SetTemperatureCompensationParams) {
		try {
			DeviceCommandSchemas.HTSensorCommandSchemas.setTemperatureCompensation.parse(params)
			const { negativeCompensation, compensation } = params
			return new BaseCommand(
				'SetTemperatureCompensation',
				0x31,
				negativeCompensation ? '01' : '00',
				decToHex(compensation * 10),
			)
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetTemperatureCompensation execution',
					command: 'SetTemperatureCompensation',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetTemperatureCompensation execution',
					command: 'SetTemperatureCompensation',
					originalError: e as Error,
				})
			}
		}
	}

	static getTemperatureCompensation() {
		return new BaseCommand('GetTemperatureCompensation', 0x32)
	}

	static setHumidityCompensation(params: HTSensorCommandTypes.SetHumidityCompensationParams) {
		try {
			DeviceCommandSchemas.HTSensorCommandSchemas.setHumidityCompensation.parse(params)
			const { negativeCompensation, compensation } = params
			return new BaseCommand('SetHumidityCompensation', 0x33, negativeCompensation ? '01' : '00', decToHex(compensation))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetHumidityCompensation execution',
					command: 'SetHumidityCompensation',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetHumidityCompensation execution',
					command: 'SetHumidityCompensation',
					originalError: e as Error,
				})
			}
		}
	}

	static getHumidityCompensation() {
		return new BaseCommand('GetHumidityCompensation', 0x34)
	}
}

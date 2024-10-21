import { BaseCommand, GeneralCommands } from '@/encoders'
import { ZodError } from 'zod'
import { CustomError, dec2hex, decToHex } from '@/utils'
import { TringThermostatCommandTypes, DeviceCommandSchemas } from '@/encoders/types'

export class TringThermostatCommands extends GeneralCommands {
	static setThermostatTarget(params: TringThermostatCommandTypes.SetThermostatTargetParams) {
		try {
			DeviceCommandSchemas.TringThermostatCommandSchemas.setThermostatTarget.parse(params)
			const { target } = params
			const temp2 = `${dec2hex(target * 10).substr(0, 2)}`
			const temp1 = `${dec2hex(target * 10).substr(2, 2)}`
			return new BaseCommand('SetThermostatTarget', 0x01, decToHex(0), decToHex(0), decToHex(0), temp1, temp2)
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetThermostatTarget execution',
					command: 'SetThermostatTarget',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetThermostatTarget execution',
					command: 'SetThermostatTarget',
					originalError: e as Error,
				})
			}
		}
	}

	static setThermostatConfig(params: TringThermostatCommandTypes.SetThermostatConfigParams) {
		try {
			DeviceCommandSchemas.TringThermostatCommandSchemas.setThermostatConfig.parse(params)
			const { time, temp_span, temp_sampling, target } = params
			const temp2 = `${dec2hex(target * 10).substr(0, 2)}`
			const temp1 = `${dec2hex(target * 10).substr(2, 2)}`
			return new BaseCommand(
				'SetThermostatConfig',
				0x02,
				decToHex(time),
				decToHex(temp_span),
				decToHex(temp_sampling),
				temp1,
				temp2,
			)
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetThermostatConfig execution',
					command: 'SetThermostatConfig',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetThermostatConfig execution',
					command: 'SetThermostatConfig',
					originalError: e as Error,
				})
			}
		}
	}

	static setKeepAlive(params: TringThermostatCommandTypes.SetKeepAliveParams) {
		try {
			DeviceCommandSchemas.TringThermostatCommandSchemas.setKeepAlive.parse(params)
			const { time } = params
			return new BaseCommand('SetKeepAlive', 0x02, decToHex(time), decToHex(0), decToHex(0), decToHex(0), decToHex(0))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetKeepAlive execution',
					command: 'SetKeepAlive',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetKeepAlive execution',
					command: 'SetKeepAlive',
					originalError: e as Error,
				})
			}
		}
	}
}

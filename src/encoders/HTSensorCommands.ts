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

	static setD2dCommunicationState(params: HTSensorCommandTypes.SetD2dCommunicationStateParams) {
		try {
			DeviceCommandSchemas.HTSensorCommandSchemas.setD2dCommunicationState.parse(params)
			return new BaseCommand('SetD2dCommunicationState', 0xa9, params.enabled ? '01' : '00')
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetD2dCommunicationState execution',
					command: 'SetD2dCommunicationState',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetD2dCommunicationState execution',
					command: 'SetD2dCommunicationState',
					originalError: e as Error,
				})
			}
		}
	}

	static getD2dCommunicationState() {
		return new BaseCommand('GetD2dCommunicationState', 0xaa)
	}

	static setD2dCommunicationPeriod(params: HTSensorCommandTypes.SetD2dCommunicationPeriodParams) {
		try {
			DeviceCommandSchemas.HTSensorCommandSchemas.setD2dCommunicationPeriod.parse(params)
			return new BaseCommand('SetD2dCommunicationPeriod', 0xab, decToHex(params.period))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetD2dCommunicationPeriod execution',
					command: 'SetD2dCommunicationPeriod',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetD2dCommunicationPeriod execution',
					command: 'SetD2dCommunicationPeriod',
					originalError: e as Error,
				})
			}
		}
	}

	static getD2dCommunicationPeriod() {
		return new BaseCommand('GetD2dCommunicationPeriod', 0xac)
	}
}

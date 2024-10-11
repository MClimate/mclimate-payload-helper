import { ZodError } from 'zod'
import {
	BaseCommand,
	ChildLockCommands,
	Co2DisplayCommonCommands,
	CO2SensorCommands,
	DisplayCommands,
	GeneralCommands,
	PIRCommands,
} from '@/encoders'
import { applyMixins, CustomError, decToHex } from '@/utils'
import { DeviceCommandSchemas, CO2DisplayCommandTypes } from '@/encoders/types'

export class CO2DisplayCommands extends GeneralCommands {
	static setCo2MeasurementBlindTime(params: CO2DisplayCommandTypes.SetCo2MeasurementBlindTimeParams) {
		try {
			DeviceCommandSchemas.CO2DisplayCommandSchemas.setCo2MeasurementBlindTime.parse(params)
			const { time } = params
			return new BaseCommand('SetCo2MeasurementBlindTime', 0x81, decToHex(time))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetCo2MeasurementBlindTime execution',
					command: 'SetCo2MeasurementBlindTime',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetCo2MeasurementBlindTime execution',
					command: 'SetCo2MeasurementBlindTime',
					originalError: e as Error,
				})
			}
		}
	}

	static getCo2MeasurementBlindTime() {
		return new BaseCommand('GetCo2MeasurementBlindTime', 0x80)
	}
}

applyMixins(CO2DisplayCommands, [
	CO2SensorCommands,
	DisplayCommands,
	Co2DisplayCommonCommands,
	PIRCommands,
	ChildLockCommands,
])

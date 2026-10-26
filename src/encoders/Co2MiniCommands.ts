import { GeneralCommands } from '@/encoders'
import { applyMixins, delMethods } from '@/utils'
import { CO2MiniCommandTypes, DeviceCommandSchemas } from '@/encoders/types'
import { BaseCommand } from '@/encoders'
import { ZodError } from 'zod'
import { CustomError } from '@/utils'
import { dec2hex, decToHex } from '@/utils'

// Not a CO2SensorCommands mixin: CO2 Mini shares the command names but uses different IDs
// (boundary levels 0x26/0x27, auto-zero value 0x28/0x29, LED brightness 0x21/0x22).
export class CO2MiniCommands extends GeneralCommands {
	static setLedBrightness(params: CO2MiniCommandTypes.SetLedBrightnessParams) {
		try {
			DeviceCommandSchemas.CO2MiniCommandSchemas.setLedBrightness.parse(params)
			const { value } = params
			return new BaseCommand('SetLedBrightness', 0x21, decToHex(value))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetLedBrightness execution',
					command: 'SetLedBrightness',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetLedBrightness execution',
					command: 'SetLedBrightness',
					originalError: e as Error,
				})
			}
		}
	}

	static getLedBrightness() {
		return new BaseCommand('GetLedBrightness', 0x22)
	}

	static setCo2MeasurementPeriod(params: CO2MiniCommandTypes.SetCo2MeasurementPeriodParams) {
		try {
			DeviceCommandSchemas.CO2MiniCommandSchemas.setCo2MeasurementPeriod.parse(params)
			const { good_zone, medium_zone, bad_zone } = params
			return new BaseCommand(
				'SetCo2MeasurementPeriod',
				0x24,
				decToHex(good_zone),
				decToHex(medium_zone),
				decToHex(bad_zone),
			)
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetCo2MeasurementPeriod execution',
					command: 'SetCo2MeasurementPeriod',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetCo2MeasurementPeriod execution',
					command: 'SetCo2MeasurementPeriod',
					originalError: e as Error,
				})
			}
		}
	}

	static getCo2MeasurementPeriod() {
		return new BaseCommand('GetCo2MeasurementPeriod', 0x25)
	}

	static setCo2BoundaryLevels(params: CO2MiniCommandTypes.SetCo2BoundaryLevelsParams) {
		try {
			DeviceCommandSchemas.CO2MiniCommandSchemas.setCo2BoundaryLevels.parse(params)
			const { good_medium, medium_bad } = params
			return new BaseCommand('SetCo2BoundaryLevels', 0x26, dec2hex(good_medium), dec2hex(medium_bad))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetCo2BoundaryLevels execution',
					command: 'SetCo2BoundaryLevels',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetCo2BoundaryLevels execution',
					command: 'SetCo2BoundaryLevels',
					originalError: e as Error,
				})
			}
		}
	}

	static getCo2BoundaryLevels() {
		return new BaseCommand('GetCo2BoundaryLevels', 0x27)
	}

	static setCo2AutoZeroValue(params: CO2MiniCommandTypes.SetCo2AutoZeroValueParams) {
		try {
			DeviceCommandSchemas.CO2MiniCommandSchemas.setCo2AutoZeroValue.parse(params)
			const { ppm } = params
			return new BaseCommand('SetCo2AutoZeroValue', 0x28, dec2hex(ppm))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetCo2AutoZeroValue execution',
					command: 'SetCo2AutoZeroValue',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetCo2AutoZeroValue execution',
					command: 'SetCo2AutoZeroValue',
					originalError: e as Error,
				})
			}
		}
	}

	static getCo2AutoZeroValue() {
		return new BaseCommand('GetCo2AutoZeroValue', 0x29)
	}

	static setCo2AutoZeroPeriod(params: CO2MiniCommandTypes.SetCo2AutoZeroPeriodParams) {
		try {
			DeviceCommandSchemas.CO2MiniCommandSchemas.setCo2AutoZeroPeriod.parse(params)
			const { hours } = params
			return new BaseCommand('SetCo2AutoZeroPeriod', 0x2a, decToHex(hours))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetCo2AutoZeroPeriod execution',
					command: 'SetCo2AutoZeroPeriod',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetCo2AutoZeroPeriod execution',
					command: 'SetCo2AutoZeroPeriod',
					originalError: e as Error,
				})
			}
		}
	}

	static getCo2AutoZeroPeriod() {
		return new BaseCommand('GetCo2AutoZeroPeriod', 0x2b)
	}

	static restartDevice() {
		return new BaseCommand('RestartDevice', 0xa5)
	}
}

applyMixins(CO2MiniCommands, [GeneralCommands])

delMethods(CO2MiniCommands, [])

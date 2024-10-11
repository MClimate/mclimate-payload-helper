import { BaseCommand, GeneralCommands } from '@/encoders'
import { ZodError } from 'zod'
import { CustomError, dec2hex, decToHex } from '@/utils'
import { DeviceCommandSchemas, CO2SensorCommandTypes } from '@/encoders/types'

export class CO2SensorCommands extends GeneralCommands {
	static setCo2BoundaryLevels(params: CO2SensorCommandTypes.SetCo2BoundaryLevelsParams) {
		try {
			DeviceCommandSchemas.CO2SensorCommandSchemas.setCo2BoundaryLevels.parse(params)
			const { good_medium, medium_bad } = params
			return new BaseCommand('SetCo2BoundaryLevels', 0x1e, decToHex(good_medium), decToHex(medium_bad))
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
		return new BaseCommand('GetCo2BoundaryLevels', 0x1f)
	}

	static setCo2AutoZeroValue(params: CO2SensorCommandTypes.SetCo2AutoZeroValueParams) {
		try {
			DeviceCommandSchemas.CO2SensorCommandSchemas.setCo2AutoZeroValue.parse(params)
			const { ppm } = params
			return new BaseCommand('SetCo2AutoZeroValue', 0x20, decToHex(ppm))
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
		return new BaseCommand('GetCo2AutoZeroValue', 0x21)
	}

	static setNotifyPeriod(params: CO2SensorCommandTypes.SetNotifyPeriodParams) {
		try {
			DeviceCommandSchemas.CO2SensorCommandSchemas.setNotifyPeriod.parse(params)
			const { good_zone, medium_zone, bad_zone } = params
			return new BaseCommand('SetNotifyPeriod', 0x22, decToHex(good_zone), decToHex(medium_zone), decToHex(bad_zone))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetNotifyPeriod execution',
					command: 'SetNotifyPeriod',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetNotifyPeriod execution',
					command: 'SetNotifyPeriod',
					originalError: e as Error,
				})
			}
		}
	}

	static getNotifyPeriod() {
		return new BaseCommand('GetNotifyPeriod', 0x23)
	}

	static setCo2MeasurementPeriod(params: CO2SensorCommandTypes.SetCo2MeasurementPeriodParams) {
		try {
			DeviceCommandSchemas.CO2SensorCommandSchemas.setCo2MeasurementPeriod.parse(params)
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

	static setBuzzerNotification(params: CO2SensorCommandTypes.SetBuzzerNotificationParams) {
		try {
			DeviceCommandSchemas.CO2SensorCommandSchemas.setBuzzerNotification.parse(params)
			const {
				duration_good_beeping,
				duration_good_loud,
				duration_good_silent,
				duration_medium_beeping,
				duration_medium_loud,
				duration_medium_silent,
				duration_bad_beeping,
				duration_bad_loud,
				duration_bad_silent,
			} = params
			return new BaseCommand(
				'SetBuzzerNotification',
				0x26,
				decToHex(duration_good_beeping),
				decToHex(duration_good_loud / 10),
				decToHex(duration_good_silent / 10),
				decToHex(duration_medium_beeping),
				decToHex(duration_medium_loud / 10),
				decToHex(duration_medium_silent / 10),
				decToHex(duration_bad_beeping),
				decToHex(duration_bad_loud / 10),
				decToHex(duration_bad_silent / 10),
			)
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetBuzzerNotification execution',
					command: 'SetBuzzerNotification',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetBuzzerNotification execution',
					command: 'SetBuzzerNotification',
					originalError: e as Error,
				})
			}
		}
	}

	static getBuzzerNotification() {
		return new BaseCommand('GetBuzzerNotification', 0x27)
	}

	static setCo2Led(params: CO2SensorCommandTypes.SetCo2LedParams) {
		try {
			DeviceCommandSchemas.CO2SensorCommandSchemas.setCo2Led.parse(params)
			const {
				red_good,
				green_good,
				blue_good,
				duration_good,
				red_medium,
				green_medium,
				blue_medium,
				duration_medium,
				red_bad,
				green_bad,
				blue_bad,
				duration_bad,
			} = params
			return new BaseCommand(
				'SetCo2Led',
				0x28,
				decToHex(red_good),
				decToHex(green_good),
				decToHex(blue_good),
				dec2hex(duration_good / 10),
				decToHex(red_medium),
				decToHex(green_medium),
				decToHex(blue_medium),
				dec2hex(duration_medium / 10),
				decToHex(red_bad),
				decToHex(green_bad),
				decToHex(blue_bad),
				dec2hex(duration_bad / 10),
			)
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetCo2Led execution',
					command: 'SetCo2Led',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetCo2Led execution',
					command: 'SetCo2Led',
					originalError: e as Error,
				})
			}
		}
	}

	static getCo2Led() {
		return new BaseCommand('GetCo2Led', 0x29)
	}

	static setCo2AutoZeroPeriod(params: CO2SensorCommandTypes.SetCo2AutoZeroPeriodParams) {
		try {
			DeviceCommandSchemas.CO2SensorCommandSchemas.setCo2AutoZeroPeriod.parse(params)
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
}

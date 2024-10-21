import { BaseCommand } from '@/encoders'
import { ZodError } from 'zod'
import { CustomError, decToHex } from '@/utils'
import { DeviceCommandSchemas, DisplayCommandTypes } from '@/encoders/types'

export class DisplayCommands {
	static setDisplayRefreshPeriod(params: DisplayCommandTypes.SetDisplayRefreshPeriodParams) {
		try {
			DeviceCommandSchemas.DisplayCommandSchemas.setDisplayRefreshPeriod.parse(params)
			const { period } = params
			return new BaseCommand('SetDisplayRefreshPeriod', 0x33, decToHex(period))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetDisplayRefreshPeriod execution',
					command: 'SetDisplayRefreshPeriod',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetDisplayRefreshPeriod execution',
					command: 'SetDisplayRefreshPeriod',
					originalError: e as Error,
				})
			}
		}
	}

	static getDisplayRefreshPeriod() {
		return new BaseCommand('GetDisplayRefreshPeriod', 0x34)
	}

	static setDeepSleepMode(params: DisplayCommandTypes.SetDeepSleepModeParams) {
		try {
			DeviceCommandSchemas.DisplayCommandSchemas.setDeepSleepMode.parse(params)
			const { state } = params
			return new BaseCommand('SetDeepSleepMode', 0x3b, decToHex(state))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetDeepSleepMode execution',
					command: 'SetDeepSleepMode',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetDeepSleepMode execution',
					command: 'SetDeepSleepMode',
					originalError: e as Error,
				})
			}
		}
	}

	static setHumidityVisibility(params: DisplayCommandTypes.SetHumidityVisibilityParams) {
		try {
			DeviceCommandSchemas.DisplayCommandSchemas.setHumidityVisibility.parse(params)
			const { state } = params
			return new BaseCommand('SetHumidityVisibility', 0x42, decToHex(state))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetHumidityVisibility execution',
					command: 'SetHumidityVisibility',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetHumidityVisibility execution',
					command: 'SetHumidityVisibility',
					originalError: e as Error,
				})
			}
		}
	}

	static getHumidityVisibility() {
		return new BaseCommand('GetHumidityVisibility', 0x43)
	}

	static setLightIntensityVisibility(params: DisplayCommandTypes.SetLightIntensityVisibilityParams) {
		try {
			DeviceCommandSchemas.DisplayCommandSchemas.setLightIntensityVisibility.parse(params)
			const { state } = params
			return new BaseCommand('SetLightIntensityVisibility', 0x44, decToHex(state))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetLightIntensityVisibility execution',
					command: 'SetLightIntensityVisibility',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetLightIntensityVisibility execution',
					command: 'SetLightIntensityVisibility',
					originalError: e as Error,
				})
			}
		}
	}

	static getLightIntensityVisibility() {
		return new BaseCommand('GetLightIntensityVisibility', 0x45)
	}

	static setCurrentTemperatureVisibility(params: DisplayCommandTypes.SetCurrentTemperatureVisibilityParams) {
		try {
			DeviceCommandSchemas.DisplayCommandSchemas.setCurrentTemperatureVisibility.parse(params)
			const { state } = params
			return new BaseCommand('SetCurrentTemperatureVisibility', 0x40, decToHex(state))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetCurrentTemperatureVisibility execution',
					command: 'SetCurrentTemperatureVisibility',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetCurrentTemperatureVisibility execution',
					command: 'SetCurrentTemperatureVisibility',
					originalError: e as Error,
				})
			}
		}
	}

	static getCurrentTemperatureVisibility() {
		return new BaseCommand('GetCurrentTemperatureVisibility', 0x41)
	}
}

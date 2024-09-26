import { BaseCommand } from '@/encoders'
import { decToHex, dec2hex, CustomError } from '@/utils'
import { ZodError } from 'zod'

// types and schemas
import {
	CustomHexCommandParams,
	SetKeepAliveParams,
	SetChildLockParams,
	SetTemperatureRangeParams,
	SetJoinRetryPeriodParams,
	SetUplinkTypeParams,
	SetWatchDogParams,
	SetDisplayRefreshPeriodParams,
	SetDeepSleepModeParams,
	SetPIRSensorStatusParams,
	SetPIRSensorSensitivityParams,
	SetCurrentTemperatureVisibilityParams,
	SetHumidityVisibilityParams,
	SetLightIntensityVisibilityParams,
	SetCo2ImagesVisibilityParams,
	SetPIRPeriodParams,
	customHexCommandSchema,
	setKeepAliveSchema,
	setChildLockSchema,
	setJoinRetryPeriodSchema,
	setTemperatureRangeSchema,
	setUplinkTypeSchema,
	setWatchDogParamsSchema,
	setDisplayRefreshPeriodSchema,
	setDeepSleepModeSchema,
	setPIRSensorStatusSchema,
	setPIRSensorSensitivitySchema,
	setCurrentTemperatureVisibilitySchema,
	setHumidityVisibilitySchema,
	setLightIntensityVisibilitySchema,
	setCo2ImagesVisibilitySchema,
	setPIRPeriodSchema,
} from '@/encoders/types'

export class GeneralCommands {
	static sendCustomHexCommand({ command }: CustomHexCommandParams) {
		try {
			customHexCommandSchema.parse({ command })
			return new BaseCommand('SendCustomHexCommand', command)
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SendCustomHexCommand execution',
					command: 'SendCustomHexCommand',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SendCustomHexCommand execution',
					command: 'SendCustomHexCommand',
					originalError: e as Error,
				})
			}
		}
	}

	static setKeepAlive({ time }: SetKeepAliveParams) {
		try {
			setKeepAliveSchema.parse({ time })
			return new BaseCommand('SetKeepAlive', 0x02, decToHex(time))
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

	static getKeepAlive() {
		return new BaseCommand('GetKeepAlive', 0x12)
	}

	static getDeviceVersion() {
		return new BaseCommand('GetDeviceVersion', 0x04)
	}

	static setChildLock({ enabled }: SetChildLockParams) {
		try {
			setChildLockSchema.parse({ enabled })
			const enabledValue = enabled ? 1 : 0
			return new BaseCommand('SetChildLock', 0x07, decToHex(enabledValue))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetChildLock execution',
					command: 'SetChildLock',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetChildLock execution',
					command: 'SetChildLock',
					originalError: e as Error,
				})
			}
		}
	}

	static getChildLock() {
		return new BaseCommand('GetChildLock', 0x14)
	}

	static setTemperatureRange({ min, max }: SetTemperatureRangeParams) {
		try {
			setTemperatureRangeSchema.parse({ min, max })
			return new BaseCommand('SetTemperatureRange', 0x08, decToHex(min), decToHex(max))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetTemperatureRange execution',
					command: 'SetTemperatureRange',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetTemperatureRange execution',
					command: 'SetTemperatureRange',
					originalError: e as Error,
				})
			}
		}
	}

	static getTemperatureRange() {
		return new BaseCommand('GetTemperatureRange', 0x15)
	}

	static setJoinRetryPeriod({ period }: SetJoinRetryPeriodParams) {
		try {
			setJoinRetryPeriodSchema.parse({ period })
			const periodToPass = (period * 60) / 5
			return new BaseCommand('SetJoinRetryPeriod', 0x10, decToHex(periodToPass))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetJoinRetryPeriod execution',
					command: 'SetJoinRetryPeriod',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetJoinRetryPeriod execution',
					command: 'SetJoinRetryPeriod',
					originalError: e as Error,
				})
			}
		}
	}

	static getJoinRetryPeriod() {
		return new BaseCommand('GetJoinRetryPeriod', 0x19)
	}

	static setUplinkType({ type }: SetUplinkTypeParams) {
		try {
			setUplinkTypeSchema.parse({ type })
			return new BaseCommand('SetUplinkType', 0x11, type.toString())
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetUplinkType execution',
					command: 'SetUplinkType',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetUplinkType execution',
					command: 'SetUplinkType',
					originalError: e as Error,
				})
			}
		}
	}

	static getUplinkType() {
		return new BaseCommand('GetUplinkType', 0x1b)
	}

	static setWatchDogParams({ confirmedUplinks, unconfirmedUplinks }: SetWatchDogParams) {
		try {
			setWatchDogParamsSchema.parse({ confirmedUplinks, unconfirmedUplinks })
			return new BaseCommand('SetWatchDogParams', 0x1c, decToHex(confirmedUplinks), decToHex(unconfirmedUplinks))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetWatchDogParams execution',
					command: 'SetWatchDogParams',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetWatchDogParams execution',
					command: 'SetWatchDogParams',
					originalError: e as Error,
				})
			}
		}
	}

	static getWatchDogParams() {
		return new BaseCommand('GetWatchDogParams', 0x1d)
	}

	static setDisplayRefreshPeriod({ period }: SetDisplayRefreshPeriodParams) {
		try {
			setDisplayRefreshPeriodSchema.parse({ period })
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

	static setDeepSleepMode({ state }: SetDeepSleepModeParams) {
		try {
			setDeepSleepModeSchema.parse({ state })
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

	static setPIRSensorStatus({ state }: SetPIRSensorStatusParams) {
		try {
			setPIRSensorStatusSchema.parse({ state })
			return new BaseCommand('SetPIRSensorStatus', 0x3c, decToHex(state))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetPIRSensorStatus execution',
					command: 'SetPIRSensorStatus',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetPIRSensorStatus execution',
					command: 'SetPIRSensorStatus',
					originalError: e as Error,
				})
			}
		}
	}

	static getPIRSensorStatus() {
		return new BaseCommand('GetPIRSensorStatus', 0x3d)
	}

	static setPIRSensorSensitivity({ sensitivity }: SetPIRSensorSensitivityParams) {
		try {
			setPIRSensorSensitivitySchema.parse({ sensitivity })
			return new BaseCommand('SetPIRSensorSensitivity', 0x3e, decToHex(sensitivity))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetPIRSensorSensitivity execution',
					command: 'SetPIRSensorSensitivity',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetPIRSensorSensitivity execution',
					command: 'SetPIRSensorSensitivity',
					originalError: e as Error,
				})
			}
		}
	}

	static getPIRSensorSensitivity() {
		return new BaseCommand('GetPIRSensorSensitivity', 0x3f)
	}

	static setCurrentTemperatureVisibility({ state }: SetCurrentTemperatureVisibilityParams) {
		try {
			setCurrentTemperatureVisibilitySchema.parse({ state })
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

	static setHumidityVisibility({ state }: SetHumidityVisibilityParams) {
		try {
			setHumidityVisibilitySchema.parse({ state })
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

	static setLightIntensityVisibility({ state }: SetLightIntensityVisibilityParams) {
		try {
			setLightIntensityVisibilitySchema.parse({ state })
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

	static setCo2ImagesVisibility({ chart, digital_value, emoji }: SetCo2ImagesVisibilityParams) {
		try {
			setCo2ImagesVisibilitySchema.parse({ chart, digital_value, emoji })
			const chartValue = chart ? 1 : 0
			const digitalValue = digital_value ? 1 : 0
			const emojiValue = emoji ? 1 : 0
			let bin = '00000000'.split('')
			bin[7] = emojiValue.toString()
			bin[6] = digitalValue.toString()
			bin[5] = chartValue.toString()
			const binValue = parseInt(bin.join(''), 2)
			return new BaseCommand('SetCo2ImagesVisibility', 0x82, decToHex(binValue))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetCo2ImagesVisibility execution',
					command: 'SetCo2ImagesVisibility',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetCo2ImagesVisibility execution',
					command: 'SetCo2ImagesVisibility',
					originalError: e as Error,
				})
			}
		}
	}

	static getCo2ImagesVisibility() {
		return new BaseCommand('GetCo2ImagesVisibility', 0x83)
	}

	static setPIRInitPeriod({ time }: SetPIRPeriodParams) {
		try {
			setPIRPeriodSchema.parse({ time })
			return new BaseCommand('SetPIRInitPeriod', 0x46, decToHex(time))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetPIRInitPeriod execution',
					command: 'SetPIRInitPeriod',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetPIRInitPeriod execution',
					command: 'SetPIRInitPeriod',
					originalError: e as Error,
				})
			}
		}
	}

	static getPIRInitPeriod() {
		return new BaseCommand('GetPIRInitPeriod', 0x47)
	}

	static setPIRMeasurementPeriod({ time }: SetPIRPeriodParams) {
		try {
			setPIRPeriodSchema.parse({ time })
			return new BaseCommand('SetPIRMeasurementPeriod', 0x48, decToHex(time))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetPIRMeasurementPeriod execution',
					command: 'SetPIRMeasurementPeriod',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetPIRMeasurementPeriod execution',
					command: 'SetPIRMeasurementPeriod',
					originalError: e as Error,
				})
			}
		}
	}

	static getPIRMeasurementPeriod() {
		return new BaseCommand('GetPIRMeasurementPeriod', 0x49)
	}

	static setPIRCheckPeriod({ time }: SetPIRPeriodParams) {
		try {
			setPIRPeriodSchema.parse({ time })
			return new BaseCommand('SetPIRCheckPeriod', 0x4a, dec2hex(time))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetPIRCheckPeriod execution',
					command: 'SetPIRCheckPeriod',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetPIRCheckPeriod execution',
					command: 'SetPIRCheckPeriod',
					originalError: e as Error,
				})
			}
		}
	}

	static getPIRCheckPeriod() {
		return new BaseCommand('GetPIRCheckPeriod', 0x4b)
	}

	static setPIRBlindPeriod({ time }: SetPIRPeriodParams) {
		try {
			setPIRPeriodSchema.parse({ time })
			return new BaseCommand('SetPIRBlindPeriod', 0x4c, dec2hex(time))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetPIRBlindPeriod execution',
					command: 'SetPIRBlindPeriod',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetPIRBlindPeriod execution',
					command: 'SetPIRBlindPeriod',
					originalError: e as Error,
				})
			}
		}
	}

	static getPIRBlindPeriod() {
		return new BaseCommand('GetPIRBlindPeriod', 0x4d)
	}
}

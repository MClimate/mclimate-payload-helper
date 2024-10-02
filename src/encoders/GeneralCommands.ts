import { BaseCommand } from '@/encoders'
import { ZodError } from 'zod'
import { CustomError, decToHex, dec2hex } from '@/utils'
import { GeneralCommandTypes, DeviceCommandSchemas } from '@/encoders/types'

export class GeneralCommands {
	static sendCustomHexCommand(params: GeneralCommandTypes.CustomHexCommandParams) {
		try {
			DeviceCommandSchemas.GeneralCommandSchemas.customHexCommand.parse(params)
			// TODO: fix below - to string?
			return new BaseCommand('SendCustomHexCommand', params.command)
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

	static setKeepAlive(params: GeneralCommandTypes.SetKeepAliveParams) {
		try {
			DeviceCommandSchemas.GeneralCommandSchemas.setKeepAlive.parse(params)
			const { time } = params
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

	static setChildLock(params: GeneralCommandTypes.SetChildLockParams) {
		try {
			DeviceCommandSchemas.GeneralCommandSchemas.setChildLock.parse(params)
			const enabledValue = params.enabled ? 1 : 0
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

	static setTemperatureRange(params: GeneralCommandTypes.SetTemperatureRangeParams) {
		try {
			DeviceCommandSchemas.GeneralCommandSchemas.setTemperatureRange.parse(params)
			const { min, max } = params
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
	static setJoinRetryPeriod(params: GeneralCommandTypes.SetJoinRetryPeriodParams) {
		try {
			DeviceCommandSchemas.GeneralCommandSchemas.setJoinRetryPeriod.parse(params)
			const { period } = params
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

	static setUplinkType(params: GeneralCommandTypes.SetUplinkTypeParams) {
		try {
			DeviceCommandSchemas.GeneralCommandSchemas.setUplinkType.parse(params)
			const { type } = params
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

	static setWatchDogParams(params: GeneralCommandTypes.SetWatchDogParams) {
		try {
			DeviceCommandSchemas.GeneralCommandSchemas.setWatchDogParams.parse(params)
			const { confirmedUplinks, unconfirmedUplinks } = params
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

	static setDisplayRefreshPeriod(params: GeneralCommandTypes.SetDisplayRefreshPeriodParams) {
		try {
			DeviceCommandSchemas.GeneralCommandSchemas.setDisplayRefreshPeriod.parse(params)
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

	static setDeepSleepMode(params: GeneralCommandTypes.SetDeepSleepModeParams) {
		try {
			DeviceCommandSchemas.GeneralCommandSchemas.setDeepSleepMode.parse(params)
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

	static setPIRSensorStatus(params: GeneralCommandTypes.SetPIRSensorStatusParams) {
		try {
			DeviceCommandSchemas.GeneralCommandSchemas.setPIRSensorStatus.parse(params)
			const { state } = params
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

	static setPIRSensorSensitivity(params: GeneralCommandTypes.SetPIRSensorSensitivityParams) {
		try {
			DeviceCommandSchemas.GeneralCommandSchemas.setPIRSensorSensitivity.parse(params)
			const { sensitivity } = params
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

	static setCurrentTemperatureVisibility(params: GeneralCommandTypes.SetCurrentTemperatureVisibilityParams) {
		try {
			DeviceCommandSchemas.GeneralCommandSchemas.setCurrentTemperatureVisibility.parse(params)
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

	static setHumidityVisibility(params: GeneralCommandTypes.SetHumidityVisibilityParams) {
		try {
			DeviceCommandSchemas.GeneralCommandSchemas.setHumidityVisibility.parse(params)
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

	static setLightIntensityVisibility(params: GeneralCommandTypes.SetLightIntensityVisibilityParams) {
		try {
			DeviceCommandSchemas.GeneralCommandSchemas.setLightIntensityVisibility.parse(params)
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

	static setCo2ImagesVisibility(params: GeneralCommandTypes.SetCo2ImagesVisibilityParams) {
		try {
			DeviceCommandSchemas.GeneralCommandSchemas.setCo2ImagesVisibility.parse(params)
			const { chart, digital_value, emoji } = params
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
	static setPIRInitPeriod(params: GeneralCommandTypes.SetPIRPeriodParams) {
		try {
			DeviceCommandSchemas.GeneralCommandSchemas.setPIRPeriod.parse(params)
			const { time } = params
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

	static setPIRMeasurementPeriod(params: GeneralCommandTypes.SetPIRPeriodParams) {
		try {
			DeviceCommandSchemas.GeneralCommandSchemas.setPIRPeriod.parse(params)
			const { time } = params
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

	static setPIRCheckPeriod(params: GeneralCommandTypes.SetPIRPeriodParams) {
		try {
			DeviceCommandSchemas.GeneralCommandSchemas.setPIRPeriod.parse(params)
			const { time } = params
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

	static setPIRBlindPeriod(params: GeneralCommandTypes.SetPIRPeriodParams) {
		try {
			DeviceCommandSchemas.GeneralCommandSchemas.setPIRPeriod.parse(params)
			const { time } = params
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

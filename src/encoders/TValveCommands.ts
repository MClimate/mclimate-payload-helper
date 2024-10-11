import { BaseCommand, GeneralCommands } from '@/encoders'
import { decToHex, dec2hex, CustomError } from '@/utils'
import { ZodError } from 'zod'
import { TValveCommandTypes, DeviceCommandSchemas } from '@/encoders/types'

export class TValveCommands extends GeneralCommands {
	static setOpenCloseTime(params: TValveCommandTypes.SetOpenCloseTimeParams) {
		try {
			DeviceCommandSchemas.TValveCommandSchemas.setOpenCloseTime.parse(params)
			const { openingTime, closingTime } = params
			return new BaseCommand('SetOpenCloseTime', 0x01, decToHex(openingTime), decToHex(closingTime))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetOpenCloseTime execution',
					command: 'SetOpenCloseTime',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetOpenCloseTime execution',
					command: 'SetOpenCloseTime',
					originalError: e as Error,
				})
			}
		}
	}

	static setLED(params: TValveCommandTypes.SetLEDParams) {
		try {
			DeviceCommandSchemas.TValveCommandSchemas.setLED.parse(params)
			const { ledId, behavior, seconds } = params
			return new BaseCommand('SetLED', 0x02, decToHex(ledId), decToHex(behavior), decToHex(seconds))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetLED execution',
					command: 'SetLED',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetLED execution',
					command: 'SetLED',
					originalError: e as Error,
				})
			}
		}
	}

	static setBuzzer(params: TValveCommandTypes.SetBuzzerParams) {
		try {
			DeviceCommandSchemas.TValveCommandSchemas.setBuzzer.parse(params)
			const { volume, frequency, activeTime, onTime, offTime } = params
			const byte = volume.toString(2).padStart(4, '0') + frequency.toString(2).padStart(4, '0')
			const volumeAndFreq = parseInt(byte, 2).toString(16)

			return new BaseCommand(
				'SetBuzzer',
				0x03,
				volumeAndFreq,
				decToHex(activeTime),
				decToHex(onTime / 10),
				decToHex(offTime / 10),
			)
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetBuzzer execution',
					command: 'SetBuzzer',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetBuzzer execution',
					command: 'SetBuzzer',
					originalError: e as Error,
				})
			}
		}
	}

	static setEmergencyOpenings(params: TValveCommandTypes.SetEmergencyOpeningsParams) {
		try {
			DeviceCommandSchemas.TValveCommandSchemas.setEmergencyOpenings.parse(params)
			const { maxOpenings } = params
			return new BaseCommand('SetEmergencyOpenings', 0x04, decToHex(maxOpenings))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetEmergencyOpenings execution',
					command: 'SetEmergencyOpenings',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetEmergencyOpenings execution',
					command: 'SetEmergencyOpenings',
					originalError: e as Error,
				})
			}
		}
	}

	static getEmergencyOpenings() {
		return new BaseCommand('GetEmergencyOpenings', 0x0f)
	}

	static setManualControl(params: TValveCommandTypes.SetManualControlParams) {
		try {
			DeviceCommandSchemas.TValveCommandSchemas.setManualControl.parse(params)
			const { enableOpen, enableClose } = params
			const byte = '000000' + (enableClose ? '1' : '0') + (enableOpen ? '1' : '0')
			return new BaseCommand('SetManualControl', 0x05, byte)
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetManualControl execution',
					command: 'SetManualControl',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetManualControl execution',
					command: 'SetManualControl',
					originalError: e as Error,
				})
			}
		}
	}

	static setFloodAlarmTime(params: TValveCommandTypes.SetFloodAlarmTimeParams) {
		try {
			DeviceCommandSchemas.TValveCommandSchemas.setFloodAlarmTime.parse(params)
			const { time } = params
			return new BaseCommand('SetFloodAlarmTime', 0x06, decToHex(time))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetFloodAlarmTime execution',
					command: 'SetFloodAlarmTime',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetFloodAlarmTime execution',
					command: 'SetFloodAlarmTime',
					originalError: e as Error,
				})
			}
		}
	}

	static getFloodAlarmTime() {
		return new BaseCommand('GetFloodAlarmTime', 0x10)
	}

	static setKeepAlive(params: TValveCommandTypes.SetKeepAliveParams) {
		try {
			DeviceCommandSchemas.TValveCommandSchemas.setKeepAliveTValve.parse(params)
			const { time } = params
			return new BaseCommand('SetKeepAlive', 0x07, decToHex(time))
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

	static requestFullData() {
		return new BaseCommand('RequestFullData', 0x08)
	}

	static setWorkingVoltage(params: TValveCommandTypes.SetWorkingVoltageParams) {
		try {
			DeviceCommandSchemas.TValveCommandSchemas.setWorkingVoltage.parse(params)
			let { voltage } = params
			voltage = (voltage - 1600) / 8
			return new BaseCommand('SetWorkingVoltage', 0x09, decToHex(voltage))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetWorkingVoltage execution',
					command: 'SetWorkingVoltage',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetWorkingVoltage execution',
					command: 'SetWorkingVoltage',
					originalError: e as Error,
				})
			}
		}
	}

	static getWorkingVoltage() {
		return new BaseCommand('GetWorkingVoltage', 0x11)
	}

	static setValveState(params: TValveCommandTypes.SetValveStateParams) {
		try {
			DeviceCommandSchemas.TValveCommandSchemas.setValveState.parse(params)
			const { state } = params
			return new BaseCommand('SetValveState', 0x0c, decToHex(state))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetValveState execution',
					command: 'SetValveState',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetValveState execution',
					command: 'SetValveState',
					originalError: e as Error,
				})
			}
		}
	}

	static setOpenCloseTimeExtended(params: TValveCommandTypes.SetOpenCloseTimeExtendedParams) {
		try {
			DeviceCommandSchemas.TValveCommandSchemas.setOpenCloseTimeExtended.parse(params)
			const { openingTime, closingTime } = params
			return new BaseCommand('SetOpenCloseTimeExtended', 0x0d, dec2hex(openingTime), dec2hex(closingTime))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetOpenCloseTimeExtended execution',
					command: 'SetOpenCloseTimeExtended',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetOpenCloseTimeExtended execution',
					command: 'SetOpenCloseTimeExtended',
					originalError: e as Error,
				})
			}
		}
	}

	static getOpenCloseTimeExtended() {
		return new BaseCommand('GetOpenCloseTimeExtended', 0x0e)
	}

	static setSingleTimeValveState(params: TValveCommandTypes.SetSingleTimeValveStateParams) {
		try {
			DeviceCommandSchemas.TValveCommandSchemas.setSingleTimeValveState.parse(params)
			const { state, time } = params
			return new BaseCommand('SetSingleTimeValveState', 0x14, decToHex(state), dec2hex(time))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetSingleTimeValveState execution',
					command: 'SetSingleTimeValveState',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetSingleTimeValveState execution',
					command: 'SetSingleTimeValveState',
					originalError: e as Error,
				})
			}
		}
	}

	static setDeviceFloodSensor(params: TValveCommandTypes.SetDeviceFloodSensorParams) {
		try {
			DeviceCommandSchemas.TValveCommandSchemas.setDeviceFloodSensor.parse(params)
			const { enabled } = params
			let byte = '0000000' + (enabled ? '1' : '0')
			byte = parseInt(byte, 2).toString(16)
			return new BaseCommand('SetDeviceFloodSensor', 0x0a, byte)
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetDeviceFloodSensor execution',
					command: 'SetDeviceFloodSensor',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetDeviceFloodSensor execution',
					command: 'SetDeviceFloodSensor',
					originalError: e as Error,
				})
			}
		}
	}

	static getDeviceFloodSensor() {
		return new BaseCommand('GetDeviceFloodSensor', 0x13)
	}

	static setJoinRetryPeriod(params: TValveCommandTypes.SetJoinRetryPeriodTValveParams) {
		try {
			DeviceCommandSchemas.TValveCommandSchemas.setJoinRetryPeriodTValve.parse(params)
			const { period } = params
			const periodToPass = (period * 60) / 5
			return new BaseCommand('SetJoinRetryPeriod', 0x15, decToHex(periodToPass))
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
		return new BaseCommand('GetJoinRetryPeriod', 0x16)
	}

	static setUplinkType(params: TValveCommandTypes.SetUplinkTypeTValveParams) {
		try {
			DeviceCommandSchemas.TValveCommandSchemas.setUplinkTypeTValve.parse(params)
			const { type } = params
			return new BaseCommand('SetUplinkType', 0x17, type)
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
		return new BaseCommand('GetUplinkType', 0x18)
	}

	static setWatchDogParams(params: TValveCommandTypes.SetWatchDogTValveParams) {
		try {
			DeviceCommandSchemas.TValveCommandSchemas.setWatchDogTValveParams.parse(params)
			const { confirmedUplinks, unconfirmedUplinks } = params
			return new BaseCommand('SetWatchDogParams', 0x19, decToHex(confirmedUplinks), decToHex(unconfirmedUplinks))
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
		return new BaseCommand('GetWatchDogParams', 0x1a)
	}
}

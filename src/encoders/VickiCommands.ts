import { BaseCommand, ChildLockCommands, GeneralCommands, TemperatureCommonCommands } from '@/encoders'
import { decToHex, dec2hex, CustomError, isFloat, dec2hex3bytes, applyMixins } from '@/utils'
import { ZodError } from 'zod'
import { VickiCommandTypes, DeviceCommandSchemas } from '@/encoders/types'

export class VickiCommands extends GeneralCommands {
	static recalibrateMotor() {
		return new BaseCommand('RecalibrateMotor', 0x03)
	}

	static setOpenWindow(params: VickiCommandTypes.SetOpenWindowParams) {
		try {
			DeviceCommandSchemas.VickiCommandSchemas.setOpenWindow.parse(params)
			const { enabled, delta, closeTime, motorPosition } = params
			const enabledValue = enabled ? 1 : 0
			const closeTimeValue = Math.floor(closeTime / 5)
			const motorPositionHigh = (motorPosition >> 8) & 0x0f
			const motorPositionLow = motorPosition & 0xff
			const deltaValue = delta & 0x0f

			return new BaseCommand(
				'SetOpenWindow',
				0x06,
				decToHex(enabledValue),
				decToHex(closeTimeValue),
				decToHex(motorPositionLow, true),
				decToHex((motorPositionHigh << 4) | deltaValue, false),
				decToHex(deltaValue, false),
			)
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetOpenWindow execution',
					command: 'SetOpenWindow',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetOpenWindow execution',
					command: 'SetOpenWindow',
					originalError: e as Error,
				})
			}
		}
	}

	static getOpenWindowParams() {
		return new BaseCommand('GetOpenWindowParams', 0x13)
	}

	static forceClose() {
		return new BaseCommand('ForceClose', 0x0b)
	}

	static setInternalAlgoParams(params: VickiCommandTypes.SetInternalAlgoParamsParams) {
		try {
			DeviceCommandSchemas.VickiCommandSchemas.setInternalAlgoParams.parse(params)
			const { period, pFirstLast, pNext } = params
			return new BaseCommand('SetInternalAlgoParams', 0x0c, decToHex(period), decToHex(pFirstLast), decToHex(pNext))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetInternalAlgoParams execution',
					command: 'SetInternalAlgoParams',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetInternalAlgoParams execution',
					command: 'SetInternalAlgoParams',
					originalError: e as Error,
				})
			}
		}
	}

	static getInternalAlgoParams() {
		return new BaseCommand('GetInternalAlgoParams', 0x16)
	}

	static setOperationalMode(params: VickiCommandTypes.SetOperationalModeParams) {
		try {
			DeviceCommandSchemas.VickiCommandSchemas.setOperationalMode.parse(params)
			return new BaseCommand('SetOperationalMode', 0x0d, params.mode)
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetOperationalMode execution',
					command: 'SetOperationalMode',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetOperationalMode execution',
					command: 'SetOperationalMode',
					originalError: e as Error,
				})
			}
		}
	}

	static getOperationalMode() {
		return new BaseCommand('GetOperationalMode', 0x18)
	}

	static setTargetTemperature(params: VickiCommandTypes.SetTargetTemperatureParams) {
		try {
			DeviceCommandSchemas.VickiCommandSchemas.setTargetTemperature.parse(params)
			const { targetTemperature } = params

			if (isFloat(targetTemperature)) {
				return new BaseCommand('SetTargetTemperature', 0x51, dec2hex(targetTemperature * 10))
			} else {
				return new BaseCommand('SetTargetTemperature', 0x0e, decToHex(targetTemperature))
			}
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetTargetTemperature execution',
					command: 'SetTargetTemperature',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetTargetTemperature execution',
					command: 'SetTargetTemperature',
					originalError: e as Error,
				})
			}
		}
	}

	static setExternalTemperature(params: VickiCommandTypes.SetExternalTemperatureParams) {
		try {
			DeviceCommandSchemas.VickiCommandSchemas.setExternalTemperature.parse(params)
			return new BaseCommand('SetExternalTemperature', 0x0f, decToHex(params.temp))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetExternalTemperature execution',
					command: 'SetExternalTemperature',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetExternalTemperature execution',
					command: 'SetExternalTemperature',
					originalError: e as Error,
				})
			}
		}
	}

	static getExternalTemperature() {
		return new BaseCommand('GetExternalTemperature', 0x44)
	}

	static setInternalAlgoTdiffParams(params: VickiCommandTypes.SetInternalAlgoTdiffParamsParams) {
		try {
			DeviceCommandSchemas.VickiCommandSchemas.setInternalAlgoTdiffParams.parse(params)
			return new BaseCommand('SetInternalAlgoTdiffParams', 0x1a, decToHex(params.cold), decToHex(params.warm))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetInternalAlgoTdiffParams execution',
					command: 'SetInternalAlgoTdiffParams',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetInternalAlgoTdiffParams execution',
					command: 'SetInternalAlgoTdiffParams',
					originalError: e as Error,
				})
			}
		}
	}

	static getInternalAlgoTdiffParams() {
		return new BaseCommand('GetInternalAlgoTdiffParams', 0x17)
	}

	static setPrimaryOperationalMode(params: VickiCommandTypes.SetPrimaryOperationalModeParams) {
		try {
			DeviceCommandSchemas.VickiCommandSchemas.setPrimaryOperationalMode.parse(params)
			return new BaseCommand('SetPrimaryOperationalMode', 0x1e, params.mode)
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetPrimaryOperationalMode execution',
					command: 'SetPrimaryOperationalMode',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetPrimaryOperationalMode execution',
					command: 'SetPrimaryOperationalMode',
					originalError: e as Error,
				})
			}
		}
	}

	static getPrimaryOperationalMode() {
		return new BaseCommand('GetPrimaryOperationalMode', 0x1f)
	}

	static setBatteryRangesBoundaries(params: VickiCommandTypes.SetBatteryRangesBoundariesParams) {
		try {
			DeviceCommandSchemas.VickiCommandSchemas.setBatteryRangesBoundaries.parse(params)
			return new BaseCommand(
				'SetBatteryRangesBoundaries',
				0x20,
				dec2hex(params.Boundary1),
				dec2hex(params.Boundary2),
				dec2hex(params.Boundary3),
			)
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetBatteryRangesBoundaries execution',
					command: 'SetBatteryRangesBoundaries',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetBatteryRangesBoundaries execution',
					command: 'SetBatteryRangesBoundaries',
					originalError: e as Error,
				})
			}
		}
	}

	static getBatteryRangesBoundaries() {
		return new BaseCommand('GetBatteryRangesBoundaries', 0x21)
	}

	static setBatteryRangesOverVoltage(params: VickiCommandTypes.SetBatteryRangesOverVoltageParams) {
		try {
			DeviceCommandSchemas.VickiCommandSchemas.setBatteryRangesOverVoltage.parse(params)
			return new BaseCommand(
				'SetBatteryRangesOverVoltage',
				0x22,
				decToHex(14),
				decToHex(params.Range1),
				decToHex(params.Range2),
				decToHex(params.Range3),
			)
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetBatteryRangesOverVoltage execution',
					command: 'SetBatteryRangesOverVoltage',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetBatteryRangesOverVoltage execution',
					command: 'SetBatteryRangesOverVoltage',
					originalError: e as Error,
				})
			}
		}
	}

	static getBatteryRangesOverVoltage() {
		return new BaseCommand('GetBatteryRangesOverVoltage', 0x23)
	}

	static setOvac(params: VickiCommandTypes.SetOvacParams) {
		try {
			DeviceCommandSchemas.VickiCommandSchemas.setOvac.parse(params)
			return new BaseCommand('SetOvac', 0x26, decToHex(params.ovac))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetOvac execution',
					command: 'SetOvac',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetOvac execution',
					command: 'SetOvac',
					originalError: e as Error,
				})
			}
		}
	}

	static getOvac() {
		return new BaseCommand('GetOvac', 0x27)
	}

	static setProportionalAlgorithmParameters(params: VickiCommandTypes.SetProportionalAlgorithmParametersParams) {
		try {
			DeviceCommandSchemas.VickiCommandSchemas.setProportionalAlgorithmParameters.parse(params)
			return new BaseCommand(
				'SetProportionalAlgorithmParameters',
				0x2a,
				decToHex(params.coefficient),
				decToHex(params.period),
			)
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetProportionalAlgorithmParameters execution',
					command: 'SetProportionalAlgorithmParameters',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetProportionalAlgorithmParameters execution',
					command: 'SetProportionalAlgorithmParameters',
					originalError: e as Error,
				})
			}
		}
	}

	static getProportionalAlgorithmParameters() {
		return new BaseCommand('GetProportionalAlgorithmParameters', 0x29)
	}

	static setTemperatureControlAlgorithm(params: VickiCommandTypes.SetTemperatureControlAlgorithmParams) {
		try {
			DeviceCommandSchemas.VickiCommandSchemas.setTemperatureControlAlgorithm.parse(params)
			return new BaseCommand('SetTemperatureControlAlgorithm', 0x2c, params.algorithm)
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetTemperatureControlAlgorithm execution',
					command: 'SetTemperatureControlAlgorithm',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetTemperatureControlAlgorithm execution',
					command: 'SetTemperatureControlAlgorithm',
					originalError: e as Error,
				})
			}
		}
	}

	static getTemperatureControlAlgorithm() {
		return new BaseCommand('GetTemperatureControlAlgorithm', 0x2b)
	}

	static setMotorPositionOnly(params: VickiCommandTypes.SetMotorPositionOnlyParams) {
		try {
			DeviceCommandSchemas.VickiCommandSchemas.setMotorPositionOnly.parse(params)
			return new BaseCommand('SetMotorPositionOnly', 0x2d, dec2hex(params.position))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetMotorPositionOnly execution',
					command: 'SetMotorPositionOnly',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetMotorPositionOnly execution',
					command: 'SetMotorPositionOnly',
					originalError: e as Error,
				})
			}
		}
	}

	static deviceReset() {
		return new BaseCommand('deviceReset', 0x30)
	}

	static setTargetTemperatureAndMotorPosition(params: VickiCommandTypes.SetTargetTemperatureAndMotorPositionParams) {
		try {
			DeviceCommandSchemas.VickiCommandSchemas.setTargetTemperatureAndMotorPosition.parse(params)
			return new BaseCommand(
				'SetTargetTemperatureAndMotorPosition',
				0x31,
				dec2hex(params.motorPosition),
				decToHex(params.targetTemperature),
			)
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetTargetTemperatureAndMotorPosition execution',
					command: 'SetTargetTemperatureAndMotorPosition',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetTargetTemperatureAndMotorPosition execution',
					command: 'SetTargetTemperatureAndMotorPosition',
					originalError: e as Error,
				})
			}
		}
	}

	static setChildLockBehavior(params: VickiCommandTypes.SetChildLockBehaviorParams) {
		try {
			DeviceCommandSchemas.VickiCommandSchemas.setChildLockBehavior.parse(params)
			return new BaseCommand('SetChildLockBehavior', 0x35, decToHex(params.behavior))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetChildLockBehavior execution',
					command: 'SetChildLockBehavior',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetChildLockBehavior execution',
					command: 'SetChildLockBehavior',
					originalError: e as Error,
				})
			}
		}
	}

	static getChildLockBehavior() {
		return new BaseCommand('GetChildLockBehavior', 0x34)
	}

	static setProportionalGain(params: VickiCommandTypes.SetProportionalGainParams) {
		try {
			DeviceCommandSchemas.VickiCommandSchemas.setProportionalGain.parse(params)
			const kp = Math.round(params.proportionalGain * 131072)
			return new BaseCommand('SetProportionalGain', 0x37, dec2hex3bytes(kp))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetProportionalGain execution',
					command: 'SetProportionalGain',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetProportionalGain execution',
					command: 'SetProportionalGain',
					originalError: e as Error,
				})
			}
		}
	}

	static getProportionalGain() {
		return new BaseCommand('GetProportionalGain', 0x36)
	}

	static setExternalTemperatureFloat(params: VickiCommandTypes.SetExternalTemperatureFloatParams) {
		try {
			DeviceCommandSchemas.VickiCommandSchemas.setExternalTemperatureFloat.parse(params)
			return new BaseCommand('SetExternalTemperatureFloat', 0x3c, dec2hex(params.temp * 10))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetExternalTemperatureFloat execution',
					command: 'SetExternalTemperatureFloat',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetExternalTemperatureFloat execution',
					command: 'SetExternalTemperatureFloat',
					originalError: e as Error,
				})
			}
		}
	}

	static setIntegralGain(params: VickiCommandTypes.SetIntegralGainParams) {
		try {
			DeviceCommandSchemas.VickiCommandSchemas.setIntegralGain.parse(params)
			const ki = Math.round(params.integralGain * 131072)
			return new BaseCommand('SetIntegralGain', 0x3e, dec2hex3bytes(ki))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetIntegralGain execution',
					command: 'SetIntegralGain',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetIntegralGain execution',
					command: 'SetIntegralGain',
					originalError: e as Error,
				})
			}
		}
	}

	static getIntegralGain() {
		return new BaseCommand('GetIntegralGain', 0x3d)
	}

	static getIntegralValue() {
		return new BaseCommand('GetIntegralValue', 0x3f)
	}

	static setPiRunPeriod(params: VickiCommandTypes.SetPiRunPeriodParams) {
		try {
			DeviceCommandSchemas.VickiCommandSchemas.setPiRunPeriod.parse(params)
			return new BaseCommand('SetPiRunPeriod', 0x41, decToHex(params.period))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetPiRunPeriod execution',
					command: 'SetPiRunPeriod',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetPiRunPeriod execution',
					command: 'SetPiRunPeriod',
					originalError: e as Error,
				})
			}
		}
	}

	static getPiRunPeriod() {
		return new BaseCommand('GetPiRunPeriod', 0x40)
	}

	static setTemperatureHysteresis(params: VickiCommandTypes.SetTemperatureHysteresisParams) {
		try {
			DeviceCommandSchemas.VickiCommandSchemas.setTemperatureHysteresis.parse(params)
			return new BaseCommand('SetTemperatureHysteresis', 0x43, decToHex(params.hysteresis * 10))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetTemperatureHysteresis execution',
					command: 'SetTemperatureHysteresis',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetTemperatureHysteresis execution',
					command: 'SetTemperatureHysteresis',
					originalError: e as Error,
				})
			}
		}
	}

	static getTemperatureHysteresis() {
		return new BaseCommand('GetTemperatureHysteresis', 0x42)
	}

	static setOpenWindowPrecisely(params: VickiCommandTypes.SetOpenWindowPreciselyParams) {
		try {
			DeviceCommandSchemas.VickiCommandSchemas.setOpenWindowPrecisely.parse(params)
			const enabledValue = params.enabled ? 1 : 0
			const duration = Math.floor(params.duration / 5)
			const delta = params.delta * 10
			return new BaseCommand(
				'SetOpenWindowPrecisely',
				0x45,
				decToHex(enabledValue),
				decToHex(duration),
				decToHex(parseInt(delta.toString())),
			)
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetOpenWindowPrecisely execution',
					command: 'SetOpenWindowPrecisely',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetOpenWindowPrecisely execution',
					command: 'SetOpenWindowPrecisely',
					originalError: e as Error,
				})
			}
		}
	}

	static getOpenWindowPrecisely() {
		return new BaseCommand('GetOpenWindowPrecisely', 0x46)
	}

	static setForceAttach(params: VickiCommandTypes.SetForceAttachParams) {
		try {
			DeviceCommandSchemas.VickiCommandSchemas.setForceAttach.parse(params)
			const enabledValue = params.enabled ? 1 : 0
			return new BaseCommand('SetForceAttach', 0x47, decToHex(enabledValue))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetForceAttach execution',
					command: 'SetForceAttach',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetForceAttach execution',
					command: 'SetForceAttach',
					originalError: e as Error,
				})
			}
		}
	}

	static getForceAttach() {
		return new BaseCommand('GetForceAttach', 0x48)
	}

	static setAntiFreezeParams(params: VickiCommandTypes.SetAntiFreezeParamsParams) {
		try {
			DeviceCommandSchemas.VickiCommandSchemas.setAntiFreezeParams.parse(params)
			return new BaseCommand(
				'SetAntiFreezeParams',
				0x49,
				decToHex(params.activatedTemperature * 10),
				decToHex(params.deactivatedTemperature * 10),
				decToHex(params.targetTemperature * 10),
			)
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetAntiFreezeParams execution',
					command: 'SetAntiFreezeParams',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetAntiFreezeParams execution',
					command: 'SetAntiFreezeParams',
					originalError: e as Error,
				})
			}
		}
	}

	static getAntiFreezeParams() {
		return new BaseCommand('GetAntiFreezeParams', 0x4a)
	}

	static setMaxAllowedIntegralValue(params: VickiCommandTypes.SetMaxAllowedIntegralValueParams) {
		try {
			DeviceCommandSchemas.VickiCommandSchemas.setMaxAllowedIntegralValue.parse(params)
			return new BaseCommand('SetMaxAllowedIntegralValue', 0x4c, dec2hex(params.value * 10))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetMaxAllowedIntegralValue execution',
					command: 'SetMaxAllowedIntegralValue',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetMaxAllowedIntegralValue execution',
					command: 'SetMaxAllowedIntegralValue',
					originalError: e as Error,
				})
			}
		}
	}

	static getMaxAllowedIntegralValue() {
		return new BaseCommand('GetMaxAllowedIntegralValue', 0x4d)
	}

	static setValveOpennessInPercentage(params: VickiCommandTypes.SetValveOpennessInPercentageParams) {
		try {
			DeviceCommandSchemas.VickiCommandSchemas.setValveOpennessInPercentage.parse(params)
			return new BaseCommand('SetValveOpennessInPercentage', 0x4e, decToHex(params.value))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetValveOpennessInPercentage execution',
					command: 'SetValveOpennessInPercentage',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetValveOpennessInPercentage execution',
					command: 'SetValveOpennessInPercentage',
					originalError: e as Error,
				})
			}
		}
	}

	static setValveOpennessRangeInPercentage(params: VickiCommandTypes.SetValveOpennessRangeInPercentageParams) {
		try {
			DeviceCommandSchemas.VickiCommandSchemas.setValveOpennessRangeInPercentage.parse(params)
			return new BaseCommand(
				'SetValveOpennessRangeInPercentage',
				0x4f,
				decToHex(100 - params.max),
				decToHex(100 - params.min),
			)
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetValveOpennessRangeInPercentage execution',
					command: 'SetValveOpennessRangeInPercentage',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetValveOpennessRangeInPercentage execution',
					command: 'SetValveOpennessRangeInPercentage',
					originalError: e as Error,
				})
			}
		}
	}

	static getValveOpennessRangeInPercentage() {
		return new BaseCommand('GetValveOpennessRangeInPercentage', 0x50)
	}

	static setTemperatureOffset(params: VickiCommandTypes.SetTemperatureOffsetParams) {
		try {
			DeviceCommandSchemas.VickiCommandSchemas.setTemperatureOffset.parse(params)
			const value = Math.round((params.value + 4.928) / 0.176)
			return new BaseCommand('SetTemperatureOffset', 0x53, decToHex(value))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetTemperatureOffset execution',
					command: 'SetTemperatureOffset',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetTemperatureOffset execution',
					command: 'SetTemperatureOffset',
					originalError: e as Error,
				})
			}
		}
	}

	static getTemperatureOffset() {
		return new BaseCommand('GetTemperatureOffset', 0x54)
	}

	static setHeatingEvent(params: VickiCommandTypes.SetHeatingEventParams) {
		try {
			DeviceCommandSchemas.VickiCommandSchemas.setHeatingEvent.parse(params)
			const { eventIndex, startHour, startMinute, targetTemperature, daysActive } = params
			// Target temperature is in Celsius degrees multiplied by 10, as per the documentation
			// 5900080101021F
			const tempValue = targetTemperature * 10
			// Calculate days active bitmap: bit 0 (LSB) = Monday, bit 6 = Sunday
			const daysActiveValue = (daysActive.monday ? 1 : 0) |
				(daysActive.tuesday ? 2 : 0) |
				(daysActive.wednesday ? 4 : 0) |
				(daysActive.thursday ? 8 : 0) |
				(daysActive.friday ? 16 : 0) |
				(daysActive.saturday ? 32 : 0) |
				(daysActive.sunday ? 64 : 0)
			return new BaseCommand(
				'SetHeatingEvent', 
				0x59, 
				decToHex(eventIndex),
				decToHex(startHour),
				decToHex(startMinute),
				dec2hex(tempValue),
				decToHex(daysActiveValue)
			)
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetHeatingEvent execution',
					command: 'SetHeatingEvent',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetHeatingEvent execution',
					command: 'SetHeatingEvent',
					originalError: e as Error,
				})
			}
		}
	}

	static getHeatingEvent() {
		return new BaseCommand('GetHeatingEvent', 0x50)
	}

	static setHeatingEventState(params: VickiCommandTypes.SetHeatingEventStateParams) {
		try {
			DeviceCommandSchemas.VickiCommandSchemas.setHeatingEventState.parse(params)
			const state = params.active ? 1 : 0
			return new BaseCommand('SetHeatingEventState', 0x6b, decToHex(params.eventIndex), decToHex(state))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetHeatingEventState execution',
					command: 'SetHeatingEventState',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetHeatingEventState execution',
					command: 'SetHeatingEventState',
					originalError: e as Error,
				})
			}
		}
	}
	static getHeatingEventState() {
		return new BaseCommand('GetHeatingEventState', 0x6c)
	}

	static setTimeRequestByMACcommand(params: VickiCommandTypes.SetTimeRequestByMACcommandParams) {
		try {
			DeviceCommandSchemas.VickiCommandSchemas.setTimeRequestByMACcommand.parse(params)
			const state = params.enabled ? 1 : 0
			return new BaseCommand('SetTimeRequestByMACcommand', 0x6d, decToHex(state))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetTimeRequestByMACcommand execution',
					command: 'SetTimeRequestByMACcommand',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetTimeRequestByMACcommand execution',
					command: 'SetTimeRequestByMACcommand',
					originalError: e as Error,
				})
			}
		}
	}
	static getTimeRequestByMACcommand() {
		return new BaseCommand('GetTimeRequestByMACcommand', 0x6e)
	}

	static setHeatingSchedule(params: VickiCommandTypes.SetHeatingScheduleParams) {
		try {
			DeviceCommandSchemas.VickiCommandSchemas.setHeatingSchedule.parse(params)
			const { startMonth, startDay, endMonth, endDay } = params
			return new BaseCommand(
				'SetHeatingSchedule',
				0x5b,
				decToHex(startMonth), // 0-11 (Jan-Dec)
				decToHex(startDay),  // 1-31 (0 disables schedule handling)
				decToHex(endMonth),  // 0-11 (Jan-Dec)
				decToHex(endDay)     // 1-31 (0 disables schedule handling)
			)
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetHeatingSchedule execution',
					command: 'SetHeatingSchedule',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetHeatingSchedule execution',
					command: 'SetHeatingSchedule',
					originalError: e as Error,
				})
			}
		}
	}

	static getHeatingSchedule() {
		return new BaseCommand('GetHeatingSchedule', 0x5c)
	}

	static setDeviceTime(params: VickiCommandTypes.SetDeviceTimeParams) {
		try {
			DeviceCommandSchemas.VickiCommandSchemas.setDeviceTime.parse(params)
			// Convert to 4-byte hex representation (unsigned 32-bit UNIX timestamp)
			const timestampHex = params.timestamp.toString(16).padStart(8, '0').toUpperCase()
			const byte1 = timestampHex.substring(0, 2) // MSB
			const byte2 = timestampHex.substring(2, 4)
			const byte3 = timestampHex.substring(4, 6)
			const byte4 = timestampHex.substring(6, 8) // LSB

			return new BaseCommand(
				'SetDeviceTime',
				0x5d,
				byte1,
				byte2,
				byte3,
				byte4
			)
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetDeviceTime execution',
					command: 'SetDeviceTime',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetDeviceTime execution',
					command: 'SetDeviceTime',
					originalError: e as Error,
				})
			}
		}
	}

	static getDeviceTime() {
		return new BaseCommand('GetDeviceTime', 0x5e)
	}

	static setDeviceTimeZone(params: VickiCommandTypes.SetDeviceTimeZoneParams) {
		try {
			DeviceCommandSchemas.VickiCommandSchemas.setDeviceTimeZone.parse(params)
			// Convert offset hours to two's complement for negative values
			// For positive values (0-12), just use the value directly
			// For negative values (-12 to -1), use two's complement
			let offsetByte: number
			if (params.offsetHours >= 0) {
				offsetByte = params.offsetHours
			} else {
				// Two's complement calculation for negative values
				offsetByte = 256 + params.offsetHours // 256 = 2^8, adding to negative gives two's complement
			}

			return new BaseCommand(
				'SetDeviceTimeZone', 
				0x5f,
				decToHex(offsetByte)
			)
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetDeviceTimeZone execution',
					command: 'SetDeviceTimeZone',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetDeviceTimeZone execution',
					command: 'SetDeviceTimeZone',
					originalError: e as Error,
				})
			}
		}
	}

	static getDeviceTimeZone() {
		return new BaseCommand('GetDeviceTimeZone', 0x60)
	}

	static setAutomaticSetpointRestore(params: VickiCommandTypes.SetAutomaticSetpointRestoreParams) {
		try {
			DeviceCommandSchemas.VickiCommandSchemas.setAutomaticSetpointRestore.parse(params)
			// The time parameter is in 10-minute increments (0-255)
			let timeValue = params.time / 10;
			return new BaseCommand(
				'SetAutomaticSetpointRestore',
				0x61,
				decToHex(timeValue)
			)
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetAutomaticSetpointRestore execution',
					command: 'SetAutomaticSetpointRestore',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetAutomaticSetpointRestore execution',
					command: 'SetAutomaticSetpointRestore',
					originalError: e as Error,
				})
			}
		}
	}

	static getAutomaticSetpointRestore() {
		return new BaseCommand('GetAutomaticSetpointRestore', 0x62)
	}

	static setOfflineTargetTemperature(params: VickiCommandTypes.SetOfflineTargetTemperatureParams) {
		try {
			DeviceCommandSchemas.VickiCommandSchemas.setOfflineTargetTemperature.parse(params)

			// If targetTemperature is 0, disable the feature
			if (params.targetTemperature === 0) {
				return new BaseCommand(
					'SetOfflineTargetTemperature',
					0x65,
					'0000'
				)
			}

			// Convert temperature to the required format: multiply by 10 to get an integer value
			// Example: 21.5°C becomes 215
			const tempValue = params.targetTemperature * 10
			return new BaseCommand(
				'SetOfflineTargetTemperature',
				0x65,
				dec2hex(tempValue)
			)
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetOfflineTargetTemperature execution',
					command: 'SetOfflineTargetTemperature',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetOfflineTargetTemperature execution',
					command: 'SetOfflineTargetTemperature',
					originalError: e as Error,
				})
			}
		}
	}

	static getOfflineTargetTemperature() {
		return new BaseCommand('GetOfflineTargetTemperature', 0x66)
	}

	static setInternalAlgoTemporaryState(params: VickiCommandTypes.SetInternalAlgoTemporaryStateParams) {
		try {
			DeviceCommandSchemas.VickiCommandSchemas.setInternalAlgoTemporaryState.parse(params)
			
			// According to the docs:
			// 00 - Enable internal algorithm operation (if it was temporarily disabled)
			// 01 - Disable internal algorithm operation temporarily
			const state = params.enabled ? '00' : '01'
			
			return new BaseCommand(
				'SetInternalAlgoTemporaryState', 
				0x67, 
				state
			)
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetInternalAlgoTemporaryState execution',
					command: 'SetInternalAlgoTemporaryState',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetInternalAlgoTemporaryState execution',
					command: 'SetInternalAlgoTemporaryState',
					originalError: e as Error,
				})
			}
		}
	}

	static getInternalAlgoTemporaryState() {
		return new BaseCommand('GetInternalAlgoTemporaryState', 0x68)
	}

	static setTemperatureLevels(params: VickiCommandTypes.SetTemperatureLevelsParams) {
		try {
			DeviceCommandSchemas.VickiCommandSchemas.setTemperatureLevels.parse(params)
			
			// Convert each temperature to a value multiplied by 10
			// and use dec2hex to convert to MSB/LSB hex values
			const level0 = dec2hex(params.scaleLevel0 * 10)
			const level1 = dec2hex(params.scaleLevel1 * 10)
			const level2 = dec2hex(params.scaleLevel2 * 10)
			const level3 = dec2hex(params.scaleLevel3 * 10)
			const level4 = dec2hex(params.scaleLevel4 * 10)
			const level5 = dec2hex(params.scaleLevel5 * 10)

			return new BaseCommand(
				'SetTemperatureLevels',
				0x69,
				level0, // Level 0 temperature (MSB,LSB) - first byte returned by dec2hex
				level1, // Level 1 temperature (MSB,LSB)
				level2, // Level 2 temperature (MSB,LSB)
				level3, // Level 3 temperature (MSB,LSB)
				level4, // Level 4 temperature (MSB,LSB)
				level5  // Level 5 temperature (MSB,LSB)
			)
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetTemperatureLevels execution',
					command: 'SetTemperatureLevels',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetTemperatureLevels execution',
					command: 'SetTemperatureLevels',
					originalError: e as Error,
				})
			}
		}
	}

	static getTemperatureLevels() {
		return new BaseCommand('GetTemperatureLevels', 0x6A)
	}

	static setLedIndicationDuration(params: VickiCommandTypes.SetLedIndicationDurationParams) {
		try {
			DeviceCommandSchemas.VickiCommandSchemas.setLedIndicationDuration.parse(params)
			
			let durationValue = params.duration * 2;
			return new BaseCommand(
				'SetLedIndicationDuration',
				0x63,
				decToHex(durationValue)
			)
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetLedIndicationDuration execution',
					command: 'SetLedIndicationDuration',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetLedIndicationDuration execution',
					command: 'SetLedIndicationDuration',
					originalError: e as Error,
				})
			}
		}
	}

	static getLedIndicationDuration() {
		return new BaseCommand('GetLedIndicationDuration', 0x64)
	}
}

applyMixins(VickiCommands, [TemperatureCommonCommands, ChildLockCommands])

import { BaseCommand, DisplayCommands, GeneralCommands, TemperatureCommonCommands } from '@/encoders'
import { decToHex, dec2hex, CustomError, applyMixins, delMethods } from '@/utils'
import { ZodError } from 'zod'
import { DeviceCommandSchemas, FanCoilThermostatCommandTypes } from '@/encoders/types'

export class FanCoilThermostatCommands extends GeneralCommands {
	static setTargetTemperatureStep(params: FanCoilThermostatCommandTypes.SetTargetTemperatureStepParams) {
		try {
			DeviceCommandSchemas.FanCoilThermostatCommandSchemas.setTargetTemperatureStep.parse(params)
			const { value } = params
			return new BaseCommand('SetTargetTemperatureStep', 0x03, decToHex(value * 10))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetTargetTemperatureStep execution',
					command: 'SetTargetTemperatureStep',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetTargetTemperatureStep execution',
					command: 'SetTargetTemperatureStep',
					originalError: e as Error,
				})
			}
		}
	}

	static getTargetTemperatureStep() {
		return new BaseCommand('GetTargetTemperatureStep', 0x05)
	}

	static setKeysLock(params: FanCoilThermostatCommandTypes.SetKeysLockParams) {
		try {
			DeviceCommandSchemas.FanCoilThermostatCommandSchemas.setKeysLock.parse(params)
			const { value } = params
			return new BaseCommand('SetKeysLock', 0x07, decToHex(value))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetKeysLock execution',
					command: 'SetKeysLock',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetKeysLock execution',
					command: 'SetKeysLock',
					originalError: e as Error,
				})
			}
		}
	}

	static getKeysLock() {
		return new BaseCommand('GetKeysLock', 0x14)
	}

	static setTargetTemperature(params: FanCoilThermostatCommandTypes.SetTargetTemperatureParams) {
		try {
			DeviceCommandSchemas.FanCoilThermostatCommandSchemas.setTargetTemperature.parse(params)
			const { targetTemperature } = params
			return new BaseCommand('SetTargetTemperature', 0x2e, dec2hex(targetTemperature * 10))
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

	static setFctOperationalMode(params: FanCoilThermostatCommandTypes.SetFctOperationalModeParams) {
		try {
			DeviceCommandSchemas.FanCoilThermostatCommandSchemas.setFctOperationalMode.parse(params)
			const { value } = params
			return new BaseCommand('SetFctOperationalMode', 0x52, decToHex(value))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetFctOperationalMode execution',
					command: 'SetFctOperationalMode',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetFctOperationalMode execution',
					command: 'SetFctOperationalMode',
					originalError: e as Error,
				})
			}
		}
	}

	static setValveOpenCloseTime(params: FanCoilThermostatCommandTypes.SetValveOpenCloseTimeParams) {
		try {
			DeviceCommandSchemas.FanCoilThermostatCommandSchemas.setValveOpenCloseTime.parse(params)
			const { value } = params
			return new BaseCommand('SetValveOpenCloseTime', 0x31, decToHex(value))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetValveOpenCloseTime execution',
					command: 'SetValveOpenCloseTime',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetValveOpenCloseTime execution',
					command: 'SetValveOpenCloseTime',
					originalError: e as Error,
				})
			}
		}
	}

	static getValveOpenCloseTime() {
		return new BaseCommand('GetValveOpenCloseTime', 0x32)
	}

	static setExtAutomaticTemperatureControl(
		params: FanCoilThermostatCommandTypes.SetExtAutomaticTemperatureControlParams,
	) {
		try {
			DeviceCommandSchemas.FanCoilThermostatCommandSchemas.setExtAutomaticTemperatureControl.parse(params)
			const { value } = params
			return new BaseCommand('SetExtAutomaticTemperatureControl', 0x35, decToHex(value))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetExtAutomaticTemperatureControl execution',
					command: 'SetExtAutomaticTemperatureControl',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetExtAutomaticTemperatureControl execution',
					command: 'SetExtAutomaticTemperatureControl',
					originalError: e as Error,
				})
			}
		}
	}

	static getExtAutomaticTemperatureControl() {
		return new BaseCommand('GetExtAutomaticTemperatureControl', 0x36)
	}

	static setFanSpeed(params: FanCoilThermostatCommandTypes.SetFanSpeedParams) {
		try {
			DeviceCommandSchemas.FanCoilThermostatCommandSchemas.setFanSpeed.parse(params)
			const { value } = params
			return new BaseCommand('SetFanSpeed', 0x44, decToHex(value))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetFanSpeed execution',
					command: 'SetFanSpeed',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetFanSpeed execution',
					command: 'SetFanSpeed',
					originalError: e as Error,
				})
			}
		}
	}

	static getFanSpeed() {
		return new BaseCommand('GetFanSpeed', 0x45)
	}

	static setFanSpeedLimit(params: FanCoilThermostatCommandTypes.SetFanSpeedLimitParams) {
		try {
			DeviceCommandSchemas.FanCoilThermostatCommandSchemas.setFanSpeedLimit.parse(params)
			const { value } = params
			return new BaseCommand('SetFanSpeedLimit', 0x46, decToHex(value))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetFanSpeedLimit execution',
					command: 'SetFanSpeedLimit',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetFanSpeedLimit execution',
					command: 'SetFanSpeedLimit',
					originalError: e as Error,
				})
			}
		}
	}

	static getFanSpeedLimit() {
		return new BaseCommand('GetFanSpeedLimit', 0x47)
	}

	static setEcmVoltageRange(params: FanCoilThermostatCommandTypes.SetEcmVoltageRangeParams) {
		try {
			DeviceCommandSchemas.FanCoilThermostatCommandSchemas.setEcmVoltageRange.parse(params)
			const { min, max } = params
			return new BaseCommand('SetEcmVoltageRange', 0x48, decToHex(min * 10), decToHex(max * 10))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetEcmVoltageRange execution',
					command: 'SetEcmVoltageRange',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetEcmVoltageRange execution',
					command: 'SetEcmVoltageRange',
					originalError: e as Error,
				})
			}
		}
	}

	static getEcmVoltageRange() {
		return new BaseCommand('GetEcmVoltageRange', 0x49)
	}

	static setEcmStartUpTime(params: FanCoilThermostatCommandTypes.SetEcmStartUpTimeParams) {
		try {
			DeviceCommandSchemas.FanCoilThermostatCommandSchemas.setEcmStartUpTime.parse(params)
			const { value } = params
			return new BaseCommand('SetEcmStartUpTime', 0x4a, decToHex(value))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetEcmStartUpTime execution',
					command: 'SetEcmStartUpTime',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetEcmStartUpTime execution',
					command: 'SetEcmStartUpTime',
					originalError: e as Error,
				})
			}
		}
	}

	static getEcmStartUpTime() {
		return new BaseCommand('GetEcmStartUpTime', 0x4b)
	}

	static setEcmRelay(params: FanCoilThermostatCommandTypes.SetEcmRelayParams) {
		try {
			DeviceCommandSchemas.FanCoilThermostatCommandSchemas.setEcmRelay.parse(params)
			const { value } = params
			return new BaseCommand('SetEcmRelay', 0x4c, decToHex(value))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetEcmRelay execution',
					command: 'SetEcmRelay',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetEcmRelay execution',
					command: 'SetEcmRelay',
					originalError: e as Error,
				})
			}
		}
	}

	static getEcmRelay() {
		return new BaseCommand('GetEcmRelay', 0x4d)
	}

	static setFrostProtection(params: FanCoilThermostatCommandTypes.SetFrostProtectionParams) {
		try {
			DeviceCommandSchemas.FanCoilThermostatCommandSchemas.setFrostProtection.parse(params)
			const { value } = params
			return new BaseCommand('SetFrostProtection', 0x4e, decToHex(value))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetFrostProtection execution',
					command: 'SetFrostProtection',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetFrostProtection execution',
					command: 'SetFrostProtection',
					originalError: e as Error,
				})
			}
		}
	}

	static getFrostProtection() {
		return new BaseCommand('GetFrostProtection', 0x4f)
	}

	static setFrostProtectionSettings(params: FanCoilThermostatCommandTypes.SetFrostProtectionSettingsParams) {
		try {
			DeviceCommandSchemas.FanCoilThermostatCommandSchemas.setFrostProtectionSettings.parse(params)
			const { threshold, setpoint } = params
			return new BaseCommand('SetFrostProtectionSettings', 0x50, decToHex(threshold), decToHex(setpoint))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetFrostProtectionSettings execution',
					command: 'SetFrostProtectionSettings',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetFrostProtectionSettings execution',
					command: 'SetFrostProtectionSettings',
					originalError: e as Error,
				})
			}
		}
	}

	static getFrostProtectionSettings() {
		return new BaseCommand('GetFrostProtectionSettings', 0x51)
	}

	static setAllowedOperationalModes(params: FanCoilThermostatCommandTypes.SetAllowedOperationalModesParams) {
		try {
			DeviceCommandSchemas.FanCoilThermostatCommandSchemas.setAllowedOperationalModes.parse(params)
			const { value } = params
			return new BaseCommand('SetAllowedOperationalModes', 0x54, decToHex(value))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetAllowedOperationalModes execution',
					command: 'SetAllowedOperationalModes',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetAllowedOperationalModes execution',
					command: 'SetAllowedOperationalModes',
					originalError: e as Error,
				})
			}
		}
	}

	static getAllowedOperationalModes() {
		return new BaseCommand('GetAllowedOperationalModes', 0x55)
	}

	static setCoolingSetpointNotOccupied(params: FanCoilThermostatCommandTypes.SetCoolingSetpointNotOccupiedParams) {
		try {
			DeviceCommandSchemas.FanCoilThermostatCommandSchemas.setCoolingSetpointNotOccupied.parse(params)
			const { value } = params
			return new BaseCommand('SetCoolingSetpointNotOccupied', 0x56, decToHex(value))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetCoolingSetpointNotOccupied execution',
					command: 'SetCoolingSetpointNotOccupied',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetCoolingSetpointNotOccupied execution',
					command: 'SetCoolingSetpointNotOccupied',
					originalError: e as Error,
				})
			}
		}
	}

	static getCoolingSetpointNotOccupied() {
		return new BaseCommand('GetCoolingSetpointNotOccupied', 0x57)
	}

	static setHeatingSetpointNotOccupied(params: FanCoilThermostatCommandTypes.SetHeatingSetpointNotOccupiedParams) {
		try {
			DeviceCommandSchemas.FanCoilThermostatCommandSchemas.setHeatingSetpointNotOccupied.parse(params)
			const { value } = params
			return new BaseCommand('SetHeatingSetpointNotOccupied', 0x58, decToHex(value))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetHeatingSetpointNotOccupied execution',
					command: 'SetHeatingSetpointNotOccupied',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetHeatingSetpointNotOccupied execution',
					command: 'SetHeatingSetpointNotOccupied',
					originalError: e as Error,
				})
			}
		}
	}

	static getHeatingSetpointNotOccupied() {
		return new BaseCommand('GetHeatingSetpointNotOccupied', 0x59)
	}

	static setTempSensorCompensation(params: FanCoilThermostatCommandTypes.SetTempSensorCompensationParams) {
		try {
			DeviceCommandSchemas.FanCoilThermostatCommandSchemas.setTempSensorCompensation.parse(params)
			const { compensation, temperature } = params

			// 00: Positive compensation, 01: Negative compensation
			const compensationByte = compensation === 0 ? 0 : 1
			// Use absolute value of temperature * 10 for the temperature byte
			const temperatureByte = Math.abs(temperature * 10)
			return new BaseCommand('SetTempSensorCompensation', 0x5a, decToHex(compensationByte), decToHex(temperatureByte))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetTempSensorCompensation execution',
					command: 'SetTempSensorCompensation',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetTempSensorCompensation execution',
					command: 'SetTempSensorCompensation',
					originalError: e as Error,
				})
			}
		}
	}

	static getTempSensorCompensation() {
		return new BaseCommand('GetTempSensorCompensation', 0x5b)
	}

	static setFanSpeedNotOccupied(params: FanCoilThermostatCommandTypes.SetFanSpeedNotOccupiedParams) {
		try {
			DeviceCommandSchemas.FanCoilThermostatCommandSchemas.setFanSpeedNotOccupied.parse(params)
			const { value } = params
			return new BaseCommand('SetFanSpeedNotOccupied', 0x5c, decToHex(value))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetFanSpeedNotOccupied execution',
					command: 'SetFanSpeedNotOccupied',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetFanSpeedNotOccupied execution',
					command: 'SetFanSpeedNotOccupied',
					originalError: e as Error,
				})
			}
		}
	}

	static getFanSpeedNotOccupied() {
		return new BaseCommand('GetFanSpeedNotOccupied', 0x5d)
	}

	static setAutomaticChangeover(params: FanCoilThermostatCommandTypes.SetAutomaticChangeoverParams) {
		try {
			DeviceCommandSchemas.FanCoilThermostatCommandSchemas.setAutomaticChangeover.parse(params)
			const { value } = params
			return new BaseCommand('SetAutomaticChangeover', 0x5e, decToHex(value))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetAutomaticChangeover execution',
					command: 'SetAutomaticChangeover',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetAutomaticChangeover execution',
					command: 'SetAutomaticChangeover',
					originalError: e as Error,
				})
			}
		}
	}

	static getAutomaticChangeover() {
		return new BaseCommand('GetAutomaticChangeover', 0x5f)
	}

	static setWiringDiagram(params: FanCoilThermostatCommandTypes.SetWiringDiagramParams) {
		try {
			DeviceCommandSchemas.FanCoilThermostatCommandSchemas.setWiringDiagram.parse(params)
			const { value } = params
			return new BaseCommand('SetWiringDiagram', 0x60, decToHex(value))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetWiringDiagram execution',
					command: 'SetWiringDiagram',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetWiringDiagram execution',
					command: 'SetWiringDiagram',
					originalError: e as Error,
				})
			}
		}
	}

	static getWiringDiagram() {
		return new BaseCommand('GetWiringDiagram', 0x61)
	}

	static setOccFunction(params: FanCoilThermostatCommandTypes.SetOccFunctionParams) {
		try {
			DeviceCommandSchemas.FanCoilThermostatCommandSchemas.setOccFunction.parse(params)
			const { value } = params
			return new BaseCommand('SetOccFunction', 0x62, decToHex(value))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetOccFunction execution',
					command: 'SetOccFunction',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetOccFunction execution',
					command: 'SetOccFunction',
					originalError: e as Error,
				})
			}
		}
	}

	static getOccFunction() {
		return new BaseCommand('GetOccFunction', 0x63)
	}

	static setAutomaticChangeoverThreshold(params: FanCoilThermostatCommandTypes.SetAutomaticChangeoverThresholdParams) {
		try {
			DeviceCommandSchemas.FanCoilThermostatCommandSchemas.setAutomaticChangeoverThreshold.parse(params)
			const { coolingThreshold, heatingThreshold } = params
			return new BaseCommand(
				'SetAutomaticChangeoverThreshold',
				0x64,
				decToHex(coolingThreshold),
				decToHex(heatingThreshold),
			)
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetAutomaticChangeoverThreshold execution',
					command: 'SetAutomaticChangeoverThreshold',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetAutomaticChangeoverThreshold execution',
					command: 'SetAutomaticChangeoverThreshold',
					originalError: e as Error,
				})
			}
		}
	}

	static getAutomaticChangeoverThreshold() {
		return new BaseCommand('GetAutomaticChangeoverThreshold', 0x65)
	}

	static setDeviceStatus(params: FanCoilThermostatCommandTypes.SetDeviceStatusParams) {
		try {
			DeviceCommandSchemas.FanCoilThermostatCommandSchemas.setDeviceStatus.parse(params)
			const { value } = params
			return new BaseCommand('SetDeviceStatus', 0x66, decToHex(value))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetDeviceStatus execution',
					command: 'SetDeviceStatus',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetDeviceStatus execution',
					command: 'SetDeviceStatus',
					originalError: e as Error,
				})
			}
		}
	}

	static getDeviceStatus() {
		return new BaseCommand('GetDeviceStatus', 0x67)
	}

	static setReturnOfPowerOperation(params: FanCoilThermostatCommandTypes.SetReturnOfPowerOperationParams) {
		try {
			DeviceCommandSchemas.FanCoilThermostatCommandSchemas.setReturnOfPowerOperation.parse(params)
			const { value } = params
			return new BaseCommand('SetReturnOfPowerOperation', 0x68, decToHex(value))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetReturnOfPowerOperation execution',
					command: 'SetReturnOfPowerOperation',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetReturnOfPowerOperation execution',
					command: 'SetReturnOfPowerOperation',
					originalError: e as Error,
				})
			}
		}
	}

	static getReturnOfPowerOperation() {
		return new BaseCommand('GetReturnOfPowerOperation', 0x69)
	}

	static setDeltaTemperature1(params: FanCoilThermostatCommandTypes.SetDeltaTemperature1Params) {
		try {
			DeviceCommandSchemas.FanCoilThermostatCommandSchemas.setDeltaTemperature1.parse(params)
			const { value } = params
			return new BaseCommand('SetDeltaTemperature1', 0x6a, decToHex(value * 10))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetDeltaTemperature1 execution',
					command: 'SetDeltaTemperature1',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetDeltaTemperature1 execution',
					command: 'SetDeltaTemperature1',
					originalError: e as Error,
				})
			}
		}
	}

	static getDeltaTemperature1() {
		return new BaseCommand('GetDeltaTemperature1', 0x6b)
	}

	static setDeltaTemperature2and3(params: FanCoilThermostatCommandTypes.SetDeltaTemperature2and3Params) {
		try {
			DeviceCommandSchemas.FanCoilThermostatCommandSchemas.setDeltaTemperature2and3.parse(params)
			const { deltaTemperature2, deltaTemperature3 } = params
			return new BaseCommand(
				'SetDeltaTemperature2and3',
				0x6c,
				decToHex(deltaTemperature2 * 10),
				decToHex(deltaTemperature3 * 10),
			)
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetDeltaTemperature2and3 execution',
					command: 'SetDeltaTemperature2and3',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetDeltaTemperature2and3 execution',
					command: 'SetDeltaTemperature2and3',
					originalError: e as Error,
				})
			}
		}
	}

	static getDeltaTemperature2and3() {
		return new BaseCommand('GetDeltaTemperature2and3', 0x6d)
	}

	static getFrostProtectionStatus() {
		return new BaseCommand('GetFrostProtectionStatus', 0x6e)
	}

	static getOccupancySensorStatusSetPoint() {
		return new BaseCommand('GetOccupancySensorStatusSetPoint', 0x70)
	}

	static getOccupancySensorStatus() {
		return new BaseCommand('GetOccupancySensorStatus', 0x71)
	}

	static getDewPointSensorStatus() {
		return new BaseCommand('GetDewPointSensorStatus', 0x72)
	}

	static getFilterAlarm() {
		return new BaseCommand('GetFilterAlarm', 0x73)
	}

	static setHeatingCoolingTargetTempRanges(params: FanCoilThermostatCommandTypes.SetHeatingCoolingTargetTempRanges) {
		try {
			DeviceCommandSchemas.FanCoilThermostatCommandSchemas.setHeatingCoolingTargetTempRanges.parse(params)
			const { heatingTempMin, heatingTempMax, coolingTempMin, coolingTempMax } = params
			return new BaseCommand(
				'SetHeatingCoolingTargetTempRanges',
				0x16,
				decToHex(heatingTempMin),
				decToHex(heatingTempMax),
				decToHex(coolingTempMin),
				decToHex(coolingTempMax),
			)
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetHeatingCoolingTargetTempRanges execution',
					command: 'SetHeatingCoolingTargetTempRanges',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetHeatingCoolingTargetTempRanges execution',
					command: 'SetHeatingCoolingTargetTempRanges',
					originalError: e as Error,
				})
			}
		}
	}
	static getHeatingCoolingTargetTempRanges() {
		return new BaseCommand('GetHeatingCoolingTargetTempRanges', 0x17)
	}
	static setHeatingCoolingTargetTempRangesUnoccupied(
		params: FanCoilThermostatCommandTypes.SetHeatingCoolingTargetTempRangesUnoccupied,
	) {
		try {
			DeviceCommandSchemas.FanCoilThermostatCommandSchemas.setHeatingCoolingTargetTempRangesUnoccupied.parse(params)
			const { heatingTempMin, heatingTempMax, coolingTempMin, coolingTempMax } = params
			return new BaseCommand(
				'SetHeatingCoolingTargetTempRangesUnoccupied',
				0x76,
				decToHex(heatingTempMin),
				decToHex(heatingTempMax),
				decToHex(coolingTempMin),
				decToHex(coolingTempMax),
			)
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetHeatingCoolingTargetTempRangesUnoccupied execution',
					command: 'SetHeatingCoolingTargetTempRangesUnoccupied',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetHeatingCoolingTargetTempRangesUnoccupied execution',
					command: 'SetHeatingCoolingTargetTempRangesUnoccupied',
					originalError: e as Error,
				})
			}
		}
	}
	static getHeatingCoolingTargetTempRangesUnoccupied() {
		return new BaseCommand('SetHeatingCoolingTargetTempRangesUnoccupied', 0x77)
	}

	static setFanOffDelayTime(params: FanCoilThermostatCommandTypes.SetFanOffDelayTimeParams) {
		try {
			DeviceCommandSchemas.FanCoilThermostatCommandSchemas.setFanOffDelayTime.parse(params)
			const { time } = params
			return new BaseCommand('SetFanOffDelayTime', 0x78, decToHex(time))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetFanOffDelayTime execution',
					command: 'SetFanOffDelayTime',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetFanOffDelayTime execution',
					command: 'SetFanOffDelayTime',
					originalError: e as Error,
				})
			}
		}
	}

	static getFanOffDelayTime() {
		return new BaseCommand('getFanOffDelayTime', 0x79)
	}
	static setAdditionalFanMode(params: FanCoilThermostatCommandTypes.SetAdditionalFanModeParams) {
		try {
			DeviceCommandSchemas.FanCoilThermostatCommandSchemas.setAdditionalFanMode.parse(params)
			const { mode } = params
			return new BaseCommand('SetAdditionalFanMode', 0x7a, decToHex(mode))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetAdditionalFanMode execution',
					command: 'SetAdditionalFanMode',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetAdditionalFanMode execution',
					command: 'SetAdditionalFanMode',
					originalError: e as Error,
				})
			}
		}
	}

	static getAdditionalFanMode() {
		return new BaseCommand('GetAdditionalFanMode', 0x7b)
	}

	static getInternalTemperatureSensorError() {
		return new BaseCommand('GetInternalTemperatureSensorError', 0x7c)
	}

	static getExternalTemperatureSensorError() {
		return new BaseCommand('GetExternalTemperatureSensorError', 0x7d)
	}

	static setUserInterfaceLanguage(params: FanCoilThermostatCommandTypes.SetUserInterfaceLanguageParams) {
		try {
			DeviceCommandSchemas.FanCoilThermostatCommandSchemas.setUserInterfaceLanguage.parse(params)
			const { value } = params
			return new BaseCommand('SetUserInterfaceLanguage', 0x9a, decToHex(value))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetUserInterfaceLanguage execution',
					command: 'SetUserInterfaceLanguage',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetUserInterfaceLanguage execution',
					command: 'SetUserInterfaceLanguage',
					originalError: e as Error,
				})
			}
		}
	}

	static getUserInterfaceLanguage() {
		return new BaseCommand('GetUserInterfaceLanguage', 0x9b)
	}

	static restartDevice() {
		return new BaseCommand('RestartDevice', 0xa5)
	}
}

applyMixins(FanCoilThermostatCommands, [DisplayCommands, TemperatureCommonCommands])

delMethods(FanCoilThermostatCommands, [
	'setLightIntensityVisibility',
	'getLightIntensityVisibility',
	'setDeepSleepMode',
])

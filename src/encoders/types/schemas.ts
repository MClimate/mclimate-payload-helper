import { z } from 'zod'

/* ---------------------------------------GENERAL COMMANDS--------------------------------------- */

const GeneralCommandSchemas = {
	customHexCommand: z.object({
		command: z.string(),
	}),
	setKeepAlive: z.object({
		time: z.number(),
	}),
	getKeepAlive: z.object({}),
	setJoinRetryPeriod: z.object({
		period: z.number(),
	}),
	getJoinRetryPeriod: z.object({}),
	setUplinkType: z.object({
		type: z.string(),
	}),
	getUplinkType: z.object({}),
	setWatchDogParams: z.object({
		confirmedUplinks: z.number(),
		unconfirmedUplinks: z.number(),
	}),
	getWatchDogParams: z.object({}),
}

export namespace GeneralCommandTypes {
	export type CustomHexCommandParams = z.infer<typeof GeneralCommandSchemas.customHexCommand>
	export type SetKeepAliveParams = z.infer<typeof GeneralCommandSchemas.setKeepAlive>
	export type SetJoinRetryPeriodParams = z.infer<typeof GeneralCommandSchemas.setJoinRetryPeriod>
	export type SetUplinkTypeParams = z.infer<typeof GeneralCommandSchemas.setUplinkType>
	export type SetWatchDogParams = z.infer<typeof GeneralCommandSchemas.setWatchDogParams>
}

/* ---------------------------------------CHILD LOCK COMMANDS--------------------------------------- */

const ChildLockCommandSchemas = {
	setChildLock: z.object({
		enabled: z.boolean(),
	}),
	getChildLock: z.object({}),
}

export namespace ChildLockCommandTypes {
	export type SetChildLockParams = z.infer<typeof ChildLockCommandSchemas.setChildLock>
}

/* ---------------------------------------TEMPERATURE COMMANDS--------------------------------------- */

const TemperatureCommandSchemas = {
	setTemperatureRange: z.object({
		min: z.number(),
		max: z.number(),
	}),
}

export namespace TemperatureCommandTypes {
	export type SetTemperatureRangeParams = z.infer<typeof TemperatureCommandSchemas.setTemperatureRange>
}

/* ---------------------------------------PIR COMMANDS--------------------------------------- */

const PIRCommandSchemas = {
	setPIRSensorStatus: z.object({
		state: z.number(),
	}),
	getPIRSensorStatus: z.object({}),
	setPIRSensorSensitivity: z.object({
		sensitivity: z.number(),
	}),
	getPIRSensorSensitivity: z.object({}),
	setPIRInitPeriod: z.object({
		time: z.number(),
	}),
	setPIRMeasurementPeriod: z.object({
		time: z.number(),
	}),
	setPIRCheckPeriod: z.object({
		time: z.number(),
	}),
	setPIRBlindPeriod: z.object({
		time: z.number(),
	}),
	getPIRInitPeriod: z.object({}),
	getPIRMeasurementPeriod: z.object({}),
	getPIRCheckPeriod: z.object({}),
	getPIRBlindPeriod: z.object({}),
}

export namespace PIRCommandTypes {
	export type SetPIRSensorStatusParams = z.infer<typeof PIRCommandSchemas.setPIRSensorStatus>
	export type SetPIRSensorSensitivityParams = z.infer<typeof PIRCommandSchemas.setPIRSensorSensitivity>
	export type SetPIRInitPeriodParams = z.infer<typeof PIRCommandSchemas.setPIRInitPeriod>
	export type SetPIRMeasurementPeriodParams = z.infer<typeof PIRCommandSchemas.setPIRMeasurementPeriod>
	export type SetPIRCheckPeriodParams = z.infer<typeof PIRCommandSchemas.setPIRCheckPeriod>
	export type SetPIRBlindPeriodParams = z.infer<typeof PIRCommandSchemas.setPIRBlindPeriod>
}

/* ---------------------------------------DISPLAY COMMANDS--------------------------------------- */

const DisplayCommandSchemas = {
	setDisplayRefreshPeriod: z.object({
		period: z.number(),
	}),
	getDisplayRefreshPeriod: z.object({}),
	setDeepSleepMode: z.object({
		state: z.number(),
	}),
	setHumidityVisibility: z.object({
		state: z.number(),
	}),
	getHumidityVisibility: z.object({}),
	setLightIntensityVisibility: z.object({
		state: z.number(),
	}),
	getLightIntensityVisibility: z.object({}),
	setCurrentTemperatureVisibility: z.object({
		state: z.number(),
	}),
	getCurrentTemperatureVisibility: z.object({}),
}

export namespace DisplayCommandTypes {
	export type SetDisplayRefreshPeriodParams = z.infer<typeof DisplayCommandSchemas.setDisplayRefreshPeriod>
	export type SetDeepSleepModeParams = z.infer<typeof DisplayCommandSchemas.setDeepSleepMode>
	export type SetHumidityVisibilityParams = z.infer<typeof DisplayCommandSchemas.setHumidityVisibility>
	export type SetLightIntensityVisibilityParams = z.infer<typeof DisplayCommandSchemas.setLightIntensityVisibility>
	export type SetCurrentTemperatureVisibilityParams = z.infer<
		typeof DisplayCommandSchemas.setCurrentTemperatureVisibility
	>
}

/* ---------------------------------------VICKI COMMANDS--------------------------------------- */

const VickiCommandSchemas = {
	...GeneralCommandSchemas,
	...TemperatureCommandSchemas,
	...ChildLockCommandSchemas,
	setOpenWindow: z.object({
		enabled: z.boolean(),
		delta: z.number(),
		closeTime: z.number(),
		motorPosition: z.number(),
	}),
	getOpenWindowParams: z.object({}),
	recalibrateMotor: z.object({}),
	forceClose: z.object({}),
	setInternalAlgoParams: z.object({
		period: z.number(),
		pFirstLast: z.number(),
		pNext: z.number(),
	}),
	getInternalAlgoParams: z.object({}),
	setOperationalMode: z.object({
		mode: z.string(),
	}),
	getOperationalMode: z.object({}),
	setTargetTemperature: z.object({
		targetTemperature: z.number(),
	}),
	setExternalTemperature: z.object({
		temp: z.number(),
	}),
	getExternalTemperature: z.object({}),
	setInternalAlgoTdiffParams: z.object({
		cold: z.number(),
		warm: z.number(),
	}),
	getInternalAlgoTdiffParams: z.object({}),
	setPrimaryOperationalMode: z.object({
		mode: z.string(),
	}),
	getPrimaryOperationalMode: z.object({}),
	setBatteryRangesBoundaries: z.object({
		Boundary1: z.number(),
		Boundary2: z.number(),
		Boundary3: z.number(),
	}),
	setBatteryRangesOverVoltage: z.object({
		Range1: z.number(),
		Range2: z.number(),
		Range3: z.number(),
	}),
	setOvac: z.object({
		ovac: z.number(),
	}),
	getOvac: z.object({}),
	setProportionalAlgorithmParameters: z.object({
		coefficient: z.number(),
		period: z.number(),
	}),
	getProportionalAlgorithmParameters: z.object({}),
	setTemperatureControlAlgorithm: z.object({
		algorithm: z.string(),
	}),
	getTemperatureControlAlgorithm: z.object({}),
	setMotorPositionOnly: z.object({
		position: z.number(),
	}),
	deviceReset: z.object({}),
	setTargetTemperatureAndMotorPosition: z.object({
		motorPosition: z.number(),
		targetTemperature: z.number(),
	}),
	setChildLockBehavior: z.object({
		behavior: z.number(),
	}),
	getChildLockBehavior: z.object({}),
	setProportionalGain: z.object({
		proportionalGain: z.number(),
	}),
	getProportionalGain: z.object({}),
	setExternalTemperatureFloat: z.object({
		temp: z.number(),
	}),
	setIntegralGain: z.object({
		integralGain: z.number(),
	}),
	getIntegralGain: z.object({}),
	getIntegralValue: z.object({}),
	setPiRunPeriod: z.object({
		period: z.number(),
	}),
	getPiRunPeriod: z.object({}),
	setTemperatureHysteresis: z.object({
		hysteresis: z.number(),
	}),
	getTemperatureHysteresis: z.object({}),
	setOpenWindowPrecisely: z.object({
		enabled: z.boolean(),
		duration: z.number(),
		delta: z.number(),
	}),
	getOpenWindowPrecisely: z.object({}),
	setForceAttach: z.object({
		enabled: z.boolean(),
	}),
	getForceAttach: z.object({}),
	setAntiFreezeParams: z.object({
		activatedTemperature: z.number(),
		deactivatedTemperature: z.number(),
		targetTemperature: z.number(),
	}),
	getAntiFreezeParams: z.object({}),
	setMaxAllowedIntegralValue: z.object({
		value: z.number(),
	}),
	getMaxAllowedIntegralValue: z.object({}),
	setValveOpennessInPercentage: z.object({
		value: z.number(),
	}),
	setValveOpennessRangeInPercentage: z.object({
		min: z.number(),
		max: z.number(),
	}),
	getValveOpennessRangeInPercentage: z.object({}),
	setTemperatureOffset: z.object({
		value: z.number(),
	}),
	getTemperatureOffset: z.object({}),
}

export namespace VickiCommandTypes {
	export type SetOpenWindowParams = z.infer<typeof VickiCommandSchemas.setOpenWindow>
	export type SetInternalAlgoParamsParams = z.infer<typeof VickiCommandSchemas.setInternalAlgoParams>
	export type SetOperationalModeParams = z.infer<typeof VickiCommandSchemas.setOperationalMode>
	export type SetTargetTemperatureParams = z.infer<typeof VickiCommandSchemas.setTargetTemperature>
	export type SetExternalTemperatureParams = z.infer<typeof VickiCommandSchemas.setExternalTemperature>
	export type SetInternalAlgoTdiffParamsParams = z.infer<typeof VickiCommandSchemas.setInternalAlgoTdiffParams>
	export type SetPrimaryOperationalModeParams = z.infer<typeof VickiCommandSchemas.setPrimaryOperationalMode>
	export type SetBatteryRangesBoundariesParams = z.infer<typeof VickiCommandSchemas.setBatteryRangesBoundaries>
	export type SetBatteryRangesOverVoltageParams = z.infer<typeof VickiCommandSchemas.setBatteryRangesOverVoltage>
	export type SetOvacParams = z.infer<typeof VickiCommandSchemas.setOvac>
	export type SetProportionalAlgorithmParametersParams = z.infer<
		typeof VickiCommandSchemas.setProportionalAlgorithmParameters
	>
	export type SetTemperatureControlAlgorithmParams = z.infer<typeof VickiCommandSchemas.setTemperatureControlAlgorithm>
	export type SetMotorPositionOnlyParams = z.infer<typeof VickiCommandSchemas.setMotorPositionOnly>
	export type SetTargetTemperatureAndMotorPositionParams = z.infer<
		typeof VickiCommandSchemas.setTargetTemperatureAndMotorPosition
	>
	export type SetChildLockBehaviorParams = z.infer<typeof VickiCommandSchemas.setChildLockBehavior>
	export type SetProportionalGainParams = z.infer<typeof VickiCommandSchemas.setProportionalGain>
	export type SetExternalTemperatureFloatParams = z.infer<typeof VickiCommandSchemas.setExternalTemperatureFloat>
	export type SetIntegralGainParams = z.infer<typeof VickiCommandSchemas.setIntegralGain>
	export type SetPiRunPeriodParams = z.infer<typeof VickiCommandSchemas.setPiRunPeriod>
	export type SetTemperatureHysteresisParams = z.infer<typeof VickiCommandSchemas.setTemperatureHysteresis>
	export type SetOpenWindowPreciselyParams = z.infer<typeof VickiCommandSchemas.setOpenWindowPrecisely>
	export type SetForceAttachParams = z.infer<typeof VickiCommandSchemas.setForceAttach>
	export type SetAntiFreezeParamsParams = z.infer<typeof VickiCommandSchemas.setAntiFreezeParams>
	export type SetMaxAllowedIntegralValueParams = z.infer<typeof VickiCommandSchemas.setMaxAllowedIntegralValue>
	export type SetValveOpennessInPercentageParams = z.infer<typeof VickiCommandSchemas.setValveOpennessInPercentage>
	export type SetValveOpennessRangeInPercentageParams = z.infer<
		typeof VickiCommandSchemas.setValveOpennessRangeInPercentage
	>
	export type SetTemperatureOffsetParams = z.infer<typeof VickiCommandSchemas.setTemperatureOffset>
}

/* --------------------------------------- RELAY 16 COMMANDS --------------------------------------- */

const Relay16CommandSchemas = {
	...GeneralCommandSchemas,
	setOverheatingThresholds: z.object({
		trigger: z.number(),
		recovery: z.number(),
	}),
	getOverheatingThresholds: z.object({}),
	setOvervoltageThresholds: z.object({
		trigger: z.number(),
		recovery: z.number(),
	}),
	getOvervoltageThresholds: z.object({}),
	setOvercurrentThreshold: z.object({
		current: z.number(),
	}),
	getOvercurrentThreshold: z.object({}),
	setOverpowerThreshold: z.object({
		power: z.number(),
	}),
	getOverpowerThreshold: z.object({}),
	setAfterOverheatingProtectionRecovery: z.object({
		state: z.number(),
	}),
	getAfterOverheatingProtectionRecovery: z.object({}),
	setLedIndicationMode: z.object({
		mode: z.number(),
	}),
	getLedIndicationMode: z.object({}),
	setRelayRecoveryState: z.object({
		state: z.number(),
	}),
	getRelayRecoveryState: z.object({}),
	setRelayState: z.object({
		state: z.boolean(),
	}),
	getRelayState: z.object({}),
	setRelayTimerInMiliseconds: z.object({
		state: z.number(),
		time: z.number(),
	}),
	getRelayTimerInMiliseconds: z.object({}),
	setRelayTimerInSeconds: z.object({
		state: z.number(),
		time: z.number(),
	}),
	getRelayTimerInSeconds: z.object({}),
	getRelayStateChangeReason: z.object({}),
	getOverheatingEvents: z.object({}),
	getOvervoltageEvents: z.object({}),
	getOvercurrentEvents: z.object({}),
	getOverpowerEvents: z.object({}),
}

export namespace Relay16CommandTypes {
	export type SetOverheatingThresholdsParams = z.infer<typeof Relay16CommandSchemas.setOverheatingThresholds>
	export type SetOvervoltageThresholdsParams = z.infer<typeof Relay16CommandSchemas.setOvervoltageThresholds>
	export type SetOvercurrentThresholdParams = z.infer<typeof Relay16CommandSchemas.setOvercurrentThreshold>
	export type SetOverpowerThresholdParams = z.infer<typeof Relay16CommandSchemas.setOverpowerThreshold>
	export type SetAfterOverheatingProtectionRecoveryParams = z.infer<
		typeof Relay16CommandSchemas.setAfterOverheatingProtectionRecovery
	>
	export type SetLedIndicationModeParams = z.infer<typeof Relay16CommandSchemas.setLedIndicationMode>
	export type SetRelayRecoveryStateParams = z.infer<typeof Relay16CommandSchemas.setRelayRecoveryState>
	export type SetRelayStateParams = z.infer<typeof Relay16CommandSchemas.setRelayState>
	export type SetRelayTimerInMilisecondsParams = z.infer<typeof Relay16CommandSchemas.setRelayTimerInMiliseconds>
	export type SetRelayTimerInSecondsParams = z.infer<typeof Relay16CommandSchemas.setRelayTimerInSeconds>
}

/* --------------------------------------- RELAY 16 DRY COMMANDS --------------------------------------- */

const Relay16DryCommandSchemas = {
	...GeneralCommandSchemas,
	setOverheatingThresholds: z.object({
		trigger: z.number(),
		recovery: z.number(),
	}),
	getOverheatingThresholds: z.object({}),
	setAfterOverheatingProtectionRecovery: z.object({
		state: z.number(),
	}),
	setRelayTimerInMiliseconds: z.object({
		state: z.number(),
		time: z.number(),
	}),
	getRelayTimerInMiliseconds: z.object({}),
	setRelayTimerInSeconds: z.object({
		state: z.number(),
		time: z.number(),
	}),
	getRelayTimerInSeconds: z.object({}),
	getRelayStateChangeReason: z.object({}),
	getAfterOverheatingProtectionRecovery: z.object({}),
	setLedIndicationMode: z.object({
		mode: z.number(),
	}),
	getLedIndicationMode: z.object({}),
	setRelayRecoveryState: z.object({
		state: z.number(),
	}),
	getRelayRecoveryState: z.object({}),
	setRelayState: z.object({
		state: z.boolean(),
	}),
	getRelayState: z.object({}),
	getOverheatingEvents: z.object({}),
}

// ------------------------------------------------ T-VALVE COMMANDS ------------------------------------------------

const TValveCommandSchemas = {
	...GeneralCommandSchemas,
	setOpenCloseTime: z.object({
		openingTime: z.number(),
		closingTime: z.number(),
	}),
	getOpenCloseTime: z.object({}),
	setLED: z.object({
		ledId: z.number(),
		behavior: z.number(),
		seconds: z.number(),
	}),
	setBuzzer: z.object({
		volume: z.number(),
		frequency: z.number(),
		activeTime: z.number(),
		onTime: z.number(),
		offTime: z.number(),
	}),
	setEmergencyOpenings: z.object({
		maxOpenings: z.number(),
	}),
	getEmergencyOpenings: z.object({}),
	setManualControl: z.object({
		enableOpen: z.boolean(),
		enableClose: z.boolean(),
	}),
	setFloodAlarmTime: z.object({
		time: z.number(),
	}),
	getFloodAlarmTime: z.object({}),
	setKeepAliveTValve: z.object({
		time: z.number(),
	}),
	setWorkingVoltage: z.object({
		voltage: z.number(),
	}),
	getWorkingVoltage: z.object({}),
	setValveState: z.object({
		state: z.number(),
	}),
	setOpenCloseTimeExtended: z.object({
		openingTime: z.number(),
		closingTime: z.number(),
	}),
	getOpenCloseTimeExtended: z.object({}),
	setSingleTimeValveState: z.object({
		state: z.number(),
		time: z.number(),
	}),
	setDeviceFloodSensor: z.object({
		enabled: z.boolean(),
	}),
	getDeviceFloodSensor: z.object({}),
	setJoinRetryPeriodTValve: z.object({
		period: z.number(),
	}),
	setUplinkTypeTValve: z.object({
		type: z.string(),
	}),
	setWatchDogTValveParams: z.object({
		confirmedUplinks: z.number(),
		unconfirmedUplinks: z.number(),
	}),
	getWatchDogParams: z.object({}),
	requestFullData: z.object({}),
}

export namespace TValveCommandTypes {
	export type SetOpenCloseTimeParams = z.infer<typeof TValveCommandSchemas.setOpenCloseTime>
	export type SetLEDParams = z.infer<typeof TValveCommandSchemas.setLED>
	export type SetBuzzerParams = z.infer<typeof TValveCommandSchemas.setBuzzer>
	export type SetEmergencyOpeningsParams = z.infer<typeof TValveCommandSchemas.setEmergencyOpenings>
	export type SetManualControlParams = z.infer<typeof TValveCommandSchemas.setManualControl>
	export type SetFloodAlarmTimeParams = z.infer<typeof TValveCommandSchemas.setFloodAlarmTime>
	export type SetKeepAliveParams = z.infer<typeof TValveCommandSchemas.setKeepAliveTValve>
	export type SetWorkingVoltageParams = z.infer<typeof TValveCommandSchemas.setWorkingVoltage>
	export type SetValveStateParams = z.infer<typeof TValveCommandSchemas.setValveState>
	export type SetOpenCloseTimeExtendedParams = z.infer<typeof TValveCommandSchemas.setOpenCloseTimeExtended>
	export type SetSingleTimeValveStateParams = z.infer<typeof TValveCommandSchemas.setSingleTimeValveState>
	export type SetDeviceFloodSensorParams = z.infer<typeof TValveCommandSchemas.setDeviceFloodSensor>
	export type SetJoinRetryPeriodTValveParams = z.infer<typeof TValveCommandSchemas.setJoinRetryPeriodTValve>
	export type SetUplinkTypeTValveParams = z.infer<typeof TValveCommandSchemas.setUplinkTypeTValve>
	export type SetWatchDogTValveParams = z.infer<typeof TValveCommandSchemas.setWatchDogTValveParams>
}

/* --------------------------------------- FAN COIL THERMOSTAT COMMANDS --------------------------------------- */

const FanCoilThermostatCommandSchemas = {
	...GeneralCommandSchemas,
	...TemperatureCommandSchemas,
	setDisplayRefreshPeriod: z.object({
		period: z.number(),
	}),
	getDisplayRefreshPeriod: z.object({}),
	setHumidityVisibility: z.object({
		state: z.number(),
	}),
	getHumidityVisibility: z.object({}),
	setCurrentTemperatureVisibility: z.object({
		state: z.number(),
	}),
	getCurrentTemperatureVisibility: z.object({}),

	setTargetTemperatureStep: z.object({
		value: z.number(),
	}),
	getTargetTemperatureStep: z.object({}),
	setKeysLock: z.object({
		value: z.number(),
	}),
	getKeysLock: z.object({}),
	setTargetTemperature: z.object({
		targetTemperature: z.number(),
	}),
	setValveOpenCloseTime: z.object({
		value: z.number(),
	}),
	getValveOpenCloseTime: z.object({}),
	setExtAutomaticTemperatureControl: z.object({
		value: z.number(),
	}),
	getExtAutomaticTemperatureControl: z.object({}),
	setFanSpeed: z.object({
		value: z.number(),
	}),
	getFanSpeed: z.object({}),
	setFanSpeedLimit: z.object({
		value: z.number(),
	}),
	getFanSpeedLimit: z.object({}),
	setEcmVoltageRange: z.object({
		min: z.number(),
		max: z.number(),
	}),
	getEcmVoltageRange: z.object({}),
	setEcmStartUpTime: z.object({
		value: z.number(),
	}),
	getEcmStartUpTime: z.object({}),
	setEcmRelay: z.object({
		value: z.number(),
	}),
	getEcmRelay: z.object({}),
	setFrostProtection: z.object({
		value: z.number(),
	}),
	getFrostProtection: z.object({}),
	setFrostProtectionSettings: z.object({
		threshold: z.number(),
		setpoint: z.number(),
	}),
	getFrostProtectionSettings: z.object({}),
	setFctOperationalMode: z.object({
		value: z.number(),
	}),
	setAllowedOperationalModes: z.object({
		value: z.number(),
	}),
	getAllowedOperationalModes: z.object({}),
	setCoolingSetpointNotOccupied: z.object({
		value: z.number(),
	}),
	getCoolingSetpointNotOccupied: z.object({}),
	setHeatingSetpointNotOccupied: z.object({
		value: z.number(),
	}),
	getHeatingSetpointNotOccupied: z.object({}),
	setTempSensorCompensation: z.object({
		compensation: z.number(),
		temperature: z.number(),
	}),
	getTempSensorCompensation: z.object({}),
	setFanSpeedNotOccupied: z.object({
		value: z.number(),
	}),
	getFanSpeedNotOccupied: z.object({}),
	setAutomaticChangeover: z.object({
		value: z.number(),
	}),
	getAutomaticChangeover: z.object({}),
	setWiringDiagram: z.object({
		value: z.number(),
	}),
	getWiringDiagram: z.object({}),
	setOccFunction: z.object({
		value: z.number(),
	}),
	getOccFunction: z.object({}),
	setAutomaticChangeoverThreshold: z.object({
		coolingThreshold: z.number(),
		heatingThreshold: z.number(),
	}),
	getAutomaticChangeoverThreshold: z.object({}),
	setDeviceStatus: z.object({
		value: z.number(),
	}),
	getDeviceStatus: z.object({}),
	setReturnOfPowerOperation: z.object({
		value: z.number(),
	}),
	getReturnOfPowerOperation: z.object({}),
	setDeltaTemperature1: z.object({
		value: z.number(),
	}),
	getDeltaTemperature1: z.object({}),
	setDeltaTemperature2and3: z.object({
		deltaTemperature2: z.number(),
		deltaTemperature3: z.number(),
	}),
	getDeltaTemperature2and3: z.object({}),
	getFrostProtectionStatus: z.object({}),
	getOccupancySensorStatusSetPoint: z.object({}),
	getOccupancySensorStatus: z.object({}),
	getDewPointSensorStatus: z.object({}),
	getFilterAlarm: z.object({}),
	setHeatingCoolingTargetTempRanges: z.object({
		heatingTempMin: z.number(),
		heatingTempMax: z.number(),
		coolingTempMin: z.number(),
		coolingTempMax: z.number(),
	}),
	getHeatingCoolingTargetTempRanges: z.object({}),
	setHeatingCoolingTargetTempRangesUnoccupied: z.object({
		heatingTempMin: z.number(),
		heatingTempMax: z.number(),
		coolingTempMin: z.number(),
		coolingTempMax: z.number(),
	}),
	getHeatingCoolingTargetTempRangesUnoccupied: z.object({}),
	setFanOffDelayTime: z.object({
		time: z.number(),
	}),
	getFanOffDelayTime: z.object({}),
	setAdditionalFanMode: z.object({
		mode: z.number(),
	}),
	getAdditionalFanMode: z.object({}),
	getInternalTemperatureSensorError: z.object({}),
	getExternalTemperatureSensorError: z.object({}),
	setUserInterfaceLanguage: z.object({
		value: z.number(),
	}),
	getUserInterfaceLanguage: z.object({}),
	restartDevice: z.object({}),
}

export namespace FanCoilThermostatCommandTypes {
	export type SetTargetTemperatureStepParams = z.infer<typeof FanCoilThermostatCommandSchemas.setTargetTemperatureStep>
	export type SetKeysLockParams = z.infer<typeof FanCoilThermostatCommandSchemas.setKeysLock>
	export type SetTargetTemperatureParams = z.infer<typeof FanCoilThermostatCommandSchemas.setTargetTemperature>
	export type SetValveOpenCloseTimeParams = z.infer<typeof FanCoilThermostatCommandSchemas.setValveOpenCloseTime>
	export type SetExtAutomaticTemperatureControlParams = z.infer<
		typeof FanCoilThermostatCommandSchemas.setExtAutomaticTemperatureControl
	>
	export type SetFanSpeedParams = z.infer<typeof FanCoilThermostatCommandSchemas.setFanSpeed>
	export type SetFanSpeedLimitParams = z.infer<typeof FanCoilThermostatCommandSchemas.setFanSpeedLimit>
	export type SetEcmVoltageRangeParams = z.infer<typeof FanCoilThermostatCommandSchemas.setEcmVoltageRange>
	export type SetEcmStartUpTimeParams = z.infer<typeof FanCoilThermostatCommandSchemas.setEcmStartUpTime>
	export type SetEcmRelayParams = z.infer<typeof FanCoilThermostatCommandSchemas.setEcmRelay>
	export type SetFrostProtectionParams = z.infer<typeof FanCoilThermostatCommandSchemas.setFrostProtection>
	export type SetFrostProtectionSettingsParams = z.infer<
		typeof FanCoilThermostatCommandSchemas.setFrostProtectionSettings
	>
	export type SetFctOperationalModeParams = z.infer<typeof FanCoilThermostatCommandSchemas.setFctOperationalMode>
	export type SetAllowedOperationalModesParams = z.infer<
		typeof FanCoilThermostatCommandSchemas.setAllowedOperationalModes
	>
	export type SetCoolingSetpointNotOccupiedParams = z.infer<
		typeof FanCoilThermostatCommandSchemas.setCoolingSetpointNotOccupied
	>
	export type SetHeatingSetpointNotOccupiedParams = z.infer<
		typeof FanCoilThermostatCommandSchemas.setHeatingSetpointNotOccupied
	>
	export type SetTempSensorCompensationParams = z.infer<typeof FanCoilThermostatCommandSchemas.setTempSensorCompensation>
	export type SetFanSpeedNotOccupiedParams = z.infer<typeof FanCoilThermostatCommandSchemas.setFanSpeedNotOccupied>
	export type SetAutomaticChangeoverParams = z.infer<typeof FanCoilThermostatCommandSchemas.setAutomaticChangeover>
	export type SetWiringDiagramParams = z.infer<typeof FanCoilThermostatCommandSchemas.setWiringDiagram>
	export type SetOccFunctionParams = z.infer<typeof FanCoilThermostatCommandSchemas.setOccFunction>
	export type SetAutomaticChangeoverThresholdParams = z.infer<
		typeof FanCoilThermostatCommandSchemas.setAutomaticChangeoverThreshold
	>
	export type SetDeviceStatusParams = z.infer<typeof FanCoilThermostatCommandSchemas.setDeviceStatus>
	export type SetReturnOfPowerOperationParams = z.infer<typeof FanCoilThermostatCommandSchemas.setReturnOfPowerOperation>
	export type SetDeltaTemperature1Params = z.infer<typeof FanCoilThermostatCommandSchemas.setDeltaTemperature1>
	export type SetDeltaTemperature2and3Params = z.infer<typeof FanCoilThermostatCommandSchemas.setDeltaTemperature2and3>
	export type SetHeatingCoolingTargetTempRanges = z.infer<typeof FanCoilThermostatCommandSchemas.setHeatingCoolingTargetTempRanges>
	export type SetHeatingCoolingTargetTempRangesUnoccupied = z.infer<typeof FanCoilThermostatCommandSchemas.setHeatingCoolingTargetTempRangesUnoccupied>
	export type SetFanOffDelayTime = z.infer<typeof FanCoilThermostatCommandSchemas.setFanOffDelayTime>
	export type SetAdditionalFanMode = z.infer<typeof FanCoilThermostatCommandSchemas.setAdditionalFanMode>
	export type SetUserInterfaceLanguage = z.infer<typeof FanCoilThermostatCommandSchemas.setUserInterfaceLanguage>
}

/* --------------------------------------- OPEN CLOSE SENSOR COMMANDS --------------------------------------- */
const OpenCloseSensorCommandSchemas = {
	...GeneralCommandSchemas,
	setNotificationBlindTime: z.object({
		time: z.number(),
	}),
	getNotificationBlindTime: z.object({}),
}

export namespace OpenCloseSensorCommandTypes {
	export type SetNotificationBlindTimeParams = z.infer<typeof OpenCloseSensorCommandSchemas.setNotificationBlindTime>
}

/* --------------------------------------- WIRELESS THERMOSTAT COMMANDS --------------------------------------- */
const WirelessThermostatCommandSchemas = {
	...GeneralCommandSchemas,
	...TemperatureCommandSchemas,
	...DisplayCommandSchemas,
	...PIRCommandSchemas,
	...ChildLockCommandSchemas,
	setTargetTemperature: z.object({
		targetTemperature: z.number(),
	}),
	getTargetTemperature: z.object({}),
	setHeatingStatus: z.object({
		status: z.number(),
	}),
	getHeatingStatus: z.object({}),
	setDisplayRefreshPeriod: z.object({
		period: z.number(),
	}),
	getDisplayRefreshPeriod: z.object({}),
	setTargetSendDelay: z.object({
		time: z.number(),
	}),
	getTargetSendDelay: z.object({}),
	setAutomaticHeatingStatus: z.object({
		state: z.number(),
	}),
	getAutomaticHeatingStatus: z.object({}),
	setSensorMode: z.object({
		state: z.number(),
	}),
	getSensorMode: z.object({}),
	setTemperatureHysteresis: z.object({
		hysteresis: z.number(),
	}),
	getTemperatureHysteresis: z.object({}),
	setTargetTemperaturePrecisely: z.object({
		targetTemperature: z.number(),
	}),
	getTargetTemperaturePrecisely: z.object({}),
	setTargetTemperatureStep: z.object({
		value: z.number(),
	}),
	getTargetTemperatureStep: z.object({}),
}

export namespace WirelessThermostatCommandTypes {
	export type SetTargetTemperatureParams = z.infer<typeof WirelessThermostatCommandSchemas.setTargetTemperature>
	export type SetHeatingStatusParams = z.infer<typeof WirelessThermostatCommandSchemas.setHeatingStatus>
	export type SetDisplayRefreshPeriodParams = z.infer<typeof WirelessThermostatCommandSchemas.setDisplayRefreshPeriod>
	export type SetTargetSendDelayParams = z.infer<typeof WirelessThermostatCommandSchemas.setTargetSendDelay>
	export type SetAutomaticHeatingStatusParams = z.infer<
		typeof WirelessThermostatCommandSchemas.setAutomaticHeatingStatus
	>
	export type SetSensorModeParams = z.infer<typeof WirelessThermostatCommandSchemas.setSensorMode>
	export type SetTemperatureHysteresisParams = z.infer<typeof WirelessThermostatCommandSchemas.setTemperatureHysteresis>
	export type SetTargetTemperaturePreciselyParams = z.infer<
		typeof WirelessThermostatCommandSchemas.setTargetTemperaturePrecisely
	>
	export type SetTargetTemperatureStepParams = z.infer<typeof WirelessThermostatCommandSchemas.setTargetTemperatureStep>
}

/* --------------------------------------- CO2 SENSOR COMMANDS --------------------------------------- */
const CO2SensorCommandSchemas = {
	...GeneralCommandSchemas,
	setCo2BoundaryLevels: z.object({
		good_medium: z.number(),
		medium_bad: z.number(),
	}),
	getCo2BoundaryLevels: z.object({}),
	setCo2AutoZeroValue: z.object({
		ppm: z.number(),
	}),
	getCo2AutoZeroValue: z.object({}),
	setNotifyPeriod: z.object({
		good_zone: z.number(),
		medium_zone: z.number(),
		bad_zone: z.number(),
	}),
	getNotifyPeriod: z.object({}),
	setCo2MeasurementPeriod: z.object({
		good_zone: z.number(),
		medium_zone: z.number(),
		bad_zone: z.number(),
	}),
	getCo2MeasurementPeriod: z.object({}),
	setBuzzerNotification: z.object({
		duration_good_beeping: z.number(),
		duration_good_loud: z.number(),
		duration_good_silent: z.number(),
		duration_medium_beeping: z.number(),
		duration_medium_loud: z.number(),
		duration_medium_silent: z.number(),
		duration_bad_beeping: z.number(),
		duration_bad_loud: z.number(),
		duration_bad_silent: z.number(),
	}),
	getBuzzerNotification: z.object({}),
	setCo2Led: z.object({
		red_good: z.number(),
		green_good: z.number(),
		blue_good: z.number(),
		duration_good: z.number(),
		red_medium: z.number(),
		green_medium: z.number(),
		blue_medium: z.number(),
		duration_medium: z.number(),
		red_bad: z.number(),
		green_bad: z.number(),
		blue_bad: z.number(),
		duration_bad: z.number(),
	}),
	getCo2Led: z.object({}),
	setCo2AutoZeroPeriod: z.object({
		hours: z.number(),
	}),
	getCo2AutoZeroPeriod: z.object({}),
}

export namespace CO2SensorCommandTypes {
	export type SetCo2BoundaryLevelsParams = z.infer<typeof CO2SensorCommandSchemas.setCo2BoundaryLevels>
	export type SetCo2AutoZeroValueParams = z.infer<typeof CO2SensorCommandSchemas.setCo2AutoZeroValue>
	export type SetNotifyPeriodParams = z.infer<typeof CO2SensorCommandSchemas.setNotifyPeriod>
	export type SetCo2MeasurementPeriodParams = z.infer<typeof CO2SensorCommandSchemas.setCo2MeasurementPeriod>
	export type SetBuzzerNotificationParams = z.infer<typeof CO2SensorCommandSchemas.setBuzzerNotification>
	export type SetCo2LedParams = z.infer<typeof CO2SensorCommandSchemas.setCo2Led>
	export type SetCo2AutoZeroPeriodParams = z.infer<typeof CO2SensorCommandSchemas.setCo2AutoZeroPeriod>
}

/* --------------------------------------- CO2 DISPLAY COMMANDS --------------------------------------- */
const CO2DisplayCommandSchemas = {
	...DisplayCommandSchemas,
	...PIRCommandSchemas,
	...ChildLockCommandSchemas,
	setCo2MeasurementBlindTime: z.object({
		time: z.number(),
	}),
	getCo2MeasurementBlindTime: z.object({}),
	setCo2BoundaryLevels: z.object({
		good_medium: z.number(),
		medium_bad: z.number(),
	}),
	getCo2BoundaryLevels: z.object({}),
	setCo2AutoZeroValue: z.object({
		ppm: z.number(),
	}),
	getCo2AutoZeroValue: z.object({}),
	setCo2MeasurementPeriod: z.object({
		good_zone: z.number(),
		medium_zone: z.number(),
		bad_zone: z.number(),
	}),
	getCo2MeasurementPeriod: z.object({}),
	setCo2AutoZeroPeriod: z.object({
		hours: z.number(),
	}),
	getCo2AutoZeroPeriod: z.object({}),

	setCo2ImagesVisibility: z.object({
		chart: z.boolean(),
		digital_value: z.boolean(),
		emoji: z.boolean(),
	}),
	getCo2ImagesVisibility: z.object({}),
}

export namespace CO2DisplayCommandTypes {
	export type SetCo2ImagesVisibilityParams = z.infer<typeof CO2DisplayCommandSchemas.setCo2ImagesVisibility>
	export type SetCo2MeasurementBlindTimeParams = z.infer<typeof CO2DisplayCommandSchemas.setCo2MeasurementBlindTime>
}

/* --------------------------------------- CO2 DISPLAY LITE COMMANDS --------------------------------------- */
const CO2DisplayLiteCommandSchemas = {
	...DisplayCommandSchemas,
	...ChildLockCommandSchemas,
	setCo2BoundaryLevels: z.object({
		good_medium: z.number(),
		medium_bad: z.number(),
	}),
	getCo2BoundaryLevels: z.object({}),
	setCo2AutoZeroValue: z.object({
		ppm: z.number(),
	}),
	getCo2AutoZeroValue: z.object({}),
	setCo2MeasurementPeriod: z.object({
		good_zone: z.number(),
		medium_zone: z.number(),
		bad_zone: z.number(),
	}),
	getCo2MeasurementPeriod: z.object({}),
	setCo2AutoZeroPeriod: z.object({
		hours: z.number(),
	}),
	getCo2AutoZeroPeriod: z.object({}),
	setCo2ImagesVisibility: z.object({
		digital_value: z.boolean(),
		emoji: z.boolean(),
	}),
	getCo2ImagesVisibility: z.object({}),
	setUplinkSendingOnButtonPress: z.object({
		value: z.number(),
	}),
	getUplinkSendingOnButtonPress: z.object({}),
	restartDevice: z.object({}),
}

export namespace CO2DisplayLiteCommandTypes {
	export type SetCo2ImagesVisibilityParams = z.infer<typeof CO2DisplayLiteCommandSchemas.setCo2ImagesVisibility>
	export type SetUplinkSendingOnButtonPress = z.infer<typeof CO2DisplayLiteCommandSchemas.setUplinkSendingOnButtonPress>
}

/* --------------------------------------- HT SENSOR COMMANDS --------------------------------------- */
const HTSensorCommandSchemas = {
	...GeneralCommandSchemas,
	setTemperatureCompensation: z.object({
		negativeCompensation: z.boolean(), // true: negative compensation, false: positive compensation
		compensation: z.number(),
	}),
	getTemperatureCompensation: z.object({}),
	setHumidityCompensation: z.object({
		negativeCompensation: z.boolean(), // true: negative compensation, false: positive compensation
		compensation: z.number(),
	}),
	getHumidityCompensation: z.object({}),
}

export namespace HTSensorCommandTypes {
	export type SetTemperatureCompensationParams = z.infer<typeof HTSensorCommandSchemas.setTemperatureCompensation>
	export type SetHumidityCompensationParams = z.infer<typeof HTSensorCommandSchemas.setHumidityCompensation>
}

// ------------------------------------------------ AQI LED COMMANDS ------------------------------------------------

const AQICommandSchemas = {
	setAqiLed: z.object({
		redBehavior: z.number(),
		redDuration: z.number(),
		greenBehavior: z.number(),
		greenDuration: z.number(),
		blueBehavior: z.number(),
		blueDuration: z.number(),
	}),
}

export namespace AQICommandTypes {
	export type SetAqiLedParams = z.infer<typeof AQICommandSchemas.setAqiLed>
}

/* --------------------------------------- T-FLOOD COMMANDS --------------------------------------- */
const TFloodCommandSchemas = {
	...GeneralCommandSchemas,
	getTemperature: z.object({}),
	setFloodAlarmTime: z.object({
		time: z.number(),
	}),
	getFloodAlarmTime: z.object({}),
	setKeepAlive: z.object({
		time: z.number(),
	}),
	getDeviceVersion: z.object({}),
	setFloodEventSendTime: z.object({
		time: z.number(),
	}),
	getFloodEventSendTime: z.object({}),
	setFloodEventUplinkType: z.object({
		type: z.string(),
	}),
	getFloodEventUplinkType: z.object({}),
}

export namespace TFloodCommandTypes {
	export type SetFloodAlarmTimeParams = z.infer<typeof TFloodCommandSchemas.setFloodAlarmTime>
	export type SetKeepAliveParams = z.infer<typeof TFloodCommandSchemas.setKeepAlive>
	export type SetFloodEventSendTimeParams = z.infer<typeof TFloodCommandSchemas.setFloodEventSendTime>
	export type SetFloodEventUplinkTypeParams = z.infer<typeof TFloodCommandSchemas.setFloodEventUplinkType>
}

/* --------------------------------------- TRING THERMOSTAT COMMANDS --------------------------------------- */
const TringThermostatCommandSchemas = {
	setThermostatTarget: z.object({
		target: z.number(),
	}),
	setThermostatConfig: z.object({
		time: z.number(),
		temp_span: z.number(),
		temp_sampling: z.number(),
		target: z.number(),
	}),
	setKeepAlive: z.object({
		time: z.number(),
	}),
}

export namespace TringThermostatCommandTypes {
	export type SetThermostatTargetParams = z.infer<typeof TringThermostatCommandSchemas.setThermostatTarget>
	export type SetThermostatConfigParams = z.infer<typeof TringThermostatCommandSchemas.setThermostatConfig>
	export type SetKeepAliveParams = z.infer<typeof TringThermostatCommandSchemas.setKeepAlive>
}

/* --------------------------------------- DSK DEVICE COMMANDS --------------------------------------- */
const DSKDeviceCommandSchemas = {
	setVrvStatus: z.object({
		status: z.number(),
	}),
	setVrvOnTime: z.object({
		time: z.number(),
	}),
	setVrvOffTime: z.object({
		time: z.number(),
	}),
}

export namespace DSKDeviceCommandTypes {
	export type SetVrvStatusParams = z.infer<typeof DSKDeviceCommandSchemas.setVrvStatus>
	export type SetVrvOnTimeParams = z.infer<typeof DSKDeviceCommandSchemas.setVrvOnTime>
	export type SetVrvOffTimeParams = z.infer<typeof DSKDeviceCommandSchemas.setVrvOffTime>
}

/* --------------------------------------- BUTTON COMMANDS --------------------------------------- */
const ButtonCommandSchemas = {
	...GeneralCommandSchemas,
	setSendEventLater: z.object({
		value: z.number(),
	}),
	clearPressEventCounter: z.object({
		value: z.number(),
	}),
	restartDevice: z.object({}),
	getSinglePressEventCounter: z.object({}),
	getDoublePressEventCounter: z.object({}),
	getTriplePressEventCounter: z.object({}),
}

export namespace ButtonCommandTypes {
	export type SetSendEventLaterParams = z.infer<typeof ButtonCommandSchemas.setSendEventLater>
	export type ClearPressEventCounter = z.infer<typeof ButtonCommandSchemas.clearPressEventCounter>
}

/* --------------------------------------- HT PIR LITE COMMANDS --------------------------------------- */
const HTPirLiteCommandSchemas = {
	...GeneralCommandSchemas,
	...PIRCommandSchemas,
	setUplinkSendingOnButtonPress: z.object({
		value: z.number(),
	}),
	getUplinkSendingOnButtonPress: z.object({}),
	restartDevice: z.object({}),
}

export namespace HTPirLiteCommandTypes {
	export type SetUplinkSendingOnButtonPressParams = z.infer<typeof HTPirLiteCommandSchemas.setUplinkSendingOnButtonPress>
	export type GetUplinkSendingOnButtonPressParams = z.infer<typeof HTPirLiteCommandSchemas.getUplinkSendingOnButtonPress>
	export type RestartDeviceParams = z.infer<typeof HTPirLiteCommandSchemas.restartDevice>
}

/* --------------------------------------- CO2 PIR LITE COMMANDS --------------------------------------- */
const Co2PirLiteCommandSchemas = {
	...GeneralCommandSchemas,
	...PIRCommandSchemas,
	setUplinkSendingOnButtonPress: z.object({
		value: z.number(),
	}),
	getUplinkSendingOnButtonPress: z.object({}),
	restartDevice: z.object({}),
	setCo2BoundaryLevels: z.object({
		good_medium: z.number(),
		medium_bad: z.number(),
	}),
	getCo2BoundaryLevels: z.object({}),
	setCo2AutoZeroValue: z.object({
		ppm: z.number(),
	}),
	getCo2AutoZeroValue: z.object({}),
	setCo2MeasurementPeriod: z.object({
		good_zone: z.number(),
		medium_zone: z.number(),
		bad_zone: z.number(),
	}),
	getCo2MeasurementPeriod: z.object({}),
	setCo2AutoZeroPeriod: z.object({
		hours: z.number(),
	}),
	getCo2AutoZeroPeriod: z.object({}),
}

export namespace Co2PirLiteCommandTypes {
	export type SetUplinkSendingOnButtonPressParams = z.infer<typeof Co2PirLiteCommandSchemas.setUplinkSendingOnButtonPress>
	export type GetUplinkSendingOnButtonPressParams = z.infer<typeof Co2PirLiteCommandSchemas.getUplinkSendingOnButtonPress>
	export type RestartDeviceParams = z.infer<typeof Co2PirLiteCommandSchemas.restartDevice>
}
/* --------------------------------------- EXPORT ALL SCHEMA GROUPS --------------------------------------- */
export const DeviceCommandSchemas = {
	GeneralCommandSchemas,
	VickiCommandSchemas,
	Relay16CommandSchemas,
	FanCoilThermostatCommandSchemas,
	TValveCommandSchemas,
	AQICommandSchemas,
	TFloodCommandSchemas,
	TringThermostatCommandSchemas,
	WirelessThermostatCommandSchemas,
	CO2SensorCommandSchemas,
	CO2DisplayCommandSchemas,
	DSKDeviceCommandSchemas,
	OpenCloseSensorCommandSchemas,
	ButtonCommandSchemas,
	DisplayCommandSchemas,
	ChildLockCommandSchemas,
	TemperatureCommandSchemas,
	PIRCommandSchemas,
	HTSensorCommandSchemas,
	CO2DisplayLiteCommandSchemas,
	Relay16DryCommandSchemas,
	HTPirLiteCommandSchemas,
	Co2PirLiteCommandSchemas,
}

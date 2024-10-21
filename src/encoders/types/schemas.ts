import { z } from 'zod'

/* ---------------------------------------GENERAL COMMANDS--------------------------------------- */

const GeneralCommandSchemas = {
	customHexCommand: z.object({
		command: z.string(),
	}),
	setKeepAlive: z.object({
		time: z.number(),
	}),
	setJoinRetryPeriod: z.object({
		period: z.number(),
	}),
	setUplinkType: z.object({
		type: z.string(),
	}),
	setWatchDogParams: z.object({
		confirmedUplinks: z.number(),
		unconfirmedUplinks: z.number(),
	}),
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
	setPIRSensorSensitivity: z.object({
		sensitivity: z.number(),
	}),
	setPIRPeriod: z.object({
		time: z.number(),
	}),
}

export namespace PIRCommandTypes {
	export type SetPIRSensorStatusParams = z.infer<typeof PIRCommandSchemas.setPIRSensorStatus>
	export type SetPIRSensorSensitivityParams = z.infer<typeof PIRCommandSchemas.setPIRSensorSensitivity>
	export type SetPIRPeriodParams = z.infer<typeof PIRCommandSchemas.setPIRPeriod>
}

/* ---------------------------------------DISPLAY COMMANDS--------------------------------------- */

const DisplayCommandSchemas = {
	setDisplayRefreshPeriod: z.object({
		period: z.number(),
	}),
	setDeepSleepMode: z.object({
		state: z.number(),
	}),
	setHumidityVisibility: z.object({
		state: z.number(),
	}),
	setLightIntensityVisibility: z.object({
		state: z.number(),
	}),
	setCurrentTemperatureVisibility: z.object({
		state: z.number(),
	}),
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

/* ---------------------------------------CO2 DISPLAY COMMON COMMANDS--------------------------------------- */

const Co2CommonDisplayCommandSchemas = {
	setCo2ImagesVisibility: z.object({
		chart: z.boolean(),
		digital_value: z.boolean(),
		emoji: z.boolean(),
	}),
}

export namespace Co2CommonDisplayCommandTypes {
	export type SetCo2ImagesVisibilityParams = z.infer<typeof Co2CommonDisplayCommandSchemas.setCo2ImagesVisibility>
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
	setInternalAlgoParams: z.object({
		period: z.number(),
		pFirstLast: z.number(),
		pNext: z.number(),
	}),
	setOperationalMode: z.object({
		mode: z.string(),
	}),
	setTargetTemperature: z.object({
		targetTemperature: z.number(),
	}),
	setExternalTemperature: z.object({
		temp: z.number(),
	}),
	setInternalAlgoTdiffParams: z.object({
		cold: z.number(),
		warm: z.number(),
	}),
	setPrimaryOperationalMode: z.object({
		mode: z.string(),
	}),
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
	setProportionalAlgorithmParameters: z.object({
		coefficient: z.number(),
		period: z.number(),
	}),
	setTemperatureControlAlgorithm: z.object({
		algorithm: z.string(),
	}),
	setMotorPositionOnly: z.object({
		position: z.number(),
	}),
	setTargetTemperatureAndMotorPosition: z.object({
		motorPosition: z.number(),
		targetTemperature: z.number(),
	}),
	setChildLockBehavior: z.object({
		behavior: z.number(),
	}),
	setProportionalGain: z.object({
		proportionalGain: z.number(),
	}),
	setExternalTemperatureFloat: z.object({
		temp: z.number(),
	}),
	setIntegralGain: z.object({
		integralGain: z.number(),
	}),
	setPiRunPeriod: z.object({
		period: z.number(),
	}),
	setTemperatureHysteresis: z.object({
		hysteresis: z.number(),
	}),
	setOpenWindowPrecisely: z.object({
		enabled: z.boolean(),
		duration: z.number(),
		delta: z.number(),
	}),
	setForceAttach: z.object({
		enabled: z.boolean(),
	}),
	setAntiFreezeParams: z.object({
		activatedTemperature: z.number(),
		deactivatedTemperature: z.number(),
		targetTemperature: z.number(),
	}),
	setMaxAllowedIntegralValue: z.object({
		value: z.number(),
	}),
	setValveOpennessInPercentage: z.object({
		value: z.number(),
	}),
	setValveOpennessRangeInPercentage: z.object({
		min: z.number(),
		max: z.number(),
	}),
	setTemperatureOffset: z.object({
		value: z.number(),
	}),
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
	setOvervoltageThresholds: z.object({
		trigger: z.number(),
		recovery: z.number(),
	}),
	setOvercurrentThreshold: z.object({
		current: z.number(),
	}),
	setOverpowerThreshold: z.object({
		power: z.number(),
	}),
	setAfterOverheatingProtectionRecovery: z.object({
		state: z.number(),
	}),
	setLedIndicationMode: z.object({
		mode: z.number(),
	}),
	setRelayRecoveryState: z.object({
		state: z.number(),
	}),
	setRelayState: z.object({
		state: z.boolean(),
	}),
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
}
// ------------------------------------------------ T-VALVE COMMANDS ------------------------------------------------

const TValveCommandSchemas = {
	...GeneralCommandSchemas,
	setOpenCloseTime: z.object({
		openingTime: z.number(),
		closingTime: z.number(),
	}),
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
	setManualControl: z.object({
		enableOpen: z.boolean(),
		enableClose: z.boolean(),
	}),
	setFloodAlarmTime: z.object({
		time: z.number(),
	}),
	setKeepAliveTValve: z.object({
		time: z.number(),
	}),
	setWorkingVoltage: z.object({
		voltage: z.number(),
	}),
	setValveState: z.object({
		state: z.number(),
	}),
	setOpenCloseTimeExtended: z.object({
		openingTime: z.number(),
		closingTime: z.number(),
	}),
	setSingleTimeValveState: z.object({
		state: z.number(),
		time: z.number(),
	}),
	setDeviceFloodSensor: z.object({
		enabled: z.boolean(),
	}),
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
	...DisplayCommandSchemas,
	...TemperatureCommandSchemas,
	setTargetTemperatureStep: z.object({
		value: z.number(),
	}),
	setKeysLock: z.object({
		value: z.number(),
	}),
	setFanCoilTarget: z.object({
		value: z.number(),
	}),
	setTargetTemperatureFanCoil: z.object({
		targetTemperature: z.number(),
	}),
	setValveOpenCloseTime: z.object({
		value: z.number(),
	}),
	setExtAutomaticTemperatureControl: z.object({
		value: z.number(),
	}),
	setFanSpeed: z.object({
		value: z.number(),
	}),
	setFanSpeedLimit: z.object({
		value: z.number(),
	}),
	setEcmVoltageRange: z.object({
		min: z.number(),
		max: z.number(),
	}),
	setEcmStartUpTime: z.object({
		value: z.number(),
	}),
	setEcmRelay: z.object({
		value: z.number(),
	}),
	setFrostProtection: z.object({
		value: z.number(),
	}),
	setFrostProtectionSettings: z.object({
		threshold: z.number(),
		setpoint: z.number(),
	}),
	setFctOperationalMode: z.object({
		value: z.number(),
	}),
	setAllowedOperationalModes: z.object({
		value: z.number(),
	}),
	setCoolingSetpointNotOccupied: z.object({
		value: z.number(),
	}),
	setHeatingSetpointNotOccupied: z.object({
		value: z.number(),
	}),
	setTempSensorCompensation: z.object({
		compensation: z.number(),
		temperature: z.number(),
	}),
	setFanSpeedNotOccupied: z.object({
		value: z.number(),
	}),
	setAutomaticChangeover: z.object({
		value: z.number(),
	}),
	setWiringDiagram: z.object({
		value: z.number(),
	}),
	setOccFunction: z.object({
		value: z.number(),
	}),
	setAutomaticChangeoverThreshold: z.object({
		coolingThreshold: z.number(),
		heatingThreshold: z.number(),
	}),
	setDeviceStatus: z.object({
		value: z.number(),
	}),
	setReturnOfPowerOperation: z.object({
		value: z.number(),
	}),
	setDeltaTemperature1: z.object({
		value: z.number(),
	}),
	setDeltaTemperature2and3: z.object({
		deltaTemperature2: z.number(),
		deltaTemperature3: z.number(),
	}),
}

export namespace FanCoilThermostatCommandTypes {
	export type SetTargetTemperatureStepParams = z.infer<typeof FanCoilThermostatCommandSchemas.setTargetTemperatureStep>
	export type SetKeysLockParams = z.infer<typeof FanCoilThermostatCommandSchemas.setKeysLock>
	export type SetFanCoilTargetParams = z.infer<typeof FanCoilThermostatCommandSchemas.setFanCoilTarget>
	export type SetTargetTemperatureFanCoilParams = z.infer<
		typeof FanCoilThermostatCommandSchemas.setTargetTemperatureFanCoil
	>
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
}

/* --------------------------------------- OPEN CLOSE SENSOR COMMANDS --------------------------------------- */
const OpenCloseSensorCommandSchemas = {
	...GeneralCommandSchemas,
	setNotificationBlindTime: z.object({
		time: z.number(),
	}),
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
	setHeatingStatus: z.object({
		status: z.number(),
	}),
	setDisplayRefreshPeriod: z.object({
		period: z.number(),
	}),
	setTargetSendDelay: z.object({
		time: z.number(),
	}),
	setAutomaticHeatingStatus: z.object({
		state: z.number(),
	}),
	setSensorMode: z.object({
		state: z.number(),
	}),
	setTemperatureHysteresis: z.object({
		hysteresis: z.number(),
	}),
	setTargetTemperaturePrecisely: z.object({
		targetTemperature: z.number(),
	}),
	setTargetTemperatureStep: z.object({
		value: z.number(),
	}),
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
	setCo2AutoZeroValue: z.object({
		ppm: z.number(),
	}),
	setNotifyPeriod: z.object({
		good_zone: z.number(),
		medium_zone: z.number(),
		bad_zone: z.number(),
	}),
	setCo2MeasurementPeriod: z.object({
		good_zone: z.number(),
		medium_zone: z.number(),
		bad_zone: z.number(),
	}),
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
	setCo2AutoZeroPeriod: z.object({
		hours: z.number(),
	}),
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
	...CO2SensorCommandSchemas,
	...DisplayCommandSchemas,
	...Co2CommonDisplayCommandSchemas,
	...PIRCommandSchemas,
	...ChildLockCommandSchemas,
	setCo2MeasurementBlindTime: z.object({
		time: z.number(),
	}),
}

export namespace CO2DisplayCommandTypes {
	export type SetCo2MeasurementBlindTimeParams = z.infer<typeof CO2DisplayCommandSchemas.setCo2MeasurementBlindTime>
}

/* --------------------------------------- CO2 DISPLAY LITE COMMANDS --------------------------------------- */
const CO2DisplayLiteCommandSchemas = {
	...CO2SensorCommandSchemas,
	...DisplayCommandSchemas,
	...Co2CommonDisplayCommandSchemas,
}

/* --------------------------------------- HT SENSOR COMMANDS --------------------------------------- */
const HTSensorCommandSchemas = {
	...GeneralCommandSchemas,
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
	setFloodAlarmTime: z.object({
		time: z.number(),
	}),
	setKeepAlive: z.object({
		time: z.number(),
	}),
	setFloodEventSendTime: z.object({
		time: z.number(),
	}),
	setFloodEventUplinkType: z.object({
		type: z.string(),
	}),
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
}

export namespace ButtonCommandTypes {
	export type SetSendEventLaterParams = z.infer<typeof ButtonCommandSchemas.setSendEventLater>
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
	Co2CommonDisplayCommandSchemas,
	ChildLockCommandSchemas,
	TemperatureCommandSchemas,
	PIRCommandSchemas,
	HTSensorCommandSchemas,
	CO2DisplayLiteCommandSchemas,
}

import { z } from 'zod'

/* ---------------------------------------TYPE HELPERS--------------------------------------- */

type NumberEnum<K extends number = number> = {
	[P in K]: string
}

type StringEnum<K extends string = string> = {
	[P in K]: string
}

/* ---------------------------------------HELPER ENUM DEFINITIONS--------------------------------------- */

// Enum helper objects that include both values and descriptions for frontend use
// WARN: these need to be updated separately if the zod schemas below are changed
export const GeneralCommandsEnums = {
	setUplinkType: {
		'01': 'Confirmed uplinks',
		'00': 'Unconfirmed uplinks',
	} satisfies StringEnum,
} as const

export const VickiEnums = {
	setOperationalMode: {
		'00': 'Online manual control mode',
		'01': 'Online automatic control mode',
		'02': 'Online automatic control mode with external temperature reading',
	} satisfies StringEnum<'00' | '01' | '02'>,
	setPrimaryOperationalMode: {
		'00': 'Heating mode',
		'01': 'Cooling mode',
	} satisfies StringEnum<'00' | '01'>,
	setTemperatureControlAlgorithm: {
		'00': 'Proportional control',
		'01': 'Equal directional control',
		'02': 'Proportional integral control',
	} satisfies StringEnum<'00' | '01' | '02'>,
	setChildLockBehavior: {
		0: 'Automatically disabled',
		1: 'Remains unchanged',
	} satisfies NumberEnum<0 | 1>,
} as const

export const Relay16Enums = {
	setRelayState: {
		0: 'Off',
		1: 'On',
	} satisfies NumberEnum<0 | 1>,
	setAfterOverheatingProtectionRecovery: {
		0: 'Last state',
		1: 'Off',
	} satisfies NumberEnum<0 | 1>,
	setLedIndicationMode: {
		0: 'Off',
		1: 'On',
	} satisfies NumberEnum<0 | 1>,
	setRelayRecoveryState: {
		0: 'Last state',
		1: 'On',
		2: 'Off',
	} satisfies NumberEnum<0 | 1 | 2>,
} as const

export const FanCoilThermostatEnums = {
	setHumidityVisibility: {
		0: 'Hide',
		1: 'Show',
	} satisfies NumberEnum<0 | 1>,
	setCurrentTemperatureVisibility: {
		0: 'Hide',
		1: 'Show',
	} satisfies NumberEnum<0 | 1>,
	setKeysLock: {
		0: 'No keys locked',
		1: 'Lock all keys',
		2: 'Lock on/off and mode change',
		3: 'Lock on/off',
		4: 'Lock all keys except on/off key',
		5: 'Lock mode change',
	} satisfies NumberEnum,
	setExtAutomaticTemperatureControl: {
		0: 'Deactivated',
		1: 'Activated',
	} satisfies NumberEnum<0 | 1>,
	setFanSpeed: {
		0: 'Automatic',
		1: 'Low 1',
		2: 'Low 2',
		3: 'Medium 3',
		4: 'Medium 4',
		5: 'High 5',
		6: 'High 6',
	} satisfies NumberEnum,
	setFanSpeedLimit: {
		0: 'Low, medium and high',
		1: 'Low and medium',
		2: 'Low',
		3: 'Control deactivated',
	} satisfies NumberEnum,
	setFctOperationalMode: {
		0: 'Ventilation',
		1: 'Heating',
		2: 'Cooling',
	} satisfies NumberEnum<0 | 1 | 2>,
	setAllowedOperationalModes: {
		0: 'Ventilation, heating and cooling',
		1: 'Ventilation and heating',
		2: 'Ventilation and cooling',
	} satisfies NumberEnum,
	setFanSpeedNotOccupied: {
		0: 'Low',
		1: 'Automatic',
		2: "Don't change",
	} satisfies NumberEnum,
	setDeviceStatus: {
		0: 'Off',
		1: 'On',
	} satisfies NumberEnum<0 | 1>,
	setReturnOfPowerOperation: {
		0: 'Last status',
		1: 'On',
		2: 'Off',
	} satisfies NumberEnum<0 | 1 | 2>,
	setAdditionalFanMode: {
		0: 'Turn off on target reach',
		1: 'Keep on target reach',
		2: 'Fan always on',
	} satisfies NumberEnum,
	setUserInterfaceLanguage: {
		0: 'English',
		1: 'French',
		2: 'German',
		3: 'Spanish',
	} satisfies NumberEnum,
} as const

export const TValveEnums = {
	setValveState: {
		0: 'Open',
		1: 'Close',
	} satisfies NumberEnum<0 | 1>,
} as const

export const WirelessThermostatEnums = {
	setHumidityVisibility: {
		0: 'Hide',
		1: 'Show',
	} satisfies NumberEnum<0 | 1>,
	setLightIntensityVisibility: {
		0: 'Hide',
		1: 'Show',
	} satisfies NumberEnum<0 | 1>,
	setCurrentTemperatureVisibility: {
		0: 'Hide',
		1: 'Show',
	} satisfies NumberEnum<0 | 1>,
	setPIRSensorStatus: {
		0: 'Disabled',
		1: 'Enabled',
	} satisfies NumberEnum<0 | 1>,
	setHeatingStatus: {
		0: 'Disabled',
		1: 'Enabled',
	} satisfies NumberEnum<0 | 1>,
	setAutomaticHeatingStatus: {
		0: 'Turn off automatic mode',
		1: 'Turn on automatic mode',
	} satisfies NumberEnum<0 | 1>,
	setSensorMode: {
		0: 'Turn off sensor mode',
		1: 'Turn on sensor mode',
	} satisfies NumberEnum<0 | 1>,
} as const

export const ButtonEnums = {
	setSendEventLater: {
		1: 'Send later when allowed',
		0: "Don't send later when allowed",
	} satisfies NumberEnum<0 | 1>,
} as const

/* ---------------------------------------GENERAL COMMANDS--------------------------------------- */

const GeneralCommandSchemas = {
	customHexCommand: z.object({
		command: z.string().regex(/^[0-9A-Fa-f]+$/, 'Must be a valid hex string'),
	}),
	setKeepAlive: z.object({
		time: z.number().int().min(1).max(255),
	}),
	getKeepAlive: z.object({}),
	setJoinRetryPeriod: z.object({
		period: z.number().int().min(1).max(21),
	}),
	getJoinRetryPeriod: z.object({}),
	setUplinkType: z.object({
		type: z.enum(['01', '00']),
	}),
	getUplinkType: z.object({}),
	setWatchDogParams: z.object({
		confirmedUplinks: z.number().int().min(0).max(255),
		unconfirmedUplinks: z.number().int().min(0).max(255),
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
		min: z.number().min(5).max(30),
		max: z.number().min(5).max(30),
	}),
	getTargetTemperature: z.object({}),
}

export namespace TemperatureCommandTypes {
	export type SetTemperatureRangeParams = z.infer<typeof TemperatureCommandSchemas.setTemperatureRange>
}

/* ---------------------------------------PIR COMMANDS--------------------------------------- */

const PIRCommandSchemas = {
	setPIRSensorStatus: z.object({
		state: z.number().min(0).max(1), // 0: disabled, 1: enabled
	}),
	getPIRSensorStatus: z.object({}),
	setPIRSensorSensitivity: z.object({
		sensitivity: z.number().min(12).max(255),
	}),
	getPIRSensorSensitivity: z.object({}),
	setPIRInitPeriod: z.object({
		time: z.number().min(0).max(255),
	}),
	setPIRMeasurementPeriod: z.object({
		time: z.number().min(3).max(255),
	}),
	setPIRCheckPeriod: z.object({
		time: z.number().min(0).max(65535),
	}),
	setPIRBlindPeriod: z.object({
		time: z.number().min(15).max(65535),
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
		period: z.number().min(1).max(24),
	}),
	getDisplayRefreshPeriod: z.object({}),
	setDeepSleepMode: z.object({
		state: z.number(),
	}),
	setHumidityVisibility: z.object({
		state: z.number().min(0).max(1), // 0: hide, 1: show
	}),
	getHumidityVisibility: z.object({}),
	setLightIntensityVisibility: z.object({
		state: z.number().min(0).max(1), // 0: hide, 1: show
	}),
	getLightIntensityVisibility: z.object({}),
	setCurrentTemperatureVisibility: z.object({
		state: z.number().min(0).max(1), // 0: hide, 1: show
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
		delta: z.number().min(0).max(15),
		closeTime: z.number().min(0).max(51),
		motorPosition: z.number().int().min(0).max(800),
	}),
	getOpenWindowParams: z.object({}),
	recalibrateMotor: z.object({}),
	forceClose: z.object({}),
	setInternalAlgoParams: z.object({
		period: z.number().int().min(0).max(255),
		pFirstLast: z.number().int().min(0).max(255),
		pNext: z.number().int().min(0).max(255),
	}),
	getInternalAlgoParams: z.object({}),
	setOperationalMode: z.object({
		mode: z.enum(['00', '01', '02']),
	}),
	getOperationalMode: z.object({}),
	setTargetTemperature: z.object({
		targetTemperature: z.number().min(5).max(30),
	}),
	setExternalTemperature: z.object({
		temp: z.number().int().min(0).max(255),
	}),
	getExternalTemperature: z.object({}),
	setInternalAlgoTdiffParams: z.object({
		cold: z.number().int().min(0).max(255),
		warm: z.number().int().min(0).max(255),
	}),
	getInternalAlgoTdiffParams: z.object({}),
	setPrimaryOperationalMode: z.object({
		mode: z.enum(['00', '01']),
	}),
	getPrimaryOperationalMode: z.object({}),
	setBatteryRangesBoundaries: z.object({
		Boundary1: z.number().int().min(0).max(65535),
		Boundary2: z.number().int().min(0).max(65535),
		Boundary3: z.number().int().min(0).max(65535),
	}),
	setBatteryRangesOverVoltage: z.object({
		Range1: z.number().int().min(0).max(255),
		Range2: z.number().int().min(0).max(255),
		Range3: z.number().int().min(0).max(65535),
	}),
	setOvac: z.object({
		ovac: z.number().int().min(0).max(255),
	}),
	getOvac: z.object({}),
	setProportionalAlgorithmParameters: z.object({
		coefficient: z.number().min(0).max(20),
		period: z.number().int().min(0).max(255),
	}),
	getProportionalAlgorithmParameters: z.object({}),
	setTemperatureControlAlgorithm: z.object({
		algorithm: z.enum(['00', '01', '02']),
	}),
	getTemperatureControlAlgorithm: z.object({}),
	setMotorPositionOnly: z.object({
		position: z.number().int().min(0).max(800),
	}),
	deviceReset: z.object({}),
	setTargetTemperatureAndMotorPosition: z.object({
		motorPosition: z.number().int().min(0).max(800),
		targetTemperature: z.number().min(5).max(30),
	}),
	setChildLockBehavior: z.object({
		behavior: z.number().min(0).max(1),
	}),
	getChildLockBehavior: z.object({}),
	setProportionalGain: z.object({
		proportionalGain: z.number().int().min(0).max(127),
	}),
	getProportionalGain: z.object({}),
	setExternalTemperatureFloat: z.object({
		temp: z.number().int().min(0).max(255),
	}),
	setIntegralGain: z.object({
		integralGain: z.number().int().min(0).max(127),
	}),
	getIntegralGain: z.object({}),
	getIntegralValue: z.object({}),
	setPiRunPeriod: z.object({
		period: z.number().int().min(0).max(255),
	}),
	getPiRunPeriod: z.object({}),
	setTemperatureHysteresis: z.object({
		hysteresis: z.number().min(0).max(100),
	}),
	getTemperatureHysteresis: z.object({}),
	setOpenWindowPrecisely: z.object({
		enabled: z.boolean(),
		duration: z.number().min(0).max(51),
		delta: z.number().min(0).max(15),
	}),
	getOpenWindowPrecisely: z.object({}),
	setForceAttach: z.object({
		enabled: z.boolean(),
	}),
	getForceAttach: z.object({}),
	setAntiFreezeParams: z.object({
		activatedTemperature: z.number().min(0).max(25),
		deactivatedTemperature: z.number().min(0).max(25),
		targetTemperature: z.number().min(0).max(30),
	}),
	getAntiFreezeParams: z.object({}),
	setMaxAllowedIntegralValue: z.object({
		value: z.number().int().min(0).max(255),
	}),
	getMaxAllowedIntegralValue: z.object({}),
	setValveOpennessInPercentage: z.object({
		value: z.number().min(0).max(100),
	}),
	setValveOpennessRangeInPercentage: z.object({
		min: z.number().min(0).max(100),
		max: z.number().min(0).max(100),
	}),
	getValveOpennessRangeInPercentage: z.object({}),
	setTemperatureOffset: z.object({
		value: z.number().min(-5).max(5),
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
		trigger: z.number().min(30).max(100),
		recovery: z.number().min(30).max(100),
	}),
	getOverheatingThresholds: z.object({}),
	setOvervoltageThresholds: z.object({
		trigger: z.number().min(1).max(255),
		recovery: z.number().min(1).max(255),
	}),
	getOvervoltageThresholds: z.object({}),
	setOvercurrentThreshold: z.object({
		current: z.number().min(1).max(16),
	}),
	getOvercurrentThreshold: z.object({}),
	setOverpowerThreshold: z.object({
		power: z.number().min(100).max(3680),
	}),
	getOverpowerThreshold: z.object({}),
	clearAcumulatedEnergy: z.object({}),
	setAfterOverheatingProtectionRecovery: z.object({
		state: z.number().min(0).max(1), // 0: lastState, 1: OFF
	}),
	getAfterOverheatingProtectionRecovery: z.object({}),
	setLedIndicationMode: z.object({
		mode: z.number().min(0).max(1), // 0: OFF, 1: ON
	}),
	getLedIndicationMode: z.object({}),
	setRelayRecoveryState: z.object({
		state: z.number().min(0).max(2), // 0: lastState, 1: ON, 2: OFF
	}),
	getRelayRecoveryState: z.object({}),
	setRelayState: z.object({
		state: z.number().min(0).max(1), // 0: OFF, 1: ON
	}),
	getRelayState: z.object({}),
	setRelayTimerInMilliseconds: z.object({
		state: z.number().min(0).max(1), // 0: OFF, 1: ON
		time: z.number().min(0).max(65535),
	}),
	getRelayTimerInMiliseconds: z.object({}),
	setRelayTimerInSeconds: z.object({
		state: z.number().min(0).max(1), // 0: OFF, 1: ON
		time: z.number().min(0).max(65535),
	}),
	getRelayTimerInMinutes: z.object({}),
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
	export type SetRelayTimerInMilisecondsParams = z.infer<typeof Relay16CommandSchemas.setRelayTimerInMilliseconds>
	export type SetRelayTimerInSecondsParams = z.infer<typeof Relay16CommandSchemas.setRelayTimerInSeconds>
}

/* --------------------------------------- RELAY 16 DRY COMMANDS --------------------------------------- */

const Relay16DryCommandSchemas = {
	...GeneralCommandSchemas,
	setOverheatingThresholds: z.object({
		trigger: z.number().min(30).max(100),
		recovery: z.number().min(30).max(100),
	}),
	getOverheatingThresholds: z.object({}),
	setAfterOverheatingProtectionRecovery: z.object({
		state: z.number().min(0).max(1), // 0: lastState, 1: OFF
	}),
	setRelayTimerInMiliseconds: z.object({
		state: z.number().min(0).max(1), // 0: OFF, 1: ON
		time: z.number().min(0).max(65535),
	}),
	getRelayTimerInMiliseconds: z.object({}),
	setRelayTimerInMinutes: z.object({
		state: z.number().min(0).max(1), // 0: OFF, 1: ON
		time: z.number().min(0).max(65535),
	}),
	getRelayTimerInMinutes: z.object({}),
	getRelayStateChangeReason: z.object({}),
	getAfterOverheatingProtectionRecovery: z.object({}),
	setLedIndicationMode: z.object({
		mode: z.number().min(0).max(1), // 0: OFF, 1: ON
	}),
	getLedIndicationMode: z.object({}),
	setRelayRecoveryState: z.object({
		state: z.number().min(0).max(2), // 0: lastState, 1: ON, 2: OFF
	}),
	getRelayRecoveryState: z.object({}),
	setRelayState: z.object({
		state: z.number().min(0).max(1), // 0: OFF, 1: ON
	}),
	getRelayState: z.object({}),
	getOverheatingEvents: z.object({}),
}

// ------------------------------------------------ T-VALVE COMMANDS ------------------------------------------------

const TValveCommandSchemas = {
	...GeneralCommandSchemas,
	setOpenCloseTime: z.object({
		openingTime: z.number().min(1).max(255),
		closingTime: z.number().min(1).max(255),
	}),
	getOpenCloseTime: z.object({}),
	setLED: z.object({
		ledId: z.number().min(1).max(4),
		behavior: z.number().min(0).max(4),
		seconds: z.number().min(1).max(255),
	}),
	setBuzzer: z.object({
		volume: z.number().min(1).max(255),
		frequency: z.number().min(1).max(255),
		activeTime: z.number().min(1).max(255),
		onTime: z.number().min(1).max(255),
		offTime: z.number().min(1).max(255),
	}),
	setEmergencyOpenings: z.object({
		maxOpenings: z.number().min(1).max(15),
	}),
	getEmergencyOpenings: z.object({}),
	setManualControl: z.object({
		enableOpen: z.boolean(),
		enableClose: z.boolean(),
	}),
	setFloodAlarmTime: z.object({
		time: z.number().min(1).max(255),
	}),
	getFloodAlarmTime: z.object({}),
	setKeepAliveTValve: z.object({
		time: z.number().min(1).max(255),
	}),
	setWorkingVoltage: z.object({
		voltage: z.number().min(1840).max(2500),
	}),
	getWorkingVoltage: z.object({}),
	setValveState: z.object({
		state: z.number().min(0).max(1), // 0: open, 1: close
	}),
	setOpenCloseTimeExtended: z.object({
		openingTime: z.number().min(1).max(65535),
		closingTime: z.number().min(1).max(65535),
	}),
	getOpenCloseTimeExtended: z.object({}),
	setSingleTimeValveState: z.object({
		state: z.number().min(0).max(1), // 0: open, 1: close
		time: z.number().min(1).max(65535),
	}),
	setDeviceFloodSensor: z.object({
		enabled: z.boolean(),
	}),
	getDeviceFloodSensor: z.object({}),
	setJoinRetryPeriodTValve: z.object({
		period: z.number().min(1).max(21),
	}),
	setUplinkTypeTValve: z.object({
		type: z.enum(['01', '00']), // 01: confirmedUplinks, 00: unconfirmedUplinks
	}),
	setWatchDogTValveParams: z.object({
		confirmedUplinks: z.number().min(0).max(255),
		unconfirmedUplinks: z.number().min(0).max(255),
	}),
	getWatchDogTValveParams: z.object({}),
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
		period: z.number().min(1).max(24),
	}),
	getDisplayRefreshPeriod: z.object({}),
	setHumidityVisibility: z.object({
		state: z.number().min(0).max(1), // 0: hide, 1: show
	}),
	getHumidityVisibility: z.object({}),
	setCurrentTemperatureVisibility: z.object({
		state: z.number().min(0).max(1), // 0: hide, 1: show
	}),
	getCurrentTemperatureVisibility: z.object({}),
	setTargetTemperatureStep: z.object({
		value: z.number().min(0.1).max(10),
	}),
	getTargetTemperatureStep: z.object({}),
	setKeysLock: z.object({
		value: z.number().min(0).max(5),
	}),
	getKeysLock: z.object({}),
	setTargetTemperature: z.object({
		targetTemperature: z.number().min(5).max(99),
	}),
	setValveOpenCloseTime: z.object({
		value: z.number().min(1).max(255),
	}),
	getValveOpenCloseTime: z.object({}),
	setExtAutomaticTemperatureControl: z.object({
		value: z.number().min(0).max(1), // 0: deactivated, 1: activated
	}),
	getExtAutomaticTemperatureControl: z.object({}),
	setFanSpeed: z.object({
		value: z.number().min(0).max(6),
	}),
	getFanSpeed: z.object({}),
	setFanSpeedLimit: z.object({
		value: z.number().min(0).max(3),
	}),
	getFanSpeedLimit: z.object({}),
	setEcmVoltageRange: z.object({
		min: z.number().min(0).max(10),
		max: z.number().min(0).max(10),
	}),
	getEcmVoltageRange: z.object({}),
	setEcmStartUpTime: z.object({
		value: z.number().min(0).max(20),
	}),
	getEcmStartUpTime: z.object({}),
	setEcmRelay: z.object({
		value: z.number().min(0).max(1), // 0: deactivated, 1: activated
	}),
	getEcmRelay: z.object({}),
	setFrostProtection: z.object({
		value: z.number().min(0).max(1), // 0: OFF, 1: ON
	}),
	getFrostProtection: z.object({}),
	setFrostProtectionSettings: z.object({
		threshold: z.number().min(4).max(20),
		setpoint: z.number().min(4).max(20),
	}),
	getFrostProtectionSettings: z.object({}),
	setFctOperationalMode: z.object({
		value: z.number().min(0).max(2), // 0: ventilation, 1: heating, 2: cooling
	}),
	setAllowedOperationalModes: z.object({
		value: z.number().min(0).max(2),
	}),
	getAllowedOperationalModes: z.object({}),
	setCoolingSetpointNotOccupied: z.object({
		value: z.number().min(5).max(30),
	}),
	getCoolingSetpointNotOccupied: z.object({}),
	setHeatingSetpointNotOccupied: z.object({
		value: z.number().min(5).max(30),
	}),
	getHeatingSetpointNotOccupied: z.object({}),
	setTempSensorCompensation: z.object({
		compensation: z.number().min(0).max(1),
		temperature: z.number().min(-5).max(5),
	}),
	getTempSensorCompensation: z.object({}),
	setFanSpeedNotOccupied: z.object({
		value: z.number().min(0).max(2), // 0: low, 1: automatic, 2: dontChange
	}),
	getFanSpeedNotOccupied: z.object({}),
	setAutomaticChangeover: z.object({
		value: z.number().min(0).max(1), // 0: deactivated, 1: activated
	}),
	getAutomaticChangeover: z.object({}),
	setWiringDiagram: z.object({
		value: z.number().min(0).max(6),
	}),
	getWiringDiagram: z.object({}),
	setOccFunction: z.object({
		value: z.number().min(0).max(7),
	}),
	getOccFunction: z.object({}),
	setAutomaticChangeoverThreshold: z.object({
		coolingThreshold: z.number().min(5).max(20),
		heatingThreshold: z.number().min(30).max(60),
	}),
	getAutomaticChangeoverThreshold: z.object({}),
	setDeviceStatus: z.object({
		value: z.number().min(0).max(1), // 0: off, 1: on
	}),
	getDeviceStatus: z.object({}),
	setReturnOfPowerOperation: z.object({
		value: z.number().min(0).max(2), // 0: lastStatus, 1: on, 2: off
	}),
	getReturnOfPowerOperation: z.object({}),
	setDeltaTemperature1: z.object({
		value: z.number().min(0.5).max(10),
	}),
	getDeltaTemperature1: z.object({}),
	setDeltaTemperature2and3: z.object({
		deltaTemperature2: z.number().min(0.5).max(10),
		deltaTemperature3: z.number().min(0.5).max(10),
	}),
	getDeltaTemperature2and3: z.object({}),
	getFrostProtectionStatus: z.object({}),
	getOccupancySensorStatusSetPoint: z.object({}),
	getOccupancySensorStatus: z.object({}),
	getDewPointSensorStatus: z.object({}),
	getFilterAlarm: z.object({}),
	setHeatingCoolingTargetTempRanges: z.object({
		heatingTempMin: z.number().min(5).max(30),
		heatingTempMax: z.number().min(5).max(30),
		coolingTempMin: z.number().min(5).max(30),
		coolingTempMax: z.number().min(5).max(30),
	}),
	getHeatingCoolingTargetTempRanges: z.object({}),
	setHeatingCoolingTargetTempRangesUnoccupied: z.object({
		heatingTempMin: z.number().min(5).max(30),
		heatingTempMax: z.number().min(5).max(30),
		coolingTempMin: z.number().min(5).max(30),
		coolingTempMax: z.number().min(5).max(30),
	}),
	getHeatingCoolingTargetTempRangesUnoccupied: z.object({}),
	setFanOffDelayTime: z.object({
		time: z.number().min(0).max(255),
	}),
	getFanOffDelayTime: z.object({}),
	setAdditionalFanMode: z.object({
		mode: z.number().min(0).max(2), // 0: TurnOffOnTargetReach, 1: KeepOnTargetReach, 2: FanAlwaysOn
	}),
	getAdditionalFanMode: z.object({}),
	getInternalTemperatureSensorError: z.object({}),
	getExternalTemperatureSensorError: z.object({}),
	setUserInterfaceLanguage: z.object({
		value: z.number().min(0).max(3), // 0: English, 1: French, 2: German, 3: Spanish
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
	export type SetHeatingCoolingTargetTempRanges = z.infer<
		typeof FanCoilThermostatCommandSchemas.setHeatingCoolingTargetTempRanges
	>
	export type SetHeatingCoolingTargetTempRangesUnoccupied = z.infer<
		typeof FanCoilThermostatCommandSchemas.setHeatingCoolingTargetTempRangesUnoccupied
	>
	export type SetFanOffDelayTimeParams = z.infer<typeof FanCoilThermostatCommandSchemas.setFanOffDelayTime>
	export type SetAdditionalFanModeParams = z.infer<typeof FanCoilThermostatCommandSchemas.setAdditionalFanMode>
	export type SetUserInterfaceLanguageParams = z.infer<typeof FanCoilThermostatCommandSchemas.setUserInterfaceLanguage>
}

/* --------------------------------------- OPEN CLOSE SENSOR COMMANDS --------------------------------------- */
const OpenCloseSensorCommandSchemas = {
	...GeneralCommandSchemas,
	setNotificationBlindTime: z.object({
		time: z.number().min(1).max(255),
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
	getTemperatureRange: z.object({}),
	...DisplayCommandSchemas,
	...PIRCommandSchemas,
	...ChildLockCommandSchemas,
	setTargetTemperature: z.object({
		targetTemperature: z.number().min(5).max(99),
	}),
	getTargetTemperature: z.object({}),
	setHeatingStatus: z.object({
		status: z.number().min(0).max(1), // 0: disabled, 1: enabled
	}),
	getHeatingStatus: z.object({}),
	setDisplayRefreshPeriod: z.object({
		period: z.number().min(1).max(24),
	}),
	getDisplayRefreshPeriod: z.object({}),
	setTargetSendDelay: z.object({
		time: z.number().min(0).max(255),
	}),
	getTargetSendDelay: z.object({}),
	setAutomaticHeatingStatus: z.object({
		state: z.number().min(0).max(1), // 0: turnOffAutomaticMode, 1: turnOnAutomaticMode
	}),
	getAutomaticHeatingStatus: z.object({}),
	setSensorMode: z.object({
		state: z.number().min(0).max(1), // 0: turnOffSensorMode, 1: turnOnSensorMode
	}),
	getSensorMode: z.object({}),
	setTemperatureHysteresis: z.object({
		hysteresis: z.number().min(0.1).max(25.5).multipleOf(0.1),
	}),
	getTemperatureHysteresis: z.object({}),
	setTargetTemperaturePrecisely: z.object({
		targetTemperature: z.number().min(5).max(99),
	}),
	getTargetTemperaturePrecisely: z.object({}),
	setTargetTemperatureStep: z.object({
		value: z.number().min(0.1).max(10),
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
		good_medium: z.number().min(0).max(1500),
		medium_bad: z.number().min(0).max(1500),
	}),
	getCo2BoundaryLevels: z.object({}),
	setCo2AutoZeroValue: z.object({
		ppm: z.number().min(0).max(1500),
	}),
	getCo2AutoZeroValue: z.object({}),
	setNotifyPeriod: z.object({
		good_zone: z.number().min(0).max(255),
		medium_zone: z.number().min(0).max(255),
		bad_zone: z.number().min(0).max(255),
	}),
	getNotifyPeriod: z.object({}),
	setCo2MeasurementPeriod: z.object({
		good_zone: z.number().min(0).max(255),
		medium_zone: z.number().min(0).max(255),
		bad_zone: z.number().min(0).max(255),
	}),
	getCo2MeasurementPeriod: z.object({}),
	setBuzzerNotification: z.object({
		duration_good_beeping: z.number().min(0).max(255),
		duration_good_loud: z.number().min(0).max(255),
		duration_good_silent: z.number().min(0).max(255),
		duration_medium_beeping: z.number().min(0).max(255),
		duration_medium_loud: z.number().min(0).max(255),
		duration_medium_silent: z.number().min(0).max(255),
		duration_bad_beeping: z.number().min(0).max(255),
		duration_bad_loud: z.number().min(0).max(255),
		duration_bad_silent: z.number().min(0).max(255),
	}),
	getBuzzerNotification: z.object({}),
	setCo2Led: z.object({
		red_good: z.number().min(0).max(255),
		green_good: z.number().min(0).max(255),
		blue_good: z.number().min(0).max(255),
		duration_good: z.number().min(0).max(255),
		red_medium: z.number().min(0).max(255),
		green_medium: z.number().min(0).max(255),
		blue_medium: z.number().min(0).max(255),
		duration_medium: z.number().min(0).max(255),
		red_bad: z.number().min(0).max(255),
		green_bad: z.number().min(0).max(255),
		blue_bad: z.number().min(0).max(255),
		duration_bad: z.number().min(0).max(255),
	}),
	getCo2Led: z.object({}),
	setCo2AutoZeroPeriod: z.object({
		hours: z.number().min(0).max(255),
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
	...GeneralCommandSchemas,
	...DisplayCommandSchemas,
	...PIRCommandSchemas,
	...ChildLockCommandSchemas,
	setCo2MeasurementBlindTime: z.object({
		time: z.number().min(0).max(255),
	}),
	getCo2MeasurementBlindTime: z.object({}),
	setCo2BoundaryLevels: z.object({
		good_medium: z.number().min(0).max(1500),
		medium_bad: z.number().min(0).max(1500),
	}),
	getCo2BoundaryLevels: z.object({}),
	setCo2AutoZeroValue: z.object({
		ppm: z.number().min(0).max(1500),
	}),
	getCo2AutoZeroValue: z.object({}),
	setCo2MeasurementPeriod: z.object({
		good_zone: z.number().min(0).max(255),
		medium_zone: z.number().min(0).max(255),
		bad_zone: z.number().min(0).max(255),
	}),
	getCo2MeasurementPeriod: z.object({}),
	setCo2AutoZeroPeriod: z.object({
		hours: z.number().min(0).max(255),
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
	...GeneralCommandSchemas,
	...DisplayCommandSchemas,
	...ChildLockCommandSchemas,
	setCo2BoundaryLevels: z.object({
		good_medium: z.number().min(0).max(1500),
		medium_bad: z.number().min(0).max(1500),
	}),
	getCo2BoundaryLevels: z.object({}),
	setCo2AutoZeroValue: z.object({
		ppm: z.number().min(0).max(1500),
	}),
	getCo2AutoZeroValue: z.object({}),
	setCo2MeasurementPeriod: z.object({
		good_zone: z.number().min(0).max(255),
		medium_zone: z.number().min(0).max(255),
		bad_zone: z.number().min(0).max(255),
	}),
	getCo2MeasurementPeriod: z.object({}),
	setCo2AutoZeroPeriod: z.object({
		hours: z.number().min(0).max(255),
	}),
	getCo2AutoZeroPeriod: z.object({}),
	setCo2ImagesVisibility: z.object({
		chart: z.boolean(),
		digital_value: z.boolean(),
		emoji: z.boolean(),
	}),
	getCo2ImagesVisibility: z.object({}),
	setUplinkSendingOnButtonPress: z.object({
		value: z.number().min(0).max(1),
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
		compensation: z.number().min(0).max(255),
	}),
	getTemperatureCompensation: z.object({}),
	setHumidityCompensation: z.object({
		negativeCompensation: z.boolean(), // true: negative compensation, false: positive compensation
		compensation: z.number().min(0).max(255),
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
		time: z.number().min(0).max(255),
	}),
	getFloodAlarmTime: z.object({}),
	setKeepAlive: z.object({
		time: z.number().min(1).max(14400),
	}),
	getDeviceVersion: z.object({}),
	setFloodEventSendTime: z.object({
		time: z.number().min(0).max(255),
	}),
	getFloodEventSendTime: z.object({}),
	setFloodEventUplinkType: z.object({
		type: z.enum(['01', '00']), // 01: confirmedUplinks, 00: unconfirmedUplinks
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
		value: z.number().min(0).max(1), // 1: send later when allowed, 0: Don't send later when allowed
	}),
	getSendEventLater: z.object({}),
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
		good_medium: z.number().min(0).max(1500),
		medium_bad: z.number().min(0).max(1500),
	}),
	getCo2BoundaryLevels: z.object({}),
	setCo2AutoZeroValue: z.object({
		ppm: z.number().min(0).max(1500),
	}),
	getCo2AutoZeroValue: z.object({}),
	setCo2MeasurementPeriod: z.object({
		good_zone: z.number().min(0).max(255),
		medium_zone: z.number().min(0).max(255),
		bad_zone: z.number().min(0).max(255),
	}),
	getCo2MeasurementPeriod: z.object({}),
	setCo2AutoZeroPeriod: z.object({
		hours: z.number().min(0).max(255),
	}),
	getCo2AutoZeroPeriod: z.object({}),
}

export namespace Co2PirLiteCommandTypes {
	export type SetUplinkSendingOnButtonPressParams = z.infer<
		typeof Co2PirLiteCommandSchemas.setUplinkSendingOnButtonPress
	>
	export type GetUplinkSendingOnButtonPressParams = z.infer<
		typeof Co2PirLiteCommandSchemas.getUplinkSendingOnButtonPress
	>
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

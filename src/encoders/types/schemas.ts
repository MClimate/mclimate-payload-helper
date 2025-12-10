/* eslint-disable @typescript-eslint/no-namespace */
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
	setLedDisplayTempUnits: {
		0: 'Celsius',
		1: 'Fahrenheit',
		2: 'Conventional (0-5)',
	} satisfies NumberEnum<0 | 1 | 2>,
} as const

export const Relay16Enums = {
	setRelayState: {
		false: 'Off',
		true: 'On',
	},
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
		0: 'Close',
		1: 'Open',
	} satisfies NumberEnum<0 | 1>,
} as const

export const FloodEnums = {
	setFloodEventUplinkType: {
		'00': 'Unconfirmed',
		'01': 'Confirmed',
	} satisfies StringEnum<'00' | '01'>,
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
	clearPressEventCounter: {
		1: 'Single',
		2: 'Double',
		3: 'Triple',
	} satisfies NumberEnum<1 | 2 | 3>,
} as const

export const HTPirLiteEnums = {
	setPIRSensorState: {
		0: 'Disabled',
		1: 'Enabled',
	} satisfies NumberEnum<0 | 1>,
} as const

export const Co2PirLiteEnums = {
	setPIRSensorState: {
		0: 'Disabled',
		1: 'Enabled',
	} satisfies NumberEnum<0 | 1>,
} as const

/* ---------------------------------------GENERAL COMMANDS--------------------------------------- */

const GeneralCommandSchemas = {
	customHexCommand: z.object({
		command: z.string().regex(/^[0-9A-Fa-f]+$/, 'Must be a valid hex string'),
		commandNumber: z.string().optional(),
	}),
	setKeepAlive: z.object({
		time: z.number().int().min(1).max(255),
		commandNumber: z.string().optional().default('02'),
	}),
	getKeepAlive: z.object({
		commandNumber: z.string().optional().default('12'),
	}),
	getDeviceVersion: z.object({
		commandNumber: z.string().optional().default('04'),
	}),
	setJoinRetryPeriod: z.object({
		period: z.number().int().min(1).max(21),
		commandNumber: z.string().optional().default('10'),
	}),
	getJoinRetryPeriod: z.object({
		commandNumber: z.string().optional().default('19'),
	}),
	setUplinkType: z.object({
		type: z.enum(['01', '00']),
		commandNumber: z.string().optional().default('11'),
	}),
	getUplinkType: z.object({
		commandNumber: z.string().optional().default('1b'),
	}),
	setWatchDogParams: z.object({
		confirmedUplinks: z.number().int().min(0).max(255),
		unconfirmedUplinks: z.number().int().min(0).max(255),
		commandNumber: z.string().optional().default('1c'),
	}),
	getWatchDogParams: z.object({
		commandNumber: z.string().optional().default('1d'),
	}),
	getRegion: z.object({
		commandNumber: z.string().optional().default('a4'),
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
		commandNumber: z.string().optional().default('07'),
	}),
	getChildLock: z.object({
		commandNumber: z.string().optional().default('14'),
	}),
}

export namespace ChildLockCommandTypes {
	export type SetChildLockParams = z.infer<typeof ChildLockCommandSchemas.setChildLock>
}

/* ---------------------------------------TEMPERATURE COMMANDS--------------------------------------- */

const TemperatureCommandSchemas = {
	setTemperatureRange: z.object({
		min: z.number().min(5).max(30),
		max: z.number().min(5).max(30),
		commandNumber: z.string().optional().default('08'),
	}),
	getTemperatureRange: z.object({
		commandNumber: z.string().optional().default('15'),
	}),
	getTargetTemperature: z.object({
		commandNumber: z.string().optional().default('2f'),
	}),
}

export namespace TemperatureCommandTypes {
	export type SetTemperatureRangeParams = z.infer<typeof TemperatureCommandSchemas.setTemperatureRange>
}

/* ---------------------------------------PIR COMMANDS--------------------------------------- */

const PIRCommandSchemas = {
	setPIRSensorStatus: z.object({
		state: z.number().min(0).max(1), // 0: disabled, 1: enabled
		commandNumber: z.string().optional().default('3c'),
	}),
	getPIRSensorStatus: z.object({
		commandNumber: z.string().optional().default('3d'),
	}),
	setPIRSensorSensitivity: z.object({
		sensitivity: z.number().min(12).max(255),
		commandNumber: z.string().optional().default('3e'),
	}),
	getPIRSensorSensitivity: z.object({
		commandNumber: z.string().optional().default('3f'),
	}),
	setPIRInitPeriod: z.object({
		time: z.number().min(0).max(255),
		commandNumber: z.string().optional().default('46'),
	}),
	setPIRMeasurementPeriod: z.object({
		time: z.number().min(3).max(255),
		commandNumber: z.string().optional().default('48'),
	}),
	setPIRCheckPeriod: z.object({
		time: z.number().min(0).max(65535),
		commandNumber: z.string().optional().default('4a'),
	}),
	setPIRBlindPeriod: z.object({
		time: z.number().min(15).max(65535),
		commandNumber: z.string().optional().default('4c'),
	}),
	getPIRInitPeriod: z.object({
		commandNumber: z.string().optional().default('47'),
	}),
	getPIRMeasurementPeriod: z.object({
		commandNumber: z.string().optional().default('49'),
	}),
	getPIRCheckPeriod: z.object({
		commandNumber: z.string().optional().default('4b'),
	}),
	getPIRBlindPeriod: z.object({
		commandNumber: z.string().optional().default('4d'),
	}),
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
		commandNumber: z.string().optional().default('33'),
	}),
	getDisplayRefreshPeriod: z.object({
		commandNumber: z.string().optional().default('34'),
	}),
	setDeepSleepMode: z.object({
		state: z.number().min(1).max(1),
		commandNumber: z.string().optional().default('3b'),
	}),
	setHumidityVisibility: z.object({
		state: z.number().min(0).max(1), // 0: hide, 1: show
		commandNumber: z.string().optional().default('42'),
	}),
	getHumidityVisibility: z.object({
		commandNumber: z.string().optional().default('43'),
	}),
	setLightIntensityVisibility: z.object({
		state: z.number().min(0).max(1), // 0: hide, 1: show
		commandNumber: z.string().optional().default('44'),
	}),
	getLightIntensityVisibility: z.object({
		commandNumber: z.string().optional().default('45'),
	}),
	setCurrentTemperatureVisibility: z.object({
		state: z.number().min(0).max(1), // 0: hide, 1: show
		commandNumber: z.string().optional().default('40'),
	}),
	getCurrentTemperatureVisibility: z.object({
		commandNumber: z.string().optional().default('41'),
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
		commandNumber: z.string().optional().default('06'),
	}),
	getOpenWindowParams: z.object({
		commandNumber: z.string().optional().default('13'),
	}),
	recalibrateMotor: z.object({
		commandNumber: z.string().optional().default('03'),
	}),
	forceClose: z.object({
		commandNumber: z.string().optional().default('0b'),
	}),
	setInternalAlgoParams: z.object({
		period: z.number().int().min(0).max(255),
		pFirstLast: z.number().int().min(0).max(255),
		pNext: z.number().int().min(0).max(255),
		commandNumber: z.string().optional().default('0c'),
	}),
	getInternalAlgoParams: z.object({
		commandNumber: z.string().optional().default('16'),
	}),
	setOperationalMode: z.object({
		mode: z.enum(['00', '01', '02']),
		commandNumber: z.string().optional().default('0d'),
	}),
	getOperationalMode: z.object({
		commandNumber: z.string().optional().default('18'),
	}),
	setTargetTemperature: z.object({
		targetTemperature: z.number().min(5).max(30),
		commandNumber: z.string().optional().default('0e'),
	}),
	setExternalTemperature: z.object({
		temp: z.number().int().min(0).max(255),
		commandNumber: z.string().optional().default('0f'),
	}),
	getExternalTemperature: z.object({
		commandNumber: z.string().optional().default('44'),
	}),
	setInternalAlgoTdiffParams: z.object({
		cold: z.number().int().min(0).max(255),
		warm: z.number().int().min(0).max(255),
		commandNumber: z.string().optional().default('1a'),
	}),
	getInternalAlgoTdiffParams: z.object({
		commandNumber: z.string().optional().default('17'),
	}),
	setPrimaryOperationalMode: z.object({
		mode: z.enum(['00', '01']),
		commandNumber: z.string().optional().default('1e'),
	}),
	getPrimaryOperationalMode: z.object({
		commandNumber: z.string().optional().default('1f'),
	}),
	setBatteryRangesBoundaries: z.object({
		Boundary1: z.number().int().min(0).max(65535),
		Boundary2: z.number().int().min(0).max(65535),
		Boundary3: z.number().int().min(0).max(65535),
		commandNumber: z.string().optional().default('20'),
	}),
	getBatteryRangesBoundaries: z.object({
		commandNumber: z.string().optional().default('21'),
	}),
	setBatteryRangesOverVoltage: z.object({
		Range1: z.number().int().min(0).max(255),
		Range2: z.number().int().min(0).max(255),
		Range3: z.number().int().min(0).max(255),
		commandNumber: z.string().optional().default('22'),
	}),
	getBatteryRangesOverVoltage: z.object({
		commandNumber: z.string().optional().default('23'),
	}),
	setOvac: z.object({
		ovac: z.number().int().min(0).max(255),
		commandNumber: z.string().optional().default('26'),
	}),
	getOvac: z.object({
		commandNumber: z.string().optional().default('27'),
	}),
	setProportionalAlgorithmParameters: z.object({
		coefficient: z.number().min(0).max(20),
		period: z.number().int().min(0).max(255),
		commandNumber: z.string().optional().default('2a'),
	}),
	getProportionalAlgorithmParameters: z.object({
		commandNumber: z.string().optional().default('29'),
	}),
	setTemperatureControlAlgorithm: z.object({
		algorithm: z.enum(['00', '01', '02']),
		commandNumber: z.string().optional().default('2c'),
	}),
	getTemperatureControlAlgorithm: z.object({
		commandNumber: z.string().optional().default('2b'),
	}),
	setMotorPositionOnly: z.object({
		position: z.number().int().min(0).max(800),
		commandNumber: z.string().optional().default('2d'),
	}),
	deviceReset: z.object({
		commandNumber: z.string().optional().default('30'),
	}),
	setTargetTemperatureAndMotorPosition: z.object({
		motorPosition: z.number().int().min(0).max(800),
		targetTemperature: z.number().min(5).max(30),
		commandNumber: z.string().optional().default('31'),
	}),
	setChildLockBehavior: z.object({
		behavior: z.number().min(0).max(1),
		commandNumber: z.string().optional().default('35'),
	}),
	getChildLockBehavior: z.object({
		commandNumber: z.string().optional().default('34'),
	}),
	setProportionalGain: z.object({
		proportionalGain: z.number().int().min(0).max(127),
		commandNumber: z.string().optional().default('37'),
	}),
	getProportionalGain: z.object({
		commandNumber: z.string().optional().default('36'),
	}),
	setExternalTemperatureFloat: z.object({
		temp: z.number().min(0.1).max(255.0).multipleOf(0.1),
		commandNumber: z.string().optional().default('3c'),
	}),
	setIntegralGain: z.object({
		integralGain: z.number().int().min(0).max(127),
		commandNumber: z.string().optional().default('3e'),
	}),
	getIntegralGain: z.object({
		commandNumber: z.string().optional().default('3d'),
	}),
	getIntegralValue: z.object({
		commandNumber: z.string().optional().default('3f'),
	}),
	setPiRunPeriod: z.object({
		period: z.number().int().min(0).max(255),
		commandNumber: z.string().optional().default('41'),
	}),
	getPiRunPeriod: z.object({
		commandNumber: z.string().optional().default('40'),
	}),
	setTemperatureHysteresis: z.object({
		hysteresis: z.number().min(0.1).max(10.0).multipleOf(0.1),
		commandNumber: z.string().optional().default('43'),
	}),
	getTemperatureHysteresis: z.object({
		commandNumber: z.string().optional().default('42'),
	}),
	setOpenWindowPrecisely: z.object({
		enabled: z.boolean(),
		duration: z.number().min(0).max(51),
		delta: z.number().min(0.1).max(15.0).multipleOf(0.1),
		commandNumber: z.string().optional().default('45'),
	}),
	getOpenWindowPrecisely: z.object({
		commandNumber: z.string().optional().default('46'),
	}),
	setForceAttach: z.object({
		enabled: z.boolean(),
		commandNumber: z.string().optional().default('47'),
	}),
	getForceAttach: z.object({
		commandNumber: z.string().optional().default('48'),
	}),
	setAntiFreezeParams: z.object({
		activatedTemperature: z.number().min(0).max(25),
		deactivatedTemperature: z.number().min(0).max(25),
		targetTemperature: z.number().min(0).max(30),
		commandNumber: z.string().optional().default('49'),
	}),
	getAntiFreezeParams: z.object({
		commandNumber: z.string().optional().default('4a'),
	}),
	setMaxAllowedIntegralValue: z.object({
		value: z.number().int().min(0).max(255),
		commandNumber: z.string().optional().default('4c'),
	}),
	getMaxAllowedIntegralValue: z.object({
		commandNumber: z.string().optional().default('4d'),
	}),
	setValveOpennessInPercentage: z.object({
		value: z.number().min(0).max(100),
		commandNumber: z.string().optional().default('4e'),
	}),
	setValveOpennessRangeInPercentage: z.object({
		min: z.number().min(0).max(100),
		max: z.number().min(0).max(100),
		commandNumber: z.string().optional().default('4f'),
	}),
	getValveOpennessRangeInPercentage: z.object({
		commandNumber: z.string().optional().default('50'),
	}),
	setTemperatureOffset: z.object({
		value: z.number().min(-5).max(5),
		commandNumber: z.string().optional().default('53'),
	}),
	getTemperatureOffset: z.object({
		commandNumber: z.string().optional().default('54'),
	}),
	setHeatingEvent: z.object({
		eventIndex: z.number().int().min(0).max(19),
		startHour: z.number().int().min(0).max(23),
		startMinute: z.number().int().min(0).max(59),
		targetTemperature: z.number().min(5.0).max(30.0).multipleOf(0.1),
		daysActive: z.object({
			monday: z.boolean(),
			tuesday: z.boolean(),
			wednesday: z.boolean(),
			thursday: z.boolean(),
			friday: z.boolean(),
			saturday: z.boolean(),
			sunday: z.boolean(),
		}),
		commandNumber: z.string().optional().default('59'),
	}),
	getHeatingEvent: z.object({
		commandNumber: z.string().optional().default('5a'),
	}),
	setHeatingEventState: z.object({
		eventIndex: z.number().int().min(0).max(19),
		active: z.boolean(),
		commandNumber: z.string().optional().default('6b'),
	}),
	getHeatingEventState: z.object({
		commandNumber: z.string().optional().default('6c'),
	}),
	setTimeRequestByMACcommand: z.object({
		enabled: z.boolean(),
		commandNumber: z.string().optional().default('6d'),
	}),
	getTimeRequestByMACcommand: z.object({
		commandNumber: z.string().optional().default('6e'),
	}),
	setHeatingSchedule: z.object({
		startMonth: z.number().int().min(0).max(11),
		startDay: z.number().int().min(0).max(31), // 0 disables schedule handling
		endMonth: z.number().int().min(0).max(11),
		endDay: z.number().int().min(0).max(31), // 0 disables schedule handling
		commandNumber: z.string().optional().default('5b'),
	}),
	getHeatingSchedule: z.object({
		commandNumber: z.string().optional().default('5c'),
	}),
	setDeviceTime: z.object({
		timestamp: z.number().int().min(0).max(4294967295), // Unsigned 32-bit integer max value
		commandNumber: z.string().optional().default('5d'),
	}),
	getDeviceTime: z.object({
		commandNumber: z.string().optional().default('5e'),
	}),
	setDeviceTimeZone: z.object({
		offsetHours: z.number().int().min(-12).max(12), // Time zone offset in hours, range [-12:12]
		commandNumber: z.string().optional().default('5f'),
	}),
	getDeviceTimeZone: z.object({
		commandNumber: z.string().optional().default('60'),
	}),
	setAutomaticSetpointRestore: z.object({
		time: z.number().int().min(0).max(255), // Time in 10-minute increments (0-2550 minutes), 0 disables the functionality
		commandNumber: z.string().optional().default('61'),
	}),
	getAutomaticSetpointRestore: z.object({
		commandNumber: z.string().optional().default('62'),
	}),
	setOfflineTargetTemperature: z.object({
		targetTemperature: z.union([
			z.literal(0), // To disable the feature
			z.number().min(5).max(30).multipleOf(0.1), // Temperature range 5.0-30.0°C with 0.1°C increments
		]),
		commandNumber: z.string().optional().default('65'),
	}),
	getOfflineTargetTemperature: z.object({
		commandNumber: z.string().optional().default('66'),
	}),
	setInternalAlgoTemporaryState: z.object({
		enabled: z.boolean(), // true = enable algorithm (00), false = disable algorithm temporarily (01)
		commandNumber: z.string().optional().default('67'),
	}),
	getInternalAlgoTemporaryState: z.object({
		commandNumber: z.string().optional().default('68'),
	}),
	setTemperatureLevels: z.object({
		level0: z.number().min(5).max(30).multipleOf(0.1),
		level1: z.number().min(5).max(30).multipleOf(0.1),
		level2: z.number().min(5).max(30).multipleOf(0.1),
		level3: z.number().min(5).max(30).multipleOf(0.1),
		level4: z.number().min(5).max(30).multipleOf(0.1),
		level5: z.number().min(5).max(30).multipleOf(0.1),
		commandNumber: z.string().optional().default('69'),
	}),
	getTemperatureLevels: z.object({
		commandNumber: z.string().optional().default('6a'),
	}),
	setLedIndicationDuration: z.object({
		duration: z.number().min(0.5).max(20).multipleOf(0.5), // Duration in range [0.5:20] with 0.5s resolution
		commandNumber: z.string().optional().default('63'),
	}),
	getLedIndicationDuration: z.object({
		commandNumber: z.string().optional().default('64'),
	}),
	setLedDisplayTempUnits: z.object({
		value: z.number().min(0).max(2),
		commandNumber: z.string().optional().default('55'),
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
	export type SetHeatingEventParams = z.infer<typeof VickiCommandSchemas.setHeatingEvent>
	export type SetHeatingEventStateParams = z.infer<typeof VickiCommandSchemas.setHeatingEventState>
	export type SetTimeRequestByMACcommandParams = z.infer<typeof VickiCommandSchemas.setTimeRequestByMACcommand>
	export type SetHeatingScheduleParams = z.infer<typeof VickiCommandSchemas.setHeatingSchedule>
	export type SetDeviceTimeParams = z.infer<typeof VickiCommandSchemas.setDeviceTime>
	export type SetDeviceTimeZoneParams = z.infer<typeof VickiCommandSchemas.setDeviceTimeZone>
	export type SetAutomaticSetpointRestoreParams = z.infer<typeof VickiCommandSchemas.setAutomaticSetpointRestore>
	export type SetOfflineTargetTemperatureParams = z.infer<typeof VickiCommandSchemas.setOfflineTargetTemperature>
	export type SetInternalAlgoTemporaryStateParams = z.infer<typeof VickiCommandSchemas.setInternalAlgoTemporaryState>
	export type SetTemperatureLevelsParams = z.infer<typeof VickiCommandSchemas.setTemperatureLevels>
	export type SetLedIndicationDurationParams = z.infer<typeof VickiCommandSchemas.setLedIndicationDuration>
	export type SetLedDisplayTempUnitsParams = z.infer<typeof VickiCommandSchemas.setLedDisplayTempUnits>
}

/* --------------------------------------- RELAY 16 COMMANDS --------------------------------------- */

const Relay16CommandSchemas = {
	...GeneralCommandSchemas,
	setOverheatingThresholds: z.object({
		trigger: z.number().min(30).max(100),
		recovery: z.number().min(30).max(100),
		commandNumber: z.string().optional().default('1e'),
	}),
	getOverheatingThresholds: z.object({
		commandNumber: z.string().optional().default('1f'),
	}),
	setOvervoltageThresholds: z.object({
		trigger: z.number().min(1).max(255),
		recovery: z.number().min(1).max(255),
		commandNumber: z.string().optional().default('20'),
	}),
	getOvervoltageThresholds: z.object({
		commandNumber: z.string().optional().default('21'),
	}),
	setOvercurrentThreshold: z.object({
		current: z.number().min(1).max(16),
		commandNumber: z.string().optional().default('22'),
	}),
	getOvercurrentThreshold: z.object({
		commandNumber: z.string().optional().default('23'),
	}),
	setOverpowerThreshold: z.object({
		power: z.number().min(100).max(3680),
		commandNumber: z.string().optional().default('24'),
	}),
	getOverpowerThreshold: z.object({
		commandNumber: z.string().optional().default('25'),
	}),
	clearAcumulatedEnergy: z.object({
		commandNumber: z.string().optional(),
	}),
	setAfterOverheatingProtectionRecovery: z.object({
		state: z.number().min(0).max(1), // 0: lastState, 1: OFF
		commandNumber: z.string().optional().default('59'),
	}),
	getAfterOverheatingProtectionRecovery: z.object({
		commandNumber: z.string().optional().default('5a'),
	}),
	setLedIndicationMode: z.object({
		mode: z.number().min(0).max(1), // 0: OFF, 1: ON
		commandNumber: z.string().optional().default('5b'),
	}),
	getLedIndicationMode: z.object({
		commandNumber: z.string().optional().default('5c'),
	}),
	setRelayRecoveryState: z.object({
		state: z.number().min(0).max(2), // 0: lastState, 1: ON, 2: OFF
		commandNumber: z.string().optional().default('5e'),
	}),
	getRelayRecoveryState: z.object({
		commandNumber: z.string().optional().default('5f'),
	}),
	setRelayState: z.object({
		state: z.boolean(), // 0: OFF, 1: ON
		commandNumber: z.string().optional().default('c1'),
	}),
	getRelayState: z.object({
		commandNumber: z.string().optional().default('b1'),
	}),
	setRelayTimerInMilliseconds: z.object({
		state: z.number().min(0).max(1), // 0: OFF, 1: ON
		time: z.number().min(0).max(65535),
		commandNumber: z.string().optional().default('55'),
	}),
	getRelayTimerInMilliseconds: z.object({
		commandNumber: z.string().optional().default('56'),
	}),
	setRelayTimerInSeconds: z.object({
		state: z.number().min(0).max(1), // 0: OFF, 1: ON
		time: z.number().min(0).max(65535),
		commandNumber: z.string().optional().default('57'),
	}),
	getRelayTimerInSeconds: z.object({
		commandNumber: z.string().optional().default('58'),
	}),
	getRelayStateChangeReason: z.object({
		commandNumber: z.string().optional().default('54'),
	}),
	getOverheatingEvents: z.object({
		commandNumber: z.string().optional().default('60'),
	}),
	getOvervoltageEvents: z.object({
		commandNumber: z.string().optional().default('61'),
	}),
	getOvercurrentEvents: z.object({
		commandNumber: z.string().optional().default('62'),
	}),
	getOverpowerEvents: z.object({
		commandNumber: z.string().optional().default('63'),
	}),
	getOverheatingRecoveryTime: z.object({
		commandNumber: z.string().optional().default('70'),
	}),
	getOvervoltageRecoveryTime: z.object({
		commandNumber: z.string().optional().default('71'),
	}),
	getOvercurrentRecoveryTemp: z.object({
		commandNumber: z.string().optional().default('72'),
	}),
	getOverpowerRecoveryTemp: z.object({
		commandNumber: z.string().optional().default('73'),
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
	export type SetRelayTimerInMillisecondsParams = z.infer<typeof Relay16CommandSchemas.setRelayTimerInMilliseconds>
	export type SetRelayTimerInSecondsParams = z.infer<typeof Relay16CommandSchemas.setRelayTimerInSeconds>
}

/* --------------------------------------- RELAY 16 DRY COMMANDS --------------------------------------- */

const Relay16DryCommandSchemas = {
	...GeneralCommandSchemas,
	setOverheatingThresholds: z.object({
		trigger: z.number().min(30).max(100),
		recovery: z.number().min(30).max(100),
		commandNumber: z.string().optional().default('1e'),
	}),
	getOverheatingThresholds: z.object({
		commandNumber: z.string().optional().default('1f'),
	}),
	setAfterOverheatingProtectionRecovery: z.object({
		state: z.number().min(0).max(1), // 0: lastState, 1: OFF
		commandNumber: z.string().optional().default('59'),
	}),
	setRelayTimerInMilliseconds: z.object({
		state: z.number().min(0).max(1), // 0: OFF, 1: ON
		time: z.number().min(0).max(65535),
		commandNumber: z.string().optional().default('55'),
	}),
	getRelayTimerInMilliseconds: z.object({
		commandNumber: z.string().optional().default('56'),
	}),
	setRelayTimerInSeconds: z.object({
		state: z.number().min(0).max(1), // 0: OFF, 1: ON
		time: z.number().min(0).max(65535),
		commandNumber: z.string().optional().default('57'),
	}),
	getRelayTimerInSeconds: z.object({
		commandNumber: z.string().optional().default('58'),
	}),
	getRelayStateChangeReason: z.object({
		commandNumber: z.string().optional().default('54'),
	}),
	getAfterOverheatingProtectionRecovery: z.object({
		commandNumber: z.string().optional().default('5a'),
	}),
	setLedIndicationMode: z.object({
		mode: z.number().min(0).max(1), // 0: OFF, 1: ON
		commandNumber: z.string().optional().default('5b'),
	}),
	getLedIndicationMode: z.object({
		commandNumber: z.string().optional().default('5c'),
	}),
	setRelayRecoveryState: z.object({
		state: z.number().min(0).max(2), // 0: lastState, 1: ON, 2: OFF
		commandNumber: z.string().optional().default('5e'),
	}),
	getRelayRecoveryState: z.object({
		commandNumber: z.string().optional().default('5f'),
	}),
	setRelayState: z.object({
		state: z.boolean(), // 0: OFF, 1: ON
		commandNumber: z.string().optional().default('c1'),
	}),
	getRelayState: z.object({
		commandNumber: z.string().optional().default('b1'),
	}),
	getOverheatingEvents: z.object({
		commandNumber: z.string().optional().default('60'),
	}),
}

// ------------------------------------------------ T-VALVE COMMANDS ------------------------------------------------

const TValveCommandSchemas = {
	...GeneralCommandSchemas,
	setOpenCloseTime: z.object({
		openingTime: z.number().min(1).max(255),
		closingTime: z.number().min(1).max(255),
		commandNumber: z.string().optional().default('01'),
	}),
	getOpenCloseTime: z.object({
		commandNumber: z.string().optional(),
	}),
	setLED: z.object({
		ledId: z.number().min(1).max(4),
		behavior: z.number().min(0).max(4),
		seconds: z.number().min(1).max(255),
		commandNumber: z.string().optional().default('02'),
	}),
	setBuzzer: z.object({
		volume: z.number().min(1).max(255),
		frequency: z.number().min(1).max(255),
		activeTime: z.number().min(1).max(255),
		onTime: z.number().min(1).max(255),
		offTime: z.number().min(1).max(255),
		commandNumber: z.string().optional().default('03'),
	}),
	setEmergencyOpenings: z.object({
		maxOpenings: z.number().min(1).max(15),
		commandNumber: z.string().optional().default('04'),
	}),
	getEmergencyOpenings: z.object({
		commandNumber: z.string().optional().default('0f'),
	}),
	setManualControl: z.object({
		enableOpen: z.boolean(),
		enableClose: z.boolean(),
		commandNumber: z.string().optional().default('05'),
	}),
	setFloodAlarmTime: z.object({
		time: z.number().min(1).max(255),
		commandNumber: z.string().optional().default('06'),
	}),
	getFloodAlarmTime: z.object({
		commandNumber: z.string().optional().default('10'),
	}),
	setKeepAliveTValve: z.object({
		time: z.number().min(1).max(255),
		commandNumber: z.string().optional().default('02'),
	}),
	setWorkingVoltage: z.object({
		voltage: z.number().min(1840).max(2500),
		commandNumber: z.string().optional().default('09'),
	}),
	getWorkingVoltage: z.object({
		commandNumber: z.string().optional().default('11'),
	}),
	setValveState: z.object({
		state: z.number().min(0).max(1), // 0: open, 1: close
		commandNumber: z.string().optional().default('0c'),
	}),
	setOpenCloseTimeExtended: z.object({
		openingTime: z.number().min(1).max(65535),
		closingTime: z.number().min(1).max(65535),
		commandNumber: z.string().optional().default('0d'),
	}),
	getOpenCloseTimeExtended: z.object({
		commandNumber: z.string().optional().default('0e'),
	}),
	setSingleTimeValveState: z.object({
		state: z.number().min(0).max(1), // 0: open, 1: close
		time: z.number().min(1).max(65535),
		commandNumber: z.string().optional().default('14'),
	}),
	setDeviceFloodSensor: z.object({
		enabled: z.boolean(),
		commandNumber: z.string().optional().default('0a'),
	}),
	getDeviceFloodSensor: z.object({
		commandNumber: z.string().optional().default('13'),
	}),
	setJoinRetryPeriodTValve: z.object({
		period: z.number().min(1).max(21),
		commandNumber: z.string().optional().default('10'),
	}),
	setUplinkTypeTValve: z.object({
		type: z.enum(['01', '00']), // 01: confirmedUplinks, 00: unconfirmedUplinks
		commandNumber: z.string().optional().default('11'),
	}),
	setWatchDogTValveParams: z.object({
		confirmedUplinks: z.number().min(0).max(255),
		unconfirmedUplinks: z.number().min(0).max(255),
		commandNumber: z.string().optional().default('1c'),
	}),
	getWatchDogTValveParams: z.object({
		commandNumber: z.string().optional(),
	}),
	requestFullData: z.object({
		commandNumber: z.string().optional().default('08'),
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
	...TemperatureCommandSchemas,
	setDisplayRefreshPeriod: z.object({
		period: z.number().min(1).max(24),
		commandNumber: z.string().optional().default('33'),
	}),
	getDisplayRefreshPeriod: z.object({
		commandNumber: z.string().optional().default('34'),
	}),
	setHumidityVisibility: z.object({
		state: z.number().min(0).max(1), // 0: hide, 1: show
		commandNumber: z.string().optional().default('42'),
	}),
	getHumidityVisibility: z.object({
		commandNumber: z.string().optional().default('43'),
	}),
	setCurrentTemperatureVisibility: z.object({
		state: z.number().min(0).max(1), // 0: hide, 1: show
		commandNumber: z.string().optional().default('40'),
	}),
	getCurrentTemperatureVisibility: z.object({
		commandNumber: z.string().optional().default('41'),
	}),
	setTargetTemperatureStep: z.object({
		value: z.number().min(0.1).max(10).multipleOf(0.1),
		commandNumber: z.string().optional().default('03'),
	}),
	getTargetTemperatureStep: z.object({
		commandNumber: z.string().optional().default('05'),
	}),
	setKeysLock: z.object({
		value: z.number().min(0).max(5),
		commandNumber: z.string().optional().default('07'),
	}),
	getKeysLock: z.object({
		commandNumber: z.string().optional().default('14'),
	}),
	setTargetTemperature: z.object({
		targetTemperature: z.number().min(5).max(99),
		commandNumber: z.string().optional().default('0e'),
	}),
	setValveOpenCloseTime: z.object({
		value: z.number().min(1).max(255),
		commandNumber: z.string().optional().default('31'),
	}),
	getValveOpenCloseTime: z.object({
		commandNumber: z.string().optional().default('32'),
	}),
	setExtAutomaticTemperatureControl: z.object({
		value: z.number().min(0).max(1), // 0: deactivated, 1: activated
		commandNumber: z.string().optional().default('35'),
	}),
	getExtAutomaticTemperatureControl: z.object({
		commandNumber: z.string().optional().default('36'),
	}),
	setFanSpeed: z.object({
		value: z.number().min(0).max(6),
		commandNumber: z.string().optional().default('44'),
	}),
	getFanSpeed: z.object({
		commandNumber: z.string().optional().default('45'),
	}),
	setFanSpeedLimit: z.object({
		value: z.number().min(0).max(3),
		commandNumber: z.string().optional().default('46'),
	}),
	getFanSpeedLimit: z.object({
		commandNumber: z.string().optional().default('47'),
	}),
	setEcmVoltageRange: z.object({
		min: z.number().min(0).max(10),
		max: z.number().min(0).max(10),
		commandNumber: z.string().optional().default('48'),
	}),
	getEcmVoltageRange: z.object({
		commandNumber: z.string().optional().default('49'),
	}),
	setEcmStartUpTime: z.object({
		value: z.number().min(0).max(20),
		commandNumber: z.string().optional().default('4a'),
	}),
	getEcmStartUpTime: z.object({
		commandNumber: z.string().optional().default('4b'),
	}),
	setEcmRelay: z.object({
		value: z.number().min(0).max(1), // 0: deactivated, 1: activated
		commandNumber: z.string().optional().default('4c'),
	}),
	getEcmRelay: z.object({
		commandNumber: z.string().optional().default('4d'),
	}),
	setFrostProtection: z.object({
		value: z.number().min(0).max(1), // 0: OFF, 1: ON
		commandNumber: z.string().optional().default('4e'),
	}),
	getFrostProtection: z.object({
		commandNumber: z.string().optional().default('4f'),
	}),
	setFrostProtectionSettings: z.object({
		threshold: z.number().min(4).max(20),
		setpoint: z.number().min(4).max(20),
		commandNumber: z.string().optional().default('50'),
	}),
	getFrostProtectionSettings: z.object({
		commandNumber: z.string().optional().default('51'),
	}),
	setFctOperationalMode: z.object({
		value: z.number().min(0).max(2), // 0: ventilation, 1: heating, 2: cooling
		commandNumber: z.string().optional().default('52'),
	}),
	setAllowedOperationalModes: z.object({
		value: z.number().min(0).max(2),
		commandNumber: z.string().optional().default('54'),
	}),
	getAllowedOperationalModes: z.object({
		commandNumber: z.string().optional().default('55'),
	}),
	setCoolingSetpointNotOccupied: z.object({
		value: z.number().min(5).max(30),
		commandNumber: z.string().optional().default('56'),
	}),
	getCoolingSetpointNotOccupied: z.object({
		commandNumber: z.string().optional().default('57'),
	}),
	setHeatingSetpointNotOccupied: z.object({
		value: z.number().min(5).max(30),
		commandNumber: z.string().optional().default('58'),
	}),
	getHeatingSetpointNotOccupied: z.object({
		commandNumber: z.string().optional().default('59'),
	}),
	setTempSensorCompensation: z.object({
		compensation: z.number().min(0).max(1),
		temperature: z.number().min(-5).max(5).multipleOf(0.1),
		commandNumber: z.string().optional().default('5a'),
	}),
	getTempSensorCompensation: z.object({
		commandNumber: z.string().optional().default('5b'),
	}),
	setFanSpeedNotOccupied: z.object({
		value: z.number().min(0).max(2), // 0: low, 1: automatic, 2: dontChange
		commandNumber: z.string().optional().default('5c'),
	}),
	getFanSpeedNotOccupied: z.object({
		commandNumber: z.string().optional().default('5d'),
	}),
	setAutomaticChangeover: z.object({
		value: z.number().min(0).max(1), // 0: deactivated, 1: activated
		commandNumber: z.string().optional().default('5e'),
	}),
	getAutomaticChangeover: z.object({
		commandNumber: z.string().optional().default('5f'),
	}),
	setWiringDiagram: z.object({
		value: z.number().min(0).max(6),
		commandNumber: z.string().optional().default('60'),
	}),
	getWiringDiagram: z.object({
		commandNumber: z.string().optional().default('61'),
	}),
	setOccFunction: z.object({
		value: z.number().min(0).max(7),
		commandNumber: z.string().optional().default('62'),
	}),
	getOccFunction: z.object({
		commandNumber: z.string().optional().default('63'),
	}),
	setAutomaticChangeoverThreshold: z.object({
		coolingThreshold: z.number().min(5).max(20),
		heatingThreshold: z.number().min(30).max(60),
		commandNumber: z.string().optional().default('64'),
	}),
	getAutomaticChangeoverThreshold: z.object({
		commandNumber: z.string().optional().default('65'),
	}),
	setDeviceStatus: z.object({
		value: z.number().min(0).max(1), // 0: off, 1: on
		commandNumber: z.string().optional().default('66'),
	}),
	getDeviceStatus: z.object({
		commandNumber: z.string().optional().default('67'),
	}),
	setReturnOfPowerOperation: z.object({
		value: z.number().min(0).max(2), // 0: lastStatus, 1: on, 2: off
		commandNumber: z.string().optional().default('68'),
	}),
	getReturnOfPowerOperation: z.object({
		commandNumber: z.string().optional().default('69'),
	}),
	setDeltaTemperature1: z.object({
		value: z.number().min(0.5).max(10).multipleOf(0.5),
		commandNumber: z.string().optional().default('6a'),
	}),
	getDeltaTemperature1: z.object({
		commandNumber: z.string().optional().default('6b'),
	}),
	setDeltaTemperature2and3: z.object({
		deltaTemperature2: z.number().min(0.5).max(10).multipleOf(0.5),
		deltaTemperature3: z.number().min(0.5).max(10).multipleOf(0.5),
		commandNumber: z.string().optional().default('6c'),
	}),
	getDeltaTemperature2and3: z.object({
		commandNumber: z.string().optional().default('6d'),
	}),
	getFrostProtectionStatus: z.object({
		commandNumber: z.string().optional().default('6e'),
	}),
	getOccupancySensorStatusSetPoint: z.object({
		commandNumber: z.string().optional().default('70'),
	}),
	getOccupancySensorStatus: z.object({
		commandNumber: z.string().optional().default('71'),
	}),
	getDewPointSensorStatus: z.object({
		commandNumber: z.string().optional().default('72'),
	}),
	getFilterAlarm: z.object({
		commandNumber: z.string().optional().default('73'),
	}),
	setHeatingCoolingTargetTempRanges: z.object({
		heatingTempMin: z.number().min(5).max(30),
		heatingTempMax: z.number().min(5).max(30),
		coolingTempMin: z.number().min(5).max(30),
		coolingTempMax: z.number().min(5).max(30),
		commandNumber: z.string().optional().default('16'),
	}),
	getHeatingCoolingTargetTempRanges: z.object({
		commandNumber: z.string().optional().default('17'),
	}),
	setHeatingCoolingTargetTempRangesUnoccupied: z.object({
		heatingTempMin: z.number().min(5).max(30),
		heatingTempMax: z.number().min(5).max(30),
		coolingTempMin: z.number().min(5).max(30),
		coolingTempMax: z.number().min(5).max(30),
		commandNumber: z.string().optional().default('76'),
	}),
	getHeatingCoolingTargetTempRangesUnoccupied: z.object({
		commandNumber: z.string().optional().default('77'),
	}),
	setFanOffDelayTime: z.object({
		time: z.number().min(0).max(255),
		commandNumber: z.string().optional().default('78'),
	}),
	getFanOffDelayTime: z.object({
		commandNumber: z.string().optional().default('79'),
	}),
	setAdditionalFanMode: z.object({
		mode: z.number().min(0).max(2), // 0: TurnOffOnTargetReach, 1: KeepOnTargetReach, 2: FanAlwaysOn
		commandNumber: z.string().optional().default('7a'),
	}),
	getAdditionalFanMode: z.object({
		commandNumber: z.string().optional().default('7b'),
	}),
	getInternalTemperatureSensorError: z.object({
		commandNumber: z.string().optional().default('7c'),
	}),
	getExternalTemperatureSensorError: z.object({
		commandNumber: z.string().optional().default('7d'),
	}),
	setUserInterfaceLanguage: z.object({
		value: z.number().min(0).max(3), // 0: English, 1: French, 2: German, 3: Spanish
		commandNumber: z.string().optional().default('9a'),
	}),
	getUserInterfaceLanguage: z.object({
		commandNumber: z.string().optional().default('9b'),
	}),
	restartDevice: z.object({
		commandNumber: z.string().optional().default('a5'),
	}),
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
		commandNumber: z.string().optional().default('1e'),
	}),
	getNotificationBlindTime: z.object({
		commandNumber: z.string().optional().default('1f'),
	}),
}

export namespace OpenCloseSensorCommandTypes {
	export type SetNotificationBlindTimeParams = z.infer<typeof OpenCloseSensorCommandSchemas.setNotificationBlindTime>
}

/* --------------------------------------- WIRELESS THERMOSTAT COMMANDS --------------------------------------- */
const WirelessThermostatCommandSchemas = {
	...GeneralCommandSchemas,
	...TemperatureCommandSchemas,
	getTemperatureRange: z.object({
		commandNumber: z.string().optional().default('15'),
	}),
	...DisplayCommandSchemas,
	...PIRCommandSchemas,
	...ChildLockCommandSchemas,
	setTargetTemperature: z.object({
		targetTemperature: z.number().min(5).max(99),
		commandNumber: z.string().optional().default('0e'),
	}),
	getTargetTemperature: z.object({
		commandNumber: z.string().optional().default('2f'),
	}),
	setHeatingStatus: z.object({
		status: z.number().min(0).max(1), // 0: disabled, 1: enabled
		commandNumber: z.string().optional().default('31'),
	}),
	getHeatingStatus: z.object({
		commandNumber: z.string().optional().default('32'),
	}),
	setDisplayRefreshPeriod: z.object({
		period: z.number().min(1).max(24),
		commandNumber: z.string().optional().default('33'),
	}),
	getDisplayRefreshPeriod: z.object({
		commandNumber: z.string().optional().default('34'),
	}),
	setTargetSendDelay: z.object({
		time: z.number().min(0).max(255),
		commandNumber: z.string().optional().default('35'),
	}),
	getTargetSendDelay: z.object({
		commandNumber: z.string().optional().default('36'),
	}),
	setAutomaticHeatingStatus: z.object({
		state: z.number().min(0).max(1), // 0: turnOffAutomaticMode, 1: turnOnAutomaticMode
		commandNumber: z.string().optional().default('37'),
	}),
	getAutomaticHeatingStatus: z.object({
		commandNumber: z.string().optional().default('38'),
	}),
	setSensorMode: z.object({
		state: z.number().min(0).max(1), // 0: turnOffSensorMode, 1: turnOnSensorMode
		commandNumber: z.string().optional().default('39'),
	}),
	getSensorMode: z.object({
		commandNumber: z.string().optional().default('3a'),
	}),
	setTemperatureHysteresis: z.object({
		hysteresis: z.number().min(0.1).max(25.5).multipleOf(0.1),
		commandNumber: z.string().optional().default('43'),
	}),
	getTemperatureHysteresis: z.object({
		commandNumber: z.string().optional().default('42'),
	}),
	setTargetTemperaturePrecisely: z.object({
		targetTemperature: z.number().min(5).max(99).multipleOf(0.1),
		commandNumber: z.string().optional().default('50'),
	}),
	getTargetTemperaturePrecisely: z.object({
		commandNumber: z.string().optional().default('51'),
	}),
	setTargetTemperatureStep: z.object({
		value: z.number().min(0.1).max(10).multipleOf(0.1),
		commandNumber: z.string().optional().default('03'),
	}),
	getTargetTemperatureStep: z.object({
		commandNumber: z.string().optional().default('05'),
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
		good_medium: z.number().min(0).max(1500),
		medium_bad: z.number().min(0).max(1500),
		commandNumber: z.string().optional().default('1e'),
	}),
	getCo2BoundaryLevels: z.object({
		commandNumber: z.string().optional().default('1f'),
	}),
	setCo2AutoZeroValue: z.object({
		ppm: z.number().min(0).max(1500),
		commandNumber: z.string().optional().default('20'),
	}),
	getCo2AutoZeroValue: z.object({
		commandNumber: z.string().optional().default('21'),
	}),
	setNotifyPeriod: z.object({
		good_zone: z.number().min(0).max(255),
		medium_zone: z.number().min(0).max(255),
		bad_zone: z.number().min(0).max(255),
		commandNumber: z.string().optional().default('22'),
	}),
	getNotifyPeriod: z.object({
		commandNumber: z.string().optional().default('23'),
	}),
	setCo2MeasurementPeriod: z.object({
		good_zone: z.number().min(0).max(255),
		medium_zone: z.number().min(0).max(255),
		bad_zone: z.number().min(0).max(255),
		commandNumber: z.string().optional().default('24'),
	}),
	getCo2MeasurementPeriod: z.object({
		commandNumber: z.string().optional().default('25'),
	}),
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
		commandNumber: z.string().optional().default('26'),
	}),
	getBuzzerNotification: z.object({
		commandNumber: z.string().optional().default('27'),
	}),
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
		commandNumber: z.string().optional().default('28'),
	}),
	getCo2Led: z.object({
		commandNumber: z.string().optional().default('29'),
	}),
	setCo2AutoZeroPeriod: z.object({
		hours: z.number().min(0).max(255),
		commandNumber: z.string().optional().default('2a'),
	}),
	getCo2AutoZeroPeriod: z.object({
		commandNumber: z.string().optional().default('2b'),
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
	...GeneralCommandSchemas,
	...DisplayCommandSchemas,
	...PIRCommandSchemas,
	...ChildLockCommandSchemas,
	setCo2MeasurementBlindTime: z.object({
		time: z.number().min(0).max(255),
		commandNumber: z.string().optional().default('81'),
	}),
	getCo2MeasurementBlindTime: z.object({
		commandNumber: z.string().optional().default('80'),
	}),
	setCo2BoundaryLevels: z.object({
		good_medium: z.number().min(0).max(1500),
		medium_bad: z.number().min(0).max(1500),
		commandNumber: z.string().optional().default('1e'),
	}),
	getCo2BoundaryLevels: z.object({
		commandNumber: z.string().optional().default('1f'),
	}),
	setCo2AutoZeroValue: z.object({
		ppm: z.number().min(0).max(1500),
		commandNumber: z.string().optional().default('20'),
	}),
	getCo2AutoZeroValue: z.object({
		commandNumber: z.string().optional().default('21'),
	}),
	setCo2MeasurementPeriod: z.object({
		good_zone: z.number().min(0).max(255),
		medium_zone: z.number().min(0).max(255),
		bad_zone: z.number().min(0).max(255),
		commandNumber: z.string().optional().default('24'),
	}),
	getCo2MeasurementPeriod: z.object({
		commandNumber: z.string().optional().default('25'),
	}),
	setCo2AutoZeroPeriod: z.object({
		hours: z.number().min(0).max(255),
		commandNumber: z.string().optional().default('2a'),
	}),
	getCo2AutoZeroPeriod: z.object({
		commandNumber: z.string().optional().default('2b'),
	}),

	setCo2ImagesVisibility: z.object({
		chart: z.boolean(),
		digital_value: z.boolean(),
		emoji: z.boolean(),
		commandNumber: z.string().optional().default('82'),
	}),
	getCo2ImagesVisibility: z.object({
		commandNumber: z.string().optional().default('83'),
	}),
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
		commandNumber: z.string().optional().default('1e'),
	}),
	getCo2BoundaryLevels: z.object({
		commandNumber: z.string().optional().default('1f'),
	}),
	setCo2AutoZeroValue: z.object({
		ppm: z.number().min(0).max(1500),
		commandNumber: z.string().optional().default('20'),
	}),
	getCo2AutoZeroValue: z.object({
		commandNumber: z.string().optional().default('21'),
	}),
	setCo2MeasurementPeriod: z.object({
		good_zone: z.number().min(0).max(255),
		medium_zone: z.number().min(0).max(255),
		bad_zone: z.number().min(0).max(255),
		commandNumber: z.string().optional().default('24'),
	}),
	getCo2MeasurementPeriod: z.object({
		commandNumber: z.string().optional().default('25'),
	}),
	setCo2AutoZeroPeriod: z.object({
		hours: z.number().min(0).max(255),
		commandNumber: z.string().optional().default('2a'),
	}),
	getCo2AutoZeroPeriod: z.object({
		commandNumber: z.string().optional().default('2b'),
	}),
	setCo2ImagesVisibility: z.object({
		chart: z.boolean(),
		digital_value: z.boolean(),
		emoji: z.boolean(),
		commandNumber: z.string().optional().default('82'),
	}),
	getCo2ImagesVisibility: z.object({
		commandNumber: z.string().optional().default('83'),
	}),
	setUplinkSendingOnButtonPress: z.object({
		value: z.number().min(0).max(1),
		commandNumber: z.string().optional().default('2e'),
	}),
	getUplinkSendingOnButtonPress: z.object({
		commandNumber: z.string().optional().default('2f'),
	}),
	restartDevice: z.object({
		commandNumber: z.string().optional().default('a5'),
	}),
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
		compensation: z.number().min(0).max(25.5).multipleOf(0.1),
		commandNumber: z.string().optional().default('31'),
	}),
	getTemperatureCompensation: z.object({
		commandNumber: z.string().optional().default('32'),
	}),
	setHumidityCompensation: z.object({
		negativeCompensation: z.boolean(), // true: negative compensation, false: positive compensation
		compensation: z.number().min(0).max(255).multipleOf(0.1),
		commandNumber: z.string().optional().default('33'),
	}),
	getHumidityCompensation: z.object({
		commandNumber: z.string().optional().default('34'),
	}),
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
		commandNumber: z.string().optional().default('05'),
	}),
}

export namespace AQICommandTypes {
	export type SetAqiLedParams = z.infer<typeof AQICommandSchemas.setAqiLed>
}

/* --------------------------------------- T-FLOOD COMMANDS --------------------------------------- */
const TFloodCommandSchemas = {
	...GeneralCommandSchemas,
	getTemperature: z.object({
		commandNumber: z.string().optional().default('01'),
	}),
	setFloodAlarmTime: z.object({
		time: z.number().min(0).max(255),
		commandNumber: z.string().optional().default('06'),
	}),
	getFloodAlarmTime: z.object({
		commandNumber: z.string().optional().default('10'),
	}),
	setKeepAlive: z.object({
		time: z.number().min(1).max(14400),
		commandNumber: z.string().optional().default('02'),
	}),
	getDeviceVersion: z.object({
		commandNumber: z.string().optional().default('04'),
	}),
	setFloodEventSendTime: z.object({
		time: z.number().min(0).max(255),
		commandNumber: z.string().optional().default('08'),
	}),
	getFloodEventSendTime: z.object({
		commandNumber: z.string().optional().default('09'),
	}),
	setFloodEventUplinkType: z.object({
		type: z.enum(['01', '00']), // 01: confirmedUplinks, 00: unconfirmedUplinks
		commandNumber: z.string().optional().default('13'),
	}),
	getFloodEventUplinkType: z.object({
		commandNumber: z.string().optional().default('14'),
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
		commandNumber: z.string().optional().default('01'),
	}),
	setThermostatConfig: z.object({
		time: z.number(),
		temp_span: z.number(),
		temp_sampling: z.number(),
		target: z.number(),
		commandNumber: z.string().optional().default('02'),
	}),
	setKeepAlive: z.object({
		time: z.number(),
		commandNumber: z.string().optional().default('02'),
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
		commandNumber: z.string().optional().default('1e'),
	}),
	setVrvOnTime: z.object({
		time: z.number(),
		commandNumber: z.string().optional().default('20'),
	}),
	setVrvOffTime: z.object({
		time: z.number(),
		commandNumber: z.string().optional().default('21'),
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
		commandNumber: z.string().optional().default('1e'),
	}),
	getSendEventLater: z.object({
		commandNumber: z.string().optional().default('1f'),
	}),
	clearPressEventCounter: z.object({
		value: z.number().min(1).max(3),
		commandNumber: z.string().optional().default('20'),
	}),
	restartDevice: z.object({
		commandNumber: z.string().optional().default('a5'),
	}),
	getSinglePressEventCounter: z.object({
		commandNumber: z.string().optional().default('b1'),
	}),
	getDoublePressEventCounter: z.object({
		commandNumber: z.string().optional().default('b2'),
	}),
	getTriplePressEventCounter: z.object({
		commandNumber: z.string().optional().default('b3'),
	}),
}

export namespace ButtonCommandTypes {
	export type SetSendEventLaterParams = z.infer<typeof ButtonCommandSchemas.setSendEventLater>
	export type ClearPressEventCounter = z.infer<typeof ButtonCommandSchemas.clearPressEventCounter>
}

/* --------------------------------------- HT PIR LITE COMMANDS --------------------------------------- */
const HTPirLiteCommandSchemas = {
	...GeneralCommandSchemas,
	setUplinkSendingOnButtonPress: z.object({
		value: z.number().min(0).max(1),
		commandNumber: z.string().optional().default('2e'),
	}),
	getUplinkSendingOnButtonPress: z.object({
		commandNumber: z.string().optional().default('2f'),
	}),
	restartDevice: z.object({
		commandNumber: z.string().optional().default('a5'),
	}),
	setPIRSensorState: z.object({
		state: z.number().min(0).max(1), // 0: disabled, 1: enabled
		commandNumber: z.string().optional().default('36'),
	}),
	getPIRSensorState: z.object({
		commandNumber: z.string().optional().default('37'),
	}),
	setPIRSensorSensitivity: z.object({
		sensitivity: z.number().min(12).max(255),
		commandNumber: z.string().optional().default('3e'),
	}),
	getPIRSensorSensitivity: z.object({
		commandNumber: z.string().optional().default('3f'),
	}),
	setOccupancyTimeout: z.object({
		timeout: z.number().min(15).max(65535), // in seconds, between 15 and 65535
		commandNumber: z.string().optional().default('38'),
	}),
	getOccupancyTimeout: z.object({
		commandNumber: z.string().optional().default('39'),
	}),
}

export namespace HTPirLiteCommandTypes {
	export type SetUplinkSendingOnButtonPressParams = z.infer<typeof HTPirLiteCommandSchemas.setUplinkSendingOnButtonPress>
	export type GetUplinkSendingOnButtonPressParams = z.infer<typeof HTPirLiteCommandSchemas.getUplinkSendingOnButtonPress>
	export type RestartDeviceParams = z.infer<typeof HTPirLiteCommandSchemas.restartDevice>
	export type SetPIRSensorStateParams = z.infer<typeof HTPirLiteCommandSchemas.setPIRSensorState>
	export type GetPIRSensorStateParams = z.infer<typeof HTPirLiteCommandSchemas.getPIRSensorState>
	export type SetPIRSensorSensitivityParams = z.infer<typeof HTPirLiteCommandSchemas.setPIRSensorSensitivity>
	export type GetPIRSensorSensitivityParams = z.infer<typeof HTPirLiteCommandSchemas.getPIRSensorSensitivity>
	export type SetOccupancyTimeoutParams = z.infer<typeof HTPirLiteCommandSchemas.setOccupancyTimeout>
	export type GetOccupancyTimeoutParams = z.infer<typeof HTPirLiteCommandSchemas.getOccupancyTimeout>
}

/* --------------------------------------- CO2 PIR LITE COMMANDS --------------------------------------- */
const Co2PirLiteCommandSchemas = {
	...GeneralCommandSchemas,
	setPIRSensorState: z.object({
		state: z.number().min(0).max(1), // 0: disabled, 1: enabled
		commandNumber: z.string().optional().default('36'),
	}),
	getPIRSensorState: z.object({
		commandNumber: z.string().optional().default('37'),
	}),
	setPIRSensorSensitivity: z.object({
		sensitivity: z.number().min(12).max(255),
		commandNumber: z.string().optional().default('3e'),
	}),
	getPIRSensorSensitivity: z.object({
		commandNumber: z.string().optional().default('3f'),
	}),
	setOccupancyTimeout: z.object({
		timeout: z.number().min(15).max(65535), // in seconds, between 15 and 65535
		commandNumber: z.string().optional().default('38'),
	}),
	getOccupancyTimeout: z.object({
		commandNumber: z.string().optional().default('39'),
	}),
	restartDevice: z.object({
		commandNumber: z.string().optional().default('a5'),
	}),
	setCo2BoundaryLevels: z.object({
		good_medium: z.number().min(0).max(1500),
		medium_bad: z.number().min(0).max(1500),
		commandNumber: z.string().optional().default('1e'),
	}),
	getCo2BoundaryLevels: z.object({
		commandNumber: z.string().optional().default('1f'),
	}),
	setCo2AutoZeroValue: z.object({
		ppm: z.number().min(0).max(1500),
		commandNumber: z.string().optional().default('20'),
	}),
	getCo2AutoZeroValue: z.object({
		commandNumber: z.string().optional().default('21'),
	}),
	setCo2MeasurementPeriod: z.object({
		good_zone: z.number().min(0).max(255),
		medium_zone: z.number().min(0).max(255),
		bad_zone: z.number().min(0).max(255),
		commandNumber: z.string().optional().default('24'),
	}),
	getCo2MeasurementPeriod: z.object({
		commandNumber: z.string().optional().default('25'),
	}),
	setCo2AutoZeroPeriod: z.object({
		hours: z.number().min(0).max(255),
		commandNumber: z.string().optional().default('2a'),
	}),
	getCo2AutoZeroPeriod: z.object({
		commandNumber: z.string().optional().default('2b'),
	}),
}

export namespace Co2PirLiteCommandTypes {
	export type SetPIRSensorStateParams = z.infer<typeof Co2PirLiteCommandSchemas.setPIRSensorState>
	export type GetPIRSensorStateParams = z.infer<typeof Co2PirLiteCommandSchemas.getPIRSensorState>
	export type SetPIRSensorSensitivityParams = z.infer<typeof Co2PirLiteCommandSchemas.setPIRSensorSensitivity>
	export type GetPIRSensorSensitivityParams = z.infer<typeof Co2PirLiteCommandSchemas.getPIRSensorSensitivity>
	export type SetOccupancyTimeoutParams = z.infer<typeof Co2PirLiteCommandSchemas.setOccupancyTimeout>
	export type GetOccupancyTimeoutParams = z.infer<typeof Co2PirLiteCommandSchemas.getOccupancyTimeout>
	export type RestartDeviceParams = z.infer<typeof Co2PirLiteCommandSchemas.restartDevice>
}

/* --------------------------------------- Melissa --------------------------------------- */
const MelissaCommandSchemas = {
	...GeneralCommandSchemas,
	setIrCodeRecording: z.object({
		time: z.number().min(0).max(255),
		position: z.number().min(0).max(10),
		commandNumber: z.string().optional().default('09'),
	}),
}

export namespace MelissaCommandTypes {
	export type SetIrCodeRecordingParams = z.infer<typeof MelissaCommandSchemas.setIrCodeRecording>
}

/* --------------------------------------- MULTISENSOR COMMANDS --------------------------------------- */
const MultiSensorCommandSchemas = {
	...GeneralCommandSchemas,
	setLightState: z.object({
		enabled: z.boolean(),
		commandNumber: z.string().optional().default('1e'),
	}),
	getLightState: z.object({
		commandNumber: z.string().optional().default('1f'),
	}),
	setHallState: z.object({
		enabled: z.boolean(),
		commandNumber: z.string().optional().default('20'),
	}),
	getHallState: z.object({
		commandNumber: z.string().optional().default('21'),
	}),
	setHallBlindPeriod: z.object({
		period: z.number().min(0).max(65535),
		commandNumber: z.string().optional().default('22'),
	}),
	getHallBlindPeriod: z.object({
		commandNumber: z.string().optional().default('23'),
	}),
	setMicrophoneState: z.object({
		enabled: z.boolean(),
		commandNumber: z.string().optional().default('24'),
	}),
	getMicrophoneState: z.object({
		commandNumber: z.string().optional().default('25'),
	}),
	setMicrophoneSamplingPeriod: z.object({
		period: z.number().min(0).max(65535),
		commandNumber: z.string().optional().default('26'),
	}),
	getMicrophoneSamplingPeriod: z.object({
		commandNumber: z.string().optional().default('27'),
	}),
	setGasState: z.object({
		enabled: z.boolean(),
		commandNumber: z.string().optional().default('28'),
	}),
	getGasState: z.object({
		commandNumber: z.string().optional().default('29'),
	}),
	setGasMeasurementPeriod: z.object({
		minutes: z.number().min(0).max(255),
		commandNumber: z.string().optional().default('2a'),
	}),
	getGasMeasurementPeriod: z.object({
		commandNumber: z.string().optional().default('2b'),
	}),
	setPirState: z.object({
		enabled: z.boolean(),
		commandNumber: z.string().optional().default('2c'),
	}),
	getPirState: z.object({
		commandNumber: z.string().optional().default('2d'),
	}),
	setPirActiveReportingPeriod: z.object({
		time: z.number().min(0).max(65535),
		commandNumber: z.string().optional().default('2e'),
	}),
	getPirActiveReportingPeriod: z.object({
		commandNumber: z.string().optional().default('2f'),
	}),
	restart: z.object({
		commandNumber: z.string().optional().default('a5'),
	}),
}

export namespace MultiSensorCommandTypes {
	export type SetLightStateParams = z.infer<typeof MultiSensorCommandSchemas.setLightState>
	export type SetHallStateParams = z.infer<typeof MultiSensorCommandSchemas.setHallState>
	export type SetHallBlindPeriodParams = z.infer<typeof MultiSensorCommandSchemas.setHallBlindPeriod>
	export type SetMicrophoneStateParams = z.infer<typeof MultiSensorCommandSchemas.setMicrophoneState>
	export type SetMicrophoneSamplingPeriodParams = z.infer<typeof MultiSensorCommandSchemas.setMicrophoneSamplingPeriod>
	export type SetGasStateParams = z.infer<typeof MultiSensorCommandSchemas.setGasState>
	export type SetGasMeasurementPeriodParams = z.infer<typeof MultiSensorCommandSchemas.setGasMeasurementPeriod>
	export type SetPirStateParams = z.infer<typeof MultiSensorCommandSchemas.setPirState>
	export type SetPirActiveReportingPeriodParams = z.infer<typeof MultiSensorCommandSchemas.setPirActiveReportingPeriod>
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
	MelissaCommandSchemas,
	MultiSensorCommandSchemas,
}

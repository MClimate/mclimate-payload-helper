import { z } from 'zod'

/* ---------------------------------------GENERAL COMMANDS--------------------------------------- */
export const customHexCommandSchema = z.object({
	command: z.string(),
})
export type CustomHexCommandParams = z.infer<typeof customHexCommandSchema>

export const setKeepAliveSchema = z.object({
	time: z.number(),
})
export type SetKeepAliveParams = z.infer<typeof setKeepAliveSchema>

export const setChildLockSchema = z.object({
	enabled: z.boolean(),
})
export type SetChildLockParams = z.infer<typeof setChildLockSchema>

export const setTemperatureRangeSchema = z.object({
	min: z.number(),
	max: z.number(),
})
export type SetTemperatureRangeParams = z.infer<typeof setTemperatureRangeSchema>

export const setJoinRetryPeriodSchema = z.object({
	period: z.number(),
})
export type SetJoinRetryPeriodParams = z.infer<typeof setJoinRetryPeriodSchema>

export const setUplinkTypeSchema = z.object({
	type: z.string(),
})
export type SetUplinkTypeParams = z.infer<typeof setUplinkTypeSchema>

export const setWatchDogParamsSchema = z.object({
	confirmedUplinks: z.number(),
	unconfirmedUplinks: z.number(),
})
export type SetWatchDogParams = z.infer<typeof setWatchDogParamsSchema>

export const setDisplayRefreshPeriodSchema = z.object({
	period: z.number(),
})
export type SetDisplayRefreshPeriodParams = z.infer<typeof setDisplayRefreshPeriodSchema>

export const setDeepSleepModeSchema = z.object({
	state: z.number(),
})
export type SetDeepSleepModeParams = z.infer<typeof setDeepSleepModeSchema>

export const setPIRSensorStatusSchema = z.object({
	state: z.number(),
})
export type SetPIRSensorStatusParams = z.infer<typeof setPIRSensorStatusSchema>

export const setPIRSensorSensitivitySchema = z.object({
	sensitivity: z.number(),
})
export type SetPIRSensorSensitivityParams = z.infer<typeof setPIRSensorSensitivitySchema>

export const setCurrentTemperatureVisibilitySchema = z.object({
	state: z.number(),
})
export type SetCurrentTemperatureVisibilityParams = z.infer<typeof setCurrentTemperatureVisibilitySchema>

export const setHumidityVisibilitySchema = z.object({
	state: z.number(),
})
export type SetHumidityVisibilityParams = z.infer<typeof setHumidityVisibilitySchema>

export const setLightIntensityVisibilitySchema = z.object({
	state: z.number(),
})
export type SetLightIntensityVisibilityParams = z.infer<typeof setLightIntensityVisibilitySchema>

export const setCo2ImagesVisibilitySchema = z.object({
	chart: z.number(),
	digital_value: z.number(),
	emoji: z.number(),
})
export type SetCo2ImagesVisibilityParams = z.infer<typeof setCo2ImagesVisibilitySchema>

export const setPIRPeriodSchema = z.object({
	time: z.number(),
})
export type SetPIRPeriodParams = z.infer<typeof setPIRPeriodSchema>

/* ---------------------------------------VICKI COMMANDS--------------------------------------- */

export const setOpenWindowSchema = z.object({
	enabled: z.boolean(),
	delta: z.number(),
	closeTime: z.number(),
	motorPosition: z.number(),
})
export type SetOpenWindowParams = z.infer<typeof setOpenWindowSchema>

export const setInternalAlgoParamsSchema = z.object({
	period: z.number(),
	pFirstLast: z.number(),
	pNext: z.number(),
})
export type SetInternalAlgoParamsParams = z.infer<typeof setInternalAlgoParamsSchema>

export const setOperationalModeSchema = z.object({
	mode: z.string(),
})
export type SetOperationalModeParams = z.infer<typeof setOperationalModeSchema>

export const setTargetTemperatureSchema = z.object({
	targetTemperature: z.number(),
})
export type SetTargetTemperatureParams = z.infer<typeof setTargetTemperatureSchema>

export const setExternalTemperatureSchema = z.object({
	temp: z.number(),
})
export type SetExternalTemperatureParams = z.infer<typeof setExternalTemperatureSchema>

export const setInternalAlgoTdiffParamsSchema = z.object({
	cold: z.number(),
	warm: z.number(),
})
export type SetInternalAlgoTdiffParamsParams = z.infer<typeof setInternalAlgoTdiffParamsSchema>

export const setPrimaryOperationalModeSchema = z.object({
	mode: z.string(),
})
export type SetPrimaryOperationalModeParams = z.infer<typeof setPrimaryOperationalModeSchema>

export const setBatteryRangesBoundariesSchema = z.object({
	Boundary1: z.number(),
	Boundary2: z.number(),
	Boundary3: z.number(),
})
export type SetBatteryRangesBoundariesParams = z.infer<typeof setBatteryRangesBoundariesSchema>

export const setBatteryRangesOverVoltageSchema = z.object({
	Range1: z.number(),
	Range2: z.number(),
	Range3: z.number(),
})
export type SetBatteryRangesOverVoltageParams = z.infer<typeof setBatteryRangesOverVoltageSchema>

export const setOvacSchema = z.object({
	ovac: z.number(),
})
export type SetOvacParams = z.infer<typeof setOvacSchema>

export const setProportionalAlgorithmParametersSchema = z.object({
	coefficient: z.number(),
	period: z.number(),
})
export type SetProportionalAlgorithmParametersParams = z.infer<typeof setProportionalAlgorithmParametersSchema>

export const setTemperatureControlAlgorithmSchema = z.object({
	algorithm: z.string(),
})
export type SetTemperatureControlAlgorithmParams = z.infer<typeof setTemperatureControlAlgorithmSchema>

export const setMotorPositionOnlySchema = z.object({
	position: z.number(),
})
export type SetMotorPositionOnlyParams = z.infer<typeof setMotorPositionOnlySchema>

export const setTargetTemperatureAndMotorPositionSchema = z.object({
	motorPosition: z.number(),
	targetTemperature: z.number(),
})
export type SetTargetTemperatureAndMotorPositionParams = z.infer<typeof setTargetTemperatureAndMotorPositionSchema>

export const setChildLockBehaviorSchema = z.object({
	behavior: z.number(),
})
export type SetChildLockBehaviorParams = z.infer<typeof setChildLockBehaviorSchema>

export const setProportionalGainSchema = z.object({
	proportionalGain: z.number(),
})
export type SetProportionalGainParams = z.infer<typeof setProportionalGainSchema>

export const setExternalTemperatureFloatSchema = z.object({
	temp: z.number(),
})
export type SetExternalTemperatureFloatParams = z.infer<typeof setExternalTemperatureFloatSchema>

export const setIntegralGainSchema = z.object({
	integralGain: z.number(),
})
export type SetIntegralGainParams = z.infer<typeof setIntegralGainSchema>

export const setPiRunPeriodSchema = z.object({
	period: z.number(),
})
export type SetPiRunPeriodParams = z.infer<typeof setPiRunPeriodSchema>

export const setTemperatureHysteresisSchema = z.object({
	hysteresis: z.number(),
})
export type SetTemperatureHysteresisParams = z.infer<typeof setTemperatureHysteresisSchema>

export const setOpenWindowPreciselySchema = z.object({
	enabled: z.boolean(),
	duration: z.number(),
	delta: z.number(),
})
export type SetOpenWindowPreciselyParams = z.infer<typeof setOpenWindowPreciselySchema>

export const setForceAttachSchema = z.object({
	enabled: z.boolean(),
})
export type SetForceAttachParams = z.infer<typeof setForceAttachSchema>

export const setAntiFreezeParamsSchema = z.object({
	activatedTemperature: z.number(),
	deactivatedTemperature: z.number(),
	targetTemperature: z.number(),
})
export type SetAntiFreezeParamsParams = z.infer<typeof setAntiFreezeParamsSchema>

export const setMaxAllowedIntegralValueSchema = z.object({
	value: z.number(),
})
export type SetMaxAllowedIntegralValueParams = z.infer<typeof setMaxAllowedIntegralValueSchema>

export const setValveOpennessInPercentageSchema = z.object({
	value: z.number(),
})
export type SetValveOpennessInPercentageParams = z.infer<typeof setValveOpennessInPercentageSchema>

export const setValveOpennessRangeInPercentageSchema = z.object({
	min: z.number(),
	max: z.number(),
})
export type SetValveOpennessRangeInPercentageParams = z.infer<typeof setValveOpennessRangeInPercentageSchema>

export const setTemperatureOffsetSchema = z.object({
	value: z.number().min(-5).max(5),
})
export type SetTemperatureOffsetParams = z.infer<typeof setTemperatureOffsetSchema>

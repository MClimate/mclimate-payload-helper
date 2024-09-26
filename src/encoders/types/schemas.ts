import { z } from 'zod'

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

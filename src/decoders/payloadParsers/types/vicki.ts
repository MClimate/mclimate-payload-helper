export type VickiKeepAliveData = {
	reason: number
	targetTemperature: number
	sensorTemperature: number | undefined
	relativeHumidity: number
	motorRange: number
	motorPosition: number
	batteryVoltage: number
	openWindow: boolean
	highMotorConsumption: boolean
	lowMotorConsumption: boolean
	brokenSensor: boolean
	childLock: boolean
	calibrationFailed: boolean
	attachedBackplate: boolean
	perceiveAsOnline: boolean
	antiFreezeProtection: boolean
	d2dCommunicationReliable: boolean
	batteryTooLow: boolean
	valveOpenness: number
	targetTemperatureFloat?: string
}

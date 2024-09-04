export type KeepAliveData = {
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
	valveOpenness: number
	targetTemperatureFloat?: number
}

export enum DeviceType {
	Vicki = 'vicki',
	HTSensor = 'ht_sensor',
	TFlood = 't_flood',
	AQISensor = 'aqi_sensor',
	TValve = 't_valve',
	CO2Sensor = 'co2_sensor',
	Thermostat = 'thermostat',
	MCButton = 'mc_button',
	OpenCloseSensor = 'open_close_sensor',
	DskDevice = 'dsk_device',
	WirelessThermostat = 'wireless_thermostat',
	CO2Display = 'co2_display',
	FanCoilThermostat = 'fan_coil_thermostat',
	CO2DisplayLite = 'co2_display_lite',
	HTDisplayLite = 'ht_display_lite',
	Relay16 = 'relay_16',
}

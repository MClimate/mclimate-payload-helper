import { uplinkPayloadParser } from '@/decoders/payloadParsers'
import { DeviceType } from '@/decoders/payloadParsers/types'

describe('Vicki payload decoder', () => {
	test('simple keepalive', () => {
		expect(uplinkPayloadParser('811BAF4BAB2A129030', DeviceType.Vicki)).toStrictEqual({
			reason: 129,
			targetTemperature: 27,
			sensorTemperature: 25.88238397927527,
			relativeHumidity: 29.296875,
			motorRange: 554,
			motorPosition: 427,
			batteryVoltage: 2.9,
			openWindow: false,
			highMotorConsumption: false,
			lowMotorConsumption: false,
			brokenSensor: false,
			childLock: false,
			calibrationFailed: false,
			attachedBackplate: true,
			perceiveAsOnline: true,
			antiFreezeProtection: true,
			targetTemperatureFloat: '27.00',
			valveOpenness: 23,
		})
	})

	test('keepalive with response of commands', () => {
		expect(uplinkPayloadParser('1203042643811BAF4BAB2A129030', DeviceType.Vicki)).toStrictEqual({
			reason: 129,
			targetTemperature: 27,
			sensorTemperature: 25.88238397927527,
			relativeHumidity: 29.296875,
			motorRange: 554,
			motorPosition: 427,
			batteryVoltage: 2.9,
			openWindow: false,
			highMotorConsumption: false,
			lowMotorConsumption: false,
			brokenSensor: false,
			childLock: false,
			calibrationFailed: false,
			attachedBackplate: true,
			perceiveAsOnline: true,
			antiFreezeProtection: true,
			targetTemperatureFloat: '27.00',
			valveOpenness: 23,
			keepAliveTime: 3,
			deviceVersions: {
				hardware: 26,
				software: 43,
			},
		})
	})

	test('response of commands without keepalive', () => {
		expect(
			uplinkPayloadParser(
				'04264312031301032A211400150A1E420218011B00193C1D02181F003F01F43D00D34B4601030A4A3C5A07500064',
				DeviceType.Vicki,
			),
		).toStrictEqual({
			deviceVersions: { hardware: 26, software: 43 },
			keepAliveTime: 3,
			openWindowParams: {
				enabled: true,
				duration: 15,
				motorPosition: 554,
				delta: 1,
			},
			childLock: false,
			temperatureRangeSettings: { min: 10, max: 30 },
			tempHysteresis: 0.2,
			operationalMode: '01',
			uplinkType: '00',
			joinRetryPeriod: 5,
			watchDogParams: { wdpC: 2, wdpUc: 24 },
			primaryOperationalMode: '00',
			integralValue: 50,
			integralGain: '0.41268',
			openWindowPrecisely: { enabled: true, duration: 15, delta: 1 },
			antiFreezeParams: {
				activatedTemperature: 6,
				deactivatedTemperature: 9,
				targetTemperature: 7,
			},
			valveOpennessRangeInPercentage: { min: 0, max: 100 },
		})
	})

	test('keepalive with undefined response of command', () => {
		expect(uplinkPayloadParser('12039902042643811BAF4BAB2A129030', DeviceType.Vicki)).toStrictEqual({
			keepAliveTime: 3,
			reason: 129,
			targetTemperature: 27,
			sensorTemperature: 25.88238397927527,
			relativeHumidity: 29.296875,
			motorRange: 554,
			motorPosition: 427,
			batteryVoltage: 2.9,
			openWindow: false,
			highMotorConsumption: false,
			lowMotorConsumption: false,
			brokenSensor: false,
			childLock: false,
			calibrationFailed: false,
			attachedBackplate: true,
			perceiveAsOnline: true,
			antiFreezeProtection: true,
			targetTemperatureFloat: '27.00',
			valveOpenness: 23,
		})
	})
})

describe('HT payload decoder', () => {
	test('simple keepalive', () => {
		expect(uplinkPayloadParser('0102754BE90400', DeviceType.HTSensor)).toStrictEqual({
			sensorTemperature: 22.9,
			relativeHumidity: 29.296875,
			batteryVoltage: 3.4000000000000004,
			extThermistorTemperature: 0,
			thermistorProperlyConnected: false,
		})
	})

	test('keepalive with response of commands', () => {
		expect(uplinkPayloadParser('04201512050102764DE90400', DeviceType.HTSensor)).toStrictEqual({
			deviceVersions: { hardware: 20, software: 15 },
			keepAliveTime: 5,
			sensorTemperature: 23,
			relativeHumidity: 30.078125,
			batteryVoltage: 3.4000000000000004,
			extThermistorTemperature: 0,
			thermistorProperlyConnected: false,
		})
	})

	test('keepalive with undefined response of command', () => {
		expect(uplinkPayloadParser('042015990312050102764DE90400', DeviceType.HTSensor)).toStrictEqual({
			deviceVersions: { hardware: 20, software: 15 },
			sensorTemperature: 23,
			relativeHumidity: 30.078125,
			batteryVoltage: 3.4000000000000004,
			extThermistorTemperature: 0,
			thermistorProperlyConnected: false,
		})
	})
})

describe('CO2 payload decoder', () => {
	test('simple keepalive', () => {
		expect(uplinkPayloadParser('0102A7027E53E4', DeviceType.CO2Sensor)).toStrictEqual({
			CO2: 679,
			temperature: 23.8,
			humidity: 32.42,
			voltage: 3.42,
		})
	})

	test('keepalive with response of commands', () => {
		expect(uplinkPayloadParser('04202312040102A7027E53E4', DeviceType.CO2Sensor)).toStrictEqual({
			CO2: 679,
			temperature: 23.8,
			humidity: 32.42,
			voltage: 3.42,
			deviceVersions: { hardware: 20, software: 23 },
			keepAliveTime: 4,
		})
	})

	test('keepalive with undefined response of command', () => {
		expect(uplinkPayloadParser('042023990312040102A7027E53E4', DeviceType.CO2Sensor)).toStrictEqual({
			CO2: 679,
			temperature: 23.8,
			humidity: 32.42,
			voltage: 3.42,
			deviceVersions: { hardware: 20, software: 23 },
		})
	})
})

describe('Open/Close payload decoder', () => {
	test('simple keepalive', () => {
		expect(uplinkPayloadParser('01C2009600000101', DeviceType.OpenCloseSensor)).toStrictEqual({
			event: 'keepalive',
			status: 1,
			counter: 1,
			batteryVoltage: 3.152,
			thermistorProperlyConnected: true,
			sensorTemperature: 15,
		})
	})

	test('keepalive with response of commands', () => {
		expect(uplinkPayloadParser('041310120F01C2009600000101', DeviceType.OpenCloseSensor)).toStrictEqual({
			event: 'keepalive',
			status: 1,
			counter: 1,
			batteryVoltage: 3.152,
			thermistorProperlyConnected: true,
			sensorTemperature: 15,
			deviceVersions: { hardware: 13, software: 10 },
			keepAliveTime: 15,
		})
	})

	test('keepalive with undefined response of command', () => {
		expect(uplinkPayloadParser('0413109902120F01C2009600000101', DeviceType.OpenCloseSensor)).toStrictEqual({
			event: 'keepalive',
			status: 1,
			counter: 1,
			batteryVoltage: 3.152,
			thermistorProperlyConnected: true,
			sensorTemperature: 15,
			deviceVersions: { hardware: 13, software: 10 },
		})
	})
})

describe('Wireless Thermostat payload decoder', () => {
	test('simple keepalive', () => {
		expect(uplinkPayloadParser('81027f880db4011d00000000', DeviceType.WirelessThermostat)).toStrictEqual({
			targetTemperature: 28.5,
			sensorTemperature: 23.9,
			relativeHumidity: 53.13,
			batteryVoltage: 3.51,
			powerSourceStatus: 0,
			lux: 0,
			pir: false,
		})
	})

	test('keepalive with response of commands', () => {
		expect(uplinkPayloadParser('120A04271481027f880db4011d00000000', DeviceType.WirelessThermostat)).toStrictEqual({
			targetTemperature: 28.5,
			sensorTemperature: 23.9,
			relativeHumidity: 53.13,
			batteryVoltage: 3.51,
			powerSourceStatus: 0,
			lux: 0,
			pir: false,
			deviceVersions: { hardware: 27, software: 14 },
			keepAliveTime: 10,
		})
	})

	test('keepalive with undefined response of command', () => {
		expect(uplinkPayloadParser('120A990204271481027f880db4011d00000000', DeviceType.WirelessThermostat)).toStrictEqual({
			targetTemperature: 28.5,
			sensorTemperature: 23.9,
			relativeHumidity: 53.13,
			batteryVoltage: 3.51,
			powerSourceStatus: 0,
			lux: 0,
			pir: false,
			keepAliveTime: 10,
		})
	})
})

describe('FCT payload decoder', () => {
	test('simple keepalive', () => {
		expect(uplinkPayloadParser('01026A4C00DC0100070001', DeviceType.FanCoilThermostat)).toStrictEqual({
			sensorTemperature: 21.8,
			relativeHumidity: 29.69,
			targetTemperature: 22,
			operationalMode: 1,
			displayedFanSpeed: 0,
			actualFanSpeed: 7,
			valveStatus: 0,
			deviceStatus: 1,
		})
	})

	test('keepalive with response of commands', () => {
		expect(uplinkPayloadParser('120A04121201026A4C00DC0100070001', DeviceType.FanCoilThermostat)).toStrictEqual({
			sensorTemperature: 21.8,
			relativeHumidity: 29.69,
			targetTemperature: 22,
			operationalMode: 1,
			displayedFanSpeed: 0,
			actualFanSpeed: 7,
			valveStatus: 0,
			deviceStatus: 1,
			deviceVersions: { hardware: 12, software: 12 },
			keepAliveTime: 10,
		})
	})

	test('keepalive with undefined response of command', () => {
		expect(uplinkPayloadParser('120A990204121201026A4C00DC0100070001', DeviceType.FanCoilThermostat)).toStrictEqual({
			sensorTemperature: 21.8,
			relativeHumidity: 29.69,
			targetTemperature: 22,
			operationalMode: 1,
			displayedFanSpeed: 0,
			actualFanSpeed: 7,
			valveStatus: 0,
			deviceStatus: 1,
			keepAliveTime: 10,
		})
	})
})

describe('CO2 Display payload decoder', () => {
	test('simple keepalive', () => {
		expect(uplinkPayloadParser('0102784f0c04a510004d00', DeviceType.CO2Display)).toStrictEqual({
			CO2: 677,
			sensorTemperature: 23.2,
			relativeHumidity: 30.86,
			batteryVoltage: 3.08,
			powerSourceStatus: 0,
			lux: 77,
			pir: false,
		})
	})

	test('keepalive with response of commands', () => {
		expect(uplinkPayloadParser('120A0426100102784f0c04a510004d00', DeviceType.CO2Display)).toStrictEqual({
			CO2: 677,
			sensorTemperature: 23.2,
			relativeHumidity: 30.86,
			batteryVoltage: 3.08,
			powerSourceStatus: 0,
			lux: 77,
			pir: false,
			deviceVersions: { hardware: 26, software: 10 },
			keepAliveTime: 10,
		})
	})

	test('keepalive with undefined response of command', () => {
		expect(uplinkPayloadParser('120A99010426100102784f0c04a510004d00', DeviceType.CO2Display)).toStrictEqual({
			CO2: 677,
			sensorTemperature: 23.2,
			relativeHumidity: 30.86,
			batteryVoltage: 3.08,
			powerSourceStatus: 0,
			lux: 77,
			pir: false,
			keepAliveTime: 10,
		})
	})
})

describe('CO2 Display Lite payload decoder', () => {
	test('simple keepalive', () => {
		expect(uplinkPayloadParser('01026e320c1eb908012c', DeviceType.CO2DisplayLite)).toStrictEqual({
			CO2: 441,
			sensorTemperature: 22.2,
			relativeHumidity: 19.53,
			batteryVoltage: 3.1,
			powerSourceStatus: 0,
			lux: 300,
		})
	})

	test('keepalive with response of commands', () => {
		expect(uplinkPayloadParser('120F04121001026e320c1eb908012c', DeviceType.CO2DisplayLite)).toStrictEqual({
			CO2: 441,
			sensorTemperature: 22.2,
			relativeHumidity: 19.53,
			batteryVoltage: 3.1,
			powerSourceStatus: 0,
			lux: 300,
			deviceVersions: { hardware: 12, software: 10 },
			keepAliveTime: 15,
		})
	})

	test('keepalive with undefined response of command', () => {
		expect(uplinkPayloadParser('120F990304121001026e320c1eb908012c', DeviceType.CO2DisplayLite)).toStrictEqual({
			CO2: 441,
			sensorTemperature: 22.2,
			relativeHumidity: 19.53,
			batteryVoltage: 3.1,
			powerSourceStatus: 0,
			lux: 300,
			keepAliveTime: 15,
		})
	})
})

describe('HT Display Lite payload decoder', () => {
	test('simple keepalive', () => {
		expect(uplinkPayloadParser('01027a9d00280d1800', DeviceType.HTDisplayLite)).toStrictEqual({
			sensorTemperature: 23.4,
			relativeHumidity: 61.33,
			batteryVoltage: 3.35,
			powerSourceStatus: 0,
			lux: 40,
		})
	})

	test('keepalive with response of commands', () => {
		expect(uplinkPayloadParser('120F04121001027a9d00280d1800', DeviceType.HTDisplayLite)).toStrictEqual({
			sensorTemperature: 23.4,
			relativeHumidity: 61.33,
			batteryVoltage: 3.35,
			powerSourceStatus: 0,
			lux: 40,
			deviceVersions: { hardware: 12, software: 10 },
			keepAliveTime: 15,
		})
	})

	test('keepalive with undefined response of command', () => {
		expect(uplinkPayloadParser('120F990304121001027a9d00280d1800', DeviceType.HTDisplayLite)).toStrictEqual({
			sensorTemperature: 23.4,
			relativeHumidity: 61.33,
			batteryVoltage: 3.35,
			powerSourceStatus: 0,
			lux: 40,
			keepAliveTime: 15,
		})
	})
})

describe('Button payload decoder', () => {
	test('simple keepalive', () => {
		expect(uplinkPayloadParser('01b000d200', DeviceType.MCButton)).toStrictEqual({
			sensorTemperature: 21,
			batteryVoltage: 3,
			pressEvent: '00',
			thermistorProperlyConnected: true,
		})
	})

	test('keepalive with response of commands', () => {
		expect(uplinkPayloadParser('120204121101b000d200', DeviceType.MCButton)).toStrictEqual({
			sensorTemperature: 21,
			batteryVoltage: 3,
			pressEvent: '00',
			thermistorProperlyConnected: true,
			deviceVersions: { hardware: 12, software: 11 },
			keepAliveTime: 2,
		})
	})

	test('keepalive with undefined response of command', () => {
		expect(uplinkPayloadParser('1202990204121101b000d200', DeviceType.MCButton)).toStrictEqual({
			sensorTemperature: 21,
			batteryVoltage: 3,
			pressEvent: '00',
			thermistorProperlyConnected: true,
			keepAliveTime: 2,
		})
	})
})

describe('T-Valve payload decoder', () => {
	test('short keepalive', () => {
		expect(uplinkPayloadParser('2c40', DeviceType.TValve)).toStrictEqual({
			reason: 'keepalive',
			waterTemp: 22,
			valveState: false,
			ambientTemp: 22,
		})
	})
	test('long keepalive', () => {
		expect(uplinkPayloadParser('646304089f', DeviceType.TValve)).toStrictEqual({
			reason: 'controlButtonPressed',
			boxTamper: false,
			floodDetectionWireState: true,
			flood: false,
			magnet: false,
			alarmValidated: false,
			manualOpenIndicator: true,
			manualCloseIndicator: true,
			closeTime: 4,
			openTime: 8,
			deviceVersions: {
				hardware: 0,
				software: 3,
			},
			openCloseTime: {
				closingTime: 4,
				openingTime: 8,
			},
			manualControl: {
				enableClose: true,
				enableOpen: true,
			},
			battery: 2.872,
		})
	})
})

describe('T-Flood payload decoder', () => {
	test('short keepalive', () => {
		expect(uplinkPayloadParser('08be10', DeviceType.TFlood)).toStrictEqual({
			reason: 'keepalive',
			boxTamper: true,
			flood: false,
			battery: 3.04,
			temperature: 16,
		})
	})
	test('long keepalive', () => {
		expect(uplinkPayloadParser('88BE14', DeviceType.TFlood)).toStrictEqual({
			reason: 'fraudDetected',
			boxTamper: true,
			flood: false,
			battery: 3.04,
			temperature: 20,
		})
	})
})

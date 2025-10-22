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
			antiFreezeProtection: false,
			targetTemperatureFloat: '27.00',
			valveOpenness: 23,
		})
	})

	test('keepalive with response of commands', () => {
		expect(uplinkPayloadParser('56011203042643811BAF4BAB2A129030', DeviceType.Vicki)).toStrictEqual({
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
			antiFreezeProtection: false,
			targetTemperatureFloat: '27.00',
			valveOpenness: 23,
			keepAliveTime: 3,
			deviceVersions: {
				hardware: 26,
				software: 43,
			},
			displayTemperatureUnits: 1,
		})
	})
	test('keepalive with response of commands heating events', () => {
		expect(
			uplinkPayloadParser(
				'5A02070100DC1F080101021F090100F01F060F00B4400000000000000000000000000000000000000000',
				DeviceType.Vicki,
			),
		).toStrictEqual({
			heatingEventGroup: '16-19',
			heatingEvents: [
				{
					index: 16,
					start: '07:01',
					targetTemperature: 22,
					weekdays: {
						monday: true,
						tuesday: true,
						wednesday: true,
						thursday: true,
						friday: true,
						saturday: false,
						sunday: false,
					},
				},
				{
					index: 17,
					start: '08:01',
					targetTemperature: 25.8,
					weekdays: {
						monday: true,
						tuesday: true,
						wednesday: true,
						thursday: true,
						friday: true,
						saturday: false,
						sunday: false,
					},
				},
				{
					index: 18,
					start: '09:01',
					targetTemperature: 24,
					weekdays: {
						monday: true,
						tuesday: true,
						wednesday: true,
						thursday: true,
						friday: true,
						saturday: false,
						sunday: false,
					},
				},
				{
					index: 19,
					start: '06:15',
					targetTemperature: 18,
					weekdays: {
						monday: false,
						tuesday: false,
						wednesday: false,
						thursday: false,
						friday: false,
						saturday: false,
						sunday: true,
					},
				},
			],
		})
	})
	test('keepalive with response of commands heating events active', () => {
		expect(uplinkPayloadParser('5C0A0103016C00078003811BAF4BAB2A129030', DeviceType.Vicki)).toStrictEqual({
			heatingSchedule: { start: '1 November', end: '1 April' },
			heatingEventStates: {
				'0': true,
				'1': true,
				'2': false,
				'3': false,
				'4': false,
				'5': false,
				'6': false,
				'7': false,
				'8': false,
				'9': false,
				'10': false,
				'11': false,
				'12': false,
				'13': false,
				'14': false,
				'15': true,
				'16': true,
				'17': true,
				'18': true,
				'19': false,
			},
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
			antiFreezeProtection: false,
			targetTemperatureFloat: '27.00',
			valveOpenness: 23,
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
			antiFreezeProtection: false,
			targetTemperatureFloat: '27.00',
			valveOpenness: 23,
		})
	})
	test('keepalive with response of debug command', () => {
		expect(
			uplinkPayloadParser(
				'25028EC83700220000986000C54600002700000300000000000000001500C585A0000023C0811BA24A0E0E22F030',
				DeviceType.Vicki,
			),
		).toStrictEqual({
			debug: {
				batterySubrange: 2,
				motorCurrentConsumption: 568,
				powerSupplyVoltageMeasured: 3200,
				daysSinceLastDeviceReset: 55,
				detectedMotorOverVoltages: 0,
				motorHardwareDriverType: 2,
				temperatureSensorModel: 2,
				motorTotalTravelSteps: 39008,
				packetsSentOnSF7: 50502,
				packetsSentOnSF8: 39,
				packetsSentOnSF9: 3,
				packetsSentOnSF10: 0,
				packetsSentOnSF11: 0,
				packetsSentOnSF12: 21,
				totalSentPackets: 50565,
			},
			fuota: { fuota_address: 9152, fuota_address_raw: '000023C0' },
			reason: 129,
			targetTemperature: 27,
			sensorTemperature: 23.588263633251334,
			relativeHumidity: 28.90625,
			motorRange: 526,
			motorPosition: 526,
			batteryVoltage: 3.5,
			openWindow: false,
			highMotorConsumption: false,
			lowMotorConsumption: false,
			brokenSensor: false,
			childLock: false,
			calibrationFailed: false,
			attachedBackplate: true,
			perceiveAsOnline: true,
			antiFreezeProtection: false,
			valveOpenness: 0,
			targetTemperatureFloat: '27.00',
		})
	})
})

describe('HT payload decoder', () => {
	test('simple keepalive', () => {
		expect(uplinkPayloadParser('0102754BE90400', DeviceType.HTSensor)).toStrictEqual({
			sensorTemperature: 22.9,
			relativeHumidity: 29.3,
			batteryVoltage: 3.46,
			extThermistorTemperature: 0,
			thermistorProperlyConnected: false,
		})
	})

	test('keepalive with response of commands', () => {
		expect(uplinkPayloadParser('04201512050102764DE90400', DeviceType.HTSensor)).toStrictEqual({
			deviceVersions: { hardware: 20, software: 15 },
			keepAliveTime: 5,
			sensorTemperature: 23,
			relativeHumidity: 30.08,
			batteryVoltage: 3.46,
			extThermistorTemperature: 0,
			thermistorProperlyConnected: false,
		})
	})

	test('keepalive with response of commands compensations', () => {
		expect(uplinkPayloadParser('34010332010304201512050102764DE90400', DeviceType.HTSensor)).toStrictEqual({
			deviceVersions: { hardware: 20, software: 15 },
			temperatureCompensation: { negativeCompensation: true, compensation: 0.3 },
			humidityCompensation: { negativeCompensation: true, compensation: 3 },
			keepAliveTime: 5,
			sensorTemperature: 23,
			relativeHumidity: 30.08,
			batteryVoltage: 3.46,
			extThermistorTemperature: 0,
			thermistorProperlyConnected: false,
		})
	})

	test('keepalive with undefined response of command', () => {
		expect(uplinkPayloadParser('042015990312050102764DE90400', DeviceType.HTSensor)).toStrictEqual({
			deviceVersions: { hardware: 20, software: 15 },
			sensorTemperature: 23,
			relativeHumidity: 30.08,
			batteryVoltage: 3.46,
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
			batteryVoltage: 3.15,
			thermistorProperlyConnected: true,
			sensorTemperature: 15,
		})
	})

	test('keepalive with response of commands', () => {
		expect(uplinkPayloadParser('041310120F01C2009600000101', DeviceType.OpenCloseSensor)).toStrictEqual({
			event: 'keepalive',
			status: 1,
			counter: 1,
			batteryVoltage: 3.15,
			thermistorProperlyConnected: true,
			sensorTemperature: 15,
			deviceVersions: { hardware: 13, software: 10 },
			keepAliveTime: 15,
		})
	})

	test('reed switch with response of commands', () => {
		expect(uplinkPayloadParser('04131212F019781B001D02181F0020E200D700000100', DeviceType.OpenCloseSensor)).toStrictEqual(
			{
				deviceVersions: { hardware: 13, software: 12 },
				keepAliveTime: 240,
				joinRetryPeriod: 10,
				uplinkType: '00',
				watchDogParams: { wdpC: 2, wdpUc: 24 },
				notificationBlindTime: 0,
				event: 'reed switch',
				status: 0,
				counter: 1,
				batteryVoltage: 3.41,
				thermistorProperlyConnected: true,
				sensorTemperature: 21.5,
			},
		)
	})

	test('keepalive with undefined response of command', () => {
		expect(uplinkPayloadParser('0413109902120F01C2009600000101', DeviceType.OpenCloseSensor)).toStrictEqual({
			event: 'keepalive',
			status: 1,
			counter: 1,
			batteryVoltage: 3.15,
			thermistorProperlyConnected: true,
			sensorTemperature: 15,
			deviceVersions: { hardware: 13, software: 10 },
		})
	})
	test('keepalive with response of commands all', () => {
		expect(
			uplinkPayloadParser('04131212f019781b011d02181f0020f101160000050001f1011600000500', DeviceType.OpenCloseSensor),
		).toStrictEqual({
			event: 'keepalive',
			status: 0,
			counter: 5,
			batteryVoltage: 3.53,
			thermistorProperlyConnected: true,
			sensorTemperature: 27.8,
			deviceVersions: { hardware: 13, software: 12 },
			keepAliveTime: 240,
			joinRetryPeriod: 10,
			uplinkType: '01',
			watchDogParams: { wdpC: 2, wdpUc: 24 },
			notificationBlindTime: 0,
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
		expect(
			uplinkPayloadParser('120A041212771018141D171018141D01026A4C00DC0100070001', DeviceType.FanCoilThermostat),
		).toStrictEqual({
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
			heatingCoolingTargetTempRanges: { heatingTempMin: 16, heatingTempMax: 24, coolingTempMin: 20, coolingTempMax: 29 },
			heatingCoolingTargetTempRangesUnoccupied: {
				heatingTempMin: 16,
				heatingTempMax: 24,
				coolingTempMin: 20,
				coolingTempMax: 29,
			},
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
		expect(uplinkPayloadParser('120F0412102F0101026e320c1eb908012c', DeviceType.CO2DisplayLite)).toStrictEqual({
			CO2: 441,
			sensorTemperature: 22.2,
			relativeHumidity: 19.53,
			batteryVoltage: 3.1,
			powerSourceStatus: 0,
			lux: 300,
			deviceVersions: { hardware: 12, software: 10 },
			keepAliveTime: 15,
			uplinkSendingOnButtonPress: 1,
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

	test('keepalive with response of commands + single press counter', () => {
		expect(uplinkPayloadParser('B10001AA120204121101b000d200', DeviceType.MCButton)).toStrictEqual({
			sensorTemperature: 21,
			batteryVoltage: 3,
			pressEvent: '00',
			thermistorProperlyConnected: true,
			deviceVersions: { hardware: 12, software: 11 },
			keepAliveTime: 2,
			singlePressEventCounter: 426,
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

describe('ASPM payload decoder', () => {
	test('simple keepalive', () => {
		expect(uplinkPayloadParser('011C034A241805D9E7195201', DeviceType.Relay16)).toStrictEqual({
			internalTemperature: 28,
			energy: 55190.552,
			power: 1497,
			acVoltage: 231,
			acCurrent: 6482,
			relayState: true,
		})
	})
	test('keepalive with response of commands', () => {
		expect(uplinkPayloadParser('54015C015A01011C034A241805D9E7195201', DeviceType.Relay16)).toStrictEqual({
			internalTemperature: 28,
			energy: 55190.552,
			power: 1497,
			acVoltage: 231,
			acCurrent: 6482,
			relayState: true,
			ledIndicationMode: 1,
			afterOverheatingProtectionRecovery: 1,
			relayStateChangeReason: 1,
		})
	})
	test('keepalive with response of new commands', () => {
		expect(uplinkPayloadParser('560000FF58000001011C034A241805D9E7195201', DeviceType.Relay16)).toStrictEqual({
			internalTemperature: 28,
			energy: 55190.552,
			power: 1497,
			acVoltage: 231,
			acCurrent: 6482,
			relayState: true,
			relayTimerInSeconds: { state: 0, time: 1 },
			relayTimerInMilliseconds: { state: 0, time: 255 },
		})
	})
	test('all settings (relay)', () => {
		console.log(
			uplinkPayloadParser(
				'041312120A19781B001D02181F5F46210113FA2310250E605F00011C034A241805D9E7195201',
				DeviceType.Relay16,
			),
		)
		expect(
			uplinkPayloadParser(
				'041312120A19781B001D02181F5F46210113FA2310250E605F00011C034A241805D9E7195201',
				DeviceType.Relay16,
			),
		).toStrictEqual({
			deviceVersions: { hardware: 13, software: 12 },
			keepAliveTime: 10,
			joinRetryPeriod: 10,
			uplinkType: '00',
			watchDogParams: { wdpC: 2, wdpUc: 24 },
			overheatingThresholds: { trigger: 95, recovery: 70 },
			overvoltageThresholds: { trigger: 275, recovery: 250 },
			overcurrentThreshold: 16,
			overpowerThreshold: 3680,
			relayRecoveryState: 0,
			internalTemperature: 28,
			energy: 55190.552,
			power: 1497,
			acVoltage: 231,
			acCurrent: 6482,
			relayState: true,
		})
	})
})

describe('ADS payload decoder', () => {
	test('simple keepalive', () => {
		expect(uplinkPayloadParser('011E00', DeviceType.Relay16Dry)).toStrictEqual({
			internalTemperature: 30,
			relayState: false,
		})
	})
	test('keepalive with response of commands', () => {
		expect(uplinkPayloadParser('560000FF5800000154015C015A01011E00', DeviceType.Relay16Dry)).toStrictEqual({
			internalTemperature: 30,
			relayState: false,
			ledIndicationMode: 1,
			afterOverheatingProtectionRecovery: 1,
			relayStateChangeReason: 1,
			relayTimerInSeconds: { state: 0, time: 1 },
			relayTimerInMilliseconds: { state: 0, time: 255 },
		})
	})
	test('all settings (relay dry)', () => {
		expect(uplinkPayloadParser('041010120A19781B001D02181F5F465F00011E00', DeviceType.Relay16Dry)).toStrictEqual({
			deviceVersions: { hardware: 10, software: 10 },
			keepAliveTime: 10,
			joinRetryPeriod: 10,
			uplinkType: '00',
			watchDogParams: { wdpC: 2, wdpUc: 24 },
			overheatingThresholds: { trigger: 95, recovery: 70 },
			relayRecoveryState: 0,
			internalTemperature: 30,
			relayState: false,
		})
	})
})
describe('Melissa payload decoder', () => {
	test('simple keepalive', () => {
		expect(uplinkPayloadParser('01027E4600', DeviceType.MelissaLorawan)).toStrictEqual({
			sensorTemperature: 23.8,
			relativeHumidity: 27.34,
			isIrCodeRecordingRequested: false,
		})
	})
	test('keepalive with response of preloaded code', () => {
		expect(uplinkPayloadParser('06004201027E4600', DeviceType.MelissaLorawan)).toStrictEqual({
			sensorTemperature: 23.8,
			relativeHumidity: 27.34,
			isIrCodeRecordingRequested: false,
			preloadedCode: { codeAddress: 66, codeAddressRaw: '0042' },
		})
	})
	test('keepalive with response of recorded code', () => {
		expect(uplinkPayloadParser('0a0020002001027E4600', DeviceType.MelissaLorawan)).toStrictEqual({
			sensorTemperature: 23.8,
			relativeHumidity: 27.34,
			isIrCodeRecordingRequested: false,
			recordedIrInfo: { recordedIrCodeSize: 32, bytesSent: '0020' },
		})
	})
	test('keepalive with response of transfered code', () => {
		expect(
			uplinkPayloadParser(
				'0b2200000063320612062e062e000606000508120004040008080005180008081100050c01027E4600',
				DeviceType.MelissaLorawan,
			),
		).toStrictEqual({
			sensorTemperature: 23.8,
			relativeHumidity: 27.34,
			isIrCodeRecordingRequested: false,
			irCodeData: {
				bytesCount: 32,
				address: 0,
				data: '0063320612062e062e000606000508120004040008080005180008081100050c',
			},
		})
	})
})
describe('CO2PirLite payload decoder', () => {
	test('simple keepalive', () => {
		expect(uplinkPayloadParser('0102A67F0D70D31000', DeviceType.CO2PirLite)).toStrictEqual({
			CO2: 723,
			pir: false,
			sensorTemperature: 27.8,
			relativeHumidity: 49.61,
			batteryVoltage: 3.44,
		})
	})
	test('keepalive with response of preloaded code', () => {
		expect(uplinkPayloadParser('120A0102A67F0D70D31000', DeviceType.CO2PirLite)).toStrictEqual({
			CO2: 723,
			pir: false,
			sensorTemperature: 27.8,
			relativeHumidity: 49.61,
			batteryVoltage: 3.44,
			keepAliveTime: 10,
		})
	})
})
describe('HTPirLite payload decoder', () => {
	test('simple keepalive', () => {
		expect(uplinkPayloadParser('010288800A4500', DeviceType.HTPirLite)).toStrictEqual({
			pir: false,
			sensorTemperature: 24.8,
			relativeHumidity: 50,
			batteryVoltage: 2.63,
		})
	})
	test('keepalive with response of preloaded code', () => {
		expect(uplinkPayloadParser('120A010288800A4500', DeviceType.HTPirLite)).toStrictEqual({
			pir: false,
			sensorTemperature: 24.8,
			relativeHumidity: 50,
			batteryVoltage: 2.63,
			keepAliveTime: 10,
		})
	})
})
describe('MultiSensor payload decoder', () => {
	test('simple keepalive', () => {
		expect(uplinkPayloadParser('810001061AA91F0E0008133D00E506', DeviceType.MultiSensor)).toStrictEqual({
			deltaTMinC: 0,
			deltaTMaxC: 0.1,
			avgTempC: 0.6,
			relativeHumidity: 26,
			pressureMbar: 958.47,
			staticAQI: 60.78,
			eCO2ppm: 652.55,
			tvocRaw: 8,
			tvocPpbApprox: 8,
			lightLux: 75,
			noiseDb: 61,
			pirTriggerCount: 0,
			deviceVoltageMv: 3576,
			deviceVoltage: 3.58,
			powerSourceRaw: 6,
			powerSource: 'Battery',
		})
	})
	test('keepalive with response of preloaded code', () => {
		expect(uplinkPayloadParser('1202810001061AA91F0E0008133D00E506', DeviceType.MultiSensor)).toStrictEqual({
			keepAliveTime: 2,
			deltaTMinC: 0,
			deltaTMaxC: 0.1,
			avgTempC: 0.6,
			relativeHumidity: 26,
			pressureMbar: 958.47,
			staticAQI: 60.78,
			eCO2ppm: 652.55,
			tvocRaw: 8,
			tvocPpbApprox: 8,
			lightLux: 75,
			noiseDb: 61,
			pirTriggerCount: 0,
			deviceVoltageMv: 3576,
			deviceVoltage: 3.58,
			powerSourceRaw: 6,
			powerSource: 'Battery',
		})
	})
})

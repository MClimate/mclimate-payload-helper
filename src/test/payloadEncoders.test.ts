import { CommandBuilder, BaseCommand } from '@/encoders'
import { CustomError } from '@/utils'

describe('General Commands payload encoder', () => {
	const commandBuilder = new CommandBuilder('vicki')

	test('Custom hex command Vicki', () => {
		expect(commandBuilder.build('SendCustomHexCommand', { command: '0412' })).toStrictEqual(
			new BaseCommand('SendCustomHexCommand', '0412'),
		)
	})

	test('Set keepalive time', () => {
		expect(commandBuilder.build('SetKeepAlive', { time: 5 })).toStrictEqual(new BaseCommand('SetKeepAlive', 2, '05'))
	})
})

describe('TValve commands payload encoder', () => {
	const commandBuilder = new CommandBuilder('t_valve')

	test('Set open close command', () => {
		expect(commandBuilder.build('SetOpenCloseTime', { openingTime: 1, closingTime: 5 })).toStrictEqual(
			new BaseCommand('SetOpenCloseTime', 1, '01', '05'),
		)
	})
})

describe('Relay commands payload encoder', () => {
	const commandBuilder = new CommandBuilder('relay_16')

	test('SetRelayState command', () => {
		expect(commandBuilder.build('SetRelayState', { state: true })).toStrictEqual(
			new BaseCommand('SetRelayState', 0xc1, '01'),
		)
	})
})
describe('16 ADS commands payload encoder', () => {
	const commandBuilder = new CommandBuilder('relay_16_dry')

	test('SetRelayState command', () => {
		expect(commandBuilder.build('SetRelayState', { state: true })).toStrictEqual(
			new BaseCommand('SetRelayState', 0xc1, '01'),
		)
	})
})
describe('CO2Display Commands payload encoder', () => {
	const commandBuilder = new CommandBuilder('co2_display')

	test('Set CO2 Measurement Blind Time', () => {
		expect(commandBuilder.build('SetCo2MeasurementBlindTime', { time: 10 })).toStrictEqual(
			new BaseCommand('SetCo2MeasurementBlindTime', 0x81, '0A'),
		)
	})

	test('Throw error on invalid Set CO2 Measurement Blind Time params', () => {
		expect(() => commandBuilder.build('SetCo2MeasurementBlindTime', { time: -1 })).toThrow(CustomError)
	})
})

describe('CO2DisplayLite Commands payload encoder', () => {
	const commandBuilder = new CommandBuilder('co2_display_lite')

	test('Set Uplink Sending On Button Press', () => {
		expect(commandBuilder.build('SetUplinkSendingOnButtonPress', { value: 1 })).toStrictEqual(
			new BaseCommand('SetUplinkSendingOnButtonPress', 0x2e, '01'),
		)
	})

	test('Restart Device', () => {
		expect(commandBuilder.build('RestartDevice'),
		).toStrictEqual(new BaseCommand('RestartDevice', 0xa5))
	})

	test('Throw error on invalid Set Uplink Sending On Button Press params', () => {
		expect(() => commandBuilder.build('SetUplinkSendingOnButtonPress', { time: -1 })).toThrow(CustomError)
	})
})

describe('CO2Sensor Commands payload encoder', () => {
	const commandBuilder = new CommandBuilder('co2_sensor')

	test('Set CO2 Boundary Levels (valid range)', () => {
		expect(commandBuilder.build('SetCo2BoundaryLevels', { good_medium: 200, medium_bad: 250 })).toStrictEqual(
			new BaseCommand('SetCo2BoundaryLevels', 0x1e, '00C8', '00FA'),
		)
	})

	test('Throw error on invalid CO2 Boundary Levels (out of range)', () => {
		expect(() => commandBuilder.build('SetCo2BoundaryLevels', { good_medium: 65536, medium_bad: 66536 })).toThrow(
			CustomError,
		)
	})

	test('Get CO2 Boundary Levels', () => {
		expect(commandBuilder.build('GetCo2BoundaryLevels')).toStrictEqual(new BaseCommand('GetCo2BoundaryLevels', 0x1f))
	})

	test('Set CO2 Auto Zero Value (valid range)', () => {
		expect(commandBuilder.build('SetCo2AutoZeroValue', { ppm: 150 })).toStrictEqual(
			new BaseCommand('SetCo2AutoZeroValue', 0x20, '0096'),
		)
	})

	test('Throw error on invalid CO2 Auto Zero Value (out of range)', () => {
		expect(() => commandBuilder.build('SetCo2AutoZeroValue', { ppm: 65539 })).toThrow(CustomError)
	})

	test('Get CO2 Auto Zero Value', () => {
		expect(commandBuilder.build('GetCo2AutoZeroValue')).toStrictEqual(new BaseCommand('GetCo2AutoZeroValue', 0x21))
	})

	test('Set Notify Period', () => {
		expect(commandBuilder.build('SetNotifyPeriod', { good_zone: 60, medium_zone: 120, bad_zone: 180 })).toStrictEqual(
			new BaseCommand('SetNotifyPeriod', 0x22, '3C', '78', 'B4'),
		)
	})

	test('Get Notify Period', () => {
		expect(commandBuilder.build('GetNotifyPeriod')).toStrictEqual(new BaseCommand('GetNotifyPeriod', 0x23))
	})

	test('Set CO2 Measurement Period', () => {
		expect(
			commandBuilder.build('SetCo2MeasurementPeriod', { good_zone: 5, medium_zone: 10, bad_zone: 15 }),
		).toStrictEqual(new BaseCommand('SetCo2MeasurementPeriod', 0x24, '05', '0A', '0F'))
	})

	test('Get CO2 Measurement Period', () => {
		expect(commandBuilder.build('GetCo2MeasurementPeriod')).toStrictEqual(
			new BaseCommand('GetCo2MeasurementPeriod', 0x25),
		)
	})

	test('Set Buzzer Notification', () => {
		expect(
			commandBuilder.build('SetBuzzerNotification', {
				duration_good_beeping: 10,
				duration_good_loud: 20,
				duration_good_silent: 30,
				duration_medium_beeping: 40,
				duration_medium_loud: 50,
				duration_medium_silent: 60,
				duration_bad_beeping: 70,
				duration_bad_loud: 80,
				duration_bad_silent: 90,
			}),
		).toStrictEqual(new BaseCommand('SetBuzzerNotification', 0x26, '0A', '02', '03', '28', '05', '06', '46', '08', '09'))
	})

	test('Get Buzzer Notification', () => {
		expect(commandBuilder.build('GetBuzzerNotification')).toStrictEqual(new BaseCommand('GetBuzzerNotification', 0x27))
	})

	test('Set CO2 LED', () => {
		expect(
			commandBuilder.build('SetCo2Led', {
				red_good: 10,
				green_good: 20,
				blue_good: 30,
				duration_good: 40,
				red_medium: 50,
				green_medium: 60,
				blue_medium: 70,
				duration_medium: 80,
				red_bad: 90,
				green_bad: 100,
				blue_bad: 110,
				duration_bad: 120,
			}),
		).toStrictEqual(
			new BaseCommand('SetCo2Led', 0x28, '0A', '14', '1E', '0004', '32', '3C', '46', '0008', '5A', '64', '6E', '000C'),
		)
	})

	test('Get CO2 LED', () => {
		expect(commandBuilder.build('GetCo2Led')).toStrictEqual(new BaseCommand('GetCo2Led', 0x29))
	})

	test('Set CO2 Auto Zero Period', () => {
		expect(commandBuilder.build('SetCo2AutoZeroPeriod', { hours: 24 })).toStrictEqual(
			new BaseCommand('SetCo2AutoZeroPeriod', 0x2a, '18'),
		)
	})

	test('Get CO2 Auto Zero Period', () => {
		expect(commandBuilder.build('GetCo2AutoZeroPeriod')).toStrictEqual(new BaseCommand('GetCo2AutoZeroPeriod', 0x2b))
	})
})

describe('FanCoilThermostat Commands payload encoder', () => {
	const commandBuilder = new CommandBuilder('fan_coil_thermostat')

	test('Set Target Temperature Step', () => {
		expect(commandBuilder.build('SetTargetTemperatureStep', { value: 22 })).toStrictEqual(
			new BaseCommand('SetTargetTemperatureStep', 0x03, 'DC'),
		)
	})

	test('Throw error on invalid Target Temperature Step', () => {
		expect(() => commandBuilder.build('SetTargetTemperatureStep', { value: -5 })).toThrow(CustomError)
	})

	test('Set Keys Lock', () => {
		expect(commandBuilder.build('SetKeysLock', { value: 1 })).toStrictEqual(new BaseCommand('SetKeysLock', 0x07, '01'))
	})


	test('Set Target Temperature', () => {
		expect(commandBuilder.build('SetTargetTemperature', { targetTemperature: 25 })).toStrictEqual(
			new BaseCommand('SetTargetTemperature', 0x2e, '00FA'),
		)
	})

	test('Set FCT Operational Mode', () => {
		expect(commandBuilder.build('SetFctOperationalMode', { value: 3 })).toStrictEqual(
			new BaseCommand('SetFctOperationalMode', 0x52, '03'),
		)
	})

	test('Set Valve Open Close Time', () => {
		expect(commandBuilder.build('SetValveOpenCloseTime', { value: 5 })).toStrictEqual(
			new BaseCommand('SetValveOpenCloseTime', 0x31, '05'),
		)
	})

	test('Set External Automatic Temperature Control', () => {
		expect(commandBuilder.build('SetExtAutomaticTemperatureControl', { value: 1 })).toStrictEqual(
			new BaseCommand('SetExtAutomaticTemperatureControl', 0x35, '01'),
		)
	})

	test('Set Fan Speed', () => {
		expect(commandBuilder.build('SetFanSpeed', { value: 2 })).toStrictEqual(new BaseCommand('SetFanSpeed', 0x44, '02'))
	})

	test('Set Fan Speed Limit', () => {
		expect(commandBuilder.build('SetFanSpeedLimit', { value: 3 })).toStrictEqual(
			new BaseCommand('SetFanSpeedLimit', 0x46, '03'),
		)
	})

	test('Set ECM Voltage Range', () => {
		expect(commandBuilder.build('SetEcmVoltageRange', { min: 20, max: 25 })).toStrictEqual(
			new BaseCommand('SetEcmVoltageRange', 0x48, 'C8', 'FA'),
		)
	})

	test('Set ECM Start Up Time', () => {
		expect(commandBuilder.build('SetEcmStartUpTime', { value: 10 })).toStrictEqual(
			new BaseCommand('SetEcmStartUpTime', 0x4a, '0A'),
		)
	})

	test('Set ECM Relay', () => {
		expect(commandBuilder.build('SetEcmRelay', { value: 1 })).toStrictEqual(new BaseCommand('SetEcmRelay', 0x4c, '01'))
	})

	test('Set Frost Protection', () => {
		expect(commandBuilder.build('SetFrostProtection', { value: 1 })).toStrictEqual(
			new BaseCommand('SetFrostProtection', 0x4e, '01'),
		)
	})

	test('Set Frost Protection Settings', () => {
		expect(commandBuilder.build('SetFrostProtectionSettings', { threshold: 5, setpoint: 10 })).toStrictEqual(
			new BaseCommand('SetFrostProtectionSettings', 0x50, '05', '0A'),
		)
	})

	test('Set Allowed Operational Modes', () => {
		expect(commandBuilder.build('SetAllowedOperationalModes', { value: 2 })).toStrictEqual(
			new BaseCommand('SetAllowedOperationalModes', 0x54, '02'),
		)
	})

	test('Set Cooling Setpoint Not Occupied', () => {
		expect(commandBuilder.build('SetCoolingSetpointNotOccupied', { value: 23 })).toStrictEqual(
			new BaseCommand('SetCoolingSetpointNotOccupied', 0x56, '17'),
		)
	})

	test('Set Heating Setpoint Not Occupied', () => {
		expect(commandBuilder.build('SetHeatingSetpointNotOccupied', { value: 20 })).toStrictEqual(
			new BaseCommand('SetHeatingSetpointNotOccupied', 0x58, '14'),
		)
	})

	test('Set Temperature Sensor Compensation', () => {
		expect(commandBuilder.build('SetTempSensorCompensation', { compensation: 2, temperature: 25 })).toStrictEqual(
			new BaseCommand('SetTempSensorCompensation', 0x5a, '02', 'FA'),
		)
	})

	test('Set Fan Speed Not Occupied', () => {
		expect(commandBuilder.build('SetFanSpeedNotOccupied', { value: 2 })).toStrictEqual(
			new BaseCommand('SetFanSpeedNotOccupied', 0x5c, '02'),
		)
	})

	test('Set Automatic Changeover', () => {
		expect(commandBuilder.build('SetAutomaticChangeover', { value: 1 })).toStrictEqual(
			new BaseCommand('SetAutomaticChangeover', 0x5e, '01'),
		)
	})

	test('Set Wiring Diagram', () => {
		expect(commandBuilder.build('SetWiringDiagram', { value: 1 })).toStrictEqual(
			new BaseCommand('SetWiringDiagram', 0x60, '01'),
		)
	})

	test('Set Occupancy Function', () => {
		expect(commandBuilder.build('SetOccFunction', { value: 1 })).toStrictEqual(
			new BaseCommand('SetOccFunction', 0x62, '01'),
		)
	})

	test('Set Automatic Changeover Threshold', () => {
		expect(
			commandBuilder.build('SetAutomaticChangeoverThreshold', { coolingThreshold: 16, heatingThreshold: 43 }),
		).toStrictEqual(new BaseCommand('SetAutomaticChangeoverThreshold', 0x64, '10', '2B'))
	})

	test('Set Device Status', () => {
		expect(commandBuilder.build('SetDeviceStatus', { value: 1 })).toStrictEqual(
			new BaseCommand('SetDeviceStatus', 0x66, '01'),
		)
	})

	test('Set Return of Power Operation', () => {
		expect(commandBuilder.build('SetReturnOfPowerOperation', { value: 2 })).toStrictEqual(
			new BaseCommand('SetReturnOfPowerOperation', 0x68, '02'),
		)
	})

	test('Set Delta Temperature 1', () => {
		expect(commandBuilder.build('SetDeltaTemperature1', { value: 3 })).toStrictEqual(
			new BaseCommand('SetDeltaTemperature1', 0x6a, '1E'),
		)
	})

	test('Set Delta Temperature 2 and 3', () => {
		expect(
			commandBuilder.build('SetDeltaTemperature2and3', { deltaTemperature2: 4, deltaTemperature3: 5 }),
		).toStrictEqual(new BaseCommand('SetDeltaTemperature2and3', 0x6c, '28', '32'))
	})

	test('Set Heating Cooling Target Temp Ranges', () => {
		expect(commandBuilder.build('SetHeatingCoolingTargetTempRanges', { heatingTempMin: 16, heatingTempMax: 24, coolingTempMin: 20, coolingTempMax: 29 })).toStrictEqual(
			new BaseCommand('SetHeatingCoolingTargetTempRanges', 0x16, '10', '18', '14', '1D'),
		)
	})

	test('Set Heating Cooling Target Temp Ranges Unoccupied', () => {
		expect(commandBuilder.build('SetHeatingCoolingTargetTempRangesUnoccupied', { heatingTempMin: 16, heatingTempMax: 24, coolingTempMin: 20, coolingTempMax: 29 })).toStrictEqual(
			new BaseCommand('SetHeatingCoolingTargetTempRangesUnoccupied', 0x76, '10', '18', '14', '1D'),
		)
	})
})

describe('Vicki Commands payload encoder', () => {
	const commandBuilder = new CommandBuilder('vicki')

	test('Recalibrate Motor', () => {
		expect(commandBuilder.build('RecalibrateMotor')).toStrictEqual(new BaseCommand('RecalibrateMotor', 0x03))
	})

	test('Set Open Window Detection Parameters', () => {
		expect(
			commandBuilder.build('SetOpenWindow', {
				enabled: true,
				delta: 3,
				closeTime: 20,
				motorPosition: 450,
			}),
		).toStrictEqual(new BaseCommand('SetOpenWindow', 0x06, '01', '04', 'C2', '13', '3'))

		expect(
			commandBuilder.build('SetOpenWindow', {
				enabled: false,
				delta: 3,
				closeTime: 20,
				motorPosition: 450,
			}),
		).toStrictEqual(new BaseCommand('SetOpenWindow', 0x06, '00', '04', 'C2', '13', '3'))
	})

	test('Set Internal Algo Params', () => {
		expect(
			commandBuilder.build('SetInternalAlgoParams', {
				period: 5,
				pFirstLast: 10,
				pNext: 15,
			}),
		).toStrictEqual(new BaseCommand('SetInternalAlgoParams', 0x0c, '05', '0A', '0F'))
	})

	test('Set Operational Mode', () => {
		expect(commandBuilder.build('SetOperationalMode', { mode: '1' })).toStrictEqual(
			new BaseCommand('SetOperationalMode', 0x0d, '1'),
		)
	})

	test('Set Target Temperature (Integer)', () => {
		expect(commandBuilder.build('SetTargetTemperature', { targetTemperature: 22 })).toStrictEqual(
			new BaseCommand('SetTargetTemperature', 0x0e, '16'),
		)
	})

	test('Set Target Temperature (Float)', () => {
		expect(commandBuilder.build('SetTargetTemperature', { targetTemperature: 22.5 })).toStrictEqual(
			new BaseCommand('SetTargetTemperature', 0x51, '00E1'),
		)
	})

	test('Set External Temperature', () => {
		expect(commandBuilder.build('SetExternalTemperature', { temp: 18 })).toStrictEqual(
			new BaseCommand('SetExternalTemperature', 0x0f, '12'),
		)
	})

	test('Set Internal Algo Tdiff Params', () => {
		expect(
			commandBuilder.build('SetInternalAlgoTdiffParams', {
				cold: 8,
				warm: 12,
			}),
		).toStrictEqual(new BaseCommand('SetInternalAlgoTdiffParams', 0x1a, '08', '0C'))
	})

	test('Set Primary Operational Mode', () => {
		expect(commandBuilder.build('SetPrimaryOperationalMode', { mode: '2' })).toStrictEqual(
			new BaseCommand('SetPrimaryOperationalMode', 0x1e, '2'),
		)
	})

	test('Set Battery Ranges Boundaries', () => {
		expect(
			commandBuilder.build('SetBatteryRangesBoundaries', {
				Boundary1: 2000,
				Boundary2: 3000,
				Boundary3: 4000,
			}),
		).toStrictEqual(new BaseCommand('SetBatteryRangesBoundaries', 0x20, '07D0', '0BB8', '0FA0'))
	})

	test('Set Ovac', () => {
		expect(commandBuilder.build('SetOvac', { ovac: 12 })).toStrictEqual(new BaseCommand('SetOvac', 0x26, '0C'))
	})

	test('Set Proportional Algorithm Parameters', () => {
		expect(
			commandBuilder.build('SetProportionalAlgorithmParameters', {
				coefficient: 5,
				period: 15,
			}),
		).toStrictEqual(new BaseCommand('SetProportionalAlgorithmParameters', 0x2a, '05', '0F'))
	})

	test('Set Valve Openness In Percentage', () => {
		expect(commandBuilder.build('SetValveOpennessInPercentage', { value: 75 })).toStrictEqual(
			new BaseCommand('SetValveOpennessInPercentage', 0x4e, '4B'),
		)
	})

	test('Set Temperature Offset', () => {
		expect(commandBuilder.build('SetTemperatureOffset', { value: -1 })).toStrictEqual(
			new BaseCommand('SetTemperatureOffset', 0x53, '16'),
		)

		expect(commandBuilder.build('SetTemperatureOffset', { value: 0 })).toStrictEqual(
			new BaseCommand('SetTemperatureOffset', 0x53, '1C'),
		)

		expect(commandBuilder.build('SetTemperatureOffset', { value: 3 })).toStrictEqual(
			new BaseCommand('SetTemperatureOffset', 0x53, '2D'),
		)
	})
})

describe('WirelessThermostat Commands payload encoder', () => {
	const commandBuilder = new CommandBuilder('wireless_thermostat')

	test('Set Target Temperature', () => {
		expect(commandBuilder.build('SetTargetTemperature', { targetTemperature: 22 })).toStrictEqual(
			new BaseCommand('SetTargetTemperature', 0x2e, '16'),
		)
	})

	test('Set Heating Status', () => {
		expect(commandBuilder.build('SetHeatingStatus', { status: 1 })).toStrictEqual(
			new BaseCommand('SetHeatingStatus', 0x31, '01'),
		)
	})

	test('Set Display Refresh Period', () => {
		expect(commandBuilder.build('SetDisplayRefreshPeriod', { period: 10 })).toStrictEqual(
			new BaseCommand('SetDisplayRefreshPeriod', 0x33, '0A'),
		)
	})

	test('Set Target Send Delay', () => {
		expect(commandBuilder.build('SetTargetSendDelay', { time: 15 })).toStrictEqual(
			new BaseCommand('SetTargetSendDelay', 0x35, '0F'),
		)
	})

	test('Set Automatic Heating Status', () => {
		expect(commandBuilder.build('SetAutomaticHeatingStatus', { state: 1 })).toStrictEqual(
			new BaseCommand('SetAutomaticHeatingStatus', 0x37, '01'),
		)
	})

	test('Set Sensor Mode', () => {
		expect(commandBuilder.build('SetSensorMode', { state: 1 })).toStrictEqual(
			new BaseCommand('SetSensorMode', 0x39, '01'),
		)
	})

	test('Set Temperature Hysteresis', () => {
		expect(commandBuilder.build('SetTemperatureHysteresis', { hysteresis: 2.5 })).toStrictEqual(
			new BaseCommand('SetTemperatureHysteresis', 0x4e, '19'),
		)
	})

	test('Set Target Temperature Precisely', () => {
		expect(commandBuilder.build('SetTargetTemperaturePrecisely', { targetTemperature: 22.5 })).toStrictEqual(
			new BaseCommand('SetTargetTemperaturePrecisely', 0x50, '00E1'),
		)
	})

	test('Set Target Temperature Step', () => {
		expect(commandBuilder.build('SetTargetTemperatureStep', { value: 0.5 })).toStrictEqual(
			new BaseCommand('SetTargetTemperatureStep', 0x52, '05'),
		)
	})
})

describe('TFlood Commands payload encoder', () => {
	const commandBuilder = new CommandBuilder('t_flood')

	test('Set Flood Alarm Time', () => {
		expect(commandBuilder.build('SetFloodAlarmTime', { time: 15 })).toStrictEqual(
			new BaseCommand('SetFloodAlarmTime', 0x04, 'f'),
		)
	})

	test('Set Keep Alive', () => {
		expect(commandBuilder.build('SetKeepAlive', { time: 120 })).toStrictEqual(
			new BaseCommand('SetKeepAlive', 0x05, '0078'),
		)
	})

	test('Set Flood Event Send Time', () => {
		expect(commandBuilder.build('SetFloodEventSendTime', { time: 30 })).toStrictEqual(
			new BaseCommand('SetFloodEventSendTime', 0x08, '1e'),
		)
	})

	test('Set Flood Event Uplink Type', () => {
		expect(commandBuilder.build('SetFloodEventUplinkType', { type: '2' })).toStrictEqual(
			new BaseCommand('SetFloodEventUplinkType', 0x13, '2'),
		)
	})
})

describe('HT Sensor Commands payload encoder', () => {
	const commandBuilder = new CommandBuilder('ht_sensor')

	test('Set Temperature Compensation', () => {
		expect(
			commandBuilder.build('SetTemperatureCompensation', { negativeCompensation: true, compensation: 0.3 }),
		).toStrictEqual(new BaseCommand('SetTemperatureCompensation', 0x31, '01', '03'))
	})

	test('Set Humidity Compensation', () => {
		expect(
			commandBuilder.build('SetHumidityCompensation', { negativeCompensation: true, compensation: 3 }),
		).toStrictEqual(new BaseCommand('SetHumidityCompensation', 0x33, '01', '03'))
	})
})

describe('MC Button Commands payload encoder', () => {
	const commandBuilder = new CommandBuilder('mc_button')

	test('Clear Press Event Counter ', () => {
		expect(
			commandBuilder.build('ClearPressEventCounter', { value: 1 }),
		).toStrictEqual(new BaseCommand('ClearPressEventCounter', 0x20, '01'))
	})

	test('Restart Device', () => {
		expect(
			commandBuilder.build('RestartDevice'),
		).toStrictEqual(new BaseCommand('RestartDevice', 0xa5))
	})
})

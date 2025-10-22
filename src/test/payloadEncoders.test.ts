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

	test('Set heating event (weekend)', () => {
		//5900080101021F
		expect(
			commandBuilder.build('SetHeatingEvent', {
				eventIndex: 0,
				startHour: 8,
				startMinute: 1,
				targetTemperature: 25.8,
				daysActive: {
					monday: true,
					tuesday: true,
					wednesday: true,
					thursday: true,
					friday: true,
					saturday: false,
					sunday: false,
				},
			}),
		).toStrictEqual(new BaseCommand('SetHeatingEvent', 0x59, '00', '08', '01', '0102', '1F'))
	})
	test('Set heating event', () => {
		//59020600006460
		expect(
			commandBuilder.build('SetHeatingEvent', {
				eventIndex: 2,
				startHour: 6,
				startMinute: 0,
				targetTemperature: 5.0,
				daysActive: {
					monday: false,
					tuesday: false,
					wednesday: false,
					thursday: false,
					friday: false,
					saturday: true,
					sunday: true,
				},
			}),
		).toStrictEqual(new BaseCommand('SetHeatingEvent', 0x59, '02', '06', '00', '0032', '60'))
	})
	test('Activate heating event (index 16)', () => {
		expect(commandBuilder.build('SetHeatingEventState', { eventIndex: 16, active: true })).toStrictEqual(
			new BaseCommand('SetHeatingEventState', 0x6b, '10', '01'),
		)
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
	test('SetRelayTimerInMilliseconds command', () => {
		expect(commandBuilder.build('SetRelayTimerInMilliseconds', { state: 0, time: 500 })).toStrictEqual(
			new BaseCommand('SetRelayTimerInMilliseconds', 0x55, '00', '01F4'),
		)
	})
	test('GetRelayTimerInMilliseconds command', () => {
		expect(commandBuilder.build('GetRelayTimerInMilliseconds')).toStrictEqual(
			new BaseCommand('GetRelayTimerInMilliseconds', 0x56),
		)
	})
	test('SetRelayTimerInSeconds command', () => {
		expect(commandBuilder.build('SetRelayTimerInSeconds', { state: 0, time: 3 })).toStrictEqual(
			new BaseCommand('SetRelayTimerInSeconds', 0x57, '00', '0003'),
		)
	})
	test('GetRelayTimerInSeconds command', () => {
		expect(commandBuilder.build('GetRelayTimerInSeconds')).toStrictEqual(new BaseCommand('GetRelayTimerInSeconds', 0x58))
	})
	test('GetRelayStateChangeReason command', () => {
		expect(commandBuilder.build('GetRelayStateChangeReason')).toStrictEqual(
			new BaseCommand('GetRelayStateChangeReason', 0x54),
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
	test('SetRelayTimerInMilliseconds command', () => {
		expect(commandBuilder.build('SetRelayTimerInMilliseconds', { state: 0, time: 500 })).toStrictEqual(
			new BaseCommand('SetRelayTimerInMilliseconds', 0x55, '00', '01F4'),
		)
	})
	test('GetRelayTimerInMilliseconds command', () => {
		expect(commandBuilder.build('GetRelayTimerInMilliseconds')).toStrictEqual(
			new BaseCommand('GetRelayTimerInMilliseconds', 0x56),
		)
	})
	test('SetRelayTimerInSeconds command', () => {
		expect(commandBuilder.build('SetRelayTimerInSeconds', { state: 0, time: 3 })).toStrictEqual(
			new BaseCommand('SetRelayTimerInSeconds', 0x57, '00', '0003'),
		)
	})
	test('GetRelayTimerInSeconds command', () => {
		expect(commandBuilder.build('GetRelayTimerInSeconds')).toStrictEqual(new BaseCommand('GetRelayTimerInSeconds', 0x58))
	})
	test('GetRelayStateChangeReason command', () => {
		expect(commandBuilder.build('GetRelayStateChangeReason')).toStrictEqual(
			new BaseCommand('GetRelayStateChangeReason', 0x54),
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
		expect(commandBuilder.build('RestartDevice')).toStrictEqual(new BaseCommand('RestartDevice', 0xa5))
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
		expect(commandBuilder.build('SetTargetTemperatureStep', { value: 2.2 })).toStrictEqual(
			new BaseCommand('SetTargetTemperatureStep', 0x03, '16'),
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
		expect(commandBuilder.build('SetFctOperationalMode', { value: 2 })).toStrictEqual(
			new BaseCommand('SetFctOperationalMode', 0x52, '02'),
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
		expect(commandBuilder.build('SetEcmVoltageRange', { min: 2, max: 5 })).toStrictEqual(
			new BaseCommand('SetEcmVoltageRange', 0x48, '14', '32'),
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
		expect(commandBuilder.build('SetTempSensorCompensation', { compensation: 1, temperature: 2.5 })).toStrictEqual(
			new BaseCommand('SetTempSensorCompensation', 0x5a, '01', '19'),
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
		expect(
			commandBuilder.build('SetHeatingCoolingTargetTempRanges', {
				heatingTempMin: 16,
				heatingTempMax: 24,
				coolingTempMin: 20,
				coolingTempMax: 29,
			}),
		).toStrictEqual(new BaseCommand('SetHeatingCoolingTargetTempRanges', 0x16, '10', '18', '14', '1D'))
	})

	test('Set Heating Cooling Target Temp Ranges Unoccupied', () => {
		expect(
			commandBuilder.build('SetHeatingCoolingTargetTempRangesUnoccupied', {
				heatingTempMin: 16,
				heatingTempMax: 24,
				coolingTempMin: 20,
				coolingTempMax: 29,
			}),
		).toStrictEqual(new BaseCommand('SetHeatingCoolingTargetTempRangesUnoccupied', 0x76, '10', '18', '14', '1D'))
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
		expect(commandBuilder.build('SetOperationalMode', { mode: '01' })).toStrictEqual(
			new BaseCommand('SetOperationalMode', 0x0d, '01'),
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
		expect(commandBuilder.build('SetPrimaryOperationalMode', { mode: '01' })).toStrictEqual(
			new BaseCommand('SetPrimaryOperationalMode', 0x1e, '01'),
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

	test('Set Time Request By MAC Command', () => {
		expect(commandBuilder.build('SetTimeRequestByMACcommand', { enabled: true })).toStrictEqual(
			new BaseCommand('SetTimeRequestByMACcommand', 0x6d, '01'),
		)
	})

	test('Set Heating Schedule', () => {
		// Example 1: Set schedule from 1st November to 1st April
		expect(
			commandBuilder.build('SetHeatingSchedule', {
				startMonth: 10, // November (0-based indexing)
				startDay: 1,
				endMonth: 3, // April (0-based indexing)
				endDay: 1,
			}),
		).toStrictEqual(new BaseCommand('SetHeatingSchedule', 0x5b, '0A', '01', '03', '01'))
	})

	test('Set Device Time', () => {
		// Example from documentation: June 29, 2025 06:00:00 GMT
		// UNIX timestamp: 1751176800
		expect(
			commandBuilder.build('SetDeviceTime', {
				timestamp: 1751176800,
			}),
		).toStrictEqual(new BaseCommand('SetDeviceTime', 0x5d, '68', '60', 'D6', '60'))
	})

	test('Set Device Time Zone', () => {
		// Test positive offset: +2 hours
		expect(
			commandBuilder.build('SetDeviceTimeZone', {
				offsetHours: 2,
			}),
		).toStrictEqual(new BaseCommand('SetDeviceTimeZone', 0x5f, '02'))

		// Test negative offset: -3 hours (example from documentation)
		expect(
			commandBuilder.build('SetDeviceTimeZone', {
				offsetHours: -3,
			}),
		).toStrictEqual(new BaseCommand('SetDeviceTimeZone', 0x5f, 'FD'))
	})

	test('Set Automatic Setpoint Restore', () => {
		// Test with 60 minutes (example from documentation - 6*10=60 minutes)
		expect(
			commandBuilder.build('SetAutomaticSetpointRestore', {
				time: 60, // minutes
			}),
		).toStrictEqual(new BaseCommand('SetAutomaticSetpointRestore', 0x61, '06'))
	})

	test('Set Offline Target Temperature', () => {
		// Test with normal temperature - 21.5°C (example from documentation)
		expect(
			commandBuilder.build('SetOfflineTargetTemperature', {
				targetTemperature: 21.5,
			}),
		).toStrictEqual(new BaseCommand('SetOfflineTargetTemperature', 0x65, '00D7'))
	})

	test('Set Internal Algorithm Temporary State', () => {
		// Test temporary disable internal algorithm (example from documentation)
		expect(
			commandBuilder.build('SetInternalAlgoTemporaryState', {
				enabled: false, // Disable temporarily
			}),
		).toStrictEqual(new BaseCommand('SetInternalAlgoTemporaryState', 0x67, '01'))
	})

	test('Set Temperature Levels', () => {
		// Test with the example values from documentation
		expect(
			commandBuilder.build('SetTemperatureLevels', {
				scaleLevel0: 7.0, // 0x0046 = 70
				scaleLevel1: 18.9, // 0x00BD = 189
				scaleLevel2: 20.2, // 0x00CA = 202
				scaleLevel3: 22.5, // 0x00E1 = 225
				scaleLevel4: 25.0, // 0x00FA = 250
				scaleLevel5: 30.0, // 0x012C = 300
			}),
		).toStrictEqual(
			new BaseCommand(
				'SetTemperatureLevels',
				0x69,
				'0046', // Level 0: 7.0°C
				'00BD', // Level 1: 18.9°C
				'00CA', // Level 2: 20.2°C
				'00E1', // Level 3: 22.5°C
				'00FA', // Level 4: 25.0°C
				'012C', // Level 5: 30.0°C
			),
		)
	})

	test('Set LED Indication Duration', () => {
		// Example from documentation: 0x64 - duration value 6 (3 seconds)
		expect(
			commandBuilder.build('SetLedIndicationDuration', {
				duration: 3, // seconds
			}),
		).toStrictEqual(new BaseCommand('SetLedIndicationDuration', 0x63, '06'))
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
		expect(commandBuilder.build('SetFloodEventUplinkType', { type: '01' })).toStrictEqual(
			new BaseCommand('SetFloodEventUplinkType', 0x13, '01'),
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

	test('Clear Press Event Counter (MC Button)', () => {
		expect(commandBuilder.build('ClearPressEventCounter', { value: 1 })).toStrictEqual(
			new BaseCommand('ClearPressEventCounter', 0x20, '01'),
		)
	})

	test('Restart Device', () => {
		expect(commandBuilder.build('RestartDevice')).toStrictEqual(new BaseCommand('RestartDevice', 0xa5))
	})
})
describe('CO2 PIR Lite Commands payload encoder', () => {
	const commandBuilder = new CommandBuilder('co2_pir_lite')
	test('Set CO2 Measurement Time', () => {
		expect(
			commandBuilder.build('SetCo2MeasurementPeriod', { good_zone: 10, medium_zone: 20, bad_zone: 30 }),
		).toStrictEqual(new BaseCommand('SetCo2MeasurementPeriod', 0x24, '0A', '14', '1E'))
	})
	test('Set PIR Sensor Status (CO2 PIR Lite)', () => {
		expect(commandBuilder.build('SetPIRSensorStatus', { state: 1 })).toStrictEqual(
			new BaseCommand('SetPIRSensorStatus', 0x3c, '01'),
		)
	})
	test('Set Uplink Sending On Button Press', () => {
		expect(commandBuilder.build('SetUplinkSendingOnButtonPress', { value: 1 })).toStrictEqual(
			new BaseCommand('SetUplinkSendingOnButtonPress', 0x2e, '01'),
		)
	})
	test('Set PIR Check Period', () => {
		expect(commandBuilder.build('SetPIRCheckPeriod', { time: 20 })).toStrictEqual(
			new BaseCommand('SetPIRCheckPeriod', 0x4a, '0014'),
		)
	})
	test('Restart Device', () => {
		expect(commandBuilder.build('RestartDevice')).toStrictEqual(new BaseCommand('RestartDevice', 0xa5))
	})
})
describe('HT PIR Lite Commands payload encoder', () => {
	const commandBuilder = new CommandBuilder('ht_pir_lite')
	test('Set PIR Sensor Status (HT PIR Lite)', () => {
		expect(commandBuilder.build('SetPIRSensorStatus', { state: 1 })).toStrictEqual(
			new BaseCommand('SetPIRSensorStatus', 0x3c, '01'),
		)
	})
	test('Set Uplink Sending On Button Press', () => {
		expect(commandBuilder.build('SetUplinkSendingOnButtonPress', { value: 1 })).toStrictEqual(
			new BaseCommand('SetUplinkSendingOnButtonPress', 0x2e, '01'),
		)
	})
	test('Set PIR Check Period', () => {
		expect(commandBuilder.build('SetPIRCheckPeriod', { time: 20 })).toStrictEqual(
			new BaseCommand('SetPIRCheckPeriod', 0x4a, '0014'),
		)
	})
	test('Restart Device', () => {
		expect(commandBuilder.build('RestartDevice')).toStrictEqual(new BaseCommand('RestartDevice', 0xa5))
	})
})
describe('Melissa Commands payload encoder', () => {
	const commandBuilder = new CommandBuilder('melissa_lorawan')
	test('Set IR Code Recording (Melissa)', () => {
		expect(commandBuilder.build('SetIrCodeRecording', { time: 15 })).toStrictEqual(
			new BaseCommand('SetIrCodeRecording', 0x09, '0F'),
		)
	})
})

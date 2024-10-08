import {
	CommandBuilder,
	BaseCommand,
	CO2DisplayCommands,
	CO2SensorCommands,
	FanCoilThermostatCommands,
	VickiCommands,
	WirelessThermostatCommands,
	TFloodCommands,
} from '@/encoders'
import { CustomError } from '@/utils'

describe('General Commands payload encoder', () => {
	const commandBuilder = new CommandBuilder('vicki')
	test('Custom hex command Vicki', () => {
		expect(commandBuilder.build('SendCustomHexCommand', { command: '0412' })).toStrictEqual({
			cmdId: '0412',
			commandName: 'SendCustomHexCommand',
			params: [],
		})
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

describe('CO2Display Commands payload encoder', () => {
	const commandBuilder = CO2DisplayCommands

	test('Set CO2 Measurement Blind Time', () => {
		expect(commandBuilder.setCo2MeasurementBlindTime({ time: 10 })).toStrictEqual(
			new BaseCommand('SetCo2MeasurementBlindTime', 0x81, '0A'),
		)
	})

	test('Throw error on invalid Set CO2 Measurement Blind Time params', () => {
		expect(() => commandBuilder.setCo2MeasurementBlindTime({ time: -1 })).toThrow(CustomError)
	})
})

describe('CO2Sensor Commands payload encoder', () => {
	const commandBuilder = CO2SensorCommands

	test('Set CO2 Boundary Levels (valid range)', () => {
		expect(commandBuilder.setCo2BoundaryLevels({ good_medium: 200, medium_bad: 250 })).toStrictEqual(
			new BaseCommand('SetCo2BoundaryLevels', 0x1e, 'C8', 'FA'),
		)
	})

	test('Throw error on invalid CO2 Boundary Levels (out of range)', () => {
		expect(() => commandBuilder.setCo2BoundaryLevels({ good_medium: 300, medium_bad: 100 })).toThrow(CustomError)
	})

	test('Get CO2 Boundary Levels', () => {
		expect(commandBuilder.getCo2BoundaryLevels()).toStrictEqual(new BaseCommand('GetCo2BoundaryLevels', 0x1f))
	})

	test('Set CO2 Auto Zero Value (valid range)', () => {
		expect(commandBuilder.setCo2AutoZeroValue({ ppm: 150 })).toStrictEqual(
			new BaseCommand('SetCo2AutoZeroValue', 0x20, '96'),
		)
	})

	test('Throw error on invalid CO2 Auto Zero Value (out of range)', () => {
		expect(() => commandBuilder.setCo2AutoZeroValue({ ppm: 300 })).toThrow(CustomError)
	})

	test('Get CO2 Auto Zero Value', () => {
		expect(commandBuilder.getCo2AutoZeroValue()).toStrictEqual(new BaseCommand('GetCo2AutoZeroValue', 0x21))
	})

	test('Set Notify Period', () => {
		expect(commandBuilder.setNotifyPeriod({ good_zone: 60, medium_zone: 120, bad_zone: 180 })).toStrictEqual(
			new BaseCommand('SetNotifyPeriod', 0x22, '3C', '78', 'B4'),
		)
	})

	test('Get Notify Period', () => {
		expect(commandBuilder.getNotifyPeriod()).toStrictEqual(new BaseCommand('GetNotifyPeriod', 0x23))
	})

	test('Set CO2 Measurement Period', () => {
		expect(commandBuilder.setCo2MeasurementPeriod({ good_zone: 5, medium_zone: 10, bad_zone: 15 })).toStrictEqual(
			new BaseCommand('SetCo2MeasurementPeriod', 0x24, '05', '0A', '0F'),
		)
	})

	test('Get CO2 Measurement Period', () => {
		expect(commandBuilder.getCo2MeasurementPeriod()).toStrictEqual(new BaseCommand('GetCo2MeasurementPeriod', 0x25))
	})

	test('Set Buzzer Notification', () => {
		expect(
			commandBuilder.setBuzzerNotification({
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
		expect(commandBuilder.getBuzzerNotification()).toStrictEqual(new BaseCommand('GetBuzzerNotification', 0x27))
	})

	test('Set CO2 LED', () => {
		expect(
			commandBuilder.setCo2Led({
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
		expect(commandBuilder.getCo2Led()).toStrictEqual(new BaseCommand('GetCo2Led', 0x29))
	})

	test('Set CO2 Auto Zero Period', () => {
		expect(commandBuilder.setCo2AutoZeroPeriod({ hours: 24 })).toStrictEqual(
			new BaseCommand('SetCo2AutoZeroPeriod', 0x2a, '18'),
		)
	})

	test('Get CO2 Auto Zero Period', () => {
		expect(commandBuilder.getCo2AutoZeroPeriod()).toStrictEqual(new BaseCommand('GetCo2AutoZeroPeriod', 0x2b))
	})
})

describe('FanCoilThermostat Commands payload encoder', () => {
	const commandBuilder = FanCoilThermostatCommands

	test('Set Target Temperature Step', () => {
		expect(commandBuilder.setTargetTemperatureStep({ value: 22 })).toStrictEqual(
			new BaseCommand('SetTargetTemperatureStep', 0x03, 'DC'),
		)
	})

	test('Throw error on invalid Target Temperature Step', () => {
		expect(() => commandBuilder.setTargetTemperatureStep({ value: -5 })).toThrow(CustomError)
	})

	test('Set Keys Lock', () => {
		expect(commandBuilder.setKeysLock({ value: 1 })).toStrictEqual(new BaseCommand('SetKeysLock', 0x07, '01'))
	})

	test('Set Fan Coil Target', () => {
		expect(commandBuilder.setFanCoilTarget({ value: 30 })).toStrictEqual(
			new BaseCommand('SetFanCoilTarget', 0x2e, '012C'),
		)
	})

	test('Set Target Temperature', () => {
		expect(commandBuilder.setTargetTemperature({ targetTemperature: 25 })).toStrictEqual(
			new BaseCommand('SetTargetTemperature', 0x2e, '00FA'),
		)
	})

	test('Set FCT Operational Mode', () => {
		expect(commandBuilder.setFctOperationalMode({ value: 3 })).toStrictEqual(
			new BaseCommand('SetFctOperationalMode', 0x52, '03'),
		)
	})

	test('Set Valve Open Close Time', () => {
		expect(commandBuilder.setValveOpenCloseTime({ value: 5 })).toStrictEqual(
			new BaseCommand('SetValveOpenCloseTime', 0x31, '05'),
		)
	})

	test('Set External Automatic Temperature Control', () => {
		expect(commandBuilder.setExtAutomaticTemperatureControl({ value: 1 })).toStrictEqual(
			new BaseCommand('SetExtAutomaticTemperatureControl', 0x35, '01'),
		)
	})

	test('Set Fan Speed', () => {
		expect(commandBuilder.setFanSpeed({ value: 2 })).toStrictEqual(new BaseCommand('SetFanSpeed', 0x44, '02'))
	})

	test('Set Fan Speed Limit', () => {
		expect(commandBuilder.setFanSpeedLimit({ value: 3 })).toStrictEqual(new BaseCommand('SetFanSpeedLimit', 0x46, '03'))
	})

	test('Set ECM Voltage Range', () => {
		expect(commandBuilder.setEcmVoltageRange({ min: 20, max: 25 })).toStrictEqual(
			new BaseCommand('SetEcmVoltageRange', 0x48, 'C8', 'FA'),
		)
	})

	test('Set ECM Start Up Time', () => {
		expect(commandBuilder.setEcmStartUpTime({ value: 10 })).toStrictEqual(
			new BaseCommand('SetEcmStartUpTime', 0x4a, '0A'),
		)
	})

	test('Set ECM Relay', () => {
		expect(commandBuilder.setEcmRelay({ value: 1 })).toStrictEqual(new BaseCommand('SetEcmRelay', 0x4c, '01'))
	})

	test('Set Frost Protection', () => {
		expect(commandBuilder.setFrostProtection({ value: 1 })).toStrictEqual(
			new BaseCommand('SetFrostProtection', 0x4e, '01'),
		)
	})

	test('Set Frost Protection Settings', () => {
		expect(commandBuilder.setFrostProtectionSettings({ threshold: 5, setpoint: 10 })).toStrictEqual(
			new BaseCommand('SetFrostProtectionSettings', 0x50, '05', '0A'),
		)
	})

	test('Set Allowed Operational Modes', () => {
		expect(commandBuilder.setAllowedOperationalModes({ value: 2 })).toStrictEqual(
			new BaseCommand('SetAllowedOperationalModes', 0x54, '02'),
		)
	})

	test('Set Cooling Setpoint Not Occupied', () => {
		expect(commandBuilder.setCoolingSetpointNotOccupied({ value: 23 })).toStrictEqual(
			new BaseCommand('SetCoolingSetpointNotOccupied', 0x56, '17'),
		)
	})

	test('Set Heating Setpoint Not Occupied', () => {
		expect(commandBuilder.setHeatingSetpointNotOccupied({ value: 20 })).toStrictEqual(
			new BaseCommand('SetHeatingSetpointNotOccupied', 0x58, '14'),
		)
	})

	test('Set Temperature Sensor Compensation', () => {
		expect(commandBuilder.setTempSensorCompensation({ compensation: 2, temperature: 25 })).toStrictEqual(
			new BaseCommand('SetTempSensorCompensation', 0x5a, '02', 'FA'),
		)
	})

	test('Set Fan Speed Not Occupied', () => {
		expect(commandBuilder.setFanSpeedNotOccupied({ value: 2 })).toStrictEqual(
			new BaseCommand('SetFanSpeedNotOccupied', 0x5c, '02'),
		)
	})

	test('Set Automatic Changeover', () => {
		expect(commandBuilder.setAutomaticChangeover({ value: 1 })).toStrictEqual(
			new BaseCommand('SetAutomaticChangeover', 0x5e, '01'),
		)
	})

	test('Set Wiring Diagram', () => {
		expect(commandBuilder.setWiringDiagram({ value: 1 })).toStrictEqual(new BaseCommand('SetWiringDiagram', 0x60, '01'))
	})

	test('Set Occupancy Function', () => {
		expect(commandBuilder.setOccFunction({ value: 1 })).toStrictEqual(new BaseCommand('SetOccFunction', 0x62, '01'))
	})

	test('Set Automatic Changeover Threshold', () => {
		expect(commandBuilder.setAutomaticChangeoverThreshold({ coolingThreshold: 16, heatingThreshold: 43 })).toStrictEqual(
			new BaseCommand('SetAutomaticChangeoverThreshold', 0x64, '10', '2B'),
		)
	})

	test('Set Device Status', () => {
		expect(commandBuilder.setDeviceStatus({ value: 1 })).toStrictEqual(new BaseCommand('SetDeviceStatus', 0x66, '01'))
	})

	test('Set Return of Power Operation', () => {
		expect(commandBuilder.setReturnOfPowerOperation({ value: 2 })).toStrictEqual(
			new BaseCommand('SetReturnOfPowerOperation', 0x68, '02'),
		)
	})

	test('Set Delta Temperature 1', () => {
		expect(commandBuilder.setDeltaTemperature1({ value: 3 })).toStrictEqual(
			new BaseCommand('SetDeltaTemperature1', 0x6a, '1E'),
		)
	})

	test('Set Delta Temperature 2 and 3', () => {
		expect(commandBuilder.setDeltaTemperature2and3({ deltaTemperature2: 4, deltaTemperature3: 5 })).toStrictEqual(
			new BaseCommand('SetDeltaTemperature2and3', 0x6c, '28', '32'),
		)
	})
})

describe('Vicki Commands payload encoder', () => {
	const commandBuilder = VickiCommands

	test('Recalibrate Motor', () => {
		expect(commandBuilder.recalibrateMotor()).toStrictEqual(new BaseCommand('RecalibrateMotor', 0x03))
	})

	test('Set Open Window Detection Parameters', () => {
		expect(
			commandBuilder.setOpenWindow({
				enabled: true,
				delta: 3,
				closeTime: 20, // 20 minutes
				motorPosition: 450, // Motor position
			}),
		).toStrictEqual(new BaseCommand('SetOpenWindow', 0x06, '01', '04', 'C2', '13', '3'))

		expect(
			commandBuilder.setOpenWindow({
				enabled: false,
				delta: 3,
				closeTime: 20, // 20 minutes
				motorPosition: 450, // Motor position
			}),
		).toStrictEqual(new BaseCommand('SetOpenWindow', 0x06, '00', '04', 'C2', '13', '3'))
	})

	test('Set Internal Algo Params', () => {
		expect(
			commandBuilder.setInternalAlgoParams({
				period: 5,
				pFirstLast: 10,
				pNext: 15,
			}),
		).toStrictEqual(new BaseCommand('SetInternalAlgoParams', 0x0c, '05', '0A', '0F'))
	})

	test('Set Operational Mode', () => {
		expect(commandBuilder.setOperationalMode({ mode: '1' })).toStrictEqual(
			new BaseCommand('SetOperationalMode', 0x0d, '1'),
		)
	})

	test('Set Target Temperature (Integer)', () => {
		expect(commandBuilder.setTargetTemperature({ targetTemperature: 22 })).toStrictEqual(
			new BaseCommand('SetTargetTemperature', 0x0e, '16'), // 22°C = 0x16
		)
	})

	test('Set Target Temperature (Float)', () => {
		expect(commandBuilder.setTargetTemperature({ targetTemperature: 22.5 })).toStrictEqual(
			new BaseCommand('SetTargetTemperature', 0x51, '00E1'), // 22.5°C * 10 = 225 -> 0x0E1
		)
	})

	test('Set External Temperature', () => {
		expect(commandBuilder.setExternalTemperature({ temp: 18 })).toStrictEqual(
			new BaseCommand('SetExternalTemperature', 0x0f, '12'), // 18°C = 0x12
		)
	})

	test('Set Internal Algo Tdiff Params', () => {
		expect(
			commandBuilder.setInternalAlgoTdiffParams({
				cold: 8,
				warm: 12,
			}),
		).toStrictEqual(new BaseCommand('SetInternalAlgoTdiffParams', 0x1a, '08', '0C'))
	})

	test('Set Primary Operational Mode', () => {
		expect(commandBuilder.setPrimaryOperationalMode({ mode: '2' })).toStrictEqual(
			new BaseCommand('SetPrimaryOperationalMode', 0x1e, '2'),
		)
	})

	test('Set Battery Ranges Boundaries', () => {
		expect(
			commandBuilder.setBatteryRangesBoundaries({
				Boundary1: 2000,
				Boundary2: 3000,
				Boundary3: 4000,
			}),
		).toStrictEqual(new BaseCommand('SetBatteryRangesBoundaries', 0x20, '07D0', '0BB8', '0FA0'))
	})

	test('Set Ovac', () => {
		expect(commandBuilder.setOvac({ ovac: 12 })).toStrictEqual(
			new BaseCommand('SetOvac', 0x26, '0C'), // 12 = 0x0C
		)
	})

	test('Set Proportional Algorithm Parameters', () => {
		expect(
			commandBuilder.setProportionalAlgorithmParameters({
				coefficient: 5,
				period: 15,
			}),
		).toStrictEqual(new BaseCommand('SetProportionalAlgorithmParameters', 0x2a, '05', '0F'))
	})

	test('Set Valve Openness In Percentage', () => {
		expect(commandBuilder.setValveOpennessInPercentage({ value: 75 })).toStrictEqual(
			new BaseCommand('SetValveOpennessInPercentage', 0x4e, '4B'), // 75% = 0x4B
		)
	})

	test('Set Temperature Offset', () => {
		expect(commandBuilder.setTemperatureOffset({ value: -1 })).toStrictEqual(
			new BaseCommand('SetTemperatureOffset', 0x53, '16'), // Offset -1°C -> 0x16
		)

		expect(commandBuilder.setTemperatureOffset({ value: 0 })).toStrictEqual(
			new BaseCommand('SetTemperatureOffset', 0x53, '1C'), // Offset 0°C -> 0x1C
		)

		expect(commandBuilder.setTemperatureOffset({ value: 3 })).toStrictEqual(
			new BaseCommand('SetTemperatureOffset', 0x53, '2D'), // Offset 3°C -> 0x2D
		)
	})
})

describe('WirelessThermostat Commands payload encoder', () => {
	const commandBuilder = WirelessThermostatCommands

	test('Set Target Temperature', () => {
		// Example: setting the target temperature to 22°C (0x16 in hex)
		expect(commandBuilder.setTargetTemperature({ targetTemperature: 22 })).toStrictEqual(
			new BaseCommand('SetTargetTemperature', 0x2e, '16'),
		)
	})

	test('Set Heating Status', () => {
		// Example: setting the heating status (1 for ON, 0 for OFF)
		expect(commandBuilder.setHeatingStatus({ status: 1 })).toStrictEqual(new BaseCommand('SetHeatingStatus', 0x31, '01'))
	})

	test('Set Display Refresh Period', () => {
		// Example: setting the display refresh period to 10 (0x0A in hex)
		expect(commandBuilder.setDisplayRefreshPeriod({ period: 10 })).toStrictEqual(
			new BaseCommand('SetDisplayRefreshPeriod', 0x33, '0A'),
		)
	})

	test('Set Target Send Delay', () => {
		// Example: setting the target send delay to 15 (0x0F in hex)
		expect(commandBuilder.setTargetSendDelay({ time: 15 })).toStrictEqual(
			new BaseCommand('SetTargetSendDelay', 0x35, '0F'),
		)
	})

	test('Set Automatic Heating Status', () => {
		// Example: enabling automatic heating status (state = 1)
		expect(commandBuilder.setAutomaticHeatingStatus({ state: 1 })).toStrictEqual(
			new BaseCommand('SetAutomaticHeatingStatus', 0x37, '01'),
		)
	})

	test('Set Sensor Mode', () => {
		// Example: setting the sensor mode (state = 1)
		expect(commandBuilder.setSensorMode({ state: 1 })).toStrictEqual(new BaseCommand('SetSensorMode', 0x39, '01'))
	})

	test('Set Temperature Hysteresis', () => {
		// Example: setting the temperature hysteresis to 2.5°C (multiplied by 10 -> 25 -> 0x19 in hex)
		expect(commandBuilder.setTemperatureHysteresis({ hysteresis: 2.5 })).toStrictEqual(
			new BaseCommand('SetTemperatureHysteresis', 0x4e, '19'),
		)
	})

	test('Set Target Temperature Precisely', () => {
		// Example: setting the target temperature precisely to 22.5°C (multiplied by 10 -> 225 -> 0x0E1 in hex)
		expect(commandBuilder.setTargetTemperaturePrecisely({ targetTemperature: 22.5 })).toStrictEqual(
			new BaseCommand('SetTargetTemperaturePrecisely', 0x50, '00E1'),
		)
	})

	test('Set Target Temperature Step', () => {
		// Example: setting the target temperature step to 0.5°C (multiplied by 10 -> 5 -> 0x05 in hex)
		expect(commandBuilder.setTargetTemperatureStep({ value: 0.5 })).toStrictEqual(
			new BaseCommand('SetTargetTemperatureStep', 0x52, '05'),
		)
	})
})

describe('TFlood Commands payload encoder', () => {
	const commandBuilder = TFloodCommands

	test('Set Flood Alarm Time', () => {
		// Example: setting the flood alarm time to 15 (0x0F in hex)
		expect(commandBuilder.setFloodAlarmTime({ time: 15 })).toStrictEqual(new BaseCommand('SetFloodAlarmTime', 0x04, 'f'))
	})

	test('Set Keep Alive', () => {
		// Example: setting keep alive time to 120 (0x0078 in hex)
		expect(commandBuilder.setKeepAlive({ time: 120 })).toStrictEqual(new BaseCommand('SetKeepAlive', 0x05, '0078'))
	})

	test('Set Flood Event Send Time', () => {
		// Example: setting the flood event send time to 30 (0x1E in hex)
		expect(commandBuilder.setFloodEventSendTime({ time: 30 })).toStrictEqual(
			new BaseCommand('SetFloodEventSendTime', 0x08, '1e'),
		)
	})

	test('Set Flood Event Uplink Type', () => {
		// Example: setting the flood event uplink type to 2
		expect(commandBuilder.setFloodEventUplinkType({ type: '2' })).toStrictEqual(
			new BaseCommand('SetFloodEventUplinkType', 0x13, '2'),
		)
	})
})

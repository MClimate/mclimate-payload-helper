import { BaseCommand, CommandBuilder } from '@/encoders'
import { CustomError } from '@/utils'

describe('FanCoilThermostatCommands payload encoder', () => {
	const commandBuilder = new CommandBuilder('fan_coil_thermostat')

	test('SetTargetTemperatureStep encodes step *10', () => {
		expect(commandBuilder.build('SetTargetTemperatureStep', { value: 0.5 })).toStrictEqual(
			new BaseCommand('SetTargetTemperatureStep', 0x03, '05'),
		)
	})

	test('SetKeysLock encodes lock value', () => {
		expect(commandBuilder.build('SetKeysLock', { value: 3 })).toStrictEqual(new BaseCommand('SetKeysLock', 0x07, '03'))
	})

	test('SetTargetTemperature encodes temperature *10 as 2 bytes', () => {
		expect(commandBuilder.build('SetTargetTemperature', { targetTemperature: 20 })).toStrictEqual(
			new BaseCommand('SetTargetTemperature', 0x2e, '00C8'),
		)
	})

	test('SetFctOperationalMode encodes mode', () => {
		expect(commandBuilder.build('SetFctOperationalMode', { value: 2 })).toStrictEqual(
			new BaseCommand('SetFctOperationalMode', 0x52, '02'),
		)
	})

	test('SetValveOpenCloseTime encodes time', () => {
		expect(commandBuilder.build('SetValveOpenCloseTime', { value: 15 })).toStrictEqual(
			new BaseCommand('SetValveOpenCloseTime', 0x31, '0F'),
		)
	})

	test('SetExtAutomaticTemperatureControl encodes toggle', () => {
		expect(commandBuilder.build('SetExtAutomaticTemperatureControl', { value: 1 })).toStrictEqual(
			new BaseCommand('SetExtAutomaticTemperatureControl', 0x35, '01'),
		)
	})

	test('SetFanSpeed encodes speed', () => {
		expect(commandBuilder.build('SetFanSpeed', { value: 4 })).toStrictEqual(new BaseCommand('SetFanSpeed', 0x44, '04'))
	})

	test('SetFanSpeedLimit encodes limit', () => {
		expect(commandBuilder.build('SetFanSpeedLimit', { value: 2 })).toStrictEqual(
			new BaseCommand('SetFanSpeedLimit', 0x46, '02'),
		)
	})

	test('SetEcmVoltageRange encodes min/max *10', () => {
		expect(commandBuilder.build('SetEcmVoltageRange', { min: 5, max: 8 })).toStrictEqual(
			new BaseCommand('SetEcmVoltageRange', 0x48, '32', '50'),
		)
	})

	test('SetEcmStartUpTime encodes start-up time', () => {
		expect(commandBuilder.build('SetEcmStartUpTime', { value: 7 })).toStrictEqual(
			new BaseCommand('SetEcmStartUpTime', 0x4a, '07'),
		)
	})

	test('SetEcmRelay encodes relay toggle', () => {
		expect(commandBuilder.build('SetEcmRelay', { value: 1 })).toStrictEqual(new BaseCommand('SetEcmRelay', 0x4c, '01'))
	})

	test('SetFrostProtection encodes protection toggle', () => {
		expect(commandBuilder.build('SetFrostProtection', { value: 1 })).toStrictEqual(
			new BaseCommand('SetFrostProtection', 0x4e, '01'),
		)
	})

	test('SetFrostProtectionSettings encodes threshold and setpoint', () => {
		expect(commandBuilder.build('SetFrostProtectionSettings', { threshold: 6, setpoint: 8 })).toStrictEqual(
			new BaseCommand('SetFrostProtectionSettings', 0x50, '06', '08'),
		)
	})

	test('SetAllowedOperationalModes encodes allowed modes', () => {
		expect(commandBuilder.build('SetAllowedOperationalModes', { value: 1 })).toStrictEqual(
			new BaseCommand('SetAllowedOperationalModes', 0x54, '01'),
		)
	})

	test('SetCoolingSetpointNotOccupied encodes setpoint', () => {
		expect(commandBuilder.build('SetCoolingSetpointNotOccupied', { value: 18 })).toStrictEqual(
			new BaseCommand('SetCoolingSetpointNotOccupied', 0x56, '12'),
		)
	})

	test('SetHeatingSetpointNotOccupied encodes setpoint', () => {
		expect(commandBuilder.build('SetHeatingSetpointNotOccupied', { value: 19 })).toStrictEqual(
			new BaseCommand('SetHeatingSetpointNotOccupied', 0x58, '13'),
		)
	})

	test('SetTempSensorCompensation encodes compensation and absolute temperature *10', () => {
		expect(commandBuilder.build('SetTempSensorCompensation', { compensation: 1, temperature: -1.5 })).toStrictEqual(
			new BaseCommand('SetTempSensorCompensation', 0x5a, '01', '0F'),
		)
	})

	test('SetFanSpeedNotOccupied encodes speed option', () => {
		expect(commandBuilder.build('SetFanSpeedNotOccupied', { value: 2 })).toStrictEqual(
			new BaseCommand('SetFanSpeedNotOccupied', 0x5c, '02'),
		)
	})

	test('SetAutomaticChangeover encodes toggle', () => {
		expect(commandBuilder.build('SetAutomaticChangeover', { value: 1 })).toStrictEqual(
			new BaseCommand('SetAutomaticChangeover', 0x5e, '01'),
		)
	})

	test('SetWiringDiagram encodes diagram value', () => {
		expect(commandBuilder.build('SetWiringDiagram', { value: 3 })).toStrictEqual(
			new BaseCommand('SetWiringDiagram', 0x60, '03'),
		)
	})

	test('SetOccFunction encodes occupancy function', () => {
		expect(commandBuilder.build('SetOccFunction', { value: 5 })).toStrictEqual(
			new BaseCommand('SetOccFunction', 0x62, '05'),
		)
	})

	test('SetAutomaticChangeoverThreshold encodes cooling/heating thresholds', () => {
		expect(
			commandBuilder.build('SetAutomaticChangeoverThreshold', { coolingThreshold: 10, heatingThreshold: 40 }),
		).toStrictEqual(new BaseCommand('SetAutomaticChangeoverThreshold', 0x64, '0A', '28'))
	})

	test('SetDeviceStatus encodes on/off', () => {
		expect(commandBuilder.build('SetDeviceStatus', { value: 1 })).toStrictEqual(
			new BaseCommand('SetDeviceStatus', 0x66, '01'),
		)
	})

	test('SetReturnOfPowerOperation encodes behavior', () => {
		expect(commandBuilder.build('SetReturnOfPowerOperation', { value: 2 })).toStrictEqual(
			new BaseCommand('SetReturnOfPowerOperation', 0x68, '02'),
		)
	})

	test('SetDeltaTemperature1 encodes delta *10', () => {
		expect(commandBuilder.build('SetDeltaTemperature1', { value: 1.5 })).toStrictEqual(
			new BaseCommand('SetDeltaTemperature1', 0x6a, '0F'),
		)
	})

	test('SetDeltaTemperature2and3 encodes both deltas *10', () => {
		expect(
			commandBuilder.build('SetDeltaTemperature2and3', { deltaTemperature2: 2, deltaTemperature3: 2.5 }),
		).toStrictEqual(new BaseCommand('SetDeltaTemperature2and3', 0x6c, '14', '19'))
	})

	test('SetHeatingCoolingTargetTempRanges encodes min/max values', () => {
		expect(
			commandBuilder.build('SetHeatingCoolingTargetTempRanges', {
				heatingTempMin: 10,
				heatingTempMax: 20,
				coolingTempMin: 15,
				coolingTempMax: 25,
			}),
		).toStrictEqual(new BaseCommand('SetHeatingCoolingTargetTempRanges', 0x16, '0A', '14', '0F', '19'))
	})

	test('SetHeatingCoolingTargetTempRangesUnoccupied encodes min/max values', () => {
		expect(
			commandBuilder.build('SetHeatingCoolingTargetTempRangesUnoccupied', {
				heatingTempMin: 11,
				heatingTempMax: 21,
				coolingTempMin: 16,
				coolingTempMax: 22,
			}),
		).toStrictEqual(new BaseCommand('SetHeatingCoolingTargetTempRangesUnoccupied', 0x76, '0B', '15', '10', '16'))
	})

	test('SetFanOffDelayTime encodes delay time', () => {
		expect(commandBuilder.build('SetFanOffDelayTime', { time: 30 })).toStrictEqual(
			new BaseCommand('SetFanOffDelayTime', 0x78, '1E'),
		)
	})

	test('SetAdditionalFanMode encodes mode', () => {
		expect(commandBuilder.build('SetAdditionalFanMode', { mode: 2 })).toStrictEqual(
			new BaseCommand('SetAdditionalFanMode', 0x7a, '02'),
		)
	})

	test('SetUserInterfaceLanguage encodes language option', () => {
		expect(commandBuilder.build('SetUserInterfaceLanguage', { value: 3 })).toStrictEqual(
			new BaseCommand('SetUserInterfaceLanguage', 0x9a, '03'),
		)
	})

	test('RestartDevice emits restart command', () => {
		expect(commandBuilder.build('RestartDevice')).toStrictEqual(new BaseCommand('RestartDevice', 0xa5))
	})

	test('Invalid SetTargetTemperatureStep throws validation error', () => {
		expect(() => commandBuilder.build('SetTargetTemperatureStep', { value: 0 })).toThrow(CustomError)
	})
})

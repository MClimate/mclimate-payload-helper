import { BaseCommand, CommandBuilder } from '@/encoders'
import { CustomError } from '@/utils'

describe('WirelessThermostatCommands payload encoder', () => {
	const commandBuilder = new CommandBuilder('wireless_thermostat')

	test('SetTargetTemperature uses precise path for floats', () => {
		expect(commandBuilder.build('SetTargetTemperature', { targetTemperature: 21.5 })).toStrictEqual(
			new BaseCommand('SetTargetTemperature', 0x50, '00D7'),
		)
	})

	test('SetTargetTemperature uses integer path', () => {
		expect(commandBuilder.build('SetTargetTemperature', { targetTemperature: 22 })).toStrictEqual(
			new BaseCommand('SetTargetTemperature', 0x2e, '16'),
		)
	})

	test('SetHeatingStatus encodes status flag', () => {
		expect(commandBuilder.build('SetHeatingStatus', { status: 1 })).toStrictEqual(
			new BaseCommand('SetHeatingStatus', 0x31, '01'),
		)
	})

	test('SetDisplayRefreshPeriod encodes period', () => {
		expect(commandBuilder.build('SetDisplayRefreshPeriod', { period: 4 })).toStrictEqual(
			new BaseCommand('SetDisplayRefreshPeriod', 0x33, '04'),
		)
	})

	test('SetTargetSendDelay encodes delay', () => {
		expect(commandBuilder.build('SetTargetSendDelay', { time: 10 })).toStrictEqual(
			new BaseCommand('SetTargetSendDelay', 0x35, '0A'),
		)
	})

	test('SetAutomaticHeatingStatus encodes toggle', () => {
		expect(commandBuilder.build('SetAutomaticHeatingStatus', { state: 1 })).toStrictEqual(
			new BaseCommand('SetAutomaticHeatingStatus', 0x37, '01'),
		)
	})

	test('SetSensorMode encodes mode', () => {
		expect(commandBuilder.build('SetSensorMode', { state: 1 })).toStrictEqual(
			new BaseCommand('SetSensorMode', 0x39, '01'),
		)
	})

	test('SetTemperatureHysteresis encodes hysteresis *10', () => {
		expect(commandBuilder.build('SetTemperatureHysteresis', { hysteresis: 0.5 })).toStrictEqual(
			new BaseCommand('SetTemperatureHysteresis', 0x4e, '05'),
		)
	})

	test('SetTargetTemperaturePrecisely encodes temperature *10', () => {
		expect(commandBuilder.build('SetTargetTemperaturePrecisely', { targetTemperature: 21.5 })).toStrictEqual(
			new BaseCommand('SetTargetTemperaturePrecisely', 0x50, '00D7'),
		)
	})

	test('SetTargetTemperatureStep encodes step *10', () => {
		expect(commandBuilder.build('SetTargetTemperatureStep', { value: 0.5 })).toStrictEqual(
			new BaseCommand('SetTargetTemperatureStep', 0x52, '05'),
		)
	})

	test('Invalid SetTargetTemperatureStep throws validation error', () => {
		expect(() => commandBuilder.build('SetTargetTemperatureStep', { value: 0 })).toThrow(CustomError)
	})
})

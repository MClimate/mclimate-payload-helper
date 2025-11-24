import { BaseCommand, CommandBuilder } from '@/encoders'
import { CustomError } from '@/utils'

describe('DisplayCommands payload encoder', () => {
	const commandBuilder = new CommandBuilder('co2_display')

	test('SetDisplayRefreshPeriod encodes period hours', () => {
		expect(commandBuilder.build('SetDisplayRefreshPeriod', { period: 5 })).toStrictEqual(
			new BaseCommand('SetDisplayRefreshPeriod', 0x33, '05'),
		)
	})

	test('SetDeepSleepMode encodes state flag', () => {
		expect(commandBuilder.build('SetDeepSleepMode', { state: 1 })).toStrictEqual(
			new BaseCommand('SetDeepSleepMode', 0x3b, '01'),
		)
	})

	test('SetHumidityVisibility encodes toggle', () => {
		expect(commandBuilder.build('SetHumidityVisibility', { state: 0 })).toStrictEqual(
			new BaseCommand('SetHumidityVisibility', 0x42, '00'),
		)
	})

	test('SetLightIntensityVisibility encodes toggle', () => {
		expect(commandBuilder.build('SetLightIntensityVisibility', { state: 1 })).toStrictEqual(
			new BaseCommand('SetLightIntensityVisibility', 0x44, '01'),
		)
	})

	test('SetCurrentTemperatureVisibility encodes toggle', () => {
		expect(commandBuilder.build('SetCurrentTemperatureVisibility', { state: 1 })).toStrictEqual(
			new BaseCommand('SetCurrentTemperatureVisibility', 0x40, '01'),
		)
	})

	test('Invalid SetDisplayRefreshPeriod throws validation error', () => {
		expect(() => commandBuilder.build('SetDisplayRefreshPeriod', { period: 0 })).toThrow(CustomError)
	})
})

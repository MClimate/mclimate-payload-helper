import { BaseCommand, CommandBuilder } from '@/encoders'
import { CustomError } from '@/utils'

describe('HTDisplayLiteCommands payload encoder', () => {
	const commandBuilder = new CommandBuilder('ht_display_lite')

	test('SetDisplayRefreshPeriod encodes period', () => {
		expect(commandBuilder.build('SetDisplayRefreshPeriod', { period: 4 })).toStrictEqual(
			new BaseCommand('SetDisplayRefreshPeriod', 0x33, '04'),
		)
	})

	test('SetHumidityVisibility encodes toggle', () => {
		expect(commandBuilder.build('SetHumidityVisibility', { state: 1 })).toStrictEqual(
			new BaseCommand('SetHumidityVisibility', 0x42, '01'),
		)
	})

	test('SetCurrentTemperatureVisibility encodes toggle', () => {
		expect(commandBuilder.build('SetCurrentTemperatureVisibility', { state: 0 })).toStrictEqual(
			new BaseCommand('SetCurrentTemperatureVisibility', 0x40, '00'),
		)
	})

	test('Invalid SetDisplayRefreshPeriod throws validation error', () => {
		expect(() => commandBuilder.build('SetDisplayRefreshPeriod', { period: 0 })).toThrow(CustomError)
	})
})

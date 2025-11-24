import { BaseCommand, CommandBuilder } from '@/encoders'
import { CustomError } from '@/utils'

describe('OpenCloseSensorCommands payload encoder', () => {
	const commandBuilder = new CommandBuilder('open_close_sensor')

	test('SetNotificationBlindTime encodes time', () => {
		expect(commandBuilder.build('SetNotificationBlindTime', { time: 10 })).toStrictEqual(
			new BaseCommand('SetNotificationBlindTime', 0x1e, '0A'),
		)
	})

	test('Invalid SetNotificationBlindTime throws validation error', () => {
		expect(() => commandBuilder.build('SetNotificationBlindTime', { time: -1 })).toThrow(CustomError)
	})
})

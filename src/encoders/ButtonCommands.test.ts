import { BaseCommand, CommandBuilder } from '@/encoders'
import { CustomError } from '@/utils'

describe('ButtonCommands payload encoder', () => {
	const commandBuilder = new CommandBuilder('mc_button')

	test('SetSendEventLater encodes toggle flag', () => {
		expect(commandBuilder.build('SetSendEventLater', { value: 1 })).toStrictEqual(
			new BaseCommand('SetSendEventLater', 0x1e, '01'),
		)
	})

	test('ClearPressEventCounter encodes press count selector', () => {
		expect(commandBuilder.build('ClearPressEventCounter', { value: 3 })).toStrictEqual(
			new BaseCommand('ClearPressEventCounter', 0x20, '03'),
		)
	})

	test('RestartDevice emits restart command', () => {
		expect(commandBuilder.build('RestartDevice')).toStrictEqual(new BaseCommand('RestartDevice', 0xa5))
	})

	test('Invalid SetSendEventLater value throws validation error', () => {
		expect(() => commandBuilder.build('SetSendEventLater', { value: 2 })).toThrow(CustomError)
	})
})

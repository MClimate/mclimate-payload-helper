import { BaseCommand, CommandBuilder } from '@/encoders'
import { CustomError } from '@/utils'

describe('ChildLockCommands payload encoder', () => {
	const commandBuilder = new CommandBuilder('vicki')

	test('SetChildLock encodes enabled flag', () => {
		expect(commandBuilder.build('SetChildLock', { enabled: true })).toStrictEqual(
			new BaseCommand('SetChildLock', 0x07, '01'),
		)
	})

	test('SetChildLock encodes disabled flag', () => {
		expect(commandBuilder.build('SetChildLock', { enabled: false })).toStrictEqual(
			new BaseCommand('SetChildLock', 0x07, '00'),
		)
	})

	test('Invalid SetChildLock param throws validation error', () => {
		expect(() => commandBuilder.build('SetChildLock', { enabled: 2 as unknown as boolean })).toThrow(CustomError)
	})
})

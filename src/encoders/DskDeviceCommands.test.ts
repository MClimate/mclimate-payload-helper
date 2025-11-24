import { BaseCommand, CommandBuilder } from '@/encoders'
import { CustomError } from '@/utils'

describe('DskDeviceCommands payload encoder', () => {
	const commandBuilder = new CommandBuilder('dsk_device')

	test('SetVrvStatus encodes status flag', () => {
		expect(commandBuilder.build('SetVrvStatus', { status: 1 })).toStrictEqual(new BaseCommand('SetVrvStatus', 0x1e, '01'))
	})

	test('SetVrvOnTime encodes seconds', () => {
		expect(commandBuilder.build('SetVrvOnTime', { time: 300 })).toStrictEqual(
			new BaseCommand('SetVrvOnTime', 0x20, '012C'),
		)
	})

	test('SetVrvOffTime encodes seconds', () => {
		expect(commandBuilder.build('SetVrvOffTime', { time: 120 })).toStrictEqual(
			new BaseCommand('SetVrvOffTime', 0x21, '0078'),
		)
	})

	test('Invalid SetVrvStatus params throw validation error', () => {
		expect(() => commandBuilder.build('SetVrvStatus', { status: 'on' as unknown as number })).toThrow(CustomError)
	})
})

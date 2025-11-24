import { BaseCommand, CommandBuilder } from '@/encoders'
import { CustomError } from '@/utils'

describe('MelissaCommands payload encoder', () => {
	const commandBuilder = new CommandBuilder('melissa_lorawan')

	test('SetIrCodeRecording encodes time and position', () => {
		expect(commandBuilder.build('SetIrCodeRecording', { time: 10, position: 2 })).toStrictEqual(
			new BaseCommand('SetIrCodeRecording', 0x09, '0A', '02'),
		)
	})

	test('Invalid SetIrCodeRecording throws validation error', () => {
		expect(() => commandBuilder.build('SetIrCodeRecording', { time: -1, position: 1 })).toThrow(CustomError)
	})
})

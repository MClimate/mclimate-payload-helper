import { BaseCommand, CommandBuilder } from '@/encoders'
import { CustomError } from '@/utils'

describe('CO2DisplayLiteCommands payload encoder', () => {
	const commandBuilder = new CommandBuilder('co2_display_lite')

	test('SetCo2ImagesVisibility encodes digital and emoji bits', () => {
		expect(
			commandBuilder.build('SetCo2ImagesVisibility', { digital_value: true, emoji: false, chart: false }),
		).toStrictEqual(new BaseCommand('SetCo2ImagesVisibility', 0x82, '02'))

		expect(
			commandBuilder.build('SetCo2ImagesVisibility', { digital_value: true, emoji: true, chart: false }),
		).toStrictEqual(new BaseCommand('SetCo2ImagesVisibility', 0x82, '03'))
	})

	test('SetUplinkSendingOnButtonPress encodes toggle value', () => {
		expect(commandBuilder.build('SetUplinkSendingOnButtonPress', { value: 1 })).toStrictEqual(
			new BaseCommand('SetUplinkSendingOnButtonPress', 0x2e, '01'),
		)
	})

	test('RestartDevice emits restart command', () => {
		expect(commandBuilder.build('RestartDevice')).toStrictEqual(new BaseCommand('RestartDevice', 0xa5))
	})

	test('Invalid SetUplinkSendingOnButtonPress params throw validation error', () => {
		expect(() => commandBuilder.build('SetUplinkSendingOnButtonPress', { value: -1 })).toThrow(CustomError)
	})
})

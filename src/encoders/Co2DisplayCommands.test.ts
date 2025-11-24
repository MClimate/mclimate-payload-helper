import { BaseCommand, CommandBuilder } from '@/encoders'
import { CustomError } from '@/utils'

describe('CO2DisplayCommands payload encoder', () => {
	const commandBuilder = new CommandBuilder('co2_display')

	test('SetCo2MeasurementBlindTime encodes time value', () => {
		expect(commandBuilder.build('SetCo2MeasurementBlindTime', { time: 10 })).toStrictEqual(
			new BaseCommand('SetCo2MeasurementBlindTime', 0x81, '0A'),
		)
	})

	test('SetCo2ImagesVisibility encodes chart/digital/emoji bits', () => {
		expect(
			commandBuilder.build('SetCo2ImagesVisibility', { chart: true, digital_value: true, emoji: false }),
		).toStrictEqual(new BaseCommand('SetCo2ImagesVisibility', 0x82, '06'))

		expect(
			commandBuilder.build('SetCo2ImagesVisibility', { chart: false, digital_value: false, emoji: true }),
		).toStrictEqual(new BaseCommand('SetCo2ImagesVisibility', 0x82, '01'))
	})

	test('Invalid SetCo2MeasurementBlindTime params throw validation error', () => {
		expect(() => commandBuilder.build('SetCo2MeasurementBlindTime', { time: -1 })).toThrow(CustomError)
	})
})

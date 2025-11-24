import { BaseCommand, CommandBuilder } from '@/encoders'
import { CustomError } from '@/utils'

describe('CO2SensorCommands payload encoder', () => {
	const commandBuilder = new CommandBuilder('co2_sensor')

	test('SetCo2BoundaryLevels encodes good/medium thresholds', () => {
		expect(commandBuilder.build('SetCo2BoundaryLevels', { good_medium: 200, medium_bad: 250 })).toStrictEqual(
			new BaseCommand('SetCo2BoundaryLevels', 0x1e, '00C8', '00FA'),
		)
	})

	test('SetCo2AutoZeroValue encodes ppm value', () => {
		expect(commandBuilder.build('SetCo2AutoZeroValue', { ppm: 150 })).toStrictEqual(
			new BaseCommand('SetCo2AutoZeroValue', 0x20, '0096'),
		)
	})

	test('SetNotifyPeriod encodes zone periods', () => {
		expect(commandBuilder.build('SetNotifyPeriod', { good_zone: 10, medium_zone: 20, bad_zone: 30 })).toStrictEqual(
			new BaseCommand('SetNotifyPeriod', 0x22, '0A', '14', '1E'),
		)
	})

	test('SetCo2MeasurementPeriod encodes zone periods', () => {
		expect(
			commandBuilder.build('SetCo2MeasurementPeriod', { good_zone: 5, medium_zone: 15, bad_zone: 25 }),
		).toStrictEqual(new BaseCommand('SetCo2MeasurementPeriod', 0x24, '05', '0F', '19'))
	})

	test('SetCo2AutoZeroPeriod encodes hours', () => {
		expect(commandBuilder.build('SetCo2AutoZeroPeriod', { hours: 12 })).toStrictEqual(
			new BaseCommand('SetCo2AutoZeroPeriod', 0x2a, '0C'),
		)
	})

	test('SetBuzzerNotification encodes durations and loud/silent intervals', () => {
		expect(
			commandBuilder.build('SetBuzzerNotification', {
				duration_good_beeping: 1,
				duration_good_loud: 20,
				duration_good_silent: 30,
				duration_medium_beeping: 2,
				duration_medium_loud: 40,
				duration_medium_silent: 50,
				duration_bad_beeping: 3,
				duration_bad_loud: 60,
				duration_bad_silent: 70,
			}),
		).toStrictEqual(new BaseCommand('SetBuzzerNotification', 0x26, '01', '02', '03', '02', '04', '05', '03', '06', '07'))
	})

	test('SetCo2Led encodes color and duration sequences', () => {
		expect(
			commandBuilder.build('SetCo2Led', {
				red_good: 1,
				green_good: 2,
				blue_good: 3,
				duration_good: 50,
				red_medium: 4,
				green_medium: 5,
				blue_medium: 6,
				duration_medium: 60,
				red_bad: 7,
				green_bad: 8,
				blue_bad: 9,
				duration_bad: 70,
			}),
		).toStrictEqual(
			new BaseCommand('SetCo2Led', 0x28, '01', '02', '03', '0005', '04', '05', '06', '0006', '07', '08', '09', '0007'),
		)
	})

	test('Invalid SetCo2BoundaryLevels throws validation error', () => {
		expect(() => commandBuilder.build('SetCo2BoundaryLevels', { good_medium: 2000, medium_bad: 250 })).toThrow(
			CustomError,
		)
	})
})

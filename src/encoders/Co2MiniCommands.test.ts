import { BaseCommand, CommandBuilder } from '@/encoders'
import { CustomError } from '@/utils'

describe('CO2MiniCommands payload encoder', () => {
	const commandBuilder = new CommandBuilder('co2_mini')

	test('SetLedBrightness encodes brightness percentage (doc example 0x212F)', () => {
		expect(commandBuilder.build('SetLedBrightness', { value: 47 })).toStrictEqual(
			new BaseCommand('SetLedBrightness', 0x21, '2F'),
		)
	})

	test('GetLedBrightness emits get command', () => {
		expect(commandBuilder.build('GetLedBrightness')).toStrictEqual(new BaseCommand('GetLedBrightness', 0x22))
	})

	test('SetCo2MeasurementPeriod encodes the three zones (doc example 0x240F0F0F)', () => {
		expect(
			commandBuilder.build('SetCo2MeasurementPeriod', { good_zone: 15, medium_zone: 15, bad_zone: 15 }),
		).toStrictEqual(new BaseCommand('SetCo2MeasurementPeriod', 0x24, '0F', '0F', '0F'))
	})

	test('GetCo2MeasurementPeriod emits get command', () => {
		expect(commandBuilder.build('GetCo2MeasurementPeriod')).toStrictEqual(
			new BaseCommand('GetCo2MeasurementPeriod', 0x25),
		)
	})

	test('SetCo2BoundaryLevels encodes 2-byte boundaries on 0x26 (doc example 0x26038405DC)', () => {
		expect(commandBuilder.build('SetCo2BoundaryLevels', { good_medium: 900, medium_bad: 1500 })).toStrictEqual(
			new BaseCommand('SetCo2BoundaryLevels', 0x26, '0384', '05DC'),
		)
	})

	test('GetCo2BoundaryLevels emits get command on 0x27', () => {
		expect(commandBuilder.build('GetCo2BoundaryLevels')).toStrictEqual(new BaseCommand('GetCo2BoundaryLevels', 0x27))
	})

	test('SetCo2AutoZeroValue encodes 2-byte ppm on 0x28 (doc example 0x280221)', () => {
		expect(commandBuilder.build('SetCo2AutoZeroValue', { ppm: 545 })).toStrictEqual(
			new BaseCommand('SetCo2AutoZeroValue', 0x28, '0221'),
		)
	})

	test('GetCo2AutoZeroValue emits get command on 0x29', () => {
		expect(commandBuilder.build('GetCo2AutoZeroValue')).toStrictEqual(new BaseCommand('GetCo2AutoZeroValue', 0x29))
	})

	test('SetCo2AutoZeroPeriod encodes hours (doc example 0x2A48)', () => {
		expect(commandBuilder.build('SetCo2AutoZeroPeriod', { hours: 72 })).toStrictEqual(
			new BaseCommand('SetCo2AutoZeroPeriod', 0x2a, '48'),
		)
	})

	test('SetCo2AutoZeroPeriod accepts 0 to disable automatic auto-zero', () => {
		expect(commandBuilder.build('SetCo2AutoZeroPeriod', { hours: 0 })).toStrictEqual(
			new BaseCommand('SetCo2AutoZeroPeriod', 0x2a, '00'),
		)
	})

	test('GetCo2AutoZeroPeriod emits get command', () => {
		expect(commandBuilder.build('GetCo2AutoZeroPeriod')).toStrictEqual(new BaseCommand('GetCo2AutoZeroPeriod', 0x2b))
	})

	test('SetKeepAlive encodes period in minutes (doc example 0x020F)', () => {
		expect(commandBuilder.build('SetKeepAlive', { time: 15 })).toStrictEqual(new BaseCommand('SetKeepAlive', 0x02, '0F'))
	})

	test('GetKeepAlive emits get command', () => {
		expect(commandBuilder.build('GetKeepAlive')).toStrictEqual(new BaseCommand('GetKeepAlive', 0x12))
	})

	test('GetDeviceVersion emits get command', () => {
		expect(commandBuilder.build('GetDeviceVersion')).toStrictEqual(new BaseCommand('GetDeviceVersion', 0x04))
	})

	test('SetJoinRetryPeriod encodes period in 5s steps (doc example 0x10F0)', () => {
		expect(commandBuilder.build('SetJoinRetryPeriod', { period: 20 })).toStrictEqual(
			new BaseCommand('SetJoinRetryPeriod', 0x10, 'F0'),
		)
	})

	test('GetJoinRetryPeriod emits get command', () => {
		expect(commandBuilder.build('GetJoinRetryPeriod')).toStrictEqual(new BaseCommand('GetJoinRetryPeriod', 0x19))
	})

	test('SetUplinkType encodes confirmed uplinks (doc example 0x1101)', () => {
		expect(commandBuilder.build('SetUplinkType', { type: '01' })).toStrictEqual(
			new BaseCommand('SetUplinkType', 0x11, '01'),
		)
	})

	test('GetUplinkType emits get command', () => {
		expect(commandBuilder.build('GetUplinkType')).toStrictEqual(new BaseCommand('GetUplinkType', 0x1b))
	})

	test('SetWatchDogParams encodes both thresholds (doc example 0x1C0300)', () => {
		expect(commandBuilder.build('SetWatchDogParams', { confirmedUplinks: 3, unconfirmedUplinks: 0 })).toStrictEqual(
			new BaseCommand('SetWatchDogParams', 0x1c, '03', '00'),
		)
	})

	test('GetWatchDogParams emits get command', () => {
		expect(commandBuilder.build('GetWatchDogParams')).toStrictEqual(new BaseCommand('GetWatchDogParams', 0x1d))
	})

	test('GetRegion emits get command', () => {
		expect(commandBuilder.build('GetRegion')).toStrictEqual(new BaseCommand('GetRegion', 0xa4))
	})

	test('RestartDevice emits restart command', () => {
		expect(commandBuilder.build('RestartDevice')).toStrictEqual(new BaseCommand('RestartDevice', 0xa5))
	})

	test('CO2 Sensor-only commands are not exposed', () => {
		expect(() => commandBuilder.build('SetNotifyPeriod', { good_zone: 1, medium_zone: 1, bad_zone: 1 })).toThrow()
		expect(() => commandBuilder.build('GetBuzzerNotification')).toThrow()
	})

	test('Invalid SetLedBrightness throws validation error', () => {
		expect(() => commandBuilder.build('SetLedBrightness', { value: 101 })).toThrow(CustomError)
	})

	test('Invalid SetCo2BoundaryLevels throws validation error below 400 ppm', () => {
		expect(() => commandBuilder.build('SetCo2BoundaryLevels', { good_medium: 399, medium_bad: 1500 })).toThrow(
			CustomError,
		)
	})

	test('Invalid SetCo2BoundaryLevels throws validation error above 5000 ppm', () => {
		expect(() => commandBuilder.build('SetCo2BoundaryLevels', { good_medium: 900, medium_bad: 5001 })).toThrow(
			CustomError,
		)
	})

	test('Invalid SetCo2MeasurementPeriod throws validation error for 0 minutes', () => {
		expect(() =>
			commandBuilder.build('SetCo2MeasurementPeriod', { good_zone: 0, medium_zone: 10, bad_zone: 10 }),
		).toThrow(CustomError)
	})

	test('Invalid SetKeepAlive throws validation error', () => {
		expect(() => commandBuilder.build('SetKeepAlive', { time: 0 })).toThrow(CustomError)
	})
})

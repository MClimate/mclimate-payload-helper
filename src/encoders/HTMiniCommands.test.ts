import { BaseCommand, CommandBuilder } from '@/encoders'
import { CustomError } from '@/utils'

describe('HTMiniCommands payload encoder', () => {
	const commandBuilder = new CommandBuilder('ht_mini')

	test('SetLedBrightness encodes brightness percentage', () => {
		expect(commandBuilder.build('SetLedBrightness', { value: 47 })).toStrictEqual(
			new BaseCommand('SetLedBrightness', 0x21, '2F'),
		)
	})

	test('SetLedBrightness encodes zero to deactivate LED', () => {
		expect(commandBuilder.build('SetLedBrightness', { value: 0 })).toStrictEqual(
			new BaseCommand('SetLedBrightness', 0x21, '00'),
		)
	})

	test('GetLedBrightness emits get command', () => {
		expect(commandBuilder.build('GetLedBrightness')).toStrictEqual(new BaseCommand('GetLedBrightness', 0x22))
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

	test('SetJoinRetryPeriod encodes period in 5s steps (doc default 0x78)', () => {
		expect(commandBuilder.build('SetJoinRetryPeriod', { period: 10 })).toStrictEqual(
			new BaseCommand('SetJoinRetryPeriod', 0x10, '78'),
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

	test('Invalid SetLedBrightness throws validation error', () => {
		expect(() => commandBuilder.build('SetLedBrightness', { value: 101 })).toThrow(CustomError)
	})

	test('Invalid SetKeepAlive throws validation error', () => {
		expect(() => commandBuilder.build('SetKeepAlive', { time: 0 })).toThrow(CustomError)
	})

	test('Invalid SetUplinkType throws validation error', () => {
		expect(() => commandBuilder.build('SetUplinkType', { type: '02' })).toThrow(CustomError)
	})
})

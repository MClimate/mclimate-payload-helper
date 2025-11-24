import { BaseCommand, CommandBuilder } from '@/encoders'
import { CustomError } from '@/utils'

describe('Relay16Commands payload encoder', () => {
	const commandBuilder = new CommandBuilder('relay_16')

	test('SetOverheatingThresholds encodes trigger and recovery', () => {
		expect(commandBuilder.build('SetOverheatingThresholds', { trigger: 45, recovery: 60 })).toStrictEqual(
			new BaseCommand('SetOverheatingThresholds', 0x1e, '2D', '3C'),
		)
	})

	test('SetOverheatingThresholds matches doc example values', () => {
		expect(commandBuilder.build('SetOverheatingThresholds', { trigger: 90, recovery: 60 })).toStrictEqual(
			new BaseCommand('SetOverheatingThresholds', 0x1e, '5A', '3C'),
		)
	})

	test('SetOvervoltageThresholds encodes trigger and recovery', () => {
		expect(commandBuilder.build('SetOvervoltageThresholds', { trigger: 230, recovery: 150 })).toStrictEqual(
			new BaseCommand('SetOvervoltageThresholds', 0x20, '00E6', '96'),
		)
	})

	test('SetOvercurrentThreshold encodes current value', () => {
		expect(commandBuilder.build('SetOvercurrentThreshold', { current: 12 })).toStrictEqual(
			new BaseCommand('SetOvercurrentThreshold', 0x22, '0C'),
		)
	})

	test('SetOverpowerThreshold encodes power value', () => {
		expect(commandBuilder.build('SetOverpowerThreshold', { power: 1500 })).toStrictEqual(
			new BaseCommand('SetOverpowerThreshold', 0x24, '05DC'),
		)
	})

	test('SetAfterOverheatingProtectionRecovery encodes state flag', () => {
		expect(commandBuilder.build('SetAfterOverheatingProtectionRecovery', { state: 1 })).toStrictEqual(
			new BaseCommand('SetAfterOverheatingProtectionRecovery', 0x59, '01'),
		)
	})

	test('SetLedIndicationMode encodes mode flag', () => {
		expect(commandBuilder.build('SetLedIndicationMode', { mode: 1 })).toStrictEqual(
			new BaseCommand('SetLedIndicationMode', 0x5b, '01'),
		)
	})

	test('SetRelayRecoveryState encodes relay recovery state', () => {
		expect(commandBuilder.build('SetRelayRecoveryState', { state: 2 })).toStrictEqual(
			new BaseCommand('SetRelayRecoveryState', 0x5e, '02'),
		)
	})

	test('SetRelayState maps boolean to relay flag', () => {
		expect(commandBuilder.build('SetRelayState', { state: false })).toStrictEqual(
			new BaseCommand('SetRelayState', 0xc1, '00'),
		)
	})

	test('SetRelayTimerInMilliseconds encodes state and time', () => {
		expect(commandBuilder.build('SetRelayTimerInMilliseconds', { state: 1, time: 1200 })).toStrictEqual(
			new BaseCommand('SetRelayTimerInMilliseconds', 0x55, '01', '04B0'),
		)
	})

	test('SetRelayTimerInSeconds encodes state and time', () => {
		expect(commandBuilder.build('SetRelayTimerInSeconds', { state: 0, time: 90 })).toStrictEqual(
			new BaseCommand('SetRelayTimerInSeconds', 0x57, '00', '005A'),
		)
	})

	test('Invalid parameter triggers validation error', () => {
		expect(() => commandBuilder.build('SetOverpowerThreshold', { power: 4000 })).toThrow(CustomError)
	})
})

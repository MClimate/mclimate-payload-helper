import { BaseCommand, CommandBuilder } from '@/encoders'
import { CustomError } from '@/utils'

describe('Relay16DryCommands payload encoder', () => {
	const commandBuilder = new CommandBuilder('relay_16_dry')

	test('SetRelayState maps boolean to relay flag', () => {
		expect(commandBuilder.build('SetRelayState', { state: true })).toStrictEqual(
			new BaseCommand('SetRelayState', 0xc1, '01'),
		)
	})

	test('SetRelayTimerInMilliseconds encodes state and time', () => {
		expect(commandBuilder.build('SetRelayTimerInMilliseconds', { state: 0, time: 500 })).toStrictEqual(
			new BaseCommand('SetRelayTimerInMilliseconds', 0x55, '00', '01F4'),
		)
	})

	test('SetRelayTimerInSeconds encodes state and time', () => {
		expect(commandBuilder.build('SetRelayTimerInSeconds', { state: 1, time: 3 })).toStrictEqual(
			new BaseCommand('SetRelayTimerInSeconds', 0x57, '01', '0003'),
		)
	})

	test('SetOverheatingThresholds encodes trigger and recovery', () => {
		expect(commandBuilder.build('SetOverheatingThresholds', { trigger: 40, recovery: 60 })).toStrictEqual(
			new BaseCommand('SetOverheatingThresholds', 0x1e, '28', '3C'),
		)
	})

	test('SetAfterOverheatingProtectionRecovery encodes state', () => {
		expect(commandBuilder.build('SetAfterOverheatingProtectionRecovery', { state: 1 })).toStrictEqual(
			new BaseCommand('SetAfterOverheatingProtectionRecovery', 0x59, '01'),
		)
	})

	test('SetLedIndicationMode encodes mode', () => {
		expect(commandBuilder.build('SetLedIndicationMode', { mode: 1 })).toStrictEqual(
			new BaseCommand('SetLedIndicationMode', 0x5b, '01'),
		)
	})

	test('SetRelayRecoveryState encodes state', () => {
		expect(commandBuilder.build('SetRelayRecoveryState', { state: 2 })).toStrictEqual(
			new BaseCommand('SetRelayRecoveryState', 0x5e, '02'),
		)
	})

	test('Invalid SetRelayTimerInSeconds throws validation error', () => {
		expect(() => commandBuilder.build('SetRelayTimerInSeconds', { state: 0, time: 70000 })).toThrow(CustomError)
	})
})

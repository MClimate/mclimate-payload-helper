import { BaseCommand, CommandBuilder } from '@/encoders'
import { CustomError } from '@/utils'

describe('MultiSensorCommands payload encoder', () => {
	const commandBuilder = new CommandBuilder('multisensor')

	test('SetLightState encodes boolean to flag', () => {
		expect(commandBuilder.build('SetLightState', { enabled: true })).toStrictEqual(
			new BaseCommand('SetLightState', 0x1e, '01'),
		)
	})

	test('SetHallState encodes boolean to flag', () => {
		expect(commandBuilder.build('SetHallState', { enabled: false })).toStrictEqual(
			new BaseCommand('SetHallState', 0x20, '00'),
		)
	})

	test('SetHallBlindPeriod encodes period as 2 bytes', () => {
		expect(commandBuilder.build('SetHallBlindPeriod', { period: 300 })).toStrictEqual(
			new BaseCommand('SetHallBlindPeriod', 0x22, '012C'),
		)
	})

	test('SetMicrophoneState encodes boolean to flag', () => {
		expect(commandBuilder.build('SetMicrophoneState', { enabled: true })).toStrictEqual(
			new BaseCommand('SetMicrophoneState', 0x24, '01'),
		)
	})

	test('SetMicrophoneSamplingPeriod encodes period as 2 bytes', () => {
		expect(commandBuilder.build('SetMicrophoneSamplingPeriod', { period: 120 })).toStrictEqual(
			new BaseCommand('SetMicrophoneSamplingPeriod', 0x26, '0078'),
		)
	})

	test('SetGasState encodes boolean to flag', () => {
		expect(commandBuilder.build('SetGasState', { enabled: true })).toStrictEqual(
			new BaseCommand('SetGasState', 0x28, '01'),
		)
	})

	test('SetGasMeasurementPeriod encodes minutes', () => {
		expect(commandBuilder.build('SetGasMeasurementPeriod', { minutes: 15 })).toStrictEqual(
			new BaseCommand('SetGasMeasurementPeriod', 0x2a, '0F'),
		)
	})

	test('SetPirState encodes boolean to flag', () => {
		expect(commandBuilder.build('SetPirState', { enabled: true })).toStrictEqual(
			new BaseCommand('SetPirState', 0x2c, '01'),
		)
	})

	test('SetPirActiveReportingPeriod encodes time as 2 bytes', () => {
		expect(commandBuilder.build('SetPirActiveReportingPeriod', { time: 45 })).toStrictEqual(
			new BaseCommand('SetPirActiveReportingPeriod', 0x2e, '002D'),
		)
	})

	test('Restart emits restart command', () => {
		expect(commandBuilder.build('Restart')).toStrictEqual(new BaseCommand('Restart', 0xa5))
	})

	test('Invalid SetHallBlindPeriod throws validation error', () => {
		expect(() => commandBuilder.build('SetHallBlindPeriod', { period: -1 })).toThrow(CustomError)
	})
})

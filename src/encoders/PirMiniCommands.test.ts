import { BaseCommand, CommandBuilder } from '@/encoders'
import { CustomError } from '@/utils'

describe('PirMiniCommands payload encoder', () => {
	const commandBuilder = new CommandBuilder('pir_mini')

	test('SetLightSensorState encodes enabled flag', () => {
		expect(commandBuilder.build('SetLightSensorState', { state: 1 })).toStrictEqual(
			new BaseCommand('SetLightSensorState', 0x1e, '01'),
		)
	})

	test('SetLightSensorState encodes disabled flag', () => {
		expect(commandBuilder.build('SetLightSensorState', { state: 0 })).toStrictEqual(
			new BaseCommand('SetLightSensorState', 0x1e, '00'),
		)
	})

	test('SetLedBrightness encodes RGB values', () => {
		expect(commandBuilder.build('SetLedBrightness', { value: 47 })).toStrictEqual(
			new BaseCommand('SetLedBrightness', 0x21, '2F'),
		)
	})

	test('SetPIRSensorState encodes enabled flag', () => {
		expect(commandBuilder.build('SetPIRSensorState', { state: 1 })).toStrictEqual(
			new BaseCommand('SetPIRSensorState', 0x36, '01'),
		)
	})

	test('SetOccupancyTimeout encodes timeout into two bytes', () => {
		expect(commandBuilder.build('SetOccupancyTimeout', { timeout: 60 })).toStrictEqual(
			new BaseCommand('SetOccupancyTimeout', 0x38, '003C'),
		)
	})

	test('SetPIRDemoMode encodes enabled flag', () => {
		expect(commandBuilder.build('SetPIRDemoMode', { state: 1 })).toStrictEqual(
			new BaseCommand('SetPIRDemoMode', 0x3c, '01'),
		)
	})

	test('SetPIROperationMode encodes Count Mode', () => {
		expect(commandBuilder.build('SetPIROperationMode', { mode: 3 })).toStrictEqual(
			new BaseCommand('SetPIROperationMode', 0x3e, '03'),
		)
	})

	test('GetPIROperationMode emits get command', () => {
		expect(commandBuilder.build('GetPIROperationMode')).toStrictEqual(new BaseCommand('GetPIROperationMode', 0x3f))
	})

	test('SetPIRBlindTime encodes seconds into two bytes', () => {
		expect(commandBuilder.build('SetPIRBlindTime', { time: 180 })).toStrictEqual(
			new BaseCommand('SetPIRBlindTime', 0x41, '00B4'),
		)
	})

	test('GetPIRBlindTime emits get command', () => {
		expect(commandBuilder.build('GetPIRBlindTime')).toStrictEqual(new BaseCommand('GetPIRBlindTime', 0x42))
	})

	test('SetPIRCounterResetFlag encodes disabled flag', () => {
		expect(commandBuilder.build('SetPIRCounterResetFlag', { state: 0 })).toStrictEqual(
			new BaseCommand('SetPIRCounterResetFlag', 0x43, '00'),
		)
	})

	test('GetPIRCounterResetFlag emits get command', () => {
		expect(commandBuilder.build('GetPIRCounterResetFlag')).toStrictEqual(new BaseCommand('GetPIRCounterResetFlag', 0x44))
	})

	test('RestartDevice emits restart command', () => {
		expect(commandBuilder.build('RestartDevice')).toStrictEqual(new BaseCommand('RestartDevice', 0xa5))
	})

	test('Invalid SetPIRSensorState throws validation error', () => {
		expect(() => commandBuilder.build('SetPIRSensorState', { state: 2 })).toThrow(CustomError)
	})

	test('Invalid SetLedBrightness throws validation error', () => {
		expect(() => commandBuilder.build('SetLedBrightness', { value: 101 })).toThrow(CustomError)
	})

	test('Invalid SetLightSensorState throws validation error', () => {
		expect(() => commandBuilder.build('SetLightSensorState', { state: 2 })).toThrow(CustomError)
	})

	test('Invalid SetPIROperationMode throws validation error', () => {
		expect(() => commandBuilder.build('SetPIROperationMode', { mode: 4 })).toThrow(CustomError)
	})

	test('Invalid SetPIRBlindTime throws validation error', () => {
		expect(() => commandBuilder.build('SetPIRBlindTime', { time: 5 })).toThrow(CustomError)
	})

	test('Invalid SetPIRCounterResetFlag throws validation error', () => {
		expect(() => commandBuilder.build('SetPIRCounterResetFlag', { state: 2 })).toThrow(CustomError)
	})
})

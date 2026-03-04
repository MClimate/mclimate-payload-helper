import { BaseCommand, CommandBuilder } from '@/encoders'
import { CustomError } from '@/utils'

describe('PirOnlyCommands payload encoder', () => {
	const commandBuilder = new CommandBuilder('pir_only')

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
		expect(commandBuilder.build('SetLedBrightness', { red: 47, green: 42, blue: 59 })).toStrictEqual(
			new BaseCommand('SetLedBrightness', 0x21, '2F', '2A', '3B'),
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
			new BaseCommand('SetPIRDemoMode', 0x3a, '01'),
		)
	})

	test('RestartDevice emits restart command', () => {
		expect(commandBuilder.build('RestartDevice')).toStrictEqual(new BaseCommand('RestartDevice', 0xa5))
	})

	test('Invalid SetPIRSensorState throws validation error', () => {
		expect(() => commandBuilder.build('SetPIRSensorState', { state: 2 })).toThrow(CustomError)
	})

	test('Invalid SetLedBrightness throws validation error', () => {
		expect(() => commandBuilder.build('SetLedBrightness', { red: 101, green: 0, blue: 0 })).toThrow(CustomError)
	})

	test('Invalid SetLightSensorState throws validation error', () => {
		expect(() => commandBuilder.build('SetLightSensorState', { state: 2 })).toThrow(CustomError)
	})
})

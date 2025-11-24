import { BaseCommand, CommandBuilder } from '@/encoders'
import { CustomError } from '@/utils'

describe('PIRCommands payload encoder', () => {
	const commandBuilder = new CommandBuilder('co2_display')

	test('SetPIRSensorStatus encodes state', () => {
		expect(commandBuilder.build('SetPIRSensorStatus', { state: 1 })).toStrictEqual(
			new BaseCommand('SetPIRSensorStatus', 0x3c, '01'),
		)
	})

	test('SetPIRSensorSensitivity encodes sensitivity', () => {
		expect(commandBuilder.build('SetPIRSensorSensitivity', { sensitivity: 12 })).toStrictEqual(
			new BaseCommand('SetPIRSensorSensitivity', 0x3e, '0C'),
		)
	})

	test('SetPIRInitPeriod encodes time', () => {
		expect(commandBuilder.build('SetPIRInitPeriod', { time: 5 })).toStrictEqual(
			new BaseCommand('SetPIRInitPeriod', 0x46, '05'),
		)
	})

	test('SetPIRMeasurementPeriod encodes time', () => {
		expect(commandBuilder.build('SetPIRMeasurementPeriod', { time: 15 })).toStrictEqual(
			new BaseCommand('SetPIRMeasurementPeriod', 0x48, '0F'),
		)
	})

	test('SetPIRCheckPeriod encodes 2-byte time', () => {
		expect(commandBuilder.build('SetPIRCheckPeriod', { time: 500 })).toStrictEqual(
			new BaseCommand('SetPIRCheckPeriod', 0x4a, '01F4'),
		)
	})

	test('SetPIRBlindPeriod encodes 2-byte time', () => {
		expect(commandBuilder.build('SetPIRBlindPeriod', { time: 300 })).toStrictEqual(
			new BaseCommand('SetPIRBlindPeriod', 0x4c, '012C'),
		)
	})

	test('Invalid SetPIRSensorStatus throws validation error', () => {
		expect(() => commandBuilder.build('SetPIRSensorStatus', { state: 2 })).toThrow(CustomError)
	})
})

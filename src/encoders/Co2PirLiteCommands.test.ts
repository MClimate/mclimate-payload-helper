import { BaseCommand, CommandBuilder } from '@/encoders'
import { CustomError } from '@/utils'

describe('Co2PirLiteCommands payload encoder', () => {
	const commandBuilder = new CommandBuilder('co2_pir_lite')

	test('SetPIRSensorState encodes enabled flag', () => {
		expect(commandBuilder.build('SetPIRSensorState', { state: 1 })).toStrictEqual(
			new BaseCommand('SetPIRSensorState', 0x36, '01'),
		)
	})

	test('SetPIRSensorSensitivity encodes sensitivity value', () => {
		expect(commandBuilder.build('SetPIRSensorSensitivity', { sensitivity: 64 })).toStrictEqual(
			new BaseCommand('SetPIRSensorSensitivity', 0x3e, '40'),
		)
	})
	test('SetCo2MeasurementPeriod encodes zone periods', () => {
		expect(
			commandBuilder.build('SetCo2MeasurementPeriod', { good_zone: 5, medium_zone: 15, bad_zone: 25 }),
		).toStrictEqual(new BaseCommand('SetCo2MeasurementPeriod', 0x24, '05', '0F', '19'))
	})

	test('SetOccupancyTimeout encodes timeout into two bytes', () => {
		expect(commandBuilder.build('SetOccupancyTimeout', { timeout: 60 })).toStrictEqual(
			new BaseCommand('SetOccupancyTimeout', 0x38, '003C'),
		)
	})

	test('RestartDevice emits restart command', () => {
		expect(commandBuilder.build('RestartDevice')).toStrictEqual(new BaseCommand('RestartDevice', 0xa5))
	})

	test('Invalid SetPIRSensorState throws validation error', () => {
		expect(() => commandBuilder.build('SetPIRSensorState', { state: 2 })).toThrow(CustomError)
	})
})

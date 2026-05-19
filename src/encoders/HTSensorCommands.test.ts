import { BaseCommand, CommandBuilder } from '@/encoders'
import { CustomError } from '@/utils'

describe('HTSensorCommands payload encoder', () => {
	const commandBuilder = new CommandBuilder('ht_sensor')

	test('SetTemperatureCompensation encodes sign flag and compensation *10', () => {
		expect(
			commandBuilder.build('SetTemperatureCompensation', { negativeCompensation: true, compensation: 0.3 }),
		).toStrictEqual(new BaseCommand('SetTemperatureCompensation', 0x31, '01', '03'))
	})

	test('SetHumidityCompensation encodes sign flag and compensation', () => {
		expect(
			commandBuilder.build('SetHumidityCompensation', { negativeCompensation: false, compensation: 3 }),
		).toStrictEqual(new BaseCommand('SetHumidityCompensation', 0x33, '00', '03'))
	})

	test('Invalid SetTemperatureCompensation throws validation error', () => {
		expect(() =>
			commandBuilder.build('SetTemperatureCompensation', { negativeCompensation: true, compensation: -1 }),
		).toThrow(CustomError)
	})

	test('SetD2dCommunicationState encodes enabled flag (enable)', () => {
		expect(commandBuilder.build('SetD2dCommunicationState', { enabled: true })).toStrictEqual(
			new BaseCommand('SetD2dCommunicationState', 0xa9, '01'),
		)
	})

	test('SetD2dCommunicationState encodes enabled flag (disable)', () => {
		expect(commandBuilder.build('SetD2dCommunicationState', { enabled: false })).toStrictEqual(
			new BaseCommand('SetD2dCommunicationState', 0xa9, '00'),
		)
	})

	test('GetD2dCommunicationState emits get command', () => {
		expect(commandBuilder.build('GetD2dCommunicationState')).toStrictEqual(
			new BaseCommand('GetD2dCommunicationState', 0xaa),
		)
	})

	test('SetD2dCommunicationPeriod encodes period (1-8 minutes)', () => {
		expect(commandBuilder.build('SetD2dCommunicationPeriod', { period: 6 })).toStrictEqual(
			new BaseCommand('SetD2dCommunicationPeriod', 0xab, '06'),
		)
	})

	test('Invalid SetD2dCommunicationPeriod throws validation error', () => {
		expect(() => commandBuilder.build('SetD2dCommunicationPeriod', { period: 9 })).toThrow(CustomError)
	})

	test('GetD2dCommunicationPeriod emits get command', () => {
		expect(commandBuilder.build('GetD2dCommunicationPeriod')).toStrictEqual(
			new BaseCommand('GetD2dCommunicationPeriod', 0xac),
		)
	})
})

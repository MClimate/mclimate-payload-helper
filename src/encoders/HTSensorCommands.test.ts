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
})

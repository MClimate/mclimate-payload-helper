import { BaseCommand, CommandBuilder } from '@/encoders'
import { CustomError } from '@/utils'

describe('TemperatureCommonCommands payload encoder', () => {
	const commandBuilder = new CommandBuilder('vicki')

	test('SetTemperatureRange encodes min and max', () => {
		expect(commandBuilder.build('SetTemperatureRange', { min: 5, max: 25 })).toStrictEqual(
			new BaseCommand('SetTemperatureRange', 0x08, '05', '19'),
		)
	})

	test('Invalid SetTemperatureRange throws validation error', () => {
		expect(() => commandBuilder.build('SetTemperatureRange', { min: 0, max: 25 })).toThrow(CustomError)
	})
})

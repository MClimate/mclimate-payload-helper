import { BaseCommand, CommandBuilder } from '@/encoders'

describe('TringThermostatCommands payload encoder', () => {
	const commandBuilder = new CommandBuilder('thermostat')

	test('SetThermostatTarget encodes target temperature', () => {
		expect(commandBuilder.build('SetThermostatTarget', { target: 21.5 })).toStrictEqual(
			new BaseCommand('SetThermostatTarget', 0x01, '00', '00', '00', 'D7', '00'),
		)
	})

	test('SetThermostatConfig encodes config payload', () => {
		expect(
			commandBuilder.build('SetThermostatConfig', { time: 5, temp_span: 2, temp_sampling: 3, target: 22 }),
		).toStrictEqual(new BaseCommand('SetThermostatConfig', 0x02, '05', '02', '03', 'DC', '00'))
	})

	test('SetKeepAlive encodes keepalive payload with padding', () => {
		expect(commandBuilder.build('SetKeepAlive', { time: 10 })).toStrictEqual(
			new BaseCommand('SetKeepAlive', 0x02, '0A', '00', '00', '00', '00'),
		)
	})
})

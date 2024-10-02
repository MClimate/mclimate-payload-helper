import { CommandBuilder, BaseCommand } from '@/encoders'

describe('General Commands payload encoder', () => {
	const commandBuilder = new CommandBuilder('vicki')
	test('Custom hex command Vicki', () => {
		expect(commandBuilder.build('SendCustomHexCommand', { command: '0412' })).toStrictEqual({
			cmdId: '0412',
			commandName: 'SendCustomHexCommand',
			params: [],
		})
	})
	test('Set keepalive time', () => {
		expect(commandBuilder.build('SetKeepAlive', { time: 5 })).toStrictEqual(new BaseCommand('SetKeepAlive', 2, '05'))
	})
})

describe('TValve commands payload encoder', () => {
	const commandBuilder = new CommandBuilder('t_valve')
	test('Set open close command', () => {
		expect(commandBuilder.build('SetOpenCloseTime', { openingTime: 1, closingTime: 5 })).toStrictEqual(
			new BaseCommand('SetOpenCloseTime', 1, '01', '05'),
		)
	})
})

describe('Relay commands payload encoder', () => {
	const commandBuilder = new CommandBuilder('relay_16')
	test('SetRelayState command', () => {
		expect(commandBuilder.build('SetRelayState', { state: true })).toStrictEqual(
			new BaseCommand('SetRelayState', 0xc1, '01'),
		)
	})
})

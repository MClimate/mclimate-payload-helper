import { BaseCommand, CommandBuilder } from '@/encoders'
import { CustomError } from '@/utils'

describe('GeneralCommands payload encoder', () => {
	const commandBuilder = new CommandBuilder('vicki')

	test('SendCustomHexCommand forwards raw hex', () => {
		expect(commandBuilder.build('SendCustomHexCommand', { command: '0412' })).toStrictEqual(
			new BaseCommand('SendCustomHexCommand', '0412'),
		)
	})

	test('SetKeepAlive encodes keepalive time', () => {
		expect(commandBuilder.build('SetKeepAlive', { time: 5 })).toStrictEqual(new BaseCommand('SetKeepAlive', 0x02, '05'))
	})

	test('SetJoinRetryPeriod scales minutes before encoding', () => {
		expect(commandBuilder.build('SetJoinRetryPeriod', { period: 10 })).toStrictEqual(
			new BaseCommand('SetJoinRetryPeriod', 0x10, '78'),
		)
	})

	test('SetUplinkType passes uplink type', () => {
		expect(commandBuilder.build('SetUplinkType', { type: '01' })).toStrictEqual(
			new BaseCommand('SetUplinkType', 0x11, '01'),
		)
	})

	test('SetWatchDogParams encodes confirmed/unconfirmed uplinks', () => {
		expect(commandBuilder.build('SetWatchDogParams', { confirmedUplinks: 2, unconfirmedUplinks: 3 })).toStrictEqual(
			new BaseCommand('SetWatchDogParams', 0x1c, '02', '03'),
		)
	})

	test('Invalid SendCustomHexCommand params throw validation error', () => {
		expect(() => commandBuilder.build('SendCustomHexCommand', { command: 'ZZZ' })).toThrow(CustomError)
	})
})

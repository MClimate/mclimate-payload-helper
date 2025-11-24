import { BaseCommand, CommandBuilder } from '@/encoders'
import { CustomError } from '@/utils'

describe('TFloodCommands payload encoder', () => {
	const commandBuilder = new CommandBuilder('t_flood')

	test('SetFloodAlarmTime encodes alarm time', () => {
		expect(commandBuilder.build('SetFloodAlarmTime', { time: 10 })).toStrictEqual(
			new BaseCommand('SetFloodAlarmTime', 0x04, 'a'),
		)
	})

	test('SetKeepAlive encodes keepalive seconds as 2 bytes', () => {
		expect(commandBuilder.build('SetKeepAlive', { time: 120 })).toStrictEqual(
			new BaseCommand('SetKeepAlive', 0x05, '0078'),
		)
	})

	test('SetFloodEventSendTime encodes send time', () => {
		expect(commandBuilder.build('SetFloodEventSendTime', { time: 30 })).toStrictEqual(
			new BaseCommand('SetFloodEventSendTime', 0x08, '1e'),
		)
	})

	test('SetFloodEventUplinkType encodes uplink type', () => {
		expect(commandBuilder.build('SetFloodEventUplinkType', { type: '01' })).toStrictEqual(
			new BaseCommand('SetFloodEventUplinkType', 0x13, '01'),
		)
	})

	test('Invalid SetFloodAlarmTime throws validation error', () => {
		expect(() => commandBuilder.build('SetFloodAlarmTime', { time: -1 })).toThrow(CustomError)
	})
})

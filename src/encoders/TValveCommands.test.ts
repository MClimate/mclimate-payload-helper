import { BaseCommand, CommandBuilder } from '@/encoders'
import { CustomError } from '@/utils'

describe('TValveCommands payload encoder', () => {
	const commandBuilder = new CommandBuilder('t_valve')

	test('SetOpenCloseTime encodes opening and closing time', () => {
		expect(commandBuilder.build('SetOpenCloseTime', { openingTime: 5, closingTime: 10 })).toStrictEqual(
			new BaseCommand('SetOpenCloseTime', 0x01, '05', '0A'),
		)
	})

	test('SetLED encodes led id, behavior and seconds', () => {
		expect(commandBuilder.build('SetLED', { ledId: 1, behavior: 2, seconds: 5 })).toStrictEqual(
			new BaseCommand('SetLED', 0x02, '01', '02', '05'),
		)
	})

	test('SetBuzzer packs volume/frequency and timing', () => {
		expect(
			commandBuilder.build('SetBuzzer', { volume: 8, frequency: 4, activeTime: 10, onTime: 20, offTime: 30 }),
		).toStrictEqual(new BaseCommand('SetBuzzer', 0x03, '84', '0A', '02', '03'))
	})

	test('SetEmergencyOpenings encodes max openings', () => {
		expect(commandBuilder.build('SetEmergencyOpenings', { maxOpenings: 7 })).toStrictEqual(
			new BaseCommand('SetEmergencyOpenings', 0x04, '07'),
		)
	})

	test('SetManualControl encodes open/close bits', () => {
		expect(commandBuilder.build('SetManualControl', { enableOpen: true, enableClose: false })).toStrictEqual(
			new BaseCommand('SetManualControl', 0x05, '00000001'),
		)
	})

	test('SetFloodAlarmTime encodes alarm time', () => {
		expect(commandBuilder.build('SetFloodAlarmTime', { time: 12 })).toStrictEqual(
			new BaseCommand('SetFloodAlarmTime', 0x06, '0C'),
		)
	})

	test('SetKeepAlive encodes keepalive', () => {
		expect(commandBuilder.build('SetKeepAlive', { time: 5 })).toStrictEqual(new BaseCommand('SetKeepAlive', 0x07, '05'))
	})

	test('SetWorkingVoltage scales voltage before encoding', () => {
		expect(commandBuilder.build('SetWorkingVoltage', { voltage: 2000 })).toStrictEqual(
			new BaseCommand('SetWorkingVoltage', 0x09, '32'),
		)
	})

	test('SetValveState encodes valve state', () => {
		expect(commandBuilder.build('SetValveState', { state: 1 })).toStrictEqual(
			new BaseCommand('SetValveState', 0x0c, '01'),
		)
	})

	test('SetOpenCloseTimeExtended encodes extended times', () => {
		expect(commandBuilder.build('SetOpenCloseTimeExtended', { openingTime: 300, closingTime: 400 })).toStrictEqual(
			new BaseCommand('SetOpenCloseTimeExtended', 0x0d, '012C', '0190'),
		)
	})

	test('SetSingleTimeValveState encodes state and time', () => {
		expect(commandBuilder.build('SetSingleTimeValveState', { state: 1, time: 60 })).toStrictEqual(
			new BaseCommand('SetSingleTimeValveState', 0x14, '01', '003C'),
		)
	})

	test('SetDeviceFloodSensor encodes enable bit', () => {
		expect(commandBuilder.build('SetDeviceFloodSensor', { enabled: true })).toStrictEqual(
			new BaseCommand('SetDeviceFloodSensor', 0x0a, '1'),
		)
	})

	test('SetJoinRetryPeriod scales minutes before encoding', () => {
		expect(commandBuilder.build('SetJoinRetryPeriod', { period: 10 })).toStrictEqual(
			new BaseCommand('SetJoinRetryPeriod', 0x15, '78'),
		)
	})

	test('SetUplinkType forwards uplink type', () => {
		expect(commandBuilder.build('SetUplinkType', { type: '01' })).toStrictEqual(
			new BaseCommand('SetUplinkType', 0x17, '01'),
		)
	})

	test('SetWatchDogParams encodes confirmed/unconfirmed uplinks', () => {
		expect(commandBuilder.build('SetWatchDogParams', { confirmedUplinks: 2, unconfirmedUplinks: 3 })).toStrictEqual(
			new BaseCommand('SetWatchDogParams', 0x19, '02', '03'),
		)
	})

	test('Invalid SetOpenCloseTime throws validation error', () => {
		expect(() => commandBuilder.build('SetOpenCloseTime', { openingTime: -1, closingTime: 1 })).toThrow(CustomError)
	})
})

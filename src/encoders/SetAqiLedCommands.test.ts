import { BaseCommand } from '@/encoders'
import { SetAqiLedCommands } from '@/encoders/SetAqiLedCommands'

describe('SetAqiLedCommands payload encoder', () => {
	test('SetAqiLed encodes behaviors and durations', () => {
		const command = new SetAqiLedCommands({
			redBehavior: 1,
			redDuration: 20,
			greenBehavior: 2,
			greenDuration: 30,
			blueBehavior: 3,
			blueDuration: 40,
			commandNumber: '05',
		})
		expect(command).toBeInstanceOf(BaseCommand)
		expect(command.toHex()).toBe('05224364')
	})
})

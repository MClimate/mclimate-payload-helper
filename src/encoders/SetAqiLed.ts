import { BaseCommand } from '@/encoders'
import { ZodError } from 'zod'
import { CustomError } from '@/utils'
import { AQICommandTypes, DeviceCommandSchemas } from '@/encoders/types'

export class SetAqiLed extends BaseCommand {
	constructor(params: AQICommandTypes.SetAqiLedParams) {
		try {
			DeviceCommandSchemas.AQICommandSchemas.setAqiLed.parse(params)
			const { redBehavior, redDuration, greenBehavior, greenDuration, blueBehavior, blueDuration } = params

			const red = parseInt(
				redBehavior.toString(2).padStart(3, '0') +
					Math.floor(redDuration / 10)
						.toString(2)
						.padStart(5, '0'),
				2,
			).toString(16)

			const green = parseInt(
				greenBehavior.toString(2).padStart(3, '0') +
					Math.floor(greenDuration / 10)
						.toString(2)
						.padStart(5, '0'),
				2,
			).toString(16)

			const blue = parseInt(
				blueBehavior.toString(2).padStart(3, '0') +
					Math.floor(blueDuration / 10)
						.toString(2)
						.padStart(5, '0'),
				2,
			).toString(16)

			super('SetAqiLed', 0x05, red, green, blue)
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetAqiLed execution',
					command: 'SetAqiLed',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetAqiLed execution',
					command: 'SetAqiLed',
					originalError: e as Error,
				})
			}
		}
	}
}

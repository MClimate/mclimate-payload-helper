import { BaseCommand, GeneralCommands } from '@/encoders'
import { ZodError } from 'zod'
import { CustomError, decToHex } from '@/utils'
import { OpenCloseSensorCommandTypes, DeviceCommandSchemas } from '@/encoders/types'

export class OpenCloseSensorCommands extends GeneralCommands {
	static setNotificationBlindTime(params: OpenCloseSensorCommandTypes.SetNotificationBlindTimeParams) {
		try {
			DeviceCommandSchemas.OpenCloseSensorCommandSchemas.setNotificationBlindTime.parse(params)
			const { time } = params
			return new BaseCommand('SetNotificationBlindTime', 0x1e, decToHex(time))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetNotificationBlindTime execution',
					command: 'SetNotificationBlindTime',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetNotificationBlindTime execution',
					command: 'SetNotificationBlindTime',
					originalError: e as Error,
				})
			}
		}
	}

	static getNotificationBlindTime() {
		return new BaseCommand('GetNotificationBlindTime', 0x1f)
	}
}

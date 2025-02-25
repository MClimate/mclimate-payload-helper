import { BaseCommand, GeneralCommands } from '@/encoders'
import { ZodError } from 'zod'
import { CustomError, decToHex } from '@/utils'
import { DeviceCommandSchemas, ButtonCommandTypes } from '@/encoders/types'

export class ButtonCommands extends GeneralCommands {
	static setSendEventLater(params: ButtonCommandTypes.SetSendEventLaterParams) {
		try {
			DeviceCommandSchemas.ButtonCommandSchemas.setSendEventLater.parse(params)
			const { value } = params
			return new BaseCommand('SetSendEventLater', 0x1e, decToHex(value))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetSendEventLater execution',
					command: 'SetSendEventLater',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetSendEventLater execution',
					command: 'SetSendEventLater',
					originalError: e as Error,
				})
			}
		}
	}

	static getSendEventLater() {
		return new BaseCommand('GetSendEventLater', 0x1f)
	}
	static clearPressEventCounter(params: ButtonCommandTypes.ClearPressEventCounter) {
		try {
			DeviceCommandSchemas.ButtonCommandSchemas.clearPressEventCounter.parse(params)
			const { value } = params
			return new BaseCommand('ClearPressEventCounter', 0x20, decToHex(value))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during ClearPressEventCounter execution',
					command: 'ClearPressEventCounter',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during ClearPressEventCounter execution',
					command: 'ClearPressEventCounter',
					originalError: e as Error,
				})
			}
		}
	}
	static restartDevice() {
		return new BaseCommand('RestartDevice', 0xa5)
	}
	static getSinglePressEventCounter() {
		return new BaseCommand('GetSinglePressEventCounter', 0xb1)
	}
	static getDoublePressEventCounter() {
		return new BaseCommand('GetDoublePressEventCounter', 0xb2)
	}
	static getTriplePressEventCounter() {
		return new BaseCommand('GetTriplePressEventCounter', 0xb3)
	}
}

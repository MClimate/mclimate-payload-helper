import { BaseCommand } from '@/encoders'
import { ZodError } from 'zod'
import { CustomError, decToHex } from '@/utils'
import { ChildLockCommandTypes, DeviceCommandSchemas } from '@/encoders/types'

export class ChildLockCommands {
	static setChildLock(params: ChildLockCommandTypes.SetChildLockParams) {
		try {
			DeviceCommandSchemas.ChildLockCommandSchemas.setChildLock.parse(params)
			const enabledValue = params.enabled ? 1 : 0
			return new BaseCommand('SetChildLock', 0x07, decToHex(enabledValue))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetChildLock execution',
					command: 'SetChildLock',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetChildLock execution',
					command: 'SetChildLock',
					originalError: e as Error,
				})
			}
		}
	}

	static getChildLock() {
		return new BaseCommand('GetChildLock', 0x14)
	}
}

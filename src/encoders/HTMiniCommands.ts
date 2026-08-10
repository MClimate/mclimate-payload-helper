import { GeneralCommands } from '@/encoders'
import { applyMixins, delMethods } from '@/utils'
import { HTMiniCommandTypes, DeviceCommandSchemas } from '@/encoders/types'
import { BaseCommand } from '@/encoders'
import { ZodError } from 'zod'
import { CustomError } from '@/utils'
import { decToHex } from '@/utils'

export class HTMiniCommands extends GeneralCommands {
	static setLedBrightness(params: HTMiniCommandTypes.SetLedBrightnessParams) {
		try {
			DeviceCommandSchemas.HTMiniCommandSchemas.setLedBrightness.parse(params)
			const { value } = params
			return new BaseCommand('SetLedBrightness', 0x21, decToHex(value))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetLedBrightness execution',
					command: 'SetLedBrightness',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetLedBrightness execution',
					command: 'SetLedBrightness',
					originalError: e as Error,
				})
			}
		}
	}

	static getLedBrightness() {
		return new BaseCommand('GetLedBrightness', 0x22)
	}

	static restartDevice() {
		return new BaseCommand('RestartDevice', 0xa5)
	}
}

applyMixins(HTMiniCommands, [GeneralCommands])

delMethods(HTMiniCommands, [])

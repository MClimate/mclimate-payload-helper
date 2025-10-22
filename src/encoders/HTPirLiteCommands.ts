import { GeneralCommands, PIRCommands } from '@/encoders'
import { applyMixins, delMethods } from '@/utils'
import { HTPirLiteCommandTypes, DeviceCommandSchemas } from '@/encoders/types'
import { BaseCommand } from '@/encoders'
import { ZodError } from 'zod'
import { CustomError } from '@/utils'
import { decToHex } from '@/utils'

export class HTPirLiteCommands extends GeneralCommands {
	static setUplinkSendingOnButtonPress(params: HTPirLiteCommandTypes.SetUplinkSendingOnButtonPressParams) {
		try {
			DeviceCommandSchemas.HTPirLiteCommandSchemas.setUplinkSendingOnButtonPress.parse(params)
			const { value } = params
			return new BaseCommand('SetUplinkSendingOnButtonPress', 0x2e, decToHex(value))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetUplinkSendingOnButtonPress execution',
					command: 'SetUplinkSendingOnButtonPress',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetUplinkSendingOnButtonPress execution',
					command: 'SetUplinkSendingOnButtonPress',
					originalError: e as Error,
				})
			}
		}
	}

	static getUplinkSendingOnButtonPress() {
		return new BaseCommand('GetUplinkSendingOnButtonPress', 0x2f)
	}

	static restartDevice() {
		return new BaseCommand('RestartDevice', 0xa5)
	}
}

applyMixins(HTPirLiteCommands, [GeneralCommands, PIRCommands])

delMethods(HTPirLiteCommands, ['setPIRInitPeriod', 'getPIRInitPeriod'])

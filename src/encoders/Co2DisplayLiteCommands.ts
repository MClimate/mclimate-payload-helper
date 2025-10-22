import { BaseCommand, ChildLockCommands, CO2SensorCommands, DisplayCommands, GeneralCommands } from '@/encoders'
import { CO2DisplayLiteCommandTypes, DeviceCommandSchemas } from '@/encoders/types'
import { applyMixins, CustomError, decToHex, delMethods } from '@/utils'
import { ZodError } from 'zod'

export class CO2DisplayLiteCommands extends GeneralCommands {
	static setCo2ImagesVisibility(params: CO2DisplayLiteCommandTypes.SetCo2ImagesVisibilityParams) {
		try {
			DeviceCommandSchemas.CO2DisplayLiteCommandSchemas.setCo2ImagesVisibility.parse(params)
			const { digital_value, emoji } = params
			const digitalValue = digital_value ? 1 : 0
			const emojiValue = emoji ? 1 : 0
			const bin = '00000000'.split('')
			bin[7] = emojiValue.toString()
			bin[6] = digitalValue.toString()
			const binValue = parseInt(bin.join(''), 2)
			return new BaseCommand('SetCo2ImagesVisibility', 0x82, decToHex(binValue))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetCo2ImagesVisibility execution',
					command: 'SetCo2ImagesVisibility',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetCo2ImagesVisibility execution',
					command: 'SetCo2ImagesVisibility',
					originalError: e as Error,
				})
			}
		}
	}

	static getCo2ImagesVisibility() {
		return new BaseCommand('GetCo2ImagesVisibility', 0x83)
	}

	static setUplinkSendingOnButtonPress(params: CO2DisplayLiteCommandTypes.SetUplinkSendingOnButtonPress) {
		try {
			DeviceCommandSchemas.CO2DisplayLiteCommandSchemas.setUplinkSendingOnButtonPress.parse(params)
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

applyMixins(CO2DisplayLiteCommands, [CO2SensorCommands, DisplayCommands, ChildLockCommands])

delMethods(CO2DisplayLiteCommands, [
	'setNotifyPeriod',
	'getNotifyPeriod',
	'setBuzzerNotification',
	'getBuzzerNotification',
	'setCo2Led',
	'getCo2Led',
])

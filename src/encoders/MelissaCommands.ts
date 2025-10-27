import { GeneralCommands, BaseCommand } from '@/encoders'
import { applyMixins, decToHex, CustomError } from '@/utils'
import { DeviceCommandSchemas, MelissaCommandTypes } from './types'
import { ZodError } from 'zod'

export class MelissaCommands extends GeneralCommands {
	static setIrCodeRecording(params: MelissaCommandTypes.SetIrCodeRecordingParams) {
		try {
			DeviceCommandSchemas.MelissaCommandSchemas.setIrCodeRecording.parse(params)
			const { time, position } = params
			return new BaseCommand('SetIrCodeRecording', 0x09, decToHex(time), decToHex(position))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetIrCodeRecording execution',
					command: 'SetIrCodeRecording',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetIrCodeRecording execution',
					command: 'SetIrCodeRecording',
					originalError: e as Error,
				})
			}
		}
	}
}
applyMixins(MelissaCommands, [])

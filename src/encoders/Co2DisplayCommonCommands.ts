import { BaseCommand } from '@/encoders'
import { ZodError } from 'zod'
import { CustomError, decToHex } from '@/utils'
import { Co2CommonDisplayCommandTypes, DeviceCommandSchemas } from '@/encoders/types'

export class Co2DisplayCommonCommands {
	static setCo2ImagesVisibility(params: Co2CommonDisplayCommandTypes.SetCo2ImagesVisibilityParams) {
		try {
			DeviceCommandSchemas.Co2CommonDisplayCommandSchemas.setCo2ImagesVisibility.parse(params)
			const { chart, digital_value, emoji } = params
			const chartValue = chart ? 1 : 0
			const digitalValue = digital_value ? 1 : 0
			const emojiValue = emoji ? 1 : 0

			let bin = '00000000'.split('')
			bin[7] = emojiValue.toString()
			bin[6] = digitalValue.toString()
			bin[5] = chartValue.toString()
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
}

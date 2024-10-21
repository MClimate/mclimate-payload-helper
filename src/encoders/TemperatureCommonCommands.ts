import { BaseCommand } from '@/encoders'
import { ZodError } from 'zod'
import { CustomError, decToHex } from '@/utils'
import { TemperatureCommandTypes, DeviceCommandSchemas } from '@/encoders/types'

export class TemperatureCommonCommands {
	static setTemperatureRange(params: TemperatureCommandTypes.SetTemperatureRangeParams) {
		try {
			DeviceCommandSchemas.TemperatureCommandSchemas.setTemperatureRange.parse(params)
			const { min, max } = params
			return new BaseCommand('SetTemperatureRange', 0x08, decToHex(min), decToHex(max))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetTemperatureRange execution',
					command: 'SetTemperatureRange',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetTemperatureRange execution',
					command: 'SetTemperatureRange',
					originalError: e as Error,
				})
			}
		}
	}

	static getTemperatureRange() {
		return new BaseCommand('GetTemperatureRange', 0x15)
	}
}

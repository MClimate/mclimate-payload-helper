import { ZodError } from 'zod'
import {
	BaseCommand,
	ChildLockCommands,
	CO2SensorCommands,
	DisplayCommands,
	GeneralCommands,
	PIRCommands,
} from '@/encoders'
import { applyMixins, CustomError, decToHex, delMethods } from '@/utils'
import { DeviceCommandSchemas, CO2DisplayCommandTypes } from '@/encoders/types'

export class CO2DisplayCommands extends GeneralCommands {
	static setCo2MeasurementBlindTime(params: CO2DisplayCommandTypes.SetCo2MeasurementBlindTimeParams) {
		try {
			DeviceCommandSchemas.CO2DisplayCommandSchemas.setCo2MeasurementBlindTime.parse(params)
			const { time } = params
			return new BaseCommand('SetCo2MeasurementBlindTime', 0x81, decToHex(time))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetCo2MeasurementBlindTime execution',
					command: 'SetCo2MeasurementBlindTime',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetCo2MeasurementBlindTime execution',
					command: 'SetCo2MeasurementBlindTime',
					originalError: e as Error,
				})
			}
		}
	}

	static getCo2MeasurementBlindTime() {
		return new BaseCommand('GetCo2MeasurementBlindTime', 0x80)
	}

	static setCo2ImagesVisibility(params: CO2DisplayCommandTypes.SetCo2ImagesVisibilityParams) {
		try {
			DeviceCommandSchemas.CO2DisplayCommandSchemas.setCo2ImagesVisibility.parse(params)
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

applyMixins(CO2DisplayCommands, [CO2SensorCommands, DisplayCommands, PIRCommands, ChildLockCommands])

delMethods(CO2DisplayCommands, [
	'setNotifyPeriod',
	'getNotifyPeriod',
	'setBuzzerNotification',
	'getBuzzerNotification',
	'setCo2Led',
	'getCo2Led',
])

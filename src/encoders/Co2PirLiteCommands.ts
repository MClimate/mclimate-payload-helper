import { GeneralCommands, CO2SensorCommands } from '@/encoders'
import { applyMixins, delMethods } from '@/utils'
import { Co2PirLiteCommandTypes, DeviceCommandSchemas } from '@/encoders/types'
import { BaseCommand } from '@/encoders'
import { ZodError } from 'zod'
import { CustomError } from '@/utils'
import { decToHex } from '@/utils'

export class Co2PirLiteCommands extends GeneralCommands {
	static setPIRSensorState(params: Co2PirLiteCommandTypes.SetPIRSensorStateParams) {
		try {
			DeviceCommandSchemas.Co2PirLiteCommandSchemas.setPIRSensorState.parse(params)
			const { state } = params
			return new BaseCommand('SetPIRSensorState', 0x36, decToHex(state))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetPIRSensorState execution',
					command: 'SetPIRSensorState',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetPIRSensorState execution',
					command: 'SetPIRSensorState',
					originalError: e as Error,
				})
			}
		}
	}
	static getPIRSensorState() {
		return new BaseCommand('GetPIRSensorState', 0x37)
	}
	static setPIRSensorSensitivity(params: Co2PirLiteCommandTypes.SetPIRSensorSensitivityParams) {
		try {
			DeviceCommandSchemas.Co2PirLiteCommandSchemas.setPIRSensorSensitivity.parse(params)
			const { sensitivity } = params
			return new BaseCommand('SetPIRSensorSensitivity', 0x3e, decToHex(sensitivity))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetPIRSensorSensitivity execution',
					command: 'SetPIRSensorSensitivity',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetPIRSensorSensitivity execution',
					command: 'SetPIRSensorSensitivity',
					originalError: e as Error,
				})
			}
		}
	}

	static getPIRSensorSensitivity() {
		return new BaseCommand('GetPIRSensorSensitivity', 0x3f)
	}

	static setOccupancyTimeout(params: Co2PirLiteCommandTypes.SetOccupancyTimeoutParams) {
		try {
			DeviceCommandSchemas.Co2PirLiteCommandSchemas.setOccupancyTimeout.parse(params)
			const { timeout } = params
			// Convert timeout to two bytes (high byte and low byte)
			const highByte = (timeout >> 8) & 0xff
			const lowByte = timeout & 0xff

			return new BaseCommand('SetOccupancyTimeout', 0x38, decToHex(highByte) + decToHex(lowByte))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetOccupancyTimeout execution',
					command: 'SetOccupancyTimeout',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetOccupancyTimeout execution',
					command: 'SetOccupancyTimeout',
					originalError: e as Error,
				})
			}
		}
	}

	static getOccupancyTimeout() {
		return new BaseCommand('GetOccupancyTimeout', 0x39)
	}

	static restartDevice() {
		return new BaseCommand('RestartDevice', 0xa5)
	}
}

applyMixins(Co2PirLiteCommands, [GeneralCommands, CO2SensorCommands])

delMethods(Co2PirLiteCommands, [
	'setNotifyPeriod',
	'getNotifyPeriod',
	'setBuzzerNotification',
	'getBuzzerNotification',
	'setCo2Led',
	'getCo2Led',
])

import { GeneralCommands, PIRCommands } from '@/encoders'
import { applyMixins, delMethods } from '@/utils'
import { HTPirLiteCommandTypes, DeviceCommandSchemas, PIRCommandTypes } from '@/encoders/types'
import { BaseCommand } from '@/encoders'
import { ZodError } from 'zod'
import { CustomError } from '@/utils'
import { decToHex } from '@/utils'

export class HTPirLiteCommands extends GeneralCommands {
		static setPIRSensorState(params: HTPirLiteCommandTypes.SetPIRSensorStateParams) {
		try {
			DeviceCommandSchemas.HTPirLiteCommandSchemas.setPIRSensorState.parse(params)
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
	static setPIRSensorSensitivity(params: HTPirLiteCommandTypes.SetPIRSensorSensitivityParams) {
		try {
			DeviceCommandSchemas.HTPirLiteCommandSchemas.setPIRSensorSensitivity.parse(params)
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

	static setOccupancyTimeout(params: HTPirLiteCommandTypes.SetOccupancyTimeoutParams) {
		try {
			DeviceCommandSchemas.HTPirLiteCommandSchemas.setOccupancyTimeout.parse(params)
			const { timeout } = params
			// Convert timeout to two bytes (high byte and low byte)
			const highByte = (timeout >> 8) & 0xFF
			const lowByte = timeout & 0xFF
			
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

applyMixins(HTPirLiteCommands, [GeneralCommands])

delMethods(HTPirLiteCommands, [])

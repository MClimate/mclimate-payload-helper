import { GeneralCommands } from '@/encoders'
import { applyMixins, delMethods } from '@/utils'
import { PirOnlyCommandTypes, DeviceCommandSchemas } from '@/encoders/types'
import { BaseCommand } from '@/encoders'
import { ZodError } from 'zod'
import { CustomError } from '@/utils'
import { decToHex } from '@/utils'

export class PirOnlyCommands extends GeneralCommands {
	static setLightSensorState(params: PirOnlyCommandTypes.SetLightSensorStateParams) {
		try {
			DeviceCommandSchemas.PirOnlyCommandSchemas.setLightSensorState.parse(params)
			const { state } = params
			return new BaseCommand('SetLightSensorState', 0x1e, decToHex(state))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetLightSensorState execution',
					command: 'SetLightSensorState',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetLightSensorState execution',
					command: 'SetLightSensorState',
					originalError: e as Error,
				})
			}
		}
	}

	static getLightSensorState() {
		return new BaseCommand('GetLightSensorState', 0x1f)
	}

	static setLedBrightness(params: PirOnlyCommandTypes.SetLedBrightnessParams) {
		try {
			DeviceCommandSchemas.PirOnlyCommandSchemas.setLedBrightness.parse(params)
			const { red, green, blue } = params
			return new BaseCommand('SetLedBrightness', 0x21, decToHex(red), decToHex(green), decToHex(blue))
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

	static setPIRSensorState(params: PirOnlyCommandTypes.SetPIRSensorStateParams) {
		try {
			DeviceCommandSchemas.PirOnlyCommandSchemas.setPIRSensorState.parse(params)
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

	static setOccupancyTimeout(params: PirOnlyCommandTypes.SetOccupancyTimeoutParams) {
		try {
			DeviceCommandSchemas.PirOnlyCommandSchemas.setOccupancyTimeout.parse(params)
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

	static setPIRDemoMode(params: PirOnlyCommandTypes.SetPIRDemoModeParams) {
		try {
			DeviceCommandSchemas.PirOnlyCommandSchemas.setPIRDemoMode.parse(params)
			const { state } = params
			return new BaseCommand('SetPIRDemoMode', 0x3a, decToHex(state))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetPIRDemoMode execution',
					command: 'SetPIRDemoMode',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetPIRDemoMode execution',
					command: 'SetPIRDemoMode',
					originalError: e as Error,
				})
			}
		}
	}

	static getPIRDemoMode() {
		return new BaseCommand('GetPIRDemoMode', 0x3b)
	}

	static restartDevice() {
		return new BaseCommand('RestartDevice', 0xa5)
	}
}

applyMixins(PirOnlyCommands, [GeneralCommands])

delMethods(PirOnlyCommands, [])

import { GeneralCommands, BaseCommand } from '@/encoders'
import { PirMiniCommands } from '@/encoders/PirMiniCommands'
import { applyMixins, delMethods, decToHex, dec2hex, CustomError } from '@/utils'
import { DeviceCommandSchemas, MelissaCommandTypes } from './types'
import { ZodError } from 'zod'

/**
 * Melissa LoRaWAN commands.
 *
 * IR workflow commands (0x05 - 0x0C) are Melissa specific. The PIR / light-sensor commands
 * (0x1E/0x1F, 0x36 - 0x44) and RestartDevice (0xA5) share the PIR Mini command codes and are
 * mixed in from PirMiniCommands; LED brightness (0x21/0x22) is not supported by Melissa and is
 * removed. PIR sensitivity uses Melissa specific codes (0x45/0x46).
 */
export class MelissaCommands extends GeneralCommands {
	/** 0x05 - preload a chunk of LZ77-compressed IR code at the given device buffer offset. */
	static sendIrCodeData(params: MelissaCommandTypes.SendIrCodeDataParams) {
		try {
			DeviceCommandSchemas.MelissaCommandSchemas.sendIrCodeData.parse(params)
			const { offset, data } = params
			// length byte counts everything after it: 2 offset bytes + the IR data bytes
			const length = 2 + data.length / 2
			return new BaseCommand('SendIrCodeData', 0x05, decToHex(length), dec2hex(offset), data.toUpperCase())
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SendIrCodeData execution',
					command: 'SendIrCodeData',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SendIrCodeData execution',
					command: 'SendIrCodeData',
					originalError: e as Error,
				})
			}
		}
	}

	/** 0x06 - ask where the next IR code chunk shall be written. */
	static getIrCodeBufferOffset() {
		return new BaseCommand('GetIrCodeBufferOffset', 0x06)
	}

	/** 0x07 - forget any preloaded or recorded IR code data. */
	static resetIrCodeBufferOffset() {
		return new BaseCommand('ResetIrCodeBufferOffset', 0x07)
	}

	/** 0x08 - emit and/or store the preloaded IR code. mode: 0 emit, 1 emit + store, 2 store only. */
	static emitPreloadedIrCode(params: MelissaCommandTypes.EmitPreloadedIrCodeParams) {
		try {
			const { mode, position } = DeviceCommandSchemas.MelissaCommandSchemas.emitPreloadedIrCode.parse(params)
			return new BaseCommand('EmitPreloadedIrCode', 0x08, decToHex(mode), decToHex(position))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during EmitPreloadedIrCode execution',
					command: 'EmitPreloadedIrCode',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during EmitPreloadedIrCode execution',
					command: 'EmitPreloadedIrCode',
					originalError: e as Error,
				})
			}
		}
	}

	/** 0x09 - listen for an IR code for `time` minutes (0 = 10 min) and store it at `position` (0 = do not store). */
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

	/** 0x0A - ask for recorded IR code size and how many bytes were already sent to the server. */
	static getRecordedIrCodeStatus() {
		return new BaseCommand('GetRecordedIrCodeStatus', 0x0a)
	}

	/** 0x0B - read recorded IR code data starting from the given buffer offset. */
	static getRecordedIrCodeData(params: MelissaCommandTypes.GetRecordedIrCodeDataParams) {
		try {
			DeviceCommandSchemas.MelissaCommandSchemas.getRecordedIrCodeData.parse(params)
			const { offset } = params
			return new BaseCommand('GetRecordedIrCodeData', 0x0b, dec2hex(offset))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during GetRecordedIrCodeData execution',
					command: 'GetRecordedIrCodeData',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during GetRecordedIrCodeData execution',
					command: 'GetRecordedIrCodeData',
					originalError: e as Error,
				})
			}
		}
	}

	/** 0x0C - load the IR code stored at `position`. mode: 0 emit it and preload for reading, 1 preload for reading only. */
	static loadStoredIrCode(params: MelissaCommandTypes.LoadStoredIrCodeParams) {
		try {
			DeviceCommandSchemas.MelissaCommandSchemas.loadStoredIrCode.parse(params)
			const { mode, position } = params
			return new BaseCommand('LoadStoredIrCode', 0x0c, decToHex(mode), decToHex(position))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during LoadStoredIrCode execution',
					command: 'LoadStoredIrCode',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during LoadStoredIrCode execution',
					command: 'LoadStoredIrCode',
					originalError: e as Error,
				})
			}
		}
	}

	/** 0x45 - PIR sensitivity (same semantics as Wireless Thermostat 0x3E, Melissa default is 30). */
	static setPIRSensorSensitivity(params: MelissaCommandTypes.SetPIRSensorSensitivityParams) {
		try {
			DeviceCommandSchemas.MelissaCommandSchemas.setPIRSensorSensitivity.parse(params)
			const { sensitivity } = params
			return new BaseCommand('SetPIRSensorSensitivity', 0x45, decToHex(sensitivity))
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

	/** 0x46 - read PIR sensitivity. */
	static getPIRSensorSensitivity() {
		return new BaseCommand('GetPIRSensorSensitivity', 0x46)
	}
}

// PIR / light sensor commands and RestartDevice share the PIR Mini command codes
applyMixins(MelissaCommands, [PirMiniCommands])

// Melissa has no LED brightness commands (0x21 / 0x22)
delMethods(MelissaCommands, ['setLedBrightness', 'getLedBrightness'])

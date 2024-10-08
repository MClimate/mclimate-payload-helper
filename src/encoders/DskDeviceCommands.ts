import { BaseCommand } from '@/encoders'
import { ZodError } from 'zod'
import { CustomError, dec2hex, decToHex } from '@/utils'
import { DeviceCommandSchemas, DSKDeviceCommandTypes } from '@/encoders/types'

export class DskDeviceCommands {
	static setVrvStatus(params: DSKDeviceCommandTypes.SetVrvStatusParams) {
		try {
			DeviceCommandSchemas.DSKDeviceCommandSchemas.setVrvStatus.parse(params)
			const { status } = params
			return new BaseCommand('SetVrvStatus', 0x1e, decToHex(status))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetVrvStatus execution',
					command: 'SetVrvStatus',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetVrvStatus execution',
					command: 'SetVrvStatus',
					originalError: e as Error,
				})
			}
		}
	}

	static getVrvStatus() {
		return new BaseCommand('GetVrvStatus', 0x1f)
	}

	static setVrvOnTime(params: DSKDeviceCommandTypes.SetVrvOnTimeParams) {
		try {
			DeviceCommandSchemas.DSKDeviceCommandSchemas.setVrvOnTime.parse(params)
			const { time } = params
			return new BaseCommand('SetVrvOnTime', 0x20, dec2hex(time))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetVrvOnTime execution',
					command: 'SetVrvOnTime',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetVrvOnTime execution',
					command: 'SetVrvOnTime',
					originalError: e as Error,
				})
			}
		}
	}

	static getVrvOnTime() {
		return new BaseCommand('GetVrvOnTime', 0x22)
	}

	static setVrvOffTime(params: DSKDeviceCommandTypes.SetVrvOffTimeParams) {
		try {
			DeviceCommandSchemas.DSKDeviceCommandSchemas.setVrvOffTime.parse(params)
			const { time } = params
			return new BaseCommand('SetVrvOffTime', 0x21, dec2hex(time))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetVrvOffTime execution',
					command: 'SetVrvOffTime',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetVrvOffTime execution',
					command: 'SetVrvOffTime',
					originalError: e as Error,
				})
			}
		}
	}

	static getVrvOffTime() {
		return new BaseCommand('GetVrvOffTime', 0x23)
	}
}

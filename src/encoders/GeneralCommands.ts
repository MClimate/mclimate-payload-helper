import { BaseCommand } from '@/encoders'
import { ZodError } from 'zod'
import { CustomError, decToHex } from '@/utils'
import { GeneralCommandTypes, DeviceCommandSchemas } from '@/encoders/types'

export class GeneralCommands {
	static sendCustomHexCommand(params: GeneralCommandTypes.CustomHexCommandParams) {
		try {
			DeviceCommandSchemas.GeneralCommandSchemas.customHexCommand.parse(params)
			return {
				commandName: 'SendCustomHexCommand',
				cmdId: params.command,
				params: [],
			}
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SendCustomHexCommand execution',
					command: 'SendCustomHexCommand',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SendCustomHexCommand execution',
					command: 'SendCustomHexCommand',
					originalError: e as Error,
				})
			}
		}
	}

	static setKeepAlive(params: GeneralCommandTypes.SetKeepAliveParams) {
		try {
			DeviceCommandSchemas.GeneralCommandSchemas.setKeepAlive.parse(params)
			const { time } = params
			return new BaseCommand('SetKeepAlive', 0x02, decToHex(time))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetKeepAlive execution',
					command: 'SetKeepAlive',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetKeepAlive execution',
					command: 'SetKeepAlive',
					originalError: e as Error,
				})
			}
		}
	}

	static getKeepAlive() {
		return new BaseCommand('GetKeepAlive', 0x12)
	}

	static getDeviceVersion() {
		return new BaseCommand('GetDeviceVersion', 0x04)
	}

	static setJoinRetryPeriod(params: GeneralCommandTypes.SetJoinRetryPeriodParams) {
		try {
			DeviceCommandSchemas.GeneralCommandSchemas.setJoinRetryPeriod.parse(params)
			const { period } = params
			const periodToPass = (period * 60) / 5
			return new BaseCommand('SetJoinRetryPeriod', 0x10, decToHex(periodToPass))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetJoinRetryPeriod execution',
					command: 'SetJoinRetryPeriod',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetJoinRetryPeriod execution',
					command: 'SetJoinRetryPeriod',
					originalError: e as Error,
				})
			}
		}
	}

	static getJoinRetryPeriod() {
		return new BaseCommand('GetJoinRetryPeriod', 0x19)
	}

	static setUplinkType(params: GeneralCommandTypes.SetUplinkTypeParams) {
		try {
			DeviceCommandSchemas.GeneralCommandSchemas.setUplinkType.parse(params)
			const { type } = params
			return new BaseCommand('SetUplinkType', 0x11, type.toString())
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetUplinkType execution',
					command: 'SetUplinkType',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetUplinkType execution',
					command: 'SetUplinkType',
					originalError: e as Error,
				})
			}
		}
	}

	static getUplinkType() {
		return new BaseCommand('GetUplinkType', 0x1b)
	}

	static setWatchDogParams(params: GeneralCommandTypes.SetWatchDogParams) {
		try {
			DeviceCommandSchemas.GeneralCommandSchemas.setWatchDogParams.parse(params)
			const { confirmedUplinks, unconfirmedUplinks } = params
			return new BaseCommand('SetWatchDogParams', 0x1c, decToHex(confirmedUplinks), decToHex(unconfirmedUplinks))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetWatchDogParams execution',
					command: 'SetWatchDogParams',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetWatchDogParams execution',
					command: 'SetWatchDogParams',
					originalError: e as Error,
				})
			}
		}
	}

	static getWatchDogParams() {
		return new BaseCommand('GetWatchDogParams', 0x1d)
	}
}

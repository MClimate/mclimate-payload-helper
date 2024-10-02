import { BaseCommand } from '@/encoders'
import { ZodError } from 'zod'
import { CustomError, dec2hex } from '@/utils'
import { TFloodCommandTypes, DeviceCommandSchemas } from '@/encoders/types'

export class TFloodCommands {
	static getTemperature() {
		return new BaseCommand('GetTemperature', 0x01)
	}

	static setFloodAlarmTime(params: TFloodCommandTypes.SetFloodAlarmTimeParams) {
		try {
			DeviceCommandSchemas.TFloodCommandSchemas.setFloodAlarmTime.parse(params)
			const { time } = params
			return new BaseCommand('SetFloodAlarmTime', 0x04, time.toString(16))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetFloodAlarmTime execution',
					command: 'SetFloodAlarmTime',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetFloodAlarmTime execution',
					command: 'SetFloodAlarmTime',
					originalError: e as Error,
				})
			}
		}
	}

	static setKeepAlive(params: TFloodCommandTypes.SetKeepAliveParams) {
		try {
			DeviceCommandSchemas.TFloodCommandSchemas.setKeepAlive.parse(params)
			const { time } = params
			return new BaseCommand('SetKeepAlive', 0x05, dec2hex(time))
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

	static getFloodAlarmTime() {
		return new BaseCommand('GetFloodAlarmTime', 0x06)
	}

	static getDeviceVersion() {
		return new BaseCommand('GetDeviceVersion', 0x07)
	}

	static setFloodEventSendTime(params: TFloodCommandTypes.SetFloodEventSendTimeParams) {
		try {
			DeviceCommandSchemas.TFloodCommandSchemas.setFloodEventSendTime.parse(params)
			const { time } = params
			return new BaseCommand('SetFloodEventSendTime', 0x08, time.toString(16))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetFloodEventSendTime execution',
					command: 'SetFloodEventSendTime',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetFloodEventSendTime execution',
					command: 'SetFloodEventSendTime',
					originalError: e as Error,
				})
			}
		}
	}

	static getFloodEventSendTime() {
		return new BaseCommand('GetFloodEventSendTime', 0x09)
	}

	static setFloodEventUplinkType(params: TFloodCommandTypes.SetFloodEventUplinkTypeParams) {
		try {
			DeviceCommandSchemas.TFloodCommandSchemas.setFloodEventUplinkType.parse(params)
			const { type } = params
			return new BaseCommand('SetFloodEventUplinkType', 0x13, type)
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetFloodEventUplinkType execution',
					command: 'SetFloodEventUplinkType',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetFloodEventUplinkType execution',
					command: 'SetFloodEventUplinkType',
					originalError: e as Error,
				})
			}
		}
	}

	static getFloodEventUplinkType() {
		return new BaseCommand('GetFloodEventUplinkType', 0x14)
	}
}

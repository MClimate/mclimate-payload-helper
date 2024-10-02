import { BaseCommand } from '@/encoders'
import { decToHex, dec2hex, CustomError } from '@/utils'
import { ZodError } from 'zod'
import { Relay16CommandTypes, DeviceCommandSchemas } from '@/encoders/types'

export class Relay16Commands {
	static setOverheatingThreshold(params: Relay16CommandTypes.SetOverheatingThresholdParams) {
		try {
			DeviceCommandSchemas.Relay16CommandSchemas.setOverheatingThreshold.parse(params)
			const { temperature } = params
			return new BaseCommand('SetOverheatingThreshold', 0x1e, decToHex(temperature))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetOverheatingThreshold execution',
					command: 'SetOverheatingThreshold',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetOverheatingThreshold execution',
					command: 'SetOverheatingThreshold',
					originalError: e as Error,
				})
			}
		}
	}

	static getOverheatingThreshold() {
		return new BaseCommand('GetOverheatingThreshold', 0x1f)
	}

	static setOvervoltageThreshold(params: Relay16CommandTypes.SetOvervoltageThresholdParams) {
		try {
			DeviceCommandSchemas.Relay16CommandSchemas.setOvervoltageThreshold.parse(params)
			const { voltage } = params
			return new BaseCommand('SetOvervoltageThreshold', 0x20, dec2hex(voltage))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetOvervoltageThreshold execution',
					command: 'SetOvervoltageThreshold',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetOvervoltageThreshold execution',
					command: 'SetOvervoltageThreshold',
					originalError: e as Error,
				})
			}
		}
	}

	static getOvervoltageThreshold() {
		return new BaseCommand('GetOvervoltageThreshold', 0x21)
	}

	static setOvercurrentThreshold(params: Relay16CommandTypes.SetOvercurrentThresholdParams) {
		try {
			DeviceCommandSchemas.Relay16CommandSchemas.setOvercurrentThreshold.parse(params)
			const { current } = params
			return new BaseCommand('SetOvercurrentThreshold', 0x22, decToHex(current))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetOvercurrentThreshold execution',
					command: 'SetOvercurrentThreshold',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetOvercurrentThreshold execution',
					command: 'SetOvercurrentThreshold',
					originalError: e as Error,
				})
			}
		}
	}

	static getOvercurrentThreshold() {
		return new BaseCommand('GetOvercurrentThreshold', 0x23)
	}

	static setOverpowerThreshold(params: Relay16CommandTypes.SetOverpowerThresholdParams) {
		try {
			DeviceCommandSchemas.Relay16CommandSchemas.setOverpowerThreshold.parse(params)
			const { power } = params
			return new BaseCommand('SetOverpowerThreshold', 0x24, dec2hex(power))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetOverpowerThreshold execution',
					command: 'SetOverpowerThreshold',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetOverpowerThreshold execution',
					command: 'SetOverpowerThreshold',
					originalError: e as Error,
				})
			}
		}
	}

	static getOverpowerThreshold() {
		return new BaseCommand('GetOverpowerThreshold', 0x25)
	}

	static setRelayRecoveryState(params: Relay16CommandTypes.SetRelayRecoveryStateParams) {
		try {
			DeviceCommandSchemas.Relay16CommandSchemas.setRelayRecoveryState.parse(params)
			const { state } = params
			return new BaseCommand('SetRelayRecoveryState', 0x5e, decToHex(state))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetRelayRecoveryState execution',
					command: 'SetRelayRecoveryState',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetRelayRecoveryState execution',
					command: 'SetRelayRecoveryState',
					originalError: e as Error,
				})
			}
		}
	}

	static getRelayRecoveryState() {
		return new BaseCommand('GetRelayRecoveryState', 0x5f)
	}

	static setRelayState(params: Relay16CommandTypes.SetRelayStateParams) {
		try {
			DeviceCommandSchemas.Relay16CommandSchemas.setRelayState.parse(params)
			let { state } = params
			state = state ? 1 : 0
			return new BaseCommand('SetRelayState', 0xc1, decToHex(state))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetRelayState execution',
					command: 'SetRelayState',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetRelayState execution',
					command: 'SetRelayState',
					originalError: e as Error,
				})
			}
		}
	}

	static getRelayState() {
		return new BaseCommand('GetRelayState', 0xb1)
	}

	static getOverheatingEvents() {
		return new BaseCommand('GetOverheatingEvents', 0x60)
	}

	static getOvervoltageEvents() {
		return new BaseCommand('GetOvervoltageEvents', 0x61)
	}

	static getOvercurrentEvents() {
		return new BaseCommand('GetOvercurrentEvents', 0x62)
	}

	static getOverpowerEvents() {
		return new BaseCommand('GetOverpowerEvents', 0x63)
	}
}

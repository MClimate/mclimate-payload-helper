import { BaseCommand, GeneralCommands } from '@/encoders'
import { decToHex, dec2hex, CustomError } from '@/utils'
import { ZodError } from 'zod'
import { Relay16CommandTypes, DeviceCommandSchemas } from '@/encoders/types'

export class Relay16Commands extends GeneralCommands {
	static setOverheatingThresholds(params: Relay16CommandTypes.SetOverheatingThresholdsParams) {
		try {
			DeviceCommandSchemas.Relay16CommandSchemas.setOverheatingThresholds.parse(params)
			const { trigger, recovery } = params
			return new BaseCommand('SetOverheatingThresholds', 0x1e, decToHex(trigger), decToHex(recovery))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetOverheatingThresholds execution',
					command: 'SetOverheatingThresholds',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetOverheatingThresholds execution',
					command: 'SetOverheatingThresholds',
					originalError: e as Error,
				})
			}
		}
	}

	static getOverheatingThresholds() {
		return new BaseCommand('GetOverheatingThresholds', 0x1f)
	}

	static setOvervoltageThresholds(params: Relay16CommandTypes.SetOvervoltageThresholdsParams) {
		try {
			DeviceCommandSchemas.Relay16CommandSchemas.setOvervoltageThresholds.parse(params)
			const { trigger, recovery } = params
			return new BaseCommand('SetOvervoltageThresholds', 0x20, dec2hex(trigger), decToHex(recovery))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetOvervoltageThresholds execution',
					command: 'SetOvervoltageThresholds',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetOvervoltageThresholds execution',
					command: 'SetOvervoltageThresholds',
					originalError: e as Error,
				})
			}
		}
	}

	static getOvervoltageThresholds() {
		return new BaseCommand('GetOvervoltageThresholds', 0x21)
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

	static setAfterOverheatingProtectionRecovery(params: Relay16CommandTypes.SetAfterOverheatingProtectionRecoveryParams) {
		try {
			DeviceCommandSchemas.Relay16CommandSchemas.setAfterOverheatingProtectionRecovery.parse(params)
			const { state } = params
			return new BaseCommand('SetAfterOverheatingProtectionRecovery', 0x59, decToHex(state))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetAfterOverheatingProtectionRecovery execution',
					command: 'SetAfterOverheatingProtectionRecovery',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetAfterOverheatingProtectionRecovery execution',
					command: 'SetAfterOverheatingProtectionRecovery',
					originalError: e as Error,
				})
			}
		}
	}

	static getAfterOverheatingProtectionRecovery() {
		return new BaseCommand('GetAfterOverheatingProtectionRecovery', 0x5a)
	}

	static setLedIndicationMode(params: Relay16CommandTypes.SetLedIndicationModeParams) {
		try {
			DeviceCommandSchemas.Relay16CommandSchemas.setLedIndicationMode.parse(params)
			const { mode } = params
			return new BaseCommand('SetLedIndicationMode', 0x5b, decToHex(mode))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetLedIndicationMode execution',
					command: 'SetLedIndicationMode',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetLedIndicationMode execution',
					command: 'SetLedIndicationMode',
					originalError: e as Error,
				})
			}
		}
	}

	static getLedIndicationMode() {
		return new BaseCommand('GetLedIndicationMode', 0x5c)
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
			const convertedState = state ? 1 : 0
			return new BaseCommand('SetRelayState', 0xc1, decToHex(convertedState))
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

	static getOverheatingRecoveryTime() {
		return new BaseCommand('GetOverheatingRecoveryTime', 0x70)
	}

	static getOvervoltageRecoveryTime() {
		return new BaseCommand('GetOvervoltageRecoveryTime', 0x71)
	}

	static getOvercurrentRecoveryTemp() {
		return new BaseCommand('GetOvercurrentRecoveryTemp', 0x72)
	}

	static getOverpowerRecoveryTemp() {
		return new BaseCommand('GetOverpowerRecoveryTemp', 0x73)
	}
}

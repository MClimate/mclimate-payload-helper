import { BaseCommand, GeneralCommands } from '@/encoders'
import { ZodError } from 'zod'
import { CustomError, decToHex, dec2hex } from '@/utils'
import { MultiSensorCommandTypes, DeviceCommandSchemas } from '@/encoders/types'

export class MultiSensorCommands extends GeneralCommands {
	static setLightState(params: MultiSensorCommandTypes.SetLightStateParams) {
		try {
			DeviceCommandSchemas.MultiSensorCommandSchemas.setLightState.parse(params)
			const { enabled } = params
			const enabledValue = enabled ? 1 : 0
			return new BaseCommand('SetLightState', 0x1e, decToHex(enabledValue))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetLightState execution',
					command: 'SetLightState',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetLightState execution',
					command: 'SetLightState',
					originalError: e as Error,
				})
			}
		}
	}

	static getLightState() {
		return new BaseCommand('GetLightState', 0x1f)
	}

	static setHallState(params: MultiSensorCommandTypes.SetHallStateParams) {
		try {
			DeviceCommandSchemas.MultiSensorCommandSchemas.setHallState.parse(params)
			const { enabled } = params
			const enabledValue = enabled ? 1 : 0
			return new BaseCommand('SetHallState', 0x20, decToHex(enabledValue))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetHallState execution',
					command: 'SetHallState',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetHallState execution',
					command: 'SetHallState',
					originalError: e as Error,
				})
			}
		}
	}

	static getHallState() {
		return new BaseCommand('GetHallState', 0x21)
	}

	static setHallBlindPeriod(params: MultiSensorCommandTypes.SetHallBlindPeriodParams) {
		try {
			DeviceCommandSchemas.MultiSensorCommandSchemas.setHallBlindPeriod.parse(params)
			const { period } = params
			return new BaseCommand('SetHallBlindPeriod', 0x22, dec2hex(period))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetHallBlindPeriod execution',
					command: 'SetHallBlindPeriod',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetHallBlindPeriod execution',
					command: 'SetHallBlindPeriod',
					originalError: e as Error,
				})
			}
		}
	}

	static getHallBlindPeriod() {
		return new BaseCommand('GetHallBlindPeriod', 0x23)
	}

	static setMicrophoneState(params: MultiSensorCommandTypes.SetMicrophoneStateParams) {
		try {
			DeviceCommandSchemas.MultiSensorCommandSchemas.setMicrophoneState.parse(params)
			const { enabled } = params
			const enabledValue = enabled ? 1 : 0
			return new BaseCommand('SetMicrophoneState', 0x24, decToHex(enabledValue))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetMicrophoneState execution',
					command: 'SetMicrophoneState',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetMicrophoneState execution',
					command: 'SetMicrophoneState',
					originalError: e as Error,
				})
			}
		}
	}

	static getMicrophoneState() {
		return new BaseCommand('GetMicrophoneState', 0x25)
	}

	static setMicrophoneSamplingPeriod(params: MultiSensorCommandTypes.SetMicrophoneSamplingPeriodParams) {
		try {
			DeviceCommandSchemas.MultiSensorCommandSchemas.setMicrophoneSamplingPeriod.parse(params)
			const { period } = params
			return new BaseCommand('SetMicrophoneSamplingPeriod', 0x26, dec2hex(period))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetMicrophoneSamplingPeriod execution',
					command: 'SetMicrophoneSamplingPeriod',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetMicrophoneSamplingPeriod execution',
					command: 'SetMicrophoneSamplingPeriod',
					originalError: e as Error,
				})
			}
		}
	}

	static getMicrophoneSamplingPeriod() {
		return new BaseCommand('GetMicrophoneSamplingPeriod', 0x27)
	}

	static setGasState(params: MultiSensorCommandTypes.SetGasStateParams) {
		try {
			DeviceCommandSchemas.MultiSensorCommandSchemas.setGasState.parse(params)
			const { enabled } = params
			const enabledValue = enabled ? 1 : 0
			return new BaseCommand('SetGasState', 0x28, decToHex(enabledValue))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetGasState execution',
					command: 'SetGasState',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetGasState execution',
					command: 'SetGasState',
					originalError: e as Error,
				})
			}
		}
	}

	static getGasState() {
		return new BaseCommand('GetGasState', 0x29)
	}

	static setGasMeasurementPeriod(params: MultiSensorCommandTypes.SetGasMeasurementPeriodParams) {
		try {
			DeviceCommandSchemas.MultiSensorCommandSchemas.setGasMeasurementPeriod.parse(params)
			const { minutes } = params
			return new BaseCommand('SetGasMeasurementPeriod', 0x2a, decToHex(minutes))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetGasMeasurementPeriod execution',
					command: 'SetGasMeasurementPeriod',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetGasMeasurementPeriod execution',
					command: 'SetGasMeasurementPeriod',
					originalError: e as Error,
				})
			}
		}
	}

	static getGasMeasurementPeriod() {
		return new BaseCommand('GetGasMeasurementPeriod', 0x2b)
	}

	static setPirState(params: MultiSensorCommandTypes.SetPirStateParams) {
		try {
			DeviceCommandSchemas.MultiSensorCommandSchemas.setPirState.parse(params)
			const { enabled } = params
			const enabledValue = enabled ? 1 : 0
			return new BaseCommand('SetPirState', 0x2c, decToHex(enabledValue))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetPirState execution',
					command: 'SetPirState',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetPirState execution',
					command: 'SetPirState',
					originalError: e as Error,
				})
			}
		}
	}

	static getPirState() {
		return new BaseCommand('GetPirState', 0x2d)
	}

	static setPirActiveReportingPeriod(params: MultiSensorCommandTypes.SetPirActiveReportingPeriodParams) {
		try {
			DeviceCommandSchemas.MultiSensorCommandSchemas.setPirActiveReportingPeriod.parse(params)
			const { time } = params
			return new BaseCommand('SetPirActiveReportingPeriod', 0x2e, dec2hex(time))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetPirActiveReportingPeriod execution',
					command: 'SetPirActiveReportingPeriod',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetPirActiveReportingPeriod execution',
					command: 'SetPirActiveReportingPeriod',
					originalError: e as Error,
				})
			}
		}
	}

	static getPirActiveReportingPeriod() {
		return new BaseCommand('GetPirActiveReportingPeriod', 0x2f)
	}

	static getRegion() {
		return new BaseCommand('GetRegion', 0xa4)
	}

	static restart() {
		return new BaseCommand('Restart', 0xa5)
	}
}

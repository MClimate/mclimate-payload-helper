import { BaseCommand } from '@/encoders'
import { ZodError } from 'zod'
import { CustomError, dec2hex, decToHex } from '@/utils'
import { PIRCommandTypes, DeviceCommandSchemas } from '@/encoders/types'

export class PIRCommands {
	static setPIRSensorStatus(params: PIRCommandTypes.SetPIRSensorStatusParams) {
		try {
			DeviceCommandSchemas.PIRCommandSchemas.setPIRSensorStatus.parse(params)
			const { state } = params
			return new BaseCommand('SetPIRSensorStatus', 0x3c, decToHex(state))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetPIRSensorStatus execution',
					command: 'SetPIRSensorStatus',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetPIRSensorStatus execution',
					command: 'SetPIRSensorStatus',
					originalError: e as Error,
				})
			}
		}
	}

	static getPIRSensorStatus() {
		return new BaseCommand('GetPIRSensorStatus', 0x3d)
	}

	static setPIRSensorSensitivity(params: PIRCommandTypes.SetPIRSensorSensitivityParams) {
		try {
			DeviceCommandSchemas.PIRCommandSchemas.setPIRSensorSensitivity.parse(params)
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

	static setPIRInitPeriod(params: PIRCommandTypes.SetPIRPeriodParams) {
		try {
			DeviceCommandSchemas.PIRCommandSchemas.setPIRPeriod.parse(params)
			const { time } = params
			return new BaseCommand('SetPIRInitPeriod', 0x46, decToHex(time))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetPIRInitPeriod execution',
					command: 'SetPIRInitPeriod',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetPIRInitPeriod execution',
					command: 'SetPIRInitPeriod',
					originalError: e as Error,
				})
			}
		}
	}

	static getPIRInitPeriod() {
		return new BaseCommand('GetPIRInitPeriod', 0x47)
	}

	static setPIRMeasurementPeriod(params: PIRCommandTypes.SetPIRPeriodParams) {
		try {
			DeviceCommandSchemas.PIRCommandSchemas.setPIRPeriod.parse(params)
			const { time } = params
			return new BaseCommand('SetPIRMeasurementPeriod', 0x48, decToHex(time))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetPIRMeasurementPeriod execution',
					command: 'SetPIRMeasurementPeriod',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetPIRMeasurementPeriod execution',
					command: 'SetPIRMeasurementPeriod',
					originalError: e as Error,
				})
			}
		}
	}

	static getPIRMeasurementPeriod() {
		return new BaseCommand('GetPIRMeasurementPeriod', 0x49)
	}

	static setPIRCheckPeriod(params: PIRCommandTypes.SetPIRPeriodParams) {
		try {
			DeviceCommandSchemas.PIRCommandSchemas.setPIRPeriod.parse(params)
			const { time } = params
			return new BaseCommand('SetPIRCheckPeriod', 0x4a, dec2hex(time))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetPIRCheckPeriod execution',
					command: 'SetPIRCheckPeriod',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetPIRCheckPeriod execution',
					command: 'SetPIRCheckPeriod',
					originalError: e as Error,
				})
			}
		}
	}

	static getPIRCheckPeriod() {
		return new BaseCommand('GetPIRCheckPeriod', 0x4b)
	}

	static setPIRBlindPeriod(params: PIRCommandTypes.SetPIRPeriodParams) {
		try {
			DeviceCommandSchemas.PIRCommandSchemas.setPIRPeriod.parse(params)
			const { time } = params
			return new BaseCommand('SetPIRBlindPeriod', 0x4c, dec2hex(time))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetPIRBlindPeriod execution',
					command: 'SetPIRBlindPeriod',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetPIRBlindPeriod execution',
					command: 'SetPIRBlindPeriod',
					originalError: e as Error,
				})
			}
		}
	}

	static getPIRBlindPeriod() {
		return new BaseCommand('GetPIRBlindPeriod', 0x4d)
	}
}

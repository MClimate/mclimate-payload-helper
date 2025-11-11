import {
	BaseCommand,
	ChildLockCommands,
	DisplayCommands,
	GeneralCommands,
	PIRCommands,
	TemperatureCommonCommands,
} from '@/encoders'
import { ZodError } from 'zod'
import { applyMixins, CustomError, dec2hex, decToHex, isFloat } from '@/utils'
import { WirelessThermostatCommandTypes, DeviceCommandSchemas } from '@/encoders/types'

export class WirelessThermostatCommands extends GeneralCommands {
	static setTargetTemperature(params: WirelessThermostatCommandTypes.SetTargetTemperatureParams) {
		try {
			DeviceCommandSchemas.WirelessThermostatCommandSchemas.setTargetTemperature.parse(params)
			const { targetTemperature } = params
			if (isFloat(targetTemperature)) {
				return new BaseCommand('SetTargetTemperature', 0x50, dec2hex(targetTemperature * 10))
			} else {
				return new BaseCommand('SetTargetTemperature', 0x2e, decToHex(targetTemperature))
			}
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetTargetTemperature execution',
					command: 'SetTargetTemperature',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetTargetTemperature execution',
					command: 'SetTargetTemperature',
					originalError: e as Error,
				})
			}
		}
	}

	static getTargetTemperature() {
		return new BaseCommand('GetTargetTemperature', 0x2f)
	}

	static setHeatingStatus(params: WirelessThermostatCommandTypes.SetHeatingStatusParams) {
		try {
			DeviceCommandSchemas.WirelessThermostatCommandSchemas.setHeatingStatus.parse(params)
			const { status } = params
			return new BaseCommand('SetHeatingStatus', 0x31, decToHex(status))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetHeatingStatus execution',
					command: 'SetHeatingStatus',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetHeatingStatus execution',
					command: 'SetHeatingStatus',
					originalError: e as Error,
				})
			}
		}
	}

	static getHeatingStatus() {
		return new BaseCommand('GetHeatingStatus', 0x32)
	}

	static setDisplayRefreshPeriod(params: WirelessThermostatCommandTypes.SetDisplayRefreshPeriodParams) {
		try {
			DeviceCommandSchemas.WirelessThermostatCommandSchemas.setDisplayRefreshPeriod.parse(params)
			const { period } = params
			return new BaseCommand('SetDisplayRefreshPeriod', 0x33, decToHex(period))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetDisplayRefreshPeriod execution',
					command: 'SetDisplayRefreshPeriod',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetDisplayRefreshPeriod execution',
					command: 'SetDisplayRefreshPeriod',
					originalError: e as Error,
				})
			}
		}
	}

	static getDisplayRefreshPeriod() {
		return new BaseCommand('GetDisplayRefreshPeriod', 0x34)
	}

	static setTargetSendDelay(params: WirelessThermostatCommandTypes.SetTargetSendDelayParams) {
		try {
			DeviceCommandSchemas.WirelessThermostatCommandSchemas.setTargetSendDelay.parse(params)
			const { time } = params
			return new BaseCommand('SetTargetSendDelay', 0x35, decToHex(time))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetTargetSendDelay execution',
					command: 'SetTargetSendDelay',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetTargetSendDelay execution',
					command: 'SetTargetSendDelay',
					originalError: e as Error,
				})
			}
		}
	}

	static getTargetSendDelay() {
		return new BaseCommand('GetTargetSendDelay', 0x36)
	}

	static setAutomaticHeatingStatus(params: WirelessThermostatCommandTypes.SetAutomaticHeatingStatusParams) {
		try {
			DeviceCommandSchemas.WirelessThermostatCommandSchemas.setAutomaticHeatingStatus.parse(params)
			const { state } = params
			return new BaseCommand('SetAutomaticHeatingStatus', 0x37, decToHex(state))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetAutomaticHeatingStatus execution',
					command: 'SetAutomaticHeatingStatus',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetAutomaticHeatingStatus execution',
					command: 'SetAutomaticHeatingStatus',
					originalError: e as Error,
				})
			}
		}
	}

	static getAutomaticHeatingStatus() {
		return new BaseCommand('GetAutomaticHeatingStatus', 0x38)
	}

	static setSensorMode(params: WirelessThermostatCommandTypes.SetSensorModeParams) {
		try {
			DeviceCommandSchemas.WirelessThermostatCommandSchemas.setSensorMode.parse(params)
			const { state } = params
			return new BaseCommand('SetSensorMode', 0x39, decToHex(state))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetSensorMode execution',
					command: 'SetSensorMode',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetSensorMode execution',
					command: 'SetSensorMode',
					originalError: e as Error,
				})
			}
		}
	}

	static getSensorMode() {
		return new BaseCommand('GetSensorMode', 0x3a)
	}

	static setTemperatureHysteresis(params: WirelessThermostatCommandTypes.SetTemperatureHysteresisParams) {
		try {
			DeviceCommandSchemas.WirelessThermostatCommandSchemas.setTemperatureHysteresis.parse(params)
			let { hysteresis } = params
			hysteresis = hysteresis * 10
			return new BaseCommand('SetTemperatureHysteresis', 0x4e, decToHex(hysteresis))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetTemperatureHysteresis execution',
					command: 'SetTemperatureHysteresis',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetTemperatureHysteresis execution',
					command: 'SetTemperatureHysteresis',
					originalError: e as Error,
				})
			}
		}
	}

	static getTemperatureHysteresis() {
		return new BaseCommand('GetTemperatureHysteresis', 0x4f)
	}

	static setTargetTemperaturePrecisely(params: WirelessThermostatCommandTypes.SetTargetTemperaturePreciselyParams) {
		try {
			DeviceCommandSchemas.WirelessThermostatCommandSchemas.setTargetTemperaturePrecisely.parse(params)
			let { targetTemperature } = params
			targetTemperature = targetTemperature * 10
			return new BaseCommand('SetTargetTemperaturePrecisely', 0x50, dec2hex(targetTemperature))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetTargetTemperaturePrecisely execution',
					command: 'SetTargetTemperaturePrecisely',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetTargetTemperaturePrecisely execution',
					command: 'SetTargetTemperaturePrecisely',
					originalError: e as Error,
				})
			}
		}
	}

	static getTargetTemperaturePrecisely() {
		return new BaseCommand('GetTargetTemperaturePrecisely', 0x51)
	}

	static setTargetTemperatureStep(params: WirelessThermostatCommandTypes.SetTargetTemperatureStepParams) {
		try {
			DeviceCommandSchemas.WirelessThermostatCommandSchemas.setTargetTemperatureStep.parse(params)
			let { value } = params
			value = value * 10
			return new BaseCommand('SetTargetTemperatureStep', 0x52, decToHex(value))
		} catch (e) {
			if (e instanceof ZodError) {
				throw new CustomError({
					message: 'Zod validation error during SetTargetTemperatureStep execution',
					command: 'SetTargetTemperatureStep',
					originalError: e,
				})
			} else {
				throw new CustomError({
					message: 'Error during SetTargetTemperatureStep execution',
					command: 'SetTargetTemperatureStep',
					originalError: e as Error,
				})
			}
		}
	}

	static getTargetTemperatureStep() {
		return new BaseCommand('GetTargetTemperatureStep', 0x53)
	}
}

applyMixins(WirelessThermostatCommands, [TemperatureCommonCommands, DisplayCommands, PIRCommands, ChildLockCommands])

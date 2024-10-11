import {
	BaseCommand,
	Relay16Commands,
	VickiCommands,
	FanCoilThermostatCommands,
	TValveCommands,
	TFloodCommands,
	TringThermostatCommands,
	WirelessThermostatCommands,
	CO2SensorCommands,
	CO2DisplayCommands,
	DskDeviceCommands,
	OpenCloseSensorCommands,
	ButtonCommands,
	SetAqiLedCommands,
	HTSensor,
	CO2DisplayLiteCommands,
	HTDisplayLite,
} from '@/encoders'

import { CustomError, toCamelCase } from '@/utils'

export class CommandBuilder {
	device_type: string
	commandRegistry: Record<string, any>

	constructor(device_type: string) {
		this.device_type = device_type
		this.commandRegistry = {
			co2_sensor: CO2SensorCommands,
			vicki: VickiCommands,
			wireless_thermostat: WirelessThermostatCommands,
			button: ButtonCommands,
			relay_16: Relay16Commands,
			fan_coil_thermostat: FanCoilThermostatCommands,
			open_close_sensor: OpenCloseSensorCommands,
			co2_display: CO2DisplayCommands,
			dsk_device: DskDeviceCommands,
			co2_display_lite: CO2DisplayLiteCommands,
			t_valve: TValveCommands,
			t_flood: TFloodCommands,
			ht_sensor: HTSensor,
			ht_display_lite: HTDisplayLite,
			thermostat: TringThermostatCommands,
			set_aqi: SetAqiLedCommands,
		}
	}

	build(command: string, params?: unknown) {
		const deviceCommands = this.commandRegistry[this.device_type as keyof typeof this.commandRegistry]

		if (!deviceCommands) {
			throw new CustomError({
				message: `Device type ${this.device_type} is not supported`,
			})
		}

		const methodName = toCamelCase(command)

		if (typeof (deviceCommands as Record<string, any>)[methodName] === 'function') {
			return (deviceCommands as Record<string, any>)[methodName](params)
		} else {
			throw new CustomError({
				message: `Command ${methodName} not supported for device type ${this.device_type}`,
			})
		}
	}

	combine(commands: BaseCommand[]) {
		return commands.reduce((hex: string, command: BaseCommand) => (hex += command.toHex().toUpperCase()), '')
	}
}

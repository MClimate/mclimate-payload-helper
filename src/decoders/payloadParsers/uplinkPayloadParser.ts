import { DeviceType } from '@/decoders/payloadParsers/types'
import {
	vickiPayloadParser,
	AQISensorPayloadParser,
	CO2DisplayLitePayloadParser,
	CO2DisplayPayloadParser,
	CO2SensorPayloadParser,
	FanCoilThermostatPayloadParser,
	ThermostatPayloadParser,
	WirelessThermostatPayloadParser,
	ButtonPayloadParser,
	DskDevicePayloadParser,
	htDisplayLitePayloadParser,
	htSensorPayloadParser,
	openCloseSensorPayloadParser,
	tFloodPayloadParser,
	tValvePayloadParser,
	relay16PayloadParser,
	relay16DryPayloadParser,
	melissaLorawanPayloadParser,
	co2PirLitePayloadParser,
	htPirLitePayloadParser,
	multisensorPayloadParser,
} from '@/decoders/payloadParsers'

export const uplinkPayloadParser = (hexData: string, deviceType: DeviceType) => {
	switch (deviceType) {
		case DeviceType.Vicki:
			return vickiPayloadParser(hexData)
		case DeviceType.HTSensor:
			return htSensorPayloadParser(hexData)
		case DeviceType.TFlood:
			return tFloodPayloadParser(hexData)
		case DeviceType.AQISensor:
			return AQISensorPayloadParser(hexData)
		case DeviceType.TValve:
			return tValvePayloadParser(hexData)
		case DeviceType.CO2Sensor:
			return CO2SensorPayloadParser(hexData)
		case DeviceType.Thermostat:
			return ThermostatPayloadParser(hexData)
		case DeviceType.MCButton:
			return ButtonPayloadParser(hexData)
		case DeviceType.OpenCloseSensor:
			return openCloseSensorPayloadParser(hexData)
		case DeviceType.DskDevice:
			return DskDevicePayloadParser(hexData)
		case DeviceType.WirelessThermostat:
			return WirelessThermostatPayloadParser(hexData)
		case DeviceType.CO2Display:
			return CO2DisplayPayloadParser(hexData)
		case DeviceType.FanCoilThermostat:
			return FanCoilThermostatPayloadParser(hexData)
		case DeviceType.CO2DisplayLite:
			return CO2DisplayLitePayloadParser(hexData)
		case DeviceType.HTDisplayLite:
			return htDisplayLitePayloadParser(hexData)
		case DeviceType.Relay16:
			return relay16PayloadParser(hexData)
		case DeviceType.Relay16Dry:
			return relay16DryPayloadParser(hexData)
		case DeviceType.MelissaLorawan:
			return melissaLorawanPayloadParser(hexData)
		case DeviceType.CO2PirLite:
			return co2PirLitePayloadParser(hexData)
		case DeviceType.HTPirLite:
			return htPirLitePayloadParser(hexData)
		case DeviceType.MultiSensor:
			return multisensorPayloadParser(hexData)
		default:
			// Q: is this OK?
			return vickiPayloadParser(hexData) // Default case if deviceType is not recognized
	}
}

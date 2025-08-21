import { commandsReadingHelper } from '@/decoders/commandsReadingHelper'
import { DeviceType } from '@/decoders/payloadParsers/types'
import { byteArrayParser, decbin } from '@/helpers'
import { CustomError } from '@/utils'

export const openCloseSensorPayloadParser = (hexData: string) => {
	let deviceData = {}

	try {
		// Calculate battery voltage from raw value
		const calculateBatteryVoltage = (byte: number): number => {
			return byte * 8 + 1600;
		};

		// Calculate temperature from raw temperature value
		const calculateTemperature = (rawTemp: number): number => {
			return rawTemp / 10.0;
		};

		const handleKeepalive = (bytes: number[], data: any) => {
			// Byte 1: Device battery voltage
			var batteryVoltage = calculateBatteryVoltage(bytes[1]) / 1000;
			data.batteryVoltage = Number(batteryVoltage.toFixed(2));

			// Byte 2: Thermistor operational status and temperature data (bits 9:8)
			var thermistorConnected = (bytes[2] & 0x04) === 0; // Bit 2
			var temperatureHighBits = bytes[2] & 0x03; // Bits 1:0

			// Byte 3: Thermistor temperature data (bits 7:0)
			var temperatureLowBits = bytes[3];
			var temperatureRaw = (temperatureHighBits << 8) | temperatureLowBits;
			var temperatureCelsius = calculateTemperature(temperatureRaw);
			data.thermistorProperlyConnected = thermistorConnected;
			data.sensorTemperature = Number(temperatureCelsius.toFixed(2));

			// Byte 4-6: Counter data
			var counter = ((bytes[4] << 16) | (bytes[5] << 8) | bytes[6]);
			data.counter = counter;

			// Byte 7: Status and event code
			const status = bytes[7];
			const events: { [key: string]: string } = { '01': 'keepalive', '32': 'reed switch', '33': 'push button' };
			const eventKey = (bytes[0] < 10 ? '0' : '') + bytes[0].toString();
			const event = events[eventKey];

			data.status = status;
			data.event = event;

			return data;
		};

		// Handler for keepalive data that adapts the string input to the new function
		const handleKeepAliveData = (data: string) => {
			const hexArray = byteArrayParser(data);
			if (!hexArray) return;

			let keepaliveData = handleKeepalive(hexArray, {});
			Object.assign(deviceData, { ...deviceData }, { ...keepaliveData });
		};

		if (hexData) {
			if (hexData.slice(0, 2) == '01' || hexData.slice(0, 2) == '20' || hexData.slice(0, 2) == '21') {
				// its a keeapalive
				handleKeepAliveData(hexData)
			} else {
				// parse command answers
				const data = commandsReadingHelper(hexData, 16, DeviceType.OpenCloseSensor)
				if (!data) return

				const shouldKeepAlive = data.hasOwnProperty('decodeKeepalive') ? true : false
				if ('decodeKeepalive' in data) {
					delete data.decodeKeepalive
				}

				Object.assign(deviceData, { ...deviceData }, { ...data })

				// get only keepalive from device response
				if (shouldKeepAlive) {
					let keepaliveData = hexData.slice(-16)
					handleKeepAliveData(keepaliveData)
				}
			}
			return deviceData
		}
	} catch (e) {
		throw new CustomError({
			message: `Unhandled data`,
			hexData: hexData,
			deviceType: 'open_close_sensor',
			originalError: e as Error,
		})
	}
}

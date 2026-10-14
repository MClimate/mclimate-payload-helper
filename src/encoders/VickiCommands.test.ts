import { BaseCommand, CommandBuilder } from '@/encoders'
import { CustomError } from '@/utils'

describe('VickiCommands payload encoder', () => {
	const commandBuilder = new CommandBuilder('vicki')

	test('SetOpenWindow encodes enabled, close time, motor position and delta', () => {
		expect(
			commandBuilder.build('SetOpenWindow', { enabled: true, delta: 5, closeTime: 30, motorPosition: 300 }),
		).toStrictEqual(new BaseCommand('SetOpenWindow', 0x06, '01', '06', '2C', '15'))
	})

	test('SetOpenWindow matches the docs example 0x0601041C23 (5 bytes, delta packed into byte 4)', () => {
		expect(
			commandBuilder.build('SetOpenWindow', { enabled: true, closeTime: 20, delta: 3, motorPosition: 540 }).toHex(),
		).toBe('0601041C23')
	})

	test('SetOpenWindow pads byte 4 when motor position fits in the low byte', () => {
		expect(
			commandBuilder.build('SetOpenWindow', { enabled: true, closeTime: 20, delta: 3, motorPosition: 200 }).toHex(),
		).toBe('060104C803')
	})

	test('SetOpenWindow matches the docs example 0x060104C213', () => {
		expect(
			commandBuilder.build('SetOpenWindow', { enabled: true, closeTime: 20, delta: 3, motorPosition: 450 }).toHex(),
		).toBe('060104C213')
	})

	test('SetOpenWindow takes close times up to 1275 minutes in 5-minute steps', () => {
		expect(
			commandBuilder.build('SetOpenWindow', { enabled: true, closeTime: 1275, delta: 3, motorPosition: 450 }).toHex(),
		).toBe('0601FFC213')
		expect(
			commandBuilder.build('SetOpenWindow', { enabled: true, closeTime: 60, delta: 3, motorPosition: 450 }).toHex(),
		).toBe('06010CC213')
		for (const closeTime of [12, 22.5, 1280]) {
			expect(() =>
				commandBuilder.build('SetOpenWindow', { enabled: true, closeTime, delta: 3, motorPosition: 450 }),
			).toThrow(CustomError)
		}
	})

	test('SetInternalAlgoParams encodes period and P values', () => {
		expect(commandBuilder.build('SetInternalAlgoParams', { period: 2, pFirstLast: 3, pNext: 4 })).toStrictEqual(
			new BaseCommand('SetInternalAlgoParams', 0x0c, '02', '03', '04'),
		)
	})

	test('SetOperationalMode encodes mode', () => {
		expect(commandBuilder.build('SetOperationalMode', { mode: '01' })).toStrictEqual(
			new BaseCommand('SetOperationalMode', 0x0d, '01'),
		)
	})

	test('SetTargetTemperature uses precise path for floats', () => {
		expect(commandBuilder.build('SetTargetTemperature', { targetTemperature: 21.5 })).toStrictEqual(
			new BaseCommand('SetTargetTemperature', 0x51, '00D7'),
		)
	})

	test('SetTargetTemperature uses integer path', () => {
		expect(commandBuilder.build('SetTargetTemperature', { targetTemperature: 22 })).toStrictEqual(
			new BaseCommand('SetTargetTemperature', 0x0e, '16'),
		)
	})

	test('GetTargetTemperaturePrecisely emits get command', () => {
		expect(commandBuilder.build('GetTargetTemperaturePrecisely')).toStrictEqual(
			new BaseCommand('GetTargetTemperaturePrecisely', 0x52),
		)
	})

	test('SetAppEuiAndAppKey encodes appEui and appKey hex blobs', () => {
		expect(
			commandBuilder.build('SetAppEuiAndAppKey', {
				appEui: 'AABBCCDD11223344',
				appKey: 'AABBCCDDEEFF00010203040506070809',
			}),
		).toStrictEqual(new BaseCommand('SetAppEuiAndAppKey', 0x33, 'AABBCCDD11223344', 'AABBCCDDEEFF00010203040506070809'))
	})

	test('Invalid SetAppEuiAndAppKey throws validation error', () => {
		expect(() =>
			commandBuilder.build('SetAppEuiAndAppKey', { appEui: 'ZZ', appKey: 'AABBCCDDEEFF00010203040506070809' }),
		).toThrow(CustomError)
	})

	test('SetTargetTemperatureFahrenheit encodes Fahrenheit value', () => {
		expect(commandBuilder.build('SetTargetTemperatureFahrenheit', { targetTemperature: 72 })).toStrictEqual(
			new BaseCommand('SetTargetTemperatureFahrenheit', 0x57, '48'),
		)
	})

	test('Invalid SetTargetTemperatureFahrenheit throws validation error', () => {
		expect(() => commandBuilder.build('SetTargetTemperatureFahrenheit', { targetTemperature: 100 })).toThrow(CustomError)
	})

	test('SetD2dNotificationDeviceAppKey encodes appKey hex blob', () => {
		expect(
			commandBuilder.build('SetD2dNotificationDeviceAppKey', { appKey: '112233445566778899AABBCCDDEEFF00' }),
		).toStrictEqual(new BaseCommand('SetD2dNotificationDeviceAppKey', 0x6f, '112233445566778899AABBCCDDEEFF00'))
	})

	test('Invalid SetD2dNotificationDeviceAppKey throws validation error', () => {
		expect(() => commandBuilder.build('SetD2dNotificationDeviceAppKey', { appKey: 'ZZ' })).toThrow(CustomError)
	})

	test('GetD2dNotificationDeviceAppKey emits get command', () => {
		expect(commandBuilder.build('GetD2dNotificationDeviceAppKey')).toStrictEqual(
			new BaseCommand('GetD2dNotificationDeviceAppKey', 0x70),
		)
	})

	test('RequestListenForD2dNotificationDevice emits request command', () => {
		expect(commandBuilder.build('RequestListenForD2dNotificationDevice')).toStrictEqual(
			new BaseCommand('RequestListenForD2dNotificationDevice', 0x71),
		)
	})

	test('SetOperationalMode accepts new mode 03 (HT-sensor D2D)', () => {
		expect(commandBuilder.build('SetOperationalMode', { mode: '03' })).toStrictEqual(
			new BaseCommand('SetOperationalMode', 0x0d, '03'),
		)
	})

	test('SetExternalTemperature encodes temperature', () => {
		expect(commandBuilder.build('SetExternalTemperature', { temp: 25 })).toStrictEqual(
			new BaseCommand('SetExternalTemperature', 0x0f, '19'),
		)
	})

	test('SetInternalAlgoTdiffParams encodes cold and warm deltas', () => {
		expect(commandBuilder.build('SetInternalAlgoTdiffParams', { cold: 10, warm: 20 })).toStrictEqual(
			new BaseCommand('SetInternalAlgoTdiffParams', 0x1a, '0A', '14'),
		)
	})

	test('SetPrimaryOperationalMode encodes mode', () => {
		expect(commandBuilder.build('SetPrimaryOperationalMode', { mode: '01' })).toStrictEqual(
			new BaseCommand('SetPrimaryOperationalMode', 0x1e, '01'),
		)
	})

	test('SetBatteryRangesBoundaries encodes three boundaries', () => {
		expect(
			commandBuilder.build('SetBatteryRangesBoundaries', { Boundary1: 100, Boundary2: 200, Boundary3: 300 }),
		).toStrictEqual(new BaseCommand('SetBatteryRangesBoundaries', 0x20, '0064', '00C8', '012C'))
	})

	test('SetBatteryRangesOverVoltage encodes ranges with fixed first value', () => {
		expect(commandBuilder.build('SetBatteryRangesOverVoltage', { Range1: 10, Range2: 20, Range3: 30 })).toStrictEqual(
			new BaseCommand('SetBatteryRangesOverVoltage', 0x22, '0E', '0A', '14', '1E'),
		)
	})

	test('SetOvac encodes ovac value', () => {
		expect(commandBuilder.build('SetOvac', { ovac: 12 })).toStrictEqual(new BaseCommand('SetOvac', 0x26, '0C'))
	})

	test('SetProportionalAlgorithmParameters encodes coefficient and period', () => {
		expect(commandBuilder.build('SetProportionalAlgorithmParameters', { coefficient: 5, period: 60 })).toStrictEqual(
			new BaseCommand('SetProportionalAlgorithmParameters', 0x2a, '05', '3C'),
		)
	})

	test('SetTemperatureControlAlgorithm encodes algorithm', () => {
		expect(commandBuilder.build('SetTemperatureControlAlgorithm', { algorithm: '02' })).toStrictEqual(
			new BaseCommand('SetTemperatureControlAlgorithm', 0x2c, '02'),
		)
	})

	test('SetMotorPositionOnly encodes motor position', () => {
		expect(commandBuilder.build('SetMotorPositionOnly', { position: 300 })).toStrictEqual(
			new BaseCommand('SetMotorPositionOnly', 0x2d, '012C'),
		)
	})

	test('SetTargetTemperatureAndMotorPosition encodes position and temperature', () => {
		expect(
			commandBuilder.build('SetTargetTemperatureAndMotorPosition', { motorPosition: 400, targetTemperature: 21 }),
		).toStrictEqual(new BaseCommand('SetTargetTemperatureAndMotorPosition', 0x31, '0190', '15'))
	})

	test('SetChildLockBehavior encodes behavior', () => {
		expect(commandBuilder.build('SetChildLockBehavior', { behavior: 1 })).toStrictEqual(
			new BaseCommand('SetChildLockBehavior', 0x35, '01'),
		)
	})

	test('SetProportionalGain encodes fixed-point gain', () => {
		expect(commandBuilder.build('SetProportionalGain', { proportionalGain: 1 })).toStrictEqual(
			new BaseCommand('SetProportionalGain', 0x37, '020000'),
		)
	})

	test('SetProportionalGain accepts fractional gains (docs example Kp 2.74688 -> 0x37057E67)', () => {
		expect(commandBuilder.build('SetProportionalGain', { proportionalGain: 2.74688 }).toHex()).toBe('37057E67')
	})

	test('SetProportionalGain accepts gains up to the 3-byte limit and rejects anything above', () => {
		expect(commandBuilder.build('SetProportionalGain', { proportionalGain: 0xffffff / 131072 }).toHex()).toBe('37FFFFFF')
		for (const proportionalGain of [-0.1, 127.999999, 128]) {
			expect(() => commandBuilder.build('SetProportionalGain', { proportionalGain })).toThrow(CustomError)
		}
	})

	test('SetExternalTemperatureFloat encodes temperature *10', () => {
		expect(commandBuilder.build('SetExternalTemperatureFloat', { temp: 12.3 })).toStrictEqual(
			new BaseCommand('SetExternalTemperatureFloat', 0x3c, '007B'),
		)
	})

	test('SetIntegralGain encodes fixed-point gain', () => {
		expect(commandBuilder.build('SetIntegralGain', { integralGain: 2 })).toStrictEqual(
			new BaseCommand('SetIntegralGain', 0x3e, '040000'),
		)
	})

	test('SetIntegralGain accepts fractional gains (docs example Ki 0.412678)', () => {
		// 0.412678 * 131072 = 54090.53: the docs truncate to 0x00D34A, the encoder rounds to the nearest step (0x00D34B)
		expect(commandBuilder.build('SetIntegralGain', { integralGain: 0.412678 }).toHex().toUpperCase()).toBe('3E00D34B')
		expect(commandBuilder.build('SetIntegralGain', { integralGain: 0.412674 }).toHex().toUpperCase()).toBe('3E00D34A')
	})

	test('SetIntegralGain accepts gains up to the 3-byte limit and rejects anything above', () => {
		expect(
			commandBuilder
				.build('SetIntegralGain', { integralGain: 0xffffff / 131072 })
				.toHex()
				.toUpperCase(),
		).toBe('3EFFFFFF')
		for (const integralGain of [-0.1, 127.999999, 128]) {
			expect(() => commandBuilder.build('SetIntegralGain', { integralGain })).toThrow(CustomError)
		}
	})

	test('SetPiRunPeriod encodes period', () => {
		expect(commandBuilder.build('SetPiRunPeriod', { period: 15 })).toStrictEqual(
			new BaseCommand('SetPiRunPeriod', 0x41, '0F'),
		)
	})

	test('SetTemperatureHysteresis encodes hysteresis *10', () => {
		expect(commandBuilder.build('SetTemperatureHysteresis', { hysteresis: 0.5 })).toStrictEqual(
			new BaseCommand('SetTemperatureHysteresis', 0x43, '05'),
		)
	})

	test('SetOpenWindowPrecisely encodes enable, duration and delta', () => {
		expect(commandBuilder.build('SetOpenWindowPrecisely', { enabled: true, duration: 25, delta: 1.5 })).toStrictEqual(
			new BaseCommand('SetOpenWindowPrecisely', 0x45, '01', '05', '0F'),
		)
	})

	test('SetOpenWindowPrecisely matches the docs example 0x4501060D', () => {
		expect(commandBuilder.build('SetOpenWindowPrecisely', { enabled: true, duration: 30, delta: 1.3 }).toHex()).toBe(
			'4501060D',
		)
	})

	test('SetOpenWindowPrecisely takes durations up to 1275 minutes in 5-minute steps', () => {
		expect(commandBuilder.build('SetOpenWindowPrecisely', { enabled: true, duration: 1275, delta: 1.3 }).toHex()).toBe(
			'4501FF0D',
		)
		expect(commandBuilder.build('SetOpenWindowPrecisely', { enabled: true, duration: 120, delta: 1.3 }).toHex()).toBe(
			'4501180D',
		)
		for (const duration of [12, 22.5, 1280]) {
			expect(() => commandBuilder.build('SetOpenWindowPrecisely', { enabled: true, duration, delta: 1.3 })).toThrow(
				CustomError,
			)
		}
	})

	test('SetForceAttach encodes enabled flag', () => {
		expect(commandBuilder.build('SetForceAttach', { enabled: true })).toStrictEqual(
			new BaseCommand('SetForceAttach', 0x47, '01'),
		)
	})

	test('SetAntiFreezeParams encodes thresholds *10 and target temperature in whole °C', () => {
		expect(
			commandBuilder.build('SetAntiFreezeParams', {
				activatedTemperature: 5,
				deactivatedTemperature: 6,
				targetTemperature: 7,
			}),
		).toStrictEqual(new BaseCommand('SetAntiFreezeParams', 0x49, '32', '3C', '07'))
	})

	test('SetAntiFreezeParams matches the docs example 0x493C5A07', () => {
		expect(
			commandBuilder
				.build('SetAntiFreezeParams', { activatedTemperature: 6, deactivatedTemperature: 9, targetTemperature: 7 })
				.toHex(),
		).toBe('493C5A07')
	})

	test('SetAntiFreezeParams rejects a non-integer target temperature (1°C resolution)', () => {
		expect(() =>
			commandBuilder.build('SetAntiFreezeParams', {
				activatedTemperature: 6,
				deactivatedTemperature: 9,
				targetTemperature: 7.5,
			}),
		).toThrow(CustomError)
	})

	test('SetMaxAllowedIntegralValue encodes value *10', () => {
		expect(commandBuilder.build('SetMaxAllowedIntegralValue', { value: 10 })).toStrictEqual(
			new BaseCommand('SetMaxAllowedIntegralValue', 0x4c, '0064'),
		)
	})

	test('SetValveOpennessInPercentage encodes openness', () => {
		expect(commandBuilder.build('SetValveOpennessInPercentage', { value: 55 })).toStrictEqual(
			new BaseCommand('SetValveOpennessInPercentage', 0x4e, '37'),
		)
	})

	test('SetValveOpennessRangeInPercentage encodes inverted range', () => {
		expect(commandBuilder.build('SetValveOpennessRangeInPercentage', { min: 10, max: 90 })).toStrictEqual(
			new BaseCommand('SetValveOpennessRangeInPercentage', 0x4f, '0A', '5A'),
		)
	})

	test('SetTemperatureOffset encodes offset', () => {
		expect(commandBuilder.build('SetTemperatureOffset', { value: 0 })).toStrictEqual(
			new BaseCommand('SetTemperatureOffset', 0x53, '1C'),
		)
	})
	test('SetLedDisplayTempUnits encodes units', () => {
		expect(commandBuilder.build('SetLedDisplayTempUnits', { value: 1 })).toStrictEqual(
			new BaseCommand('SetLedDisplayTempUnits', 0x55, '01'),
		)
	})

	test('SetHeatingEvent encodes schedule payload', () => {
		expect(
			commandBuilder.build('SetHeatingEvent', {
				eventIndex: 0,
				startHour: 8,
				startMinute: 1,
				targetTemperature: 25.8,
				daysActive: {
					monday: true,
					tuesday: true,
					wednesday: true,
					thursday: true,
					friday: true,
					saturday: false,
					sunday: false,
				},
			}),
		).toStrictEqual(new BaseCommand('SetHeatingEvent', 0x59, '00', '08', '01', '0102', '1F'))
	})

	test('GetHeatingEvent sends the event group byte (docs examples 0x5A00, 0x5A02)', () => {
		expect(commandBuilder.build('GetHeatingEvent', { eventGroup: 0 }).toHex().toUpperCase()).toBe('5A00')
		expect(commandBuilder.build('GetHeatingEvent', { eventGroup: 1 }).toHex().toUpperCase()).toBe('5A01')
		expect(commandBuilder.build('GetHeatingEvent', { eventGroup: 2 }).toHex().toUpperCase()).toBe('5A02')
	})

	test('GetHeatingEvent defaults to group 0 so callers without params still get a valid request', () => {
		expect(commandBuilder.build('GetHeatingEvent', {}).toHex().toUpperCase()).toBe('5A00')
		expect(commandBuilder.build('GetHeatingEvent').toHex().toUpperCase()).toBe('5A00')
	})

	test('GetHeatingEvent rejects groups outside 0-2', () => {
		for (const eventGroup of [-1, 1.5, 3]) {
			expect(() => commandBuilder.build('GetHeatingEvent', { eventGroup })).toThrow(CustomError)
		}
	})

	test('SetHeatingEventState encodes event index and state', () => {
		expect(commandBuilder.build('SetHeatingEventState', { eventIndex: 16, active: true })).toStrictEqual(
			new BaseCommand('SetHeatingEventState', 0x6b, '10', '01'),
		)
	})

	test('SetTimeRequestByMACcommand encodes enable flag', () => {
		expect(commandBuilder.build('SetTimeRequestByMACcommand', { enabled: true })).toStrictEqual(
			new BaseCommand('SetTimeRequestByMACcommand', 0x6d, '01'),
		)
	})

	test('SetHeatingSchedule encodes schedule dates', () => {
		expect(
			commandBuilder.build('SetHeatingSchedule', { startMonth: 0, startDay: 1, endMonth: 11, endDay: 31 }),
		).toStrictEqual(new BaseCommand('SetHeatingSchedule', 0x5b, '00', '01', '0B', '1F'))
	})

	test('SetDeviceTime encodes timestamp bytes', () => {
		expect(commandBuilder.build('SetDeviceTime', { timestamp: 1690000000 })).toStrictEqual(
			new BaseCommand('SetDeviceTime', 0x5d, '64', 'BB', '5A', '80'),
		)
	})

	test('SetDeviceTimeZone encodes offset with two’s complement for negatives', () => {
		expect(commandBuilder.build('SetDeviceTimeZone', { offsetHours: -3 })).toStrictEqual(
			new BaseCommand('SetDeviceTimeZone', 0x5f, 'FD'),
		)
	})

	test('SetAutomaticSetpointRestore encodes time/10', () => {
		expect(commandBuilder.build('SetAutomaticSetpointRestore', { time: 30 })).toStrictEqual(
			new BaseCommand('SetAutomaticSetpointRestore', 0x61, '03'),
		)
	})

	test('SetOfflineTargetTemperature encodes target *10', () => {
		expect(commandBuilder.build('SetOfflineTargetTemperature', { targetTemperature: 21.5 })).toStrictEqual(
			new BaseCommand('SetOfflineTargetTemperature', 0x65, '00D7'),
		)
	})

	test('SetOfflineTargetTemperature encodes disable payload when target is 0', () => {
		expect(commandBuilder.build('SetOfflineTargetTemperature', { targetTemperature: 0 })).toStrictEqual(
			new BaseCommand('SetOfflineTargetTemperature', 0x65, '0000'),
		)
	})

	test('SetInternalAlgoTemporaryState encodes enable/disable flag', () => {
		expect(commandBuilder.build('SetInternalAlgoTemporaryState', { enabled: false })).toStrictEqual(
			new BaseCommand('SetInternalAlgoTemporaryState', 0x67, '01'),
		)
	})

	test('SetTemperatureLevels encodes six level temperatures', () => {
		expect(
			commandBuilder.build('SetTemperatureLevels', {
				level0: 5.0,
				level1: 10.0,
				level2: 15.0,
				level3: 20.0,
				level4: 22.5,
				level5: 25.0,
			}),
		).toStrictEqual(new BaseCommand('SetTemperatureLevels', 0x69, '0032', '0064', '0096', '00C8', '00E1', '00FA'))
	})

	test('SetLedIndicationDuration encodes doubled duration', () => {
		expect(commandBuilder.build('SetLedIndicationDuration', { duration: 1.5 })).toStrictEqual(
			new BaseCommand('SetLedIndicationDuration', 0x63, '03'),
		)
	})

	test('Invalid SetOpenWindow params throw validation error', () => {
		expect(() =>
			commandBuilder.build('SetOpenWindow', { enabled: true, delta: -1, closeTime: 1, motorPosition: 1 }),
		).toThrow(CustomError)
	})

	test('SetTargetTemperature rounds off-grid values to 0.1 °C instead of emitting invalid hex', () => {
		expect(commandBuilder.build('SetTargetTemperature', { targetTemperature: 21.56 })).toStrictEqual(
			new BaseCommand('SetTargetTemperature', 0x51, '00D8'),
		)
	})

	test('SetLedDisplayTempUnits rejects non-integer values', () => {
		expect(() => commandBuilder.build('SetLedDisplayTempUnits', { value: 1.5 })).toThrow(CustomError)
	})

	test('SetAutomaticSetpointRestore takes minutes up to 2550 in 10-minute steps', () => {
		expect(commandBuilder.build('SetAutomaticSetpointRestore', { time: 2550 })).toStrictEqual(
			new BaseCommand('SetAutomaticSetpointRestore', 0x61, 'FF'),
		)
		expect(() => commandBuilder.build('SetAutomaticSetpointRestore', { time: 255 })).toThrow(CustomError)
	})
})

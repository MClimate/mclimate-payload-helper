import { BaseCommand, CommandBuilder } from '@/encoders'
import { CustomError } from '@/utils'

describe('MelissaCommands payload encoder', () => {
	const commandBuilder = new CommandBuilder('melissa_lorawan')

	/* ------------------------------ IR workflow (protocol 1.1 - 1.8) ------------------------------ */

	test('SendIrCodeData encodes length, offset and data (protocol 1.1 example)', () => {
		const command = commandBuilder.build('SendIrCodeData', { offset: 0, data: '000102030405060708090A0B' })
		expect(command).toStrictEqual(new BaseCommand('SendIrCodeData', 0x05, '0E', '0000', '000102030405060708090A0B'))
		expect(command.toHex().toUpperCase()).toBe('050E0000000102030405060708090A0B')
	})

	test('SendIrCodeData encodes a follow-up chunk at a non-zero offset (protocol 1.4 flow)', () => {
		const command = commandBuilder.build('SendIrCodeData', { offset: 0x2f, data: '00082f00080800090a' })
		expect(command.toHex().toUpperCase()).toBe('050B002F00082F00080800090A')
	})

	test('SendIrCodeData rejects odd-length or non-hex data', () => {
		expect(() => commandBuilder.build('SendIrCodeData', { offset: 0, data: '0A0' })).toThrow(CustomError)
		expect(() => commandBuilder.build('SendIrCodeData', { offset: 0, data: 'zz' })).toThrow(CustomError)
		expect(() => commandBuilder.build('SendIrCodeData', { offset: 0, data: '' })).toThrow(CustomError)
	})

	test('SendIrCodeData rejects chunks that do not fit the length byte', () => {
		expect(() => commandBuilder.build('SendIrCodeData', { offset: 0, data: '00'.repeat(253) })).not.toThrow()
		expect(() => commandBuilder.build('SendIrCodeData', { offset: 0, data: '00'.repeat(254) })).toThrow(CustomError)
	})

	test('SendIrCodeData rejects offsets outside 0-65535', () => {
		expect(() => commandBuilder.build('SendIrCodeData', { offset: 65536, data: '00' })).toThrow(CustomError)
		expect(() => commandBuilder.build('SendIrCodeData', { offset: -1, data: '00' })).toThrow(CustomError)
	})

	test('GetIrCodeBufferOffset emits get command', () => {
		expect(commandBuilder.build('GetIrCodeBufferOffset')).toStrictEqual(new BaseCommand('GetIrCodeBufferOffset', 0x06))
	})

	test('ResetIrCodeBufferOffset emits reset command', () => {
		expect(commandBuilder.build('ResetIrCodeBufferOffset')).toStrictEqual(
			new BaseCommand('ResetIrCodeBufferOffset', 0x07),
		)
	})

	test('EmitPreloadedIrCode encodes emit-only (protocol 1.4 flow)', () => {
		const command = commandBuilder.build('EmitPreloadedIrCode', { mode: 0 })
		expect(command).toStrictEqual(new BaseCommand('EmitPreloadedIrCode', 0x08, '00', '00'))
		expect(command.toHex()).toBe('080000')
	})

	test('EmitPreloadedIrCode encodes emit-and-store and store-only with position', () => {
		expect(commandBuilder.build('EmitPreloadedIrCode', { mode: 1, position: 3 })).toStrictEqual(
			new BaseCommand('EmitPreloadedIrCode', 0x08, '01', '03'),
		)
		expect(commandBuilder.build('EmitPreloadedIrCode', { mode: 2, position: 10 })).toStrictEqual(
			new BaseCommand('EmitPreloadedIrCode', 0x08, '02', '0A'),
		)
	})

	test('EmitPreloadedIrCode requires a position when storing', () => {
		expect(() => commandBuilder.build('EmitPreloadedIrCode', { mode: 1 })).toThrow(CustomError)
		expect(() => commandBuilder.build('EmitPreloadedIrCode', { mode: 2, position: 0 })).toThrow(CustomError)
		expect(() => commandBuilder.build('EmitPreloadedIrCode', { mode: 1, position: 11 })).toThrow(CustomError)
		expect(() => commandBuilder.build('EmitPreloadedIrCode', { mode: 3 })).toThrow(CustomError)
	})

	test('SetIrCodeRecording encodes time and position (protocol 1.5 examples)', () => {
		expect(commandBuilder.build('SetIrCodeRecording', { time: 15, position: 0 })).toStrictEqual(
			new BaseCommand('SetIrCodeRecording', 0x09, '0F', '00'),
		)
		expect(commandBuilder.build('SetIrCodeRecording', { time: 0, position: 2 })).toStrictEqual(
			new BaseCommand('SetIrCodeRecording', 0x09, '00', '02'),
		)
	})

	test('Invalid SetIrCodeRecording throws validation error', () => {
		expect(() => commandBuilder.build('SetIrCodeRecording', { time: -1, position: 1 })).toThrow(CustomError)
		expect(() => commandBuilder.build('SetIrCodeRecording', { time: 256, position: 1 })).toThrow(CustomError)
		expect(() => commandBuilder.build('SetIrCodeRecording', { time: 10, position: 11 })).toThrow(CustomError)
	})

	test('GetRecordedIrCodeStatus emits get command', () => {
		expect(commandBuilder.build('GetRecordedIrCodeStatus')).toStrictEqual(
			new BaseCommand('GetRecordedIrCodeStatus', 0x0a),
		)
	})

	test('GetRecordedIrCodeData encodes the 2-byte read offset (protocol 1.7 examples)', () => {
		expect(commandBuilder.build('GetRecordedIrCodeData', { offset: 0 })).toStrictEqual(
			new BaseCommand('GetRecordedIrCodeData', 0x0b, '0000'),
		)
		expect(commandBuilder.build('GetRecordedIrCodeData', { offset: 47 }).toHex().toUpperCase()).toBe('0B002F')
		expect(() => commandBuilder.build('GetRecordedIrCodeData', { offset: 65536 })).toThrow(CustomError)
	})

	test('LoadStoredIrCode encodes mode and position (protocol 1.8 example)', () => {
		const command = commandBuilder.build('LoadStoredIrCode', { mode: 0, position: 1 })
		expect(command).toStrictEqual(new BaseCommand('LoadStoredIrCode', 0x0c, '00', '01'))
		expect(command.toHex()).toBe('0c0001')
		expect(commandBuilder.build('LoadStoredIrCode', { mode: 1, position: 10 })).toStrictEqual(
			new BaseCommand('LoadStoredIrCode', 0x0c, '01', '0A'),
		)
	})

	test('LoadStoredIrCode mode 2 emits only (protocol 1.8 update)', () => {
		const command = commandBuilder.build('LoadStoredIrCode', { mode: 2, position: 3 })
		expect(command).toStrictEqual(new BaseCommand('LoadStoredIrCode', 0x0c, '02', '03'))
		expect(command.toHex()).toBe('0c0203')
	})

	test('LoadStoredIrCode rejects position 0 and unknown modes', () => {
		expect(() => commandBuilder.build('LoadStoredIrCode', { mode: 0, position: 0 })).toThrow(CustomError)
		expect(() => commandBuilder.build('LoadStoredIrCode', { mode: 3, position: 1 })).toThrow(CustomError)
	})

	test('GetStoredIrCodeSizes uses 0x13', () => {
		const command = commandBuilder.build('GetStoredIrCodeSizes')
		expect(command).toStrictEqual(new BaseCommand('GetStoredIrCodeSizes', 0x13))
		expect(command.toHex()).toBe('13')
	})

	/* ------------------------------ PIR / light sensor (shared with PIR Mini) ------------------------------ */

	test('SetLightSensorState / GetLightSensorState use 0x1E / 0x1F', () => {
		expect(commandBuilder.build('SetLightSensorState', { state: 1 })).toStrictEqual(
			new BaseCommand('SetLightSensorState', 0x1e, '01'),
		)
		expect(commandBuilder.build('GetLightSensorState')).toStrictEqual(new BaseCommand('GetLightSensorState', 0x1f))
	})

	test('SetPIRSensorState / GetPIRSensorState use 0x36 / 0x37', () => {
		expect(commandBuilder.build('SetPIRSensorState', { state: 1 })).toStrictEqual(
			new BaseCommand('SetPIRSensorState', 0x36, '01'),
		)
		expect(commandBuilder.build('GetPIRSensorState')).toStrictEqual(new BaseCommand('GetPIRSensorState', 0x37))
	})

	test('SetOccupancyTimeout / GetOccupancyTimeout use 0x38 / 0x39', () => {
		expect(commandBuilder.build('SetOccupancyTimeout', { timeout: 60 })).toStrictEqual(
			new BaseCommand('SetOccupancyTimeout', 0x38, '003C'),
		)
		expect(commandBuilder.build('GetOccupancyTimeout')).toStrictEqual(new BaseCommand('GetOccupancyTimeout', 0x39))
	})

	test('SetPIRDemoMode / GetPIRDemoMode use 0x3C / 0x3D', () => {
		expect(commandBuilder.build('SetPIRDemoMode', { state: 1 })).toStrictEqual(
			new BaseCommand('SetPIRDemoMode', 0x3c, '01'),
		)
		expect(commandBuilder.build('GetPIRDemoMode')).toStrictEqual(new BaseCommand('GetPIRDemoMode', 0x3d))
	})

	test('SetPIROperationMode / GetPIROperationMode use 0x3E / 0x3F', () => {
		expect(commandBuilder.build('SetPIROperationMode', { mode: 2 })).toStrictEqual(
			new BaseCommand('SetPIROperationMode', 0x3e, '02'),
		)
		expect(commandBuilder.build('GetPIROperationMode')).toStrictEqual(new BaseCommand('GetPIROperationMode', 0x3f))
	})

	test('SetPIRBlindTime / GetPIRBlindTime use 0x41 / 0x42', () => {
		expect(commandBuilder.build('SetPIRBlindTime', { time: 60 })).toStrictEqual(
			new BaseCommand('SetPIRBlindTime', 0x41, '003C'),
		)
		expect(commandBuilder.build('GetPIRBlindTime')).toStrictEqual(new BaseCommand('GetPIRBlindTime', 0x42))
	})

	test('SetPIRCounterResetFlag / GetPIRCounterResetFlag use 0x43 / 0x44', () => {
		expect(commandBuilder.build('SetPIRCounterResetFlag', { state: 1 })).toStrictEqual(
			new BaseCommand('SetPIRCounterResetFlag', 0x43, '01'),
		)
		expect(commandBuilder.build('GetPIRCounterResetFlag')).toStrictEqual(new BaseCommand('GetPIRCounterResetFlag', 0x44))
	})

	test('SetPIRSensorSensitivity / GetPIRSensorSensitivity use Melissa codes 0x45 / 0x46', () => {
		expect(commandBuilder.build('SetPIRSensorSensitivity', { sensitivity: 30 })).toStrictEqual(
			new BaseCommand('SetPIRSensorSensitivity', 0x45, '1E'),
		)
		expect(commandBuilder.build('GetPIRSensorSensitivity')).toStrictEqual(
			new BaseCommand('GetPIRSensorSensitivity', 0x46),
		)
		expect(() => commandBuilder.build('SetPIRSensorSensitivity', { sensitivity: 11 })).toThrow(CustomError)
	})

	test('RestartDevice emits 0xA5', () => {
		expect(commandBuilder.build('RestartDevice')).toStrictEqual(new BaseCommand('RestartDevice', 0xa5))
	})

	test('LED brightness commands are not available on Melissa', () => {
		expect(() => commandBuilder.build('SetLedBrightness', { value: 50 })).toThrow(CustomError)
		expect(() => commandBuilder.build('GetLedBrightness')).toThrow(CustomError)
	})

	/* ------------------------------ General commands ------------------------------ */

	test('General commands are inherited', () => {
		expect(commandBuilder.build('SetKeepAlive', { time: 10 })).toStrictEqual(new BaseCommand('SetKeepAlive', 0x02, '0A'))
		expect(commandBuilder.build('GetDeviceVersion')).toStrictEqual(new BaseCommand('GetDeviceVersion', 0x04))
		expect(commandBuilder.build('SetJoinRetryPeriod', { period: 10 })).toStrictEqual(
			new BaseCommand('SetJoinRetryPeriod', 0x10, '78'),
		)
		expect(commandBuilder.build('GetWatchDogParams')).toStrictEqual(new BaseCommand('GetWatchDogParams', 0x1d))
	})

	test('Commands can be combined into a single downlink (protocol 1.4 flow)', () => {
		const combined = commandBuilder.combine([
			commandBuilder.build('SendIrCodeData', { offset: 0x2f, data: '00082f00080800090a' }),
			commandBuilder.build('EmitPreloadedIrCode', { mode: 0 }),
		])
		expect(combined).toBe('050B002F00082F00080800090A080000')
	})
})

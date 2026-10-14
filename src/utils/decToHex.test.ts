import { CustomError, dec2hex, dec2hex3bytes, decToHex } from '@/utils'

describe('hex conversion helpers', () => {
	test('snap floating-point noise to the intended integer', () => {
		expect(decToHex(0.7 * 10)).toBe('07')
		expect(dec2hex(25.8 * 10)).toBe('0102')
		expect(dec2hex3bytes(0.1 * 30)).toBe('000003')
	})

	test('reject real fractions instead of emitting invalid hex', () => {
		expect(() => decToHex(1.5)).toThrow(CustomError)
		expect(() => dec2hex(201.5)).toThrow(CustomError)
		expect(() => dec2hex3bytes(0.25)).toThrow(CustomError)
	})
})

import { CustomError } from '@/utils/customErrorHandler'

// Snaps floating-point noise (e.g. 0.7 * 10 = 7.000000000000001) to the integer it stands for and rejects
// real fractions, which toString(16) would otherwise render as invalid hex such as 'C9.8'.
const toWholeNumber = (i: number): number => {
	const rounded = Math.round(i)
	if (Math.abs(i - rounded) > 1e-6) {
		throw new CustomError({
			message: `Input ${i} is not a whole number and can't be hex encoded.`,
		})
	}
	return rounded
}

// Converts a decimal number to a hex string (0-255).
export const decToHex = (i: number, shouldAddZero: boolean = true): string => {
	i = toWholeNumber(i)
	if (i < 0 || i > 255) {
		throw new CustomError({
			message: 'Input out of bounds. Accepted range: 0-255.',
		})
	}
	let output = i.toString(16).toUpperCase()
	if (output.length % 2 > 0 && shouldAddZero) {
		output = output.padStart(2, '0')
	}
	return output
}

// Converts a decimal number to a 4-character hex string (0-65535).
export const dec2hex = (i: number): string => {
	i = toWholeNumber(i)
	if (i < 0 || i > 65535) {
		throw new CustomError({
			message: 'Input out of bounds. Accepted range: 0-65535.',
		})
	}
	return (i + 0x10000).toString(16).substr(-4).toUpperCase()
}

// Converts a decimal number to a 6-character hex string (0-16777215).
export const dec2hex3bytes = (i: number): string => {
	i = toWholeNumber(i)
	if (i < 0 || i > 16777215) {
		throw new CustomError({
			message: 'Input out of bounds. Accepted range: 0-16777215.',
		})
	}
	return (i + 0x1000000).toString(16).substr(-6).toUpperCase()
}

// Checks if a number is a floating-point value.
export const isFloat = (n: unknown): boolean => {
	return typeof n === 'number' && n % 1 !== 0
}

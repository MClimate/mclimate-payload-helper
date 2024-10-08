import { CustomError } from '@/utils/customErrorHandler'

// Converts a decimal number to a hex string (0-255).
export const decToHex = (i: number, shouldAddZero: boolean = true): string => {
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
	if (i < 0 || i > 65535) {
		throw new CustomError({
			message: 'Input out of bounds. Accepted range: 0-65535.',
		})
	}
	return (i + 0x10000).toString(16).substr(-4).toUpperCase()
}

// Converts a decimal number to a 6-character hex string (0-16777215).
export const dec2hex3bytes = (i: number): string => {
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

export const decbin = (number: number): string => {
	if (number < 0) {
		number = 0xffffffff + number + 1
	}
	const updatedNumber = number.toString(2)
	return '00000000'.slice(updatedNumber.length) + updatedNumber
}

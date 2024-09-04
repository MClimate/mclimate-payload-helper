export const byteArrayParser = (hexData: string): number[] | null => {
	const parsedData = hexData.match(/.{1,2}/g)?.map((byte) => {
		return parseInt(byte, 16)
	})

	if (!parsedData) return null

	return parsedData
}

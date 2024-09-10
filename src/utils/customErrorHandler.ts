export class CustomError extends Error {
	public readonly message: string
	public readonly hexData?: string
	public readonly command?: string
	public readonly deviceType?: string
	public readonly originalError?: Error

	constructor({
		message,
		hexData,
		command,
		deviceType,
		originalError,
	}: {
		message: string
		hexData?: string
		command?: string
		deviceType?: string
		originalError?: Error
	}) {
		super(message)
		this.name = this.constructor.name
		this.message = message
		this.hexData = hexData
		this.command = command
		this.deviceType = deviceType
		this.originalError = originalError

		if (originalError) {
			this.stack = `${this.stack}\nCaused by: ${originalError.stack}`
		}

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, this.constructor)
		}
	}
}

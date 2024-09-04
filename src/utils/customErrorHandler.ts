export class CustomError extends Error {
	constructor(
		public readonly message: string,
		public readonly hexData?: string,
		public readonly command?: string,
		public readonly deviceType?: string,
		public readonly originalError?: Error,
	) {
		super(message)
		// Having the name set is useful for debugging
		this.name = this.constructor.name

		// Helpful when wrapping or rethrowing an error and we want to preserve the trace of where the original error occurred
		if (originalError) {
			this.stack = `${this.stack}\nCaused by: ${originalError.stack}`
		}

		// Maintains proper stack trace for where our error was thrown (only available on V8)
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, this.constructor)
		}
	}
}

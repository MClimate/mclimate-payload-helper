type Deletable = Record<string, unknown>

export function delMethods<T extends object>(targetClass: T, methods: string[]): void {
	const targetWithIndex = targetClass as Deletable
	methods.forEach((method) => {
		if (Object.prototype.hasOwnProperty.call(targetWithIndex, method)) {
			delete targetWithIndex[method]
		}
	})
}

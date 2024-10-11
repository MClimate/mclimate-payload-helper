// NOTE: this is the "old way" of doing mixins, but it's still useful for some cases
// ref for new way: https://www.typescriptlang.org/docs/handbook/mixins.html

export function applyMixins(derivedCtor: any, baseCtors: any[]) {
	baseCtors.forEach((baseCtor) => {
		Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
			if (name !== 'constructor') {
				Object.defineProperty(
					derivedCtor.prototype,
					name,
					Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null),
				)
			}
		})
	})
}

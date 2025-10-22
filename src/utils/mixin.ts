// NOTE: this is the "old way" of doing mixins, but it's still useful for some cases
// ref for new way: https://www.typescriptlang.org/docs/handbook/mixins.html
export function applyMixins<T extends object, TBase extends object>(derivedCtor: T, baseCtors: TBase[]): void {
	baseCtors.forEach((baseCtor) => {
		Object.getOwnPropertyNames(baseCtor).forEach((name) => {
			if (name !== 'prototype' && name !== 'name' && name !== 'constructor') {
				const descriptor = Object.getOwnPropertyDescriptor(baseCtor, name)
				if (descriptor) {
					Object.defineProperty(derivedCtor, name, descriptor)
				}
			}
		})
	})
}

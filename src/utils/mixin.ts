// NOTE: this is the "old way" of doing mixins, but it's still useful for some cases
// ref for new way: https://www.typescriptlang.org/docs/handbook/mixins.html
export function applyMixins(derivedCtor: any, baseCtors: any[]) {
	baseCtors.forEach((baseCtor) => {
		Object.getOwnPropertyNames(baseCtor).forEach((name) => {
			if (name !== 'prototype' && name !== 'name' && name !== 'constructor') {
				Object.defineProperty(derivedCtor, name, Object.getOwnPropertyDescriptor(baseCtor, name) || Object.create(null))
			}
		})
	})
}

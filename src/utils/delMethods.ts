export function delMethods(targetClass: any, methods: string[]) {
	methods.forEach((method) => {
		if (targetClass.hasOwnProperty(method)) {
			delete targetClass[method]
		}
	})
}

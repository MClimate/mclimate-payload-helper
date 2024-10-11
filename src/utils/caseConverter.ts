export function toCamelCase(pascalCaseStr: string): string {
	return pascalCaseStr.charAt(0).toLowerCase() + pascalCaseStr.slice(1)
}

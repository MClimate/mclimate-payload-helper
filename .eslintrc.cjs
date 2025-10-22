/** @type {import("eslint").Linter.Config} */
module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
	},
	env: {
		node: true,
		es2021: true,
		jest: true,
	},
	plugins: ['@typescript-eslint', 'jest'],
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:jest/recommended', 'prettier'],
	ignorePatterns: ['dist', 'node_modules', 'jest.config.ts'],
	rules: {},
}

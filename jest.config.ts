import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
	verbose: true,
	transform: {
		'^.+\\.ts?$': [
			'ts-jest',
			{
				useESM: true,
			},
		],
	},
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
		'^@shared/(.*)$': '<rootDir>/../shared/$1',
	},
	extensionsToTreatAsEsm: ['.ts'],
	rootDir: __dirname,
}

export default jestConfig

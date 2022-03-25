module.exports = {
	testPathIgnorePatterns: ['/node_modules/', '/.next/'],
	setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
	transform: {
		'^.*\\.(js|js|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
	},
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		'\\.(scss|css|sass)$': 'identity-obj-proxy',
	},
};

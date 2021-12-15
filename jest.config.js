module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    roots: [
        '<rootDir>/packages',
    ],
    // globals: {
    //     'ts-jest': {
    //         tsConfigFile: 'tsconfig.base.json',
    //     },
    // },
    // testRegex: '((\\.|/)(spec))\\.(ts|js)x?$',
    // transform: {
    //     '^.+\\.jsx?$': 'babel-jest',
    //     '^.+\\.tsx?$': 'ts-jest',
    // },
    // moduleFileExtensions: [
    //     'ts',
    //     'tsx',
    //     'js',
    //     'jsx',
    //     'json',
    // ],
    setupFilesAfterEnv: [
        '<rootDir>/bin/jest/commonSetup.js',
    ],
    testURL: 'http://test.site.be/some/path',
};

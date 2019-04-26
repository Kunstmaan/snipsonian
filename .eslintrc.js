module.exports = {
    parser: '@typescript-eslint/parser',  // Specifies the ESLint parser
    plugins: ['@typescript-eslint'],
    extends: [
        './node_modules/@kunstmaan/eslint-typescript-config/index.js',
    ],
    env: {
        jest: true,
    },
    parserOptions: {
        ecmaVersion: 2018,  // Allows for the parsing of modern ECMAScript features
        sourceType: 'module',  // Allows for the use of imports
    },
    globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly'
    },
    rules: {
        '@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: true }],
        '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
        '@typescript-eslint/interface-name-prefix': ['error', 'always'],
    }
};

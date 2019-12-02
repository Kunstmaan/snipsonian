const OFF = 'off';
const ERROR = 'error';
// const WARN = 'warn';

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
        'implicit-arrow-linebreak': [OFF],
        'function-paren-newline': [ERROR, 'consistent'],

        '@typescript-eslint/explicit-function-return-type': [ERROR, { allowExpressions: true }],
        '@typescript-eslint/interface-name-prefix': [ERROR, 'always'],
        '@typescript-eslint/no-object-literal-type-assertion': [ERROR, { allowAsParameter: true }],
        '@typescript-eslint/no-use-before-define': [ERROR, { functions: false, classes: true }],

        'react/sort-comp': [OFF],
    }
};

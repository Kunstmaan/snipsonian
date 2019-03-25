module.exports = {
    parser: '@typescript-eslint/parser',  // Specifies the ESLint parser
    // extends: ['./node_modules/@kunstmaan/eslint-config/index.js'],
    extends: [
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    ],
    env: {
        jest: true,
    },
    parserOptions: {
        ecmaVersion: 2018,  // Allows for the parsing of modern ECMAScript features
        sourceType: 'module',  // Allows for the use of imports
    },
    rules: {
        '@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: true }],
        '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
        '@typescript-eslint/interface-name-prefix': ['always'],
    },
};

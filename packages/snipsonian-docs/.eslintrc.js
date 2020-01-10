const OFF = 'off';
const ERROR = 'error';
const WARN = 'warn';

module.exports = {
    parser: '@typescript-eslint/parser',  // Specifies the ESLint parser
    plugins: ['@typescript-eslint'],
    extends: [
        './node_modules/@kunstmaan/eslint-typescript-config/index.js',
    ],
    env: {
        browser: true,
        es6: true,
        jest: true,
    },
    parserOptions: {
        ecmaVersion: 2018,  // Allows for the parsing of modern ECMAScript features
        sourceType: 'module',  // Allows for the use of imports
    },
    globals: {
        // window: 'readonly',
        // document: 'readonly',
        // navigator: 'readonly'
    },
    rules: {
        'arrow-body-style': [OFF],
        'function-paren-newline': [ERROR, 'consistent'],
        'implicit-arrow-linebreak': [OFF],
        'no-nested-ternary': [OFF],
        'no-unused-expressions': [ERROR, {
            allowShortCircuit: true,
            allowTernary: true,
        }],
        'no-unused-vars': [ERROR, {
            vars: 'all',
            args: 'after-used',
            ignoreRestSiblings: true,
        }],
        'object-curly-newline': [OFF],

        '@typescript-eslint/indent': [ERROR, 4, {
            SwitchCase: 1,
            VariableDeclarator: 1,
            outerIIFEBody: 1,
            MemberExpression: 1,
            FunctionDeclaration: { parameters: 'first', body: 1 },
            FunctionExpression: { parameters: 'first', body: 1 },
            CallExpression: { arguments: 'first' },
            ArrayExpression: 'first',
            ObjectExpression: 'first',
            ImportDeclaration: 'first',
            flatTernaryExpressions: false,
        }],
        '@typescript-eslint/explicit-function-return-type': [OFF], // but enable for libraries!
        '@typescript-eslint/interface-name-prefix': [ERROR, 'always'],
        '@typescript-eslint/no-use-before-define': [ERROR, { functions: false, classes: true }],
        '@typescript-eslint/no-object-literal-type-assertion': [ERROR, {
            allowAsParameter: true,
        }],
        '@typescript-eslint/no-var-requires': [OFF],
        'jsx-a11y/label-has-for': [OFF],
        'jsx-a11y/label-has-associated-control': [ERROR, {
            'controlComponents': ['Typeahead', 'TextInput']
        }],
        'jsx-a11y/anchor-is-valid': [ERROR, {
            components: ['Link'],
            specialLink: ['to'],
            aspects: ['invalidHref', 'preferButton'],
        }],

        'react/destructuring-assignment': [OFF],
        'react/jsx-boolean-value': [OFF],
        'react/sort-comp': [OFF],
    }
};

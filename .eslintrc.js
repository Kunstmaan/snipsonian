const OFF = 'off'; // 0
const WARN = 'warn'; // 1
const ERROR = 'error'; // 2

const INDENTATION_SIZE = 4;

module.exports = {
    parser: '@typescript-eslint/parser',  // Specifies the ESLint parser
    plugins: ['@typescript-eslint', 'import'],
    extends: [
        'airbnb',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        'airbnb-typescript',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
    ],
    env: {
        es6: true,
        jest: true,
    },
    parserOptions: {
        ecmaVersion: 2018,  // Allows for the parsing of modern ECMAScript features
        sourceType: 'module',  // Allows for the use of imports
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
    },
    settings: {
        "import/resolver": {
            "typescript": {},
        },
    },
    globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly'
    },
    rules: {
        // Javascript Rules
        'arrow-parens': [ERROR, 'always'],
        'function-paren-newline': [ERROR, 'consistent'],
        'implicit-arrow-linebreak': [OFF],
        'indent': [WARN, INDENTATION_SIZE, { SwitchCase: 1 } ],
        'max-len': [ERROR, 120],
        'no-console': [OFF],
        'no-nested-ternary': [OFF],
        'no-plusplus': [ERROR, { allowForLoopAfterthoughts: true }],
        'no-unused-expressions': [ERROR, { allowShortCircuit: true, allowTernary: true }],
        'no-unused-vars': [OFF],
        'no-use-before-define': [OFF],
        'object-curly-newline': [OFF],
        // 'operator-linebreak': [ERROR, 'after', { overrides: { '?': 'before', ':': 'before' } } ],
        'operator-linebreak': [OFF],

        // JSX Rules
        'jsx-a11y/label-has-for': [OFF],

        // React Rules
        'react/destructuring-assignment': [OFF],
        'react/jsx-curly-newline': [OFF],
        'react/jsx-indent': [ERROR, INDENTATION_SIZE],
        'react/jsx-indent-props': [ERROR, INDENTATION_SIZE],
        'react/jsx-filename-extension': [ERROR, { extensions: ['.jsx', '.tsx'] }],
        'react/jsx-one-expression-per-line': [OFF],
        'react/jsx-props-no-spreading': [OFF],
        'react/prop-types': [OFF],
        'react/jsx-no-bind': [OFF],
        'react/sort-comp': [ERROR, {
            order: [
                'static-variables',
                'static-methods',
                'instance-variables',
                'lifecycle',
                'render',
                'everything-else',
            ],
            groups: {
                lifecycle: [
                    'displayName',
                    'propTypes',
                    'contextTypes',
                    'childContextTypes',
                    'mixins',
                    'statics',
                    'defaultProps',
                    'constructor',
                    'getDefaultProps',
                    'state',
                    'getInitialState',
                    'getChildContext',
                    'getDerivedStateFromProps',
                    'componentWillMount',
                    'UNSAFE_componentWillMount',
                    'componentDidMount',
                    'componentWillReceiveProps',
                    'UNSAFE_componentWillReceiveProps',
                    'shouldComponentUpdate',
                    'componentWillUpdate',
                    'UNSAFE_componentWillUpdate',
                    'getSnapshotBeforeUpdate',
                    'componentDidUpdate',
                    'componentDidCatch',
                    'componentWillUnmount'
                ]
            }
        }],
        'react/require-default-props': [OFF],
        'react/jsx-props-no-multi-spaces': [OFF],
        'react/no-unused-prop-types': [OFF],

        // Import Rules
        'import/extensions': [ERROR, 'never' , {
            json: 'always',
        }],
        'import/prefer-default-export': [OFF],

        // Typescript rules
        /** "explicit-function-return-type" can be off for apps, but should be on for libraries! */
        // '@typescript-eslint/explicit-function-return-type': [ERROR],
        '@typescript-eslint/indent': [ERROR, INDENTATION_SIZE, {
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
        '@typescript-eslint/camelcase': [OFF],
        "@typescript-eslint/naming-convention": [ERROR, {
            "selector": "interface",
            "format": ["PascalCase"],
            "custom": {
                "regex": "^I[A-Z]",
                "match": true // true is to enforce that interfaces start with an I
            }
        }],
        '@typescript-eslint/no-use-before-define': [ERROR, { functions: false, classes: true, enums: false, typedefs: false }],
        "@typescript-eslint/explicit-module-boundary-types": [OFF], // disable the rule for all files
        "@typescript-eslint/no-unused-vars": [ERROR, { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],
        "@typescript-eslint/comma-dangle": [ERROR, {
            arrays: 'always-multiline',
            objects: 'always-multiline',
            imports: 'always-multiline',
            exports: 'always-multiline',
            functions: 'always-multiline',
            enums: 'always-multiline',
            generics: 'always-multiline',
            tuples: 'always-multiline',
        }],
        "@typescript-eslint/lines-between-class-members": [OFF],
        "@typescript-eslint/ban-types": [ERROR, {
            types: {
                /**
                 * By default, '{}' is already not allowed, but we override the message
                 * as we do allow the use of 'object'.
                 */
                "{}": {
                    message: '`{}` actually means "any non-nullish value". Use "object" instead.',
                    fixWith: 'object',
                },
                /**
                 * By default, 'object' is not allowed.
                 * -->
                 * Don't use `object` as a type. The `object` type is currently hard to use
                 * ([see this issue](https://github.com/microsoft/TypeScript/issues/21732)).
                 * Consider using `Record<string, unknown>` instead, as it allows you to more easily inspect and use the keys.
                 */
                "object": false, // false to disable the inherited rule (and thus allow the use of 'object')
            },
        }],
    }
};

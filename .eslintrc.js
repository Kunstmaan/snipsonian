const OFF = 0;
const WARNING = 1;
const ERROR = 2;

const INDENTATION_SIZE = 4;

module.exports = {
    extends: ['airbnb'],
    env: {
      'jest': true
    },
    rules: {
        ...jsRules(),
        ...reactRules(),
        ...importRules(),
    }
};

function jsRules() {
    return {
        'indent': [
            WARNING,
            INDENTATION_SIZE,
            { 'SwitchCase': 1 }
        ],
        'max-len': [
            ERROR,
            120
        ],
        'no-console': OFF,
        'no-use-before-define': [
            ERROR,
            {
                'functions': false,
                'classes': true
            }
        ],
        'arrow-parens': [
            ERROR,
            'always'
        ],
    };
}

function reactRules() {
    return {
        'react/jsx-indent': [
            ERROR,
            INDENTATION_SIZE
        ],
        'react/jsx-indent-props': [
            ERROR,
            INDENTATION_SIZE
        ],
        'react/prop-types': OFF,
    };
}

function importRules() {
    return {
        'import/extensions': [
            ERROR,
            'never'
        ],
        'import/prefer-default-export': OFF,
    };
}

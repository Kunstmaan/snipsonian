/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const babelParser = require('@babel/parser');

exports.default = function getBabelAstFromFile(filePath: string): Node {
    const file = fs.readFileSync(filePath, 'utf8');
    const ast = babelParser.parse(file, {
        // parse in strict mode and allow module declarations
        sourceType: 'module',

        plugins: [
            'jsx',
            'typescript',
            'classProperties',
            'decorators-legacy',
            'dynamicImport',
        ],
    });

    return ast;
};

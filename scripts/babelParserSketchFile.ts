/* Use this file to inspect debug and inspect babel AST results */

/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
// const fileSystem = require('fs');
// const traverse = require('@babel/traverse').default;
const getBabelAst = require('../utils/getBabelAstFromFile').default;

const ast = getBabelAst('packages/snipsonian-core/src/index.ts');

// const loca: { start: number; end: number } = {
//     start: null,
//     end: null,
// };

console.log(ast);

// traverse(ast, {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     enter(path: any) {
//         if (
//             path.node.type === 'ExportDefaultDeclaration'
//         ) {
//             loca.start = path.node.start;
//             loca.end = path.node.end;

//             // console.log(path.node.declaration.returnType.end);
//             console.log(path.node.end, path.node.declaration.returnType.end);
//         }
//     },
// });

// const file: string =
//     fileSystem.readFileSync('packages/snipsonian-core/src/string/isEmptyString.ts', { encoding: 'utf8' });

// console.log(file.substring(loca.start, loca.end));

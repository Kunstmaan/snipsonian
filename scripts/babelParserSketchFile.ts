/* Use this file to inspect debug and inspect babel AST results */

/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
// const fs = require('fs');
// const traverse = require('@babel/traverse').default;
// const getBabelAst = require('../utils/getBabelAstFromFile').default;
const path = require('path');

console.log(path.parse('packages/snipsonian-core/src/url/replacePathParams.ts'));

// const ast = getBabelAst('packages/snipsonian-react/src/components/appShell/BodySwitcher/index.tsx');

// const loca: { start: number; end: number } = {
//     start: null,
//     end: null,
// };

// console.log(ast);

// traverse(ast, {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     enter(path: any) {
//         if (
//             path.node.type === 'ExportDefaultDeclaration'
//         ) {
//             console.log(path.node);
//         }
//     },
// });

// let locy: { start: number; end: number } = null;

// traverse(ast, {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     enter(path: any) {
//         if (
//             path.node.type === 'ExportDefaultDeclaration'
//         ) {
//             locy = {
//                 start: path.node.start,
//                 end:
//                     path.node.declaration &&
//                     path.node.declaration.returnType &&
//                     path.node.declaration.returnType.end,
//             };
//         }
//     },
// });

// const file: string =
//     fileSystem.readFileSync(
//         'packages/snipsonian-browser/src/serviceWorker/isServiceWorkerSupported.ts',
//         { encoding: 'utf8' },
//     );

// console.log(locy, file.substring(locy.start, locy.end));


import { IAstNodeLocation, IAstMethod } from '../models/astManager.models';

/* Use this file to inspect debug and inspect babel AST results */

/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
// const fs = require('fs');
const traverse = require('@babel/traverse').default;
const getBabelAst = require('../utils/getBabelAstFromFile').default;

// const file: string = fs.readFileSync('packages/snipsonian-core/src/is/isBoolean.ts', { encoding: 'utf8' });
// const ast = getBabelAst('packages/snipsonian-react/src/components/appShell/BodySwitcher/index.tsx');
const ast = getBabelAst('packages/snipsonian-axios/src/header/headerManager.ts');

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
//             if (path.node.declaration.type === 'ClassDeclaration') {
//                 console.log((path.node.declaration.body.body.forEach()));
//                 // console.log((path.node.declaration.body));
//             }
//         }
//     },
// });

const locations: IAstNodeLocation[] = [];
console.log(ast.program.body);
traverse(ast, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    enter(p: any) {
        if (
            p.node.type === 'ExportDefaultDeclaration'
        ) {
            console.log(Object.keys(p.node.declaration));
            if (p.node.declaration.type === 'ClassDeclaration') {
                locations.push({
                    start: p.node.start,
                    end: p.node.declaration.body.start,
                });

                p.node.declaration.body.body.forEach((method: IAstMethod) => {
                    if (method.type === 'ClassMethod' && method.accessibility === 'public') {
                        locations.push({
                            start: method.start,
                            end: method.body.start,
                        });
                    }
                });
            } else if (p.node.declaration.type === 'FunctionDeclaration') {
                locations.push({
                    start: p.node.start,
                    end:
                        p.node.declaration &&
                        p.node.declaration.returnType &&
                        p.node.declaration.returnType.end,
                });
            }
        }
    },
});

// console.log(file.substring(63, 116));

// console.log(locations.reduce(
//     (acc, location) => acc + file.substr(location.start, location.end),
//     '',
// ));

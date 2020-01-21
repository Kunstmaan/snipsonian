import { IAstManager, IAst } from '../models/astManager.models';

/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const traverse = require('@babel/traverse').default;
const getBabelAst = require('./getBabelAstFromFile').default;

exports.default = function createAstManager({ filePath }: { filePath: string }): IAstManager {
    if (!fs.existsSync(filePath)) { return null; }
    const ast: IAst = getBabelAst(filePath);

    function getAst(): IAst {
        return ast;
    }

    function getDescriptionAtStartOfFile(): string {
        let description = '';

        if (ast.comments && ast.comments.length > 0) {
            const commentAtStartOfFile = ast.comments.find((comment) => comment.start === 0);
            if (commentAtStartOfFile && commentAtStartOfFile.value) {
                description = commentAtStartOfFile.value.trim();
            }
        }

        return description;
    }

    function getDefaultExport(): string {
        let location: { start: number; end: number } = null;

        traverse(ast, {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            enter(path: any) {
                if (
                    path.node.type === 'ExportDefaultDeclaration'
                ) {
                    location = {
                        start: path.node.start,
                        end:
                            path.node.declaration &&
                            path.node.declaration.returnType &&
                            path.node.declaration.returnType.end,
                    };
                }
            },
        });

        const file: string = fs.readFileSync(filePath, { encoding: 'utf8' });

        if (!location || !location.start || !location.end) { return null; }
        return file.substring(location.start, location.end);
    }

    return {
        getAst,
        getDefaultExport,
        getDescriptionAtStartOfFile,
    };
};

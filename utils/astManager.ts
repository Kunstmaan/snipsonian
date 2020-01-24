import { IAstManager, IAst, IAstComment, IAstNodeLocation } from '../models/astManager.models';

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

        if (fileHasComments(ast)) {
            const commentAtStartOfFile = getCommentAtStartOfFile(ast);
            if (commentAtStartOfFile && commentAtStartOfFile.value) {
                description = commentAtStartOfFile.value.trim();
            }
        }

        return description;
    }

    function getDefaultExport(): string {
        const defaultExportLocation: IAstNodeLocation | null =
            getStartEndFromDefaultExportDeclaration(ast);

        const file: string = fs.readFileSync(filePath, { encoding: 'utf8' });

        if (locationHasNoValidLocation(defaultExportLocation)) { return null; }
        return file.substring(defaultExportLocation.start, defaultExportLocation.end);
    }

    return {
        getAst,
        getDefaultExport,
        getDescriptionAtStartOfFile,
    };
};

function fileHasComments(ast: IAst): boolean {
    return ast.comments && ast.comments.length > 0;
}

function getCommentAtStartOfFile(ast: IAst): IAstComment {
    return ast.comments.find((comment) => comment.start === 0);
}

function getStartEndFromDefaultExportDeclaration(ast: IAst): IAstNodeLocation | null {
    let location: IAstNodeLocation = null;
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

    return location;
}

function locationHasNoValidLocation(defaultExportLocation: IAstNodeLocation): boolean {
    return !defaultExportLocation ||
        typeof defaultExportLocation.start === 'undefined' ||
        typeof defaultExportLocation.end === 'undefined';
}

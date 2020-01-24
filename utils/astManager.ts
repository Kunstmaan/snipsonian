import { IAstManager, IAst, IAstComment, IAstNodeLocation } from '../models/astManager.models';

/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const path = require('path');
const traverse = require('@babel/traverse').default;
const getBabelAst = require('./getBabelAstFromFile').default;

exports.default = function createAstManager({ filePath }: { filePath: string }): IAstManager {
    if (!fs.existsSync(filePath)) { return null; }
    const ast: IAst = getBabelAst(filePath);

    function getAst(): IAst {
        return ast;
    }

    function getDescriptionAtStartOfFile(): string | null {
        let description = null;

        if (fileHasComments(ast)) {
            const commentAtStartOfFile = getCommentAtStartOfFile(ast);
            if (commentAtStartOfFile && commentAtStartOfFile.value) {
                description = commentAtStartOfFile.value.trim();
            }
        }

        return description;
    }

    function getDefaultExport(): string | null {
        const defaultExportLocation: IAstNodeLocation | null =
            getStartEndFromDefaultExportDeclaration(ast);

        const file: string = fs.readFileSync(filePath, { encoding: 'utf8' });

        if (locationHasNoValidLocation(defaultExportLocation)) { return null; }
        return file.substring(defaultExportLocation.start, defaultExportLocation.end);
    }

    function getExampleCode(): string | null {
        const parsedPath = path.parse(filePath);
        const examplePath = `${parsedPath.dir}/${parsedPath.name}.example.ts`;
        if (fs.existsSync(examplePath)) {
            return fs.readFileSync(examplePath, { encoding: 'utf8' });
        }
        return null;
    }

    return {
        getAst,
        getDefaultExport,
        getDescriptionAtStartOfFile,
        getExampleCode,
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
        enter(p: any) {
            if (
                p.node.type === 'ExportDefaultDeclaration'
            ) {
                location = {
                    start: p.node.start,
                    end:
                        p.node.declaration &&
                        p.node.declaration.returnType &&
                        p.node.declaration.returnType.end,
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

import { IAstManager, IAst, IAstNodeLocation } from '../models/astManager.models';

/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const path = require('path');
const traverse = require('@babel/traverse').default;
const getBabelAst = require('./getBabelAstFromFile').default;

exports.default = function createAstManager({ filePath }: { filePath: string }): IAstManager {
    if (!fs.existsSync(filePath)) {
        console.log('CreateAstManager: File does not exist, returning null');
        return null;
    }
    const ast: IAst = getBabelAst(filePath);
    const file: string = fs.readFileSync(filePath, { encoding: 'utf8' });

    function getAst(): IAst {
        return ast;
    }

    function getDescriptionAtStartOfFile(): string | null {
        let description = null;

        if (file.startsWith('/**')) {
            description = getCommentAtStartOfFile(file);
        }

        return description;
    }

    function getDefaultExport(): string | null {
        const defaultExportLocation: IAstNodeLocation | null =
            getStartEndFromDefaultExportDeclaration(ast);

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

function getCommentAtStartOfFile(file: string): string {
    const comment = file.split('*/')[0];
    return comment.replace('/**', '').replace(' * ', '').trim();
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

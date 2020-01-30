import { IAstManager, IAst, IAstNodeLocation, IAstMethod } from '../models/astManager.models';

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

    function getExports(): string | null {
        const exportLocations: IAstNodeLocation[] =
            getStartEndFromExportDeclaration(ast);

        if (exportLocations.length <= 0) { return null; }
        return exportLocations.reduce(
            (acc, location, index) => {
                if (locationHasNoValidLocation(location)) {
                    return acc;
                }
                // eslint-disable-next-line prefer-template
                return acc + ((index !== 0) ? '\n\n' : '') + file.substring(location.start, location.end);
            },
            '',
        ).trim();
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
        getExports,
        getDescriptionAtStartOfFile,
        getExampleCode,
    };
};

function getCommentAtStartOfFile(file: string): string {
    const comment = file.split('*/')[0];
    return comment.replace('/**', '').replace(' * ', '').trim();
}

function getStartEndFromExportDeclaration(ast: IAst): IAstNodeLocation[] {
    const locations: IAstNodeLocation[] = [];
    traverse(ast, {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        enter(p: any) {
            if (
                p.node.type === 'ExportDefaultDeclaration' ||
                p.node.type === 'ExportNamedDeclaration'
            ) {
                if (p.node.declaration) {
                    if (p.node.declaration.body) {
                        locations.push({
                            start: p.node.start,
                            end: p.node.declaration.body.start,
                        });
                    }
                    if (p.node.declaration.type === 'ClassDeclaration') {
                        p.node.declaration.body.body.forEach((method: IAstMethod) => {
                            if (method.type === 'ClassMethod' && method.accessibility === 'public') {
                                locations.push({
                                    start: method.start,
                                    end: method.body.start,
                                });
                            }
                        });
                    }
                }
            }
        },
    });

    return locations;
}

function locationHasNoValidLocation(location: IAstNodeLocation): boolean {
    return !location ||
        (!location.start && location.start !== 0) ||
        (!location.end && location.start !== 0);
}

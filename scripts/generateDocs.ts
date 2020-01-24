import {
    IDocumentationItem,
    IPackageVersionDocumentation,
    IFileInfo,
} from '../packages/snipsonian-docs/src/models/documentation';
import { IAstManager } from '../models/astManager.models';

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const junk = require('junk');

const createAstManager = require('../utils/astManager').default;

const PACKAGES_DIR = 'packages';
const DOCS_DIR = 'packages/snipsonian-docs/documentation';
const EXTENSIONS_TO_IGNORE_REGEX = /\.spec\.ts$|\.scss$|\.example\.ts$/;

fs.readdirSync(PACKAGES_DIR)
    .filter(junk.not) // removes junk files like '.DS_Store'
    .forEach((fileName: string) => {
        if (fileName === 'snipsonian-docs') {
            return;
        }
        const { version: packageVersion } = getPackageJsonAsObject({ fileName });
        const data = createPackageDocumentation({ fileName, packageVersion });
        writeDocumentationToDocumentationFolder({ fileName, data, packageVersion });
    });

function createDocumentationRecursive({ filePath, slug }: { filePath: string; slug: string }): IDocumentationItem {
    const stats = fs.lstatSync(filePath);
    const name = path.basename(filePath);
    const info = initDocumentationItem();

    if (stats.isDirectory()) {
        info.type = 'folder';
        info.children = createFolderDocumentation();
    } else {
        // Assuming it's a file
        info.type = 'file';
        info.fileInfo = createFileInfo();
    }

    return info;

    function initDocumentationItem(): IDocumentationItem {
        return {
            name,
            path: filePath,
            slug: `${slug}/${name}`,
            type: null,
        };
    }

    function createFolderDocumentation(): IDocumentationItem[] {
        return fs.readdirSync(info.path)
            .filter((child: string) => !RegExp(EXTENSIONS_TO_IGNORE_REGEX).test(child))
            .map((child: string) => createDocumentationRecursive({
                filePath: `${info.path}/${child}`,
                slug: info.slug,
            }));
    }

    function createFileInfo(): IFileInfo {
        const astManager: IAstManager = createAstManager({ filePath });
        return {
            defaultExport: astManager.getDefaultExport(),
            example: astManager.getExampleCode(),
        };
    }
}

function getPackageJsonAsObject({ fileName }: { fileName: string }): { version: string } {
    return JSON.parse(fs.readFileSync(`${PACKAGES_DIR}/${fileName}/package.json`));
}

function createPackageDocumentation({
    fileName,
    packageVersion,
}: { fileName: string; packageVersion: string }): string {
    const packagePath = `${PACKAGES_DIR}/${fileName}/src`;
    const packageSlug = `/${fileName}/${packageVersion}`;
    const astManager: IAstManager = createAstManager({ filePath: `${packagePath}/index.ts` });

    const packageDocumentation: IPackageVersionDocumentation = {
        title: fileName,
        version: packageVersion,
        slug: packageSlug,
        description: astManager ? astManager.getDescriptionAtStartOfFile() : '',
        documentation: fs.readdirSync(packagePath)
            .filter((child: string) => !RegExp(EXTENSIONS_TO_IGNORE_REGEX).test(child))
            .map((child: string) => createDocumentationRecursive({
                filePath: `${packagePath}/${child}`,
                slug: packageSlug,
            })),
    };

    return JSON.stringify(packageDocumentation, null, 4);
}

function writeDocumentationToDocumentationFolder({
    fileName,
    packageVersion,
    data,
}: { fileName: string; packageVersion: string; data: string }): void {
    const destinationPath = `${DOCS_DIR}/${fileName}`;
    fs.mkdir(destinationPath, { recursive: true }, (mkdirErr: Error) => {
        if (mkdirErr) {
            console.log(mkdirErr);
            throw mkdirErr;
        }
        fs.writeFile(`${destinationPath}/${packageVersion}.json`, data, (writeErr: Error) => {
            if (writeErr) {
                console.log(writeErr);
                throw writeErr;
            }
            console.log(`${fileName} docs have been saved!`);
        });
    });
}

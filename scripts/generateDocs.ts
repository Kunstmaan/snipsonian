import { IDocumentationItem, IPackageDocumentation } from '../packages/snipsonian-docs/src/models/documentation';
import { IAstManager } from '../models/astManager.models';

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const junk = require('junk');

const createAstManager = require('../utils/astManager').default;

const PACKAGES_DIR = 'packages';
const DOCS_DIR = 'packages/snipsonian-docs/documentation';
const FILENAME_REGEX = /\.spec\.ts$|\.scss$/;

function dirTree(filePath: string, slug: string): IDocumentationItem {
    const stats = fs.lstatSync(filePath);
    const name = path.basename(filePath);
    const info: IDocumentationItem = {
        name,
        path: filePath,
        slug: `${slug}/${name}`,
        type: null,
    };

    if (stats.isDirectory()) {
        info.type = 'folder';
        info.children = fs.readdirSync(info.path)
            .filter((child: string) => !RegExp(FILENAME_REGEX).test(child))
            .map((child: string) => dirTree(`${info.path}/${child}`, info.slug));
    } else {
        // Assuming it's a file
        info.type = 'file';

        const astManager: IAstManager = createAstManager({ filePath });
        info.fileInfo = {
            defaultExport: astManager.getDefaultExport(),
        };
    }

    return info;
}

fs.readdirSync(PACKAGES_DIR)
    .filter(junk.not) // removes junk files like '.DS_Store'
    .forEach((file: string) => {
        if (file === 'snipsonian-docs') {
            return;
        }
        const pkgPath = `${PACKAGES_DIR}/${file}/src`;
        const pkgSlug = `/${file}`;
        const astManager: IAstManager = createAstManager({ filePath: `${pkgPath}/index.ts` });

        const packageDocumentation: IPackageDocumentation = {
            title: file,
            slug: pkgSlug,
            description: astManager ? astManager.getDescriptionAtStartOfFile() : '',
            documentation: fs.readdirSync(pkgPath)
                .filter((child: string) => !RegExp(FILENAME_REGEX).test(child))
                .map((child: string) => dirTree(`${pkgPath}/${child}`, pkgSlug)),
        };

        const data = JSON.stringify(packageDocumentation, null, 4);
        const docPath = `${DOCS_DIR}/${file}`;

        fs.mkdir(docPath, { recursive: true }, (mkdirErr: Error) => {
            if (mkdirErr) {
                console.log(mkdirErr);
                throw mkdirErr;
            }
            fs.writeFile(`${docPath}/docs.json`, data, (writeErr: Error) => {
                if (writeErr) {
                    console.log(writeErr);
                    throw writeErr;
                }
                console.log(`${file} docs have been saved!`);
            });
        });
    });

import { IDocumentationItem } from '../packages/snipsonian-docs/src/models/documentation';

/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const junk = require('junk');

const PACKAGES_DIR = 'packages';
const DOCS_DIR = 'packages/snipsonian-docs/documentation';

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
            .map((child: string) => dirTree(`${info.path}/${child}`, info.slug));
    } else {
        // Assuming it's a file
        info.type = 'file';
    }

    return info;
}

fs.readdirSync(PACKAGES_DIR)
    .filter(junk.not) // removes junk files like '.DS_Store'
    .forEach((file: string) => {
        const pkgPath = `${PACKAGES_DIR}/${file}/src`;

        const data = JSON.stringify(dirTree(pkgPath, `/${file}`), null, 4);
        const docPath = `${DOCS_DIR}/${file}`;

        fs.mkdir(docPath, { recursive: true }, (mkdirErr: Error) => {
            if (mkdirErr) throw mkdirErr;
            fs.writeFile(`${docPath}/docs.json`, data, (writeErr: Error) => {
                if (writeErr) throw writeErr;
                console.log(`${file} docs have been saved!`);
            });
        });
    });

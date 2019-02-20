const fs = require('fs');
const path = require('path');
import isDirectorySync from './isDirectorySync';

export interface IFile {
    name: string;
    path: string;
}

export default function getFilesRecursiveSync({ sourcePath } : { sourcePath: string }): IFile[] {
    return fs.readdirSync(sourcePath)
        .reduce(
            (filesAccumulator: IFile[], itemName: string) => {
                const itemPath = path.resolve(sourcePath, itemName);

                if (isDirectorySync({ inputPath: itemPath })) {
                    filesAccumulator.push(...getFilesRecursiveSync({ sourcePath: itemPath }));
                } else {
                    filesAccumulator.push({
                        name: itemName,
                        path: itemPath,
                    });
                }

                return filesAccumulator;
            },
            [],
        );
}

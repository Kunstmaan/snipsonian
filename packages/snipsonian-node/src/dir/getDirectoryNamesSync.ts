const fs = require('fs');
const path = require('path');
import isDirectorySync from './isDirectorySync';

export default function getDirectoryNamesSync({ sourcePath } : { sourcePath: string}): string[] {
    return fs.readdirSync(sourcePath)
        .filter((name: string) => isDirectorySync({
            inputPath: path.resolve(sourcePath, name),
        }));
}

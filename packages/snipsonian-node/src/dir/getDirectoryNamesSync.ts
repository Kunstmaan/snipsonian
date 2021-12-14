import isDirectorySync from './isDirectorySync';

const fs = require('fs');
const path = require('path');

export default function getDirectoryNamesSync({ sourcePath }: { sourcePath: string }): string[] {
    return fs.readdirSync(sourcePath)
        .filter((name: string) => isDirectorySync({
            inputPath: path.resolve(sourcePath, name),
        }));
}

const fs = require('fs');

export default function isDirectorySync({ inputPath }: { inputPath: string }): boolean {
    return fs.lstatSync(inputPath).isDirectory();
}

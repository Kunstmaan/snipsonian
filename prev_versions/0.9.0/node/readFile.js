function readFile({filePath, options = {}, fs}) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, options, (err, fileContent) => {
            if (err) return reject(err);
            return resolve(fileContent);
        });
    });
}

module.exports = readFile;
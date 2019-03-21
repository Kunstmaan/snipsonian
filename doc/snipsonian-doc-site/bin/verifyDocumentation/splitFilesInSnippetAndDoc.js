const path = require('path');

module.exports = function splitFilesInSnippetAndDoc(filepaths) {
    const splitFilePaths = {
        snippetPaths: [],
        docPaths: []
    };

    filepaths.forEach((filePath) => {
        if (filePath.includes('.doc.')) {
            splitFilePaths.docPaths.push(filePath);
        } else if (path.dirname(filePath).split(path.sep).pop() !== 'src') {
            splitFilePaths.snippetPaths.push(filePath);
        }
    });

    return splitFilePaths;
};
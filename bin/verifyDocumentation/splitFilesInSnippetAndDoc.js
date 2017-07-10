const path = require('path');

module.exports = function splitFilesInSnippetAndDoc(data) {
    return new Promise((resolve) => {
        const result = {
            snippets: [],
            docs: []
        };
        data.forEach((file) => {
            if (file.includes('.doc.')) {
                result.docs.push(file);
            } else if (path.dirname(file).split(path.sep).pop() !== 'src') {
                result.snippets.push(file);
            }
        });

        resolve(result);
    });
};
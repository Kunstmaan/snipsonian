const chalk = require('chalk');

module.exports = function checkIfAllSNippetsHaveDocFiles(data, result) {
    return new Promise((resolve, reject) => {
        const snippetsWithoutDoc = data.snippets.filter((snippet) => {
            const snippetDocFileName = snippet.replace(/\.js$/, '.doc.js');

            return data.docs.indexOf(snippetDocFileName) !== -1;
        });

        if (snippetsWithoutDoc.length > 0) {

            //TODO: Split message in type, message, files
            let message = chalk.bold.underline(`There are ${snippetsWithoutDoc.length} files currently without documentation:`);

            snippetsWithoutDoc.forEach((snippet) => { message += `\n\t${snippet}`; });

            result.errors.push({message});
        }

        resolve({data, result});
    });
};
const path = require('path');

const config = require('./config');
const getPreviousVersionPagePath = require('./getPreviousVersionPagePath');

const readFile = require('../../src/node/readFile');
const writeFile = require('../../src/node/writeFile');


module.exports = function createPage() {
    console.log(' ✍️\tCreating page...');
    return new Promise((resolve, reject) => {
        let previousVersionPageVersion;
        getPreviousVersionPagePath()
            .then((prevVersionPage) => {
                previousVersionPageVersion = prevVersionPage.name;
                return readFile({filePath: prevVersionPage.path, options: 'utf8'});
            })
            .then((page) => {
                const updatedPage = page.replace(new RegExp(previousVersionPageVersion, 'g'), config.NEW_VERSION);
                const updatedPagePath = path.resolve(__dirname, `../pages/doc/${config.NEW_VERSION}.jsx`);
                return writeFile({filePath: updatedPagePath, data: updatedPage});
            })
            .then(resolve)
            .catch(reject);
    });
};
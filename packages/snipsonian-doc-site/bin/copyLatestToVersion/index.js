const config = require('./config');

const changeSinceValue = require('./changeSinceValue');
const copyFilesToNewLocation = require('./copyFilesToNewLocation');
const createFolders = require('./createFolders');
const createPage = require('./createPage');
const editDocRef = require('./editDocRef');
const filterOutSpec = require('../common/filterOutSpec');
const removePreviousPatchVersion = require('./removePreviousPatchVersion');
const showFinishedMessage = require('./showFinishedMessage');
const walkThroughDir = require('../common/walkThroughDir');

walkThroughDir(config.SOURCE_DIR)
    .then(filterOutSpec)
    .then(changeSinceValue)
    .then(createFolders)
    .then(copyFilesToNewLocation)
    .then(removePreviousPatchVersion)
    .then(editDocRef)
    .then(createPage)
    .then(showFinishedMessage)
    .catch((e) => {
        console.error(e);
        throw e;
    });

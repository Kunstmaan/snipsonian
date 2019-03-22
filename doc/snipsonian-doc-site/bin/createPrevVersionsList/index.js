console.log('Creating the prevVersionsList.json file');
const fs = require('fs');
const path = require('path');

const PATH = {
    PREV_VERSIONS_DIR: '../../prev_versions',
    PREV_VERSIONS_LIST: '../../config/prevVersionsList.json'
};

const dirName = path.resolve(__dirname, PATH.PREV_VERSIONS_DIR);
const dirMap = fs.readdirSync(dirName);

console.log(`Found versions: ${dirMap}`);

const stringToSave = JSON.stringify(dirMap);

console.log('Writing to disk...');

fs.writeFileSync(path.resolve(__dirname, PATH.PREV_VERSIONS_LIST), stringToSave);

console.log(`Your brand new prevVersionsListFile can be found in ${path.resolve(__dirname, PATH.PREV_VERSIONS_LIST)}.
Have Fun!
------------------------------------------------------------------------------------------------------------------------
Brought to you by Kunstmaan Development
------------------------------------------------------------------------------------------------------------------------
`);
console.log('Creating the prevVersionsList.json file');
const fs = require('fs');
const path = require('path');

const dirName = path.resolve(__dirname, '../prev_versions');
const dirMap = fs.readdirSync(dirName);

console.log(`Found versions: ${dirMap}`);

const stringToSave = JSON.stringify(dirMap);

console.log('Writing to disk...');
fs.writeFileSync(path.resolve(__dirname,'../config/prevVersionsList.json'), stringToSave);
console.log(`Your brand new prevVersionsListFile can be found in ${path.resolve(__dirname, '../config/prevVersionsList.json')}.
Have Fun!
------------------------------------------------------------------------------------------------------------------------
Brought to you by Kunstmaan Development
------------------------------------------------------------------------------------------------------------------------
`);
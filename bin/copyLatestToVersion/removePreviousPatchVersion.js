const del = require('del');
const fs = require('fs');
const path = require('path');
const semver = require('semver');

const config = require('./config');

module.exports = function removePreviousPatchVersion() {
    console.log(' 🗑\tRemoving previous patch versions ...');
    return new Promise((resolve) => {
        const splitVersion = config.NEW_VERSION.split('.');
        splitVersion.pop();
        fs.readdir(config.PREV_VERSION_PATH, (err, folders) => {
            folders.forEach((folder) => {
                if (semver.satisfies(folder, `${splitVersion.join('.')}.x <${config.NEW_VERSION}`)) {
                    del.sync(path.resolve(config.PREV_VERSION_PATH, folder));
                    del.sync(path.resolve(config.PAGES_PATH, `${folder}.jsx`));
                }
            });
            resolve();
        });
    });
};
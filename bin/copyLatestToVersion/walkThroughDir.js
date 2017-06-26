const walk = require('../helpers/walk');


module.exports = function walkThroughDir(dir) {
    return new Promise((resolve, reject) => {
        console.log(' 🚶\tWalking through the source directory to get full paths for all files...');
        walk(dir, (err, data) => {
            if (err) return reject(err);
            return resolve(data);
        });
    });
}
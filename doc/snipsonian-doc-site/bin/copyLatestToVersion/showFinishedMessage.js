const config = require('./config');

module.exports = function showFinishedMessage() {
    console.log(` 🎉\tSuccess! You can find your files in '${config.DEST_DIR}'`);
};
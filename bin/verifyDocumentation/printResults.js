const chalk = require('chalk');

module.exports = function printResults({data, result}) {
    result.errors.forEach((error) => {
        console.error(chalk.red(`⛔  ${error.message}`));
    });

    result.warnings.forEach((warning) => {
        console.warn(chalk.yellow(` ⚠️  ${warning.message}`));
    });
};
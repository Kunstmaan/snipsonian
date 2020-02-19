const path = require('path');
const { unflatten } = require('flat');
const writeYamlFile = require('../utils/writeYamlFile');

module.exports = writeFixedTranslations;

function writeFixedTranslations({
    diffs,
    translationFileExtension,
}) {
    const promises = [];

    Object.keys(diffs)
        .forEach((translationsParentPath) => {
            const diffPerPath = diffs[translationsParentPath];

            Object.keys(diffPerPath)
                .forEach((locale) => {
                    const diff = diffPerPath[locale];

                    const translationFilePath = path.resolve(
                        translationsParentPath,
                        `${locale}${translationFileExtension}`,
                    );
                    const content = unflatten(diff.fixed);

                    // console.log(`[DEBUG] ${translationsParentPath} - ${locale}:\n${JSON.stringify(content)}`);

                    promises.push(writeYamlFile({
                        filePath: translationFilePath,
                        content,
                        sortKeys: true,
                    }));
                });
        });

    return Promise.all(promises);
}

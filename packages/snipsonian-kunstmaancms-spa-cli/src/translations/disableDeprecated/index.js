const translationsApi = require('../api/translationsApi');
const logStyles = require('../utils/logStyles');

const MESSAGES = {
    targetEnv: (targetEnv) => logStyles.emphasis(`Target environment: ${targetEnv}\n`),
    disabling: (maxDeprecationDate) =>
        `Disabling all translation keys that were deprecated before the input date '${maxDeprecationDate}' ...\n`,
    disableError: logStyles.error('[ERROR] The deprecated translations could not be disabled.\n\n'),
    disableSuccess: logStyles.success('[SUCCESS] The deprecated translations, older than the ' +
        'input date, were disabled.\n\n'),
};

module.exports = disableDeprecatedTranslations;

function disableDeprecatedTranslations({
    targetEnv,
    targetEnvBaseUrl,
    targetEnvApiKey,
    translationsDomain,
    maxDeprecationDate,
}) {
    console.log(MESSAGES.targetEnv(targetEnv));
    console.log(MESSAGES.disabling(maxDeprecationDate));

    return translationsApi.disableTranslations({
        baseUrl: targetEnvBaseUrl,
        domain: translationsDomain,
        apiKey: targetEnvApiKey,
        maxDeprecationDate,
    })
        .then(() => {
            console.log(MESSAGES.disableSuccess);
        })
        .catch((error) => {
            console.log(MESSAGES.disableError);
            console.log(error);
        });
}

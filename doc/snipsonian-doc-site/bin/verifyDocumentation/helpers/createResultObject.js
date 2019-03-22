module.exports = function createResultObject({errorOrWarning = 'error', type, file, expected, current}) {
    return {
        errorOrWarning,
        type,
        file,
        expected,
        current
    };
};
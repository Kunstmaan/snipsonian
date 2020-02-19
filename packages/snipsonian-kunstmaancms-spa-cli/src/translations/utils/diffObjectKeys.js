module.exports = diffObjectKeys;

/**
 * Creates a diff for the 1st-level-keys of 2 objects.
 *
 * takeMasterValueIfMissing:
 * - false (default) -> the missingKeyPlaceholder will be used in the fixed object
 * - true -> the value of the master key will be used in the fixed object
 *
 * takeMasterValueIfExisting:
 * - false (default) -> the slave value will be used in the fixed object
 * - true -> the value of the master key will be used in the fixed object
 */
function diffObjectKeys({
    master,
    slave = {},
    missingKeyPlaceholder = '-',
    takeMasterValueIfMissing = false,
    takeMasterValueIfExisting = false,
}) {
    const clonedSlave = JSON.parse(JSON.stringify(slave));

    const diff = {
        missing: [],
        unnecessary: [],
        existing: [],
        fixed: {},
    };

    checkKeysOnlyInMaster({
        diff,
        master,
        slave: clonedSlave,
        missingKeyPlaceholder,
        takeMasterValueIfMissing,
        takeMasterValueIfExisting,
    });
    checkKeysOnlyInSlave({ diff, slave: clonedSlave });

    diff.areDiffsDetected = (diff.missing.length + diff.unnecessary.length) > 0;

    return diff;
}

/* eslint-disable no-param-reassign */

function checkKeysOnlyInMaster({
    diff,
    master,
    slave,
    missingKeyPlaceholder,
    takeMasterValueIfMissing,
    takeMasterValueIfExisting,
}) {
    Object.keys(master)
        .forEach((key) => {
            if (typeof slave[key] === 'undefined') {
                diff.missing.push(key);
                diff.fixed[key] = takeMasterValueIfMissing ? master[key] : missingKeyPlaceholder;
            } else {
                diff.existing.push(key);
                diff.fixed[key] = takeMasterValueIfExisting ? master[key] : slave[key];
                delete slave[key];
            }
        });
}

function checkKeysOnlyInSlave({ diff, slave }) {
    if (Object.keys(slave).length > 0) {
        diff.unnecessary = Object.keys(slave);
    }
}

/* eslint-enable no-param-reassign */

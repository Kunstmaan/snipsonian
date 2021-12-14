import assert from '@snipsonian/core/src/assert';
import isSet from '@snipsonian/core/src/is/isSet';
import isObjectPure from '@snipsonian/core/src/is/isObjectPure';
import localStorage from '@snipsonian/browser/src/storage/localStorage';

export default function getLocalDvlpConfig<DvlpConfig extends object = {}>({
    storageKey,
    defaultDevConfig = ({} as DvlpConfig),
}: {
    storageKey: string;
    defaultDevConfig?: DvlpConfig;
}): DvlpConfig {
    assert(storageKey, isSet, 'Invalid storageKey {val}');
    assert(defaultDevConfig, isObjectPure, 'Invalid defaultDevConfig input. Should be an object.');

    const storedDevConfig = localStorage.readOrSave({
        key: storageKey,
        valueToSaveIfNotThere: defaultDevConfig,
    });

    const mergedDevConfig = {
        ...defaultDevConfig,
        ...(storedDevConfig as object),
    };

    localStorage.save({
        key: storageKey,
        value: mergedDevConfig,
    });

    return mergedDevConfig;
}

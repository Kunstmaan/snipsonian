import localStorage from '../storage/localStorage';
import {assert} from '../generic/assert';
import {is} from '../generic/is';

export default function getLocalDvlpConfig({storageKey, defaultDevConfig = {}}) {
    assert(storageKey, is.set, 'Invalid storageKey {val}');
    assert(defaultDevConfig, is.object, 'Invalid defaultDevConfig input. Should be an object.');

    const storedDevConfig = localStorage.readOrSave({
        key: storageKey,
        valueToSaveIfNotThere: defaultDevConfig
    });

    const mergedDevConfig = Object.assign({}, defaultDevConfig, storedDevConfig);

    localStorage.save({
        key: storageKey,
        value: mergedDevConfig
    });

    return mergedDevConfig;
}

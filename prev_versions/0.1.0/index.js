import {group, registerGroups} from './_docRef';

import assertDoc from './generic/assert.doc';
import isDoc from './generic/is.doc';

registerGroups([
    group('generic').snippets(
        assertDoc,
        isDoc
    )
]);
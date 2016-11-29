import {group, registerGroups} from './_docRef';

import assertDoc from './generic/assert.doc';
import isDoc from './generic/is.doc';
import collapsableDoc from './decorator/collapsable.doc';

registerGroups([
    group('generic').snippets(
        assertDoc,
        isDoc
    ),
    group('decorator').snippets(
        collapsableDoc
    )
]);
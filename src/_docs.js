import {group, registerGroups} from './_docRef';

import isDoc from './generic/is.doc';
import collapsableDoc from './decorator/collapsable.doc';

registerGroups([
    group('generic').snippets(
        isDoc
    ),
    group('decorator').snippets(
        collapsableDoc
    )
]);
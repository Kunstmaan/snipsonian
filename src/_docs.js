import {group} from './_docRef';

import assertDoc from './generic/assert.doc';
import isDoc from './generic/is.doc';

import buildIfBuilderDoc from './builder/buildIfBuilder.doc';

import addPropDoc from './decorator/addProp.doc';
import builderDoc from './decorator/builder.doc';
import collapsableDoc from './decorator/collapsable.doc';

export default [
    group('generic').snippets(
        assertDoc,
        isDoc
    ),
    group('builder').snippets(
        buildIfBuilderDoc
    ),
    group('decorator').snippets(
        addPropDoc,
        builderDoc,
        collapsableDoc
    )
];
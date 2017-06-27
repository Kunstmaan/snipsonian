import {group} from './_docRef';

import buildIfBuilderDoc from './builder/buildIfBuilder.doc';

import addPropDoc from './decorator/addProp.doc';
import builderDoc from './decorator/builder.doc';
import collapsableDoc from './decorator/collapsable.doc';

import assertDoc from './generic/assert.doc';
import isDoc from './generic/is.doc';

import writeFile from './node/writeFile.doc';
import readFile from './node/readFile.doc';

import replacePlaceholdersDoc from './string/replacePlaceholders.doc';

import getUrlPartBetweenDoc from './url/getUrlPartBetween.doc';

/* ADD MORE DOC FILES HERE */

export default [
    group('builder').snippets(
        buildIfBuilderDoc
    ),
    group('decorator').snippets(
        addPropDoc,
        builderDoc,
        collapsableDoc
    ),
    group('generic').snippets(
        assertDoc,
        isDoc
    ),
    group('node').snippets(
        writeFile,
        readFile
    ),
    group('string').snippets(
        replacePlaceholdersDoc
    ),
    group('url').snippets(
        getUrlPartBetweenDoc
    )
];
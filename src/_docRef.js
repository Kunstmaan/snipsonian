/* eslint import/no-unresolved: ["off"] */
export {group, registerGroups, getRegisteredGroups} from '../docTreeGenerator/documentJs';

export {
    snippet,
    type,
    name,
    desc,
    param,
    paramObject,
    paramObjectField,
    returns,
    canThrow,
    examples,
    parts,
    authors,
    since,
    deprecated,
    signature
}
    from '../docTreeGenerator/snippet/jsSnippetDocDecorators';

export {decorate} from './decorator/decorate';

export {JS_DOC_TYPE} from '../docTreeGenerator/snippet/jsDocTypes';

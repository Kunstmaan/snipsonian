/* eslint import/no-unresolved: ["off"] */
export {group, registerGroups, getRegisteredGroups} from '../docTreeGenerator/documentJs';

export {snippet, type, name, desc, param, returns, canThrow, examples, parts, authors}
    from '../docTreeGenerator/snippet/jsSnippetDocDecorators';

export {decorate} from './decorator/decorateWith';

export {JS_DOC_TYPE} from '../docTreeGenerator/snippet/jsDocTypes';

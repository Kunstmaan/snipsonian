/* eslint import/no-unresolved: ["off"] */
export {group, registerGroups, getRegisteredGroups} from 'doc-package/documentJs';

export {snippet, type, desc, param, returns, canThrow, examples, parts, authors}
    from 'doc-package/snippet/jsSnippetDocDecorators';

export {decorate} from './decorator/decorateWith';

export {JS_DOC_TYPE} from 'doc-package/snippet/jsDocTypes';
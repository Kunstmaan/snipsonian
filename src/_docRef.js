/* eslint import/no-unresolved: ["off"] */
export {group, prop, registerGroups, getRegisteredGroups} from 'doc-package/documentJs';

export {snippet, type, desc, params, param, returns, throws, examples, parts, authors}
    from 'doc-package/snippet/jsSnippetDocDecorators';

export {decorate} from './decorator/decorateWith';

export {JS_DOC_TYPE} from 'doc-package/snippet/jsDocTypes';
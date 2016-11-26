/* eslint import/no-unresolved: ["off"] */
export {group, prop, registerGroups, getRegisteredGroups} from 'doc-package/documentJs';

export {snippet, type, desc, params, returns, throws, examples, parts}
    from 'doc-package/snippet/jsSnippetDocDecorators';

export {decorate} from './decorator/decorateWith';
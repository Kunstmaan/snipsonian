/* eslint import/no-unresolved: ["off"] */
export {group, snippet as snippetBuilder, prop, registerGroups, getRegisteredGroups} from 'doc-package/documentJs';

export {snippet, type, desc, params, returns, throws, examples, parts}
    from 'doc-package/snippet/jsSnippetDocDecorators';

export const decorate = (classToDecorate) => ({
    with: (...decorators) => {
        decorators.forEach((decorator) => decorator(classToDecorate));
    }
});
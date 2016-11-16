import JsSnippetDocBuilder from './snippet/JsSnippetDocBuilder';
import {buildIfBuilders} from '../builder/buildIfBuilder';
import collapsable from '../enrich/collapsable';

export const group = (groupName) => ({
    snippets: (...jsSnippetDocs) =>
        collapsable({
            name: groupName,
            snippets: collapsable(buildIfBuilders(jsSnippetDocs))
        })
});

export const snippet = (jsSnippet) =>
    JsSnippetDocBuilder.jsSnippetDoc(jsSnippet);

export {JsPropBuilder as prop} from './prop/JsPropBuilder';
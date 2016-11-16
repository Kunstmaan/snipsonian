import JsSnippetDocBuilder from './snippet/JsSnippetDocBuilder';
import {buildIfBuilders} from '../builder/buildIfBuilder';

export const group = (groupName) => ({
    snippets: (...jsSnippetDocs) => ({
        name: groupName,
        snippets: buildIfBuilders(jsSnippetDocs)
    })
});

export const snippet = (jsSnippet) =>
    JsSnippetDocBuilder.jsSnippetDoc(jsSnippet);

export {JsPropBuilder as prop} from './prop/JsPropBuilder';
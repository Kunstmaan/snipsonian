import JsSnippetDocBuilder from './snippet/JsSnippetDocBuilder';
import {buildIfBuilders} from '../builder/buildIfBuilder';

export const group = (groupName) => ({
    jsSnippets: (...jsSnippetDocs) => ({
        name: groupName,
        jsSnippets: buildIfBuilders(jsSnippetDocs)
    })
});

export const snippet = (jsSnippet) =>
    JsSnippetDocBuilder.jsSnippetDoc(jsSnippet);

export {JsPropBuilder as prop} from './prop/JsPropBuilder';
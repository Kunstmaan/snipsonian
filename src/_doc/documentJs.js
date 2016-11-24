import JsSnippetDocBuilder from './snippet/JsSnippetDocBuilder';
import buildIfBuilder from '../builder/buildIfBuilder';
import collapsable from '../enrich/collapsable';

export const group = (groupName) => ({
    snippets: (...jsSnippetDocs) =>
        collapsable({
            name: groupName,
            snippets: collapsable(buildIfBuilder(jsSnippetDocs))
        })
});

export const snippet = (jsSnippet) =>
    JsSnippetDocBuilder.jsSnippetDoc(jsSnippet);

export {JsPropBuilder as prop} from './prop/JsPropBuilder';

let registeredGroups = [];

export const registerGroups = (groups) => {
    registeredGroups = groups;
};

export const getRegisteredGroups = () =>
    registeredGroups;
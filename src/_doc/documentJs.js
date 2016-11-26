import buildIfBuilder from '../builder/buildIfBuilder';
import collapsable from '../decorator/collapsable';

export const group = (groupName) => ({
    snippets: (...jsSnippetDocs) =>
        collapsable()({
            name: groupName,
            snippets: collapsable()(buildIfBuilder(jsSnippetDocs))
        })
});

let registeredGroups = [];

export const registerGroups = (groups) => {
    registeredGroups = groups;
};

export const getRegisteredGroups = () =>
    registeredGroups;
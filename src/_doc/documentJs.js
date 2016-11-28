import buildIfBuilder from '../builder/buildIfBuilder';
import collapsable from '../decorator/collapsable';
import addProp from '../decorator/addProp';

export const group = (groupName) => ({
    snippets: (...jsSnippetDocs) =>
        collapsable()({
            name: groupName,
            snippets: collapsable()(
                addProp('groupName', groupName)(
                    buildIfBuilder(jsSnippetDocs)
                )
            )
        })
});

let registeredGroups = [];

export const registerGroups = (groups) => {
    registeredGroups = groups;
};

export const getRegisteredGroups = () =>
    registeredGroups;
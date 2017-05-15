import buildIfBuilder from '../src/builder/buildIfBuilder';
import addProp from '../src/decorator/addProp';

export const group = (groupName) => ({
    snippets: (...jsSnippetDocs) =>
        ({
            name: groupName,
            snippets: (
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
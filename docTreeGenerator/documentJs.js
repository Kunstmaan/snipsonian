import buildIfBuilder from '../src/builder/buildIfBuilder';
import addProp from '../src/decorator/addProp';

export const group = (groupName) => ({
    snippets: (...jsSnippetDocs) =>
        ({
            name: groupName,
            snippets: (
                addProp('groupName', groupName)(
                    addGroupNameToPartsOfSnippets(
                        groupName,
                        buildIfBuilder(jsSnippetDocs)
                    )
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

function addGroupNameToPartsOfSnippets(groupName, jsSnippetDocs) {
    return jsSnippetDocs.map((jsSnippetDoc) => addGroupNameToParts(groupName, jsSnippetDoc));
}

function addGroupNameToParts(groupName, jsSnippetDoc) {
    jsSnippetDoc.parts.map((part) =>
        addProp('groupName', groupName)(
            part
        )
    );
    return jsSnippetDoc;
}
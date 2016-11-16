import {buildIfBuilder} from '../../builder/buildIfBuilder';

const jsDocSnippets = [];

export const addJsDocSnippet = (jsDocBuilder) => {
    jsDocSnippets.push(buildIfBuilder(jsDocBuilder));
};

export const getJsDocSnippets = () => jsDocSnippets;
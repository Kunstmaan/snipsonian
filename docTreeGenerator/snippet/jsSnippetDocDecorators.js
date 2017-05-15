/* eslint no-param-reassign: ["error", { "props": false }] */

import inspectJsSnippet from './inspectJsSnippet';
import {JS_DOC_TYPE} from './jsDocTypes';
import builder from '../../src/decorator/builder';
import addProp from '../../src/decorator/addProp';
import buildIfBuilder from '../../src/builder/buildIfBuilder';
import {is} from '../../src/index';

export const snippet = (jsSnippet) =>
    function decorate(target) {
        const {docType, name} = inspectJsSnippet(jsSnippet);

        const initial = {
            code: jsSnippet,
            type: docType,
            name: is.set(name) ? name : getNameOfClass(target),
            params: [],
            examples: [],
            throws: [],
            parts: [],
            authors: [],
            getName: () => removeUnderscoreIfAtStartOfName(initial.name)
        };

        builder(initial)(target);

        return target;
    };

export const param = ({
    type = JS_DOC_TYPE.ANY,
    desc = '',
    name = '',
    examples = [],
    isArray = false,
    isOptional = false
}) =>
    function decorate(target) {
        target.getBuildParam('params').push({
            type,
            desc,
            name,
            examples,
            isArray,
            isOptional
        });
        return target;
    };

export const returns = ({
    type = JS_DOC_TYPE.ANY,
    desc = '',
    examples = [],
    isArray = false
}) =>
    function decorate(target) {
        return target.with('returns', {
            type,
            desc,
            examples,
            isArray
        });
    };

export const type = (val) =>
    function decorate(target) {
        return target.with('type', val);
    };

export const desc = (description) =>
    function decorate(target) {
        return target.with('desc', description);
    };

export const canThrow = ({
    error = '',
    when = ''
}) =>
    function decorate(target) {
        target.getBuildParam('throws').push({
            error,
            when
        });
        return target;
    };

export const examples = (...exampleFuncs) =>
    function decorate(target) {
        return target.with('examples', exampleFuncs);
    };

export const parts = (...partSnippetDocs) =>
    function decorate(target) {
        return target.with('parts', addProp('parentName', target.getBuildParam('name'))(
            buildIfBuilder(partSnippetDocs)
        ));
    };

export const authors = (...authorNames) =>
    function decorate(target) {
        return target.with('authors', authorNames);
    };

function getNameOfClass(clazz) {
    return [clazz.name]
        .map(removeDocIfAtEndOfName)[0];
}

function removeDocIfAtEndOfName(name) {
    return name.replace(/Doc$/, '');
}

function removeUnderscoreIfAtStartOfName(name) {
    return name.replace(/^_/, '');
}
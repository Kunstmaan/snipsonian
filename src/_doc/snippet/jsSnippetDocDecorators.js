/* eslint no-param-reassign: ["error", { "props": false }] */

import inspectJsSnippet from './inspectJsSnippet';
import builder from '../../decorator/builder';
import buildIfBuilder from '../../builder/buildIfBuilder';
import {is} from '../../index';

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
            authors: []
        };

        builder(initial)(target);

        return target;
    };

export const type = (val) =>
    function decorate(target) {
        return target.with('type', val);
    };

export const desc = (description) =>
    function decorate(target) {
        return target.with('desc', description);
    };

export const params = (...paramJsPropBuilders) =>
    function decorate(target) {
        return target.with('params', buildIfBuilder(paramJsPropBuilders));
    };

export const returns = (returnsJsPropBuilder) =>
    function decorate(target) {
        return target.with('returns', buildIfBuilder(returnsJsPropBuilder));
    };

export const throws = (...potentialErrors) =>
    function decorate(target) {
        return target.with('throws', potentialErrors);
    };

export const examples = (...exampleFuncs) =>
    function decorate(target) {
        return target.with('examples', exampleFuncs);
    };

export const parts = (...partSnippetDocs) =>
    function decorate(target) {
        return target.with('parts', buildIfBuilder(partSnippetDocs));
    };

export const authors = (...authorNames) =>
    function decorate(target) {
        return target.with('authors', authorNames);
    };

function getNameOfClass(clazz) {
    return removeDocIfAtEndOfName(clazz.name);
}

function removeDocIfAtEndOfName(docClassName) {
    return docClassName.replace(/Doc$/, '');
}
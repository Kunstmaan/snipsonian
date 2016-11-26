/* eslint no-param-reassign: ["error", { "props": false }] */

import inspectJsSnippet from './inspectJsSnippet';
import buildIfBuilder from '../../builder/buildIfBuilder';
import {is} from '../../index';

export const snippet = (jsSnippet) =>
    function decorate(target) {
        const {docType, name} = inspectJsSnippet(jsSnippet);

        target.doc = {
            code: jsSnippet,
            type: docType,
            name: is.set(name) ? name : getNameOfClass(target),
            params: [],
            examples: [],
            throws: [],
            parts: []
        };

        target.build = () => target.doc;

        return target;
    };

export const type = (val) =>
    function decorate(target) {
        target.doc.type = val;
        return target;
    };

export const desc = (description) =>
    function decorate(target) {
        target.doc.desc = description;
        return target;
    };

export const params = (...paramJsPropBuilders) =>
    function decorate(target) {
        target.doc.params = buildIfBuilder(paramJsPropBuilders);
        return target;
    };

export const returns = (returnsJsPropBuilder) =>
    function decorate(target) {
        target.doc.returns = buildIfBuilder(returnsJsPropBuilder);
        return target;
    };

export const throws = (...potentialErrors) =>
    function decorate(target) {
        target.doc.throws = potentialErrors;
        return target;
    };

export const examples = (...exampleFuncs) =>
    function decorate(target) {
        target.doc.examples = exampleFuncs;
        return target;
    };

export const parts = (...partSnippetDocs) =>
    function decorate(target) {
        target.doc.parts = buildIfBuilder(partSnippetDocs);
        return target;
    };

function getNameOfClass(clazz) {
    return removeDocIfAtEndOfName(clazz.name);
}

function removeDocIfAtEndOfName(docClassName) {
    return docClassName.replace(/Doc$/, '');
}
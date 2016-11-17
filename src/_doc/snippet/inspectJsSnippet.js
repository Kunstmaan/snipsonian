import DOC_TYPE from './jsDocTypes';
import {is} from '../../index';

const inspectJsSnippet = (jsSnippet) => {
    const docType = determineDocType(jsSnippet);
    const name = determineName(jsSnippet, docType);

    return {
        docType,
        name
    };
};

export default inspectJsSnippet;

function determineDocType(jsSnippet) {
    if (is.boolean(jsSnippet)) {
        return DOC_TYPE.BOOLEAN;
    }

    if (is.number(jsSnippet)) {
        return DOC_TYPE.NUMBER;
    }

    if (is.string(jsSnippet)) {
        return DOC_TYPE.STRING;
    }

    if (is.function(jsSnippet)) {
        return DOC_TYPE.FUNCTION;
    }

    if (is.array(jsSnippet)) {
        return DOC_TYPE.ARRAY;
    }

    if (is.object(jsSnippet)) {
        return DOC_TYPE.OBJECT;
    }

    return undefined;
}

function determineName(jsSnippet, docType) {
    if (docType === DOC_TYPE.FUNCTION) {
        return jsSnippet.name;
    }

    return undefined;
}
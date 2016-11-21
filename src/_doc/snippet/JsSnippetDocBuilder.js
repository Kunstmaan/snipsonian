import inspectJsSnippet from './inspectJsSnippet';
import {buildIfBuilder, buildIfBuilders} from '../../builder/buildIfBuilder';
import beautifyJsCode from '../util/beautifyJsCode';

class JsSnippetDocBuilder {
    static jsSnippetDoc(jsSnippet) {
        return new JsSnippetDocBuilder(jsSnippet);
    }

    constructor(jsSnippet) {
        const {docType, name} = inspectJsSnippet(jsSnippet);

        this.doc = {
            type: docType,
            name,
            params: [],
            examples: [],
            throws: [],
            parts: []
        };
    }

    type(type) {
        this.doc.type = type;
        return this;
    }

    name(name) {
        this.doc.name = name;
        return this;
    }

    desc(description) {
        this.doc.desc = description;
        return this;
    }

    params(...paramJsPropBuilders) {
        this.doc.params = buildIfBuilders(paramJsPropBuilders);
        return this;
    }

    return(returnJsPropBuilder) {
        this.doc.return = buildIfBuilder(returnJsPropBuilder);
        return this;
    }

    throws(...throws) {
        this.doc.throws = throws;
        return this;
    }

    examples(...examples) {
        this.doc.examples = examples.map((example) => beautifyJsCode(example));
        return this;
    }

    parts(...partsJsSnippetDocBuilder) {
        this.doc.parts = buildIfBuilders(partsJsSnippetDocBuilder);
        return this;
    }

    build() {
        return this.doc;
    }
}

export default JsSnippetDocBuilder;
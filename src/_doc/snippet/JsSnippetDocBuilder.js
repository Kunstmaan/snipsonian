import inspectJsSnippet from './inspectJsSnippet';
import buildIfBuilder from '../../builder/buildIfBuilder';

class JsSnippetDocBuilder {
    static jsSnippetDoc(jsSnippet) {
        return new JsSnippetDocBuilder(jsSnippet);
    }

    constructor(jsSnippet) {
        const {docType, name} = inspectJsSnippet(jsSnippet);

        this.doc = {
            code: jsSnippet,
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
        this.doc.params = buildIfBuilder(paramJsPropBuilders);
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
        this.doc.examples = examples;
        return this;
    }

    parts(...partsJsSnippetDocBuilder) {
        this.doc.parts = buildIfBuilder(partsJsSnippetDocBuilder);
        return this;
    }

    build() {
        return this.doc;
    }
}

export default JsSnippetDocBuilder;
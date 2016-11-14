import inspectJsSnippet from './inspectJsSnippet';
import {addJsDocSnippet} from './jsDocSnippets';
import {buildIfBuilder, buildIfBuilders} from '../builder/buildIfBuilder';

class JsDocBuilder {
    static snippet(jsSnippet) {
        return new JsDocBuilder(jsSnippet);
    }

    constructor(jsSnippet) {
        const {docType, name} = inspectJsSnippet(jsSnippet);

        this.doc = {
            type: docType,
            name
        };
    }

    type(type) {
        this.doc.type = type;
        return this;
    }

    tab(tab) {
        this.doc.tab = tab;
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
        this.doc.examples = examples.map((example) => example.toString());
        return this;
    }

    subDocs(...subJsDocBuilders) {
        this.doc.subDocs = buildIfBuilders(subJsDocBuilders);
        return this;
    }

    build() {
        return this.doc;
    }

    add() {
        addJsDocSnippet(this);
    }
}

export default JsDocBuilder;
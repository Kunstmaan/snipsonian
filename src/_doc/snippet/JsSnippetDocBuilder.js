import * as jsSnippetDecorators from './jsSnippetDocDecorators';

class JsSnippetDocBuilder {
    static jsSnippetDoc(jsSnippet) {
        return new JsSnippetDocBuilder(jsSnippet);
    }

    constructor(jsSnippet) {
        jsSnippetDecorators.snippet(jsSnippet)(this);
    }

    type(type) {
        jsSnippetDecorators.type(type)(this);
        return this;
    }

    desc(description) {
        jsSnippetDecorators.desc(description)(this);
        return this;
    }

    params(...paramJsPropBuilders) {
        jsSnippetDecorators.params(...paramJsPropBuilders)(this);
        return this;
    }

    returns(returnJsPropBuilder) {
        jsSnippetDecorators.returns(returnJsPropBuilder)(this);
        return this;
    }

    throws(...potentialErrors) {
        jsSnippetDecorators.throws(...potentialErrors)(this);
        return this;
    }

    examples(...exampleFuncs) {
        jsSnippetDecorators.examples(...exampleFuncs)(this);
        return this;
    }

    parts(...partsJsSnippetDocBuilder) {
        jsSnippetDecorators.parts(...partsJsSnippetDocBuilder)(this);
        return this;
    }

    build() {
        return this.doc;
    }
}

export default JsSnippetDocBuilder;
import PROP_TYPE from './jsPropTypes';

export class JsPropBuilder {
    static bool(desc) {
        return new JsPropBuilder(PROP_TYPE.BOOLEAN, desc);
    }

    static func(desc) {
        return new JsPropBuilder(PROP_TYPE.FUNCTION, desc);
    }

    static numb(desc) {
        return new JsPropBuilder(PROP_TYPE.NUMBER, desc);
    }

    static obj(desc) {
        return new JsPropBuilder(PROP_TYPE.OBJECT, desc);
    }

    static str(desc) {
        return new JsPropBuilder(PROP_TYPE.STRING, desc);
    }

    static any(desc) {
        return new JsPropBuilder(PROP_TYPE.ANY, desc);
    }

    static custom(desc, typeString) {
        return new JsPropBuilder(typeString, desc);
    }

    constructor(type, desc = '') {
        // TODO verify type is a string
        this.prop = {
            type,
            desc,
            isArray: false
        };
    }

    name(name) {
        this.prop.name = name;
        return this;
    }

    examples(...examples) {
        this.prop.examples = examples.map((example) => example.toString());
        return this;
    }

    isArray() {
        this.prop.isArray = true;
        return this;
    }

    build() {
        return this.prop;
    }
}
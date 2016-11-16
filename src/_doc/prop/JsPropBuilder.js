import PROP_TYPE from './propTypes';

class JsPropBuilder {
    static bool() {
        return new JsPropBuilder(PROP_TYPE.BOOLEAN);
    }

    static func() {
        return new JsPropBuilder(PROP_TYPE.FUNCTION);
    }

    static numb() {
        return new JsPropBuilder(PROP_TYPE.NUMBER);
    }

    static obj() {
        return new JsPropBuilder(PROP_TYPE.OBJECT);
    }

    static str() {
        return new JsPropBuilder(PROP_TYPE.STRING);
    }

    static any() {
        return new JsPropBuilder(PROP_TYPE.ANY);
    }

    static custom(typeString) {
        return new JsPropBuilder(typeString);
    }

    constructor(type) {
        // TODO verify type is a string
        this.prop = {
            type,
            isArray: false
        };
    }

    name(name) {
        this.prop.name = name;
        return this;
    }

    desc(desc) {
        this.prop.desc = desc;
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

export default JsPropBuilder;
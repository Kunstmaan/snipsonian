import Vue from 'vue';
import {is} from '../../index';

const template = `
<div class="js-prop">
    <div class="js-prop__signature">{{ propSignature }}:</div> <div class="js-prop__desc">{{ prop.desc }}</div> 
</div>
`;

Vue.component('js-prop', {
    props: ['prop'],
    created() {
        this.propSignature = getPropSignature(this.prop);
    },
    template
});

function getPropSignature(prop) {
    const type = getTypeSignature(prop);

    if (is.set(prop.name)) {
        return `${getNameSignature(prop)} ${type}`;
    }

    return type;
}

function getTypeSignature(prop) {
    return `(${prop.type})`;
}

function getNameSignature(prop) {
    const propName = prop.name;

    if (prop.isOptional === true) {
        return `[${propName}]`;
    }

    return propName;
}
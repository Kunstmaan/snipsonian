import Vue from 'vue';
import '../util/displayCode.component';
import beautifyJsCode from '../util/beautifyJsCode';
import {is} from '../../index';

const template = `
<div class="js-snippet-details">
    <div class="js-snippet__type">{{ snippet.type }}</div>
    
    <p class="js-snippet__desc">{{ snippet.desc }}</p>
    
    <div v-if="snippet.params.length > 0" class="js-snippet__subtitle">Param(s):</div>
    <div class="js-snippet__params">
        <div v-for="param in snippet.params">
            {{ param }}
        </div>
    </div>
    
    <div v-if="snippet.returns" class="js-snippet__subtitle">Returns:</div>
    <div class="js-snippet__returns">{{ snippet.returns }}</div>
    
    <div v-if="snippet.throws.length > 0" class="js-snippet__subtitle">Can throw:</div>
    <div class="js-snippet__throws">
        <div v-for="canThrow in snippet.throws">
            {{ canThrow }}
        </div>
    </div>
    
    <div v-if="snippet.examples.length > 0" class="js-snippet__subtitle">Example(s):</div>
    <div class="js-snippet__examples">
        <div v-for="example in beautifiedExamples">
            <display-code :code="example" code-lang="javascript"></display-code>
        </div>
    </div>
    
    <div v-if="snippet.authors.length > 0" class="js-snippet__subtitle">Author(s):</div>
    <div class="js-snippet__authors">{{ concatenatedAuthors }}</div>
</div>
`;

Vue.component('js-snippet-details', {
    props: ['snippet'],
    created() {
        this.beautifiedExamples = beautifyExamples(this.snippet.examples);
        this.concatenatedAuthors = concatenateAuthors(this.snippet.authors);
    },
    template
});

function beautifyExamples(examples) {
    if (is.undefined(examples)) {
        return [];
    }
    return examples.map((example) => beautifyJsCode(example));
}

function concatenateAuthors(authors) {
    if (is.undefined(authors)) {
        return [];
    }

    return authors.join(', ');
}
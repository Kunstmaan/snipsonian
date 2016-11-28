import Vue from 'vue';
import './jsProp.component';
import '../util/displayCode.component';
import beautifyJsCode from '../util/beautifyJsCode';
import {is} from '../../index';
import {SETTING} from '../../_docRef';

const template = `
<div class="js-snippet-details">
    <h4 class="js-snippet__name">{{ snippetName }}</h4>

    <div class="js-snippet__type">{{ snippet.type }}</div>
    
    <p class="js-snippet__desc">{{ snippet.desc }}</p>
    
    <div v-if="snippet.params.length > 0" class="js-snippet__subtitle">Param(s):</div>
    <div class="js-snippet__params">
        <div v-for="param in snippet.params">
            <js-prop :prop="param"></js-prop>
        </div>
    </div>
    
    <div v-if="snippet.returns" class="js-snippet__subtitle">Returns:</div>
    <div v-if="snippet.returns" class="js-snippet__returns">
        <js-prop :prop="snippet.returns"></js-prop>
    </div>
    
    <div v-if="snippet.throws.length > 0" class="js-snippet__subtitle">Can throw:</div>
    <div class="js-snippet__throws">
        <div v-for="canThrow in snippet.throws">
            {{ canThrow }}
        </div>
    </div>
    
    <display-code v-if="snippetImportStatement" :code="snippetImportStatement" code-lang="javascript"></display-code>
    
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
        this.snippetName = getSnippetName(this.snippet);
        this.snippetImportStatement = getSnippetImportStatement(this.snippet);
        this.beautifiedExamples = beautifyExamples(this.snippet.examples);
        this.concatenatedAuthors = concatenateAuthors(this.snippet.authors);
    },
    template
});

function hasParentSnippet(snippet) {
    return is.set(snippet.parentName);
}

function getSnippetName(snippet) {
    if (hasParentSnippet(snippet)) {
        return `${snippet.parentName}.${snippet.name}`;
    }
    return snippet.name;
}

function getSnippetImportStatement(snippet) {
    if (hasParentSnippet(snippet)) {
        return undefined;
    }

    return `import ${snippet.name} from '${SETTING.IMPORT_BASE}/${snippet.groupName}/${snippet.name}'`;
}

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
import Vue from 'vue';

const template = `
<div class="js-snippet-details">
    <div class="js-snippet__type">{{ snippet.type }}</div>
    
    <p class="js-snippet__desc">{{ snippet.desc }}</p>
    
    <div class="js-snippet__params">
        <div v-for="param in snippet.params">
            {{ param }}
        </div>
    </div>
    
    <div class="js-snippet__return">{{ snippet.return }}</div>
    
    <div class="js-snippet__throws">
        <div v-for="canThrow in snippet.throws">
            {{ canThrow }}
        </div>
    </div>
    
    <div class="js-snippet__examples">
        <div v-for="example in snippet.examples">
            <pre><code>{{ example }}</code></pre>
        </div>
    </div>
</div>
`;

Vue.component('js-snippet-details', {
    props: ['snippet'],
    template
});
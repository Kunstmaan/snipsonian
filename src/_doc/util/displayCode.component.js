import Vue from 'vue';
import './highlight.directive';

const template = `
<pre v-highlight v-bind:class="codeLang">
<code>
{{ code }}
</code>
</pre>
`;

Vue.component('display-code', {
    props: ['code', 'codeLang'],
    template
});
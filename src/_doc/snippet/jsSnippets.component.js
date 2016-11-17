import Vue from 'vue';
import '../util/navAnchor.component';
import './jsSnippet.component';
import {groups} from '../../_docs';

const template = `
<div>
    <div class="js-snippets__group" v-for="group in groups">
        <h3 class="js-snippets__group__name">{{ group.name }}</h3>
        
        <div class="js-snippets__group__snippets">
            <div class="js-snippets__group__snippet" v-for="snippet in group.snippets">
                <js-snippet :group="group" :snippet="snippet"></js-snippet>
            </div>
        </div>
    </div>
</div>
`;

Vue.component('js-snippets', {
    data() {
        return {
            groups
        };
    },
    template
});
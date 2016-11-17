import Vue from 'vue';
import '../util/navAnchor.component';
import {groups} from '../../_docs';
import {getSnippetNavId} from '../util/navId';

const template = `
<div>
    <div class="js-snippets__group" v-for="group in groups">
        <nav-anchor :nav-id="getSnippetNavId(group)"></nav-anchor>
        <div class="js-snippets__group__name">{{ group.name }}</div>
        
        <div class="js-snippets__group__snippets">
            <div class="js-snippets__group__snippet" v-for="snippet in group.snippets">
                <nav-anchor :nav-id="getSnippetNavId(group, snippet)"></nav-anchor>
                <div class="js-snippets__group__snippet__name">{{ snippet.name }}</div>
                
                <div class="js-snippets__group__snippet_parts">
                    <div class="js-snippets__group__snippet__part" v-for="part in snippet.parts">
                        <nav-anchor :nav-id="getSnippetNavId(group, snippet, part)"></nav-anchor>
                        {{ part.name }}
                    </div>
                </div>
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
    methods: {
        getSnippetNavId
    },
    template
});
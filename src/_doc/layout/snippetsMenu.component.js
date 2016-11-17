import Vue from 'vue';
import {groups} from '../../_docs';
import router from '../router/router';
import {getSnippetLocation} from '../util/location';
import {scrollToSnippet} from '../util/navId';

const template = `
<div>
    <div class="snippets-menu__group" v-for="group in groups">
        <div class="snippets-menu__group__name">{{ group.name }}</div>
        
        <div class="snippets-menu__group__snippets">
            <div class="snippets-menu__group__snippet" v-for="snippet in group.snippets">
                <div class="snippets-menu__group__snippet__name" v-on:click="showSnippet(group, snippet)">{{ snippet.name }}</div>
                
                <div class="snippets-menu__group__snippet_parts">
                    <div class="snippets-menu__group__snippet_part" v-for="part in snippet.parts" v-on:click="showSnippet(group, snippet, part)">{{ part.name }}</div>
                </div>
            </div>
        </div>
    </div>
</div>
`;

Vue.component('snippets-menu', {
    data() {
        return {
            groups
        };
    },
    methods: {
        showSnippet: (group, snippet, part) => {
            const location = getSnippetLocation(group, snippet, part);
            router.push(location);

            scrollToSnippet(group, snippet, part);
        }
    },
    template
});
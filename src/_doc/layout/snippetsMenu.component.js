import Vue from 'vue';
import {getRegisteredGroups} from '../../_docRef';
import router from '../router/router';
import {getSnippetLocation} from '../util/location';
import {scrollToSnippet} from '../util/navId';
import '../util/toggleCollapse.component';

const template = `
<div>
    <div class="snippets-menu__group" v-for="group in groups">
        <div class="row">
            <toggle-collapse :collapsable="group" class="col-sm-2"></toggle-collapse>
            <div class="snippets-menu__group__name col-sm-10">{{ group.name }}</div>
        </div>
        
        <div class="snippets-menu__group__snippets" v-show="!group.isCollapsed">
            <div class="snippets-menu__group__snippet" v-for="snippet in group.snippets">
                <div class="row">
                    <toggle-collapse :collapsable="snippet" class="col-sm-2" v-if="snippet.parts.length > 0"></toggle-collapse>
                    <div class="snippets-menu__group__snippet__name col-sm-10" v-on:click="showSnippet(group, snippet)">{{ snippet.name }}</div>
                </div>
                
                <div class="snippets-menu__group__snippet_parts" v-show="!snippet.isCollapsed">
                    <div class="row">
                        <div class="snippets-menu__group__snippet_part col-sm-10" v-for="part in snippet.parts" v-on:click="showSnippet(group, snippet, part)">{{ part.name }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`;

Vue.component('snippets-menu', {
    data() {
        return {
            groups: getRegisteredGroups()
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
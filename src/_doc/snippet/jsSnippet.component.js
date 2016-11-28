import Vue from 'vue';
import './jsSnippetDetails.component';
import '../util/navAnchor.component';
import {getSnippetNavId} from '../util/navId';

const template = `
<div class="js-snippet">
    <nav-anchor :nav-id="getSnippetNavId(group, snippet)"></nav-anchor>
    <js-snippet-details :snippet="snippet"></js-snippet-details>
    
    <div class="js-snippet__parts">
        <div class="js-snippet__part" v-for="part in snippet.parts">
            <nav-anchor :nav-id="getSnippetNavId(group, snippet, part)"></nav-anchor>
            <js-snippet-details :snippet="part"></js-snippet-details>
        </div>
    </div>
</div>
`;

Vue.component('js-snippet', {
    props: ['group', 'snippet'],
    methods: {
        getSnippetNavId
    },
    template
});
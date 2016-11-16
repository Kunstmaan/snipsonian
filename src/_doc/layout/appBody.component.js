import Vue from 'vue';
import './snippetsMenu.component';

const template = `
<div class="doc-app__body">
    <snippets-menu></snippets-menu>
</div>
`;

Vue.component('app-body', {
    template
});
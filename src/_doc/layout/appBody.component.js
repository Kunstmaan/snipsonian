import Vue from 'vue';
import './snippetsMenu.component';

const template = `
<div class="doc-app__body">
    <snippets-menu></snippets-menu>
    
    <div class="doc-app__body__content">
        <router-view></router-view>
    </div>
</div>
`;

Vue.component('app-body', {
    template
});
import Vue from 'vue';
import router from './router/router';
import './layout/appHeader.component';
import './layout/appBody.component';
import './layout/appFooter.component';

const template = `
<div class="doc-app">
    <app-header></app-header>
    <app-body></app-body>
    <app-footer></app-footer>
</div>
`;

const docApp = new Vue({
    el: '#docApp',
    router,
    template
});

export default docApp;
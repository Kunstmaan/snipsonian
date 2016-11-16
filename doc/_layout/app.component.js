import Vue from 'vue';
import './appHeader.component';
import './appBody.component';
import './appFooter.component';

const template = `
<div class="doc-app">
    <app-header></app-header>
    <app-body></app-body>
    <app-footer></app-footer>
</div>
`;

const app = new Vue({
    el: '#app',
    template
});

export default app;
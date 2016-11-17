import Vue from 'vue';
import './snippetsMenu.component';

const template = `
<div class="container doc-app__body">
    <div class="row">
        <snippets-menu class="col-xs-5 col-sm-4 col-lg-3"></snippets-menu>
    
        <div class="doc-app__body__content col-xs-7 col-sm-8 col-lg-9">
            <router-view></router-view>
        </div>
    </div>
</div>
`;

Vue.component('app-body', {
    template
});
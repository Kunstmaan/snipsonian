import Vue from 'vue';
import VueRouter from 'vue-router';
import '../snippet/jsSnippets.component';
import {scrollToSnippet} from '../util/navId';

Vue.use(VueRouter);

const allSnippets = {
    template: '<js-snippets></js-snippets>',
    mounted() {
        scrollToSnippet(
            decorateAsObjWithName(this.$route.params.groupName),
            decorateAsObjWithName(this.$route.params.snippetName),
            decorateAsObjWithName(this.$route.params.partName)
        );
    },
    watch: {
        $route(to) {
            console.log('Route changed', {
                group: to.params.groupName,
                snippet: to.params.snippetName,
                part: to.params.partName
            });
        }
    }
};

const routes = [{
    path: '/',
    component: allSnippets
}, {
    path: '/:groupName/:snippetName',
    component: allSnippets
}, {
    path: '/:groupName/:snippetName/:partName',
    component: allSnippets
}];

const router = new VueRouter({
    routes
});

export default router;

function decorateAsObjWithName(name) {
    return {name};
}
import Vue from 'vue';
import VueRouter from 'vue-router';
import '../snippet/jsSnippets.component';

Vue.use(VueRouter);

const allSnippets = {
    template: '<js-snippets></js-snippets>',
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
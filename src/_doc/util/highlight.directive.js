import Vue from 'vue';
import hljs from 'highlight.js';

Vue.directive('highlight', {
    inserted(el) {
        hljs.highlightBlock(el);
    }
});
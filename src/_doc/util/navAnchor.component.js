import Vue from 'vue';

const template = `
<div :id="navId" />
`;

Vue.component('nav-anchor', {
    props: ['navId'],
    template
});
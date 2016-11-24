import Vue from 'vue';

const template = `
<div v-on:click="collapsable.toggleCollapse()">
    <span v-show="collapsable.isCollapsed">[+]</span>
    <span v-show="!collapsable.isCollapsed">[-]</span>
</div>
`;

Vue.component('toggle-collapse', {
    props: ['collapsable'],
    template
});
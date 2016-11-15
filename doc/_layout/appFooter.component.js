import Vue from 'vue';

const INITIAL_YEAR = 2016;

const template = `
<div>
    <hr />
    <p>&copy; {{ year }} Kunstmaan</p>
</div>
`;

Vue.component('app-footer', {
    data() {
        return {
            year: `${INITIAL_YEAR}${getCurrentYearSuffixIfNotInitialYear()}`
        };
    },
    template
});

function getCurrentYearSuffixIfNotInitialYear() {
    const currentYear = getCurrentYear();
    return (currentYear !== INITIAL_YEAR) ? `-${currentYear}` : '';
}

function getCurrentYear() {
    return (new Date()).getFullYear();
}
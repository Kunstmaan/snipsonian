import Vue from 'vue';
import {VERSIONS, getCurrentVersion, setCurrentVersion} from '../versions';

const template = `
<div class="doc-app__header">
    <h1>Kunstmaan SnippetJS</h1>
    <div class="version">
        <label>Version:</label>
        <select v-model="currentVersion">
            <option v-for="version in versions">{{ version }}</option>
        </select>
    </div>
</div>
`;

Vue.component('app-header', {
    data() {
        return {
            versions: VERSIONS,
            currentVersion: undefined
        };
    },
    created() {
        this.currentVersion = getCurrentVersion();
    },
    updated() {
        setCurrentVersion(this.currentVersion);
    },
    template
});
import Vue from 'vue';
import {getVersions, getCurrentVersion, setCurrentVersion} from '../../_versions';
import {getParsedUrlParams, setUrlParams} from '../util/url';

const template = `
<div class="container-fluid doc-app__header">
    <div class="row">
        <div class="col-sm-8">
            <h1>Kunstmaan SnippetJS</h1>
        </div>
        <div class="col-sm-4">
            <div class="version text-sm-right">
                <label>Version:</label>
                <select v-model="currentVersion">
                    <option v-for="version in versions">{{ version }}</option>
                </select>            
            </div>
        </div>
    </div>
</div>
`;

Vue.component('app-header', {
    data() {
        return {
            versions: undefined,
            currentVersion: undefined
        };
    },
    created() {
        this.versions = getVersions();
        this.currentVersion = getCurrentVersion();
    },
    updated() {
        setCurrentVersion(this.currentVersion);

        refreshPageWithNewVersion(this.currentVersion);
    },
    template
});

function refreshPageWithNewVersion(newVersion) {
    const parsedUrlParams = getParsedUrlParams();

    parsedUrlParams.v = newVersion;

    setUrlParams(parsedUrlParams);
}
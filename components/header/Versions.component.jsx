import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router'

import {getVersion} from '../user/userSelectors';
import {switchVersion} from '../user/userActions';
import {getVersions} from '../../config/versions.config';

const Versions = ({
    version,
    onChangeVersion
}) => (
    <select id="version" value={version} onChange={(event) => onChangeVersion(event.target.value)}>
        <option disabled>Version</option>
        {getVersions().map((version, index) =>
            <option value={version} key={index}>{version}</option>
        )}
    </select>
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Versions);

function mapStateToProps(state) {
    return {
        version: getVersion(state)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onChangeVersion: (selectedVersion) => {
            dispatch(switchVersion(selectedVersion));
            goTo(selectedVersion);
        }
    };
}

// function goTo(lang, version) {
//     browserHistory.push(`/${lang}/doc/${version}/`);
// }

function goTo(version) {
    browserHistory.push(`/doc/${version}/`);
}
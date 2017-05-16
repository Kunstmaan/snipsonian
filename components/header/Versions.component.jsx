import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import PropTypes from 'prop-types';

import {getVersion} from '../user/userSelectors';
import {switchVersion} from '../user/userActions';
import {getVersions} from '../../config/versions.config';

const Versions = ({version, onChangeVersion}) => (
    <select id="version" value={version} onChange={(event) => onChangeVersion(event.target.value)}>
        <option disabled>Version</option>
        {getVersions().map((v) =>
            <option value={v} key={`versionSelectOption-${v}`}>{v}</option>
        )}
    </select>
);

Versions.propTypes = {
    onChangeVersion: PropTypes.func,
    version: PropTypes.string
};

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

function goTo(version) {
    browserHistory.push(`/doc/${version}/`);
}
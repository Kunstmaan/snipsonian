import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import {config} from 'config';
/* eslint-enable */
import {connect} from 'react-redux';

import Sidebar from './Sidebar/Sidebar';
import Snippets from './Snippets/Snippets';

import {getVersion} from '../user/userSelectors';
import {switchVersion} from '../user/userActions';

import getUrlPartBetween from '../../src/url/getUrlPartBetween';

class Version extends React.Component {
    componentDidMount() {
        matchStateToUrl.bind(this)();
    }

    render() {
        return (
            <div>
                <Helmet title={`${config.siteTitle} | ${this.props.config.v}`} />
                <div className="flex-container">
                    <Sidebar docGroups={this.props.config.docs} />
                    <Snippets config={this.props.config} />
                </div>
            </div>
        );
    }
}

Version.propTypes = {
    config: PropTypes.shape({
        v: PropTypes.string,
        docs: PropTypes.array
    })
};

function mapDispatchToProps(dispatch) {
    return {
        switchVersion: (selectedVersion) => {
            dispatch(switchVersion(selectedVersion));
        }
    };
}

function mapStateToProps(state) {
    return {
        version: getVersion(state)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Version);

function matchStateToUrl() {
    const urlVersion = getUrlPartBetween({firstPart: 'doc/'});
    if (this.state.version !== urlVersion) {
        this.props.switchVersion(urlVersion);
    }
}

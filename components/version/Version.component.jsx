import React from 'react';
import Helmet from 'react-helmet';
import {config} from 'config';
import {connect} from 'react-redux';

import Sidebar from './Sidebar/Sidebar';
import Snippets from './Snippets/Snippets';

import {getVersion} from '../user/userSelectors';
import {switchVersion} from '../user/userActions';

import getUrlPartBetween from '../../src/url/getUrlPartBetween';

class Version extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const urlVersion = getUrlPartBetween({firstPart: 'doc/'});
        if (this.state.version !== urlVersion) {
            this.props.switchVersion(urlVersion);
        }
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

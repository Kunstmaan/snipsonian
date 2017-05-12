import React from 'react';
import Helmet from 'react-helmet';
import {config} from 'config';
import {connect} from 'react-redux';
import {Container, Grid, Span} from 'react-responsive-grid';
import {getVersion} from '../user/userSelectors';

const Version = ({
 version, children
}) => (
    <div>
        <Helmet title={`${config.siteTitle} | ${version}`}/>
        <div className="flex-container">
            <div className="flex-sidbar">
                test
            </div>
            <div className="flex-content">
                <h2>{version}</h2>
                {children}
            </div>
        </div>
    </div>
);

export default connect(
    mapStateToProps
)(Version);

function mapStateToProps(state, ownProps) {
    return {
        version: getVersion(state),
        children: ownProps.children
    };
}

import React from 'react';
import Helmet from 'react-helmet';
import {config} from 'config';
import {connect} from 'react-redux';
import {getVersion, getDocGroupsForCurrentVersion} from '../user/userSelectors';

import Collapsible from './collapsible.component';


const Version = ({version, children, docGroups}) => (
    <div>
        <Helmet title={`${config.siteTitle} | ${version}`} />
        <div className="flex-container">
            <div className="flex-sidbar version-component">
                <ul className="group-list">
                    {docGroups.map((group) => <Collapsible key={group.name} group={group} />)}
                </ul>
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
        docGroups: getDocGroupsForCurrentVersion(state),
        children: ownProps.children
    };
}

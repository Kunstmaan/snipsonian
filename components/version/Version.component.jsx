import React from 'react';
import Helmet from 'react-helmet';
import {config} from 'config';

import Sidebar from './Sidebar/Sidebar';
import Snippets from './Snippets/Snippets';

class Version extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
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

export default Version;

/* const Version = ({version, children, docGroups}) => (
    <div>
        <Helmet title={`${config.siteTitle} | ${version}`} />
        <div className="flex-container">

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
}*/

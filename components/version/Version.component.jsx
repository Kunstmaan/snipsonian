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

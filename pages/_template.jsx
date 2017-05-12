import React from 'react';

import '../css/markdown-styles.css';
import '../css/common.scss';

import Header from '../components/header/Header.component';

module.exports = React.createClass({
    propTypes() {
        return {
            children: React.PropTypes.any
        };
    },
    render() {
        return (
            <div>
                <Header />
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

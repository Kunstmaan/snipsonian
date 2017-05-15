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
            <div className="main-wrapper">
                <Header />
                <div className="content-wrapper">
                    {this.props.children}
                </div>
            </div>
        );
    }
});

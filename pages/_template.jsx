import React from 'react';
import PropTypes from 'prop-types';

import '../css/markdown-styles.css';
import '../css/common.scss';

import Header from '../components/header/Header.component';

const template = ({children}) => (
    <div className="main-wrapper">
        <Header />
        <div className="content-wrapper">
            {children}
        </div>
    </div>
);

template.propTypes = {
    children: PropTypes.node
};

export default template;

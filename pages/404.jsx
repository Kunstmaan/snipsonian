/* global window */

import React from 'react';
import {Link} from 'react-router';
/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import {prefixLink} from 'gatsby-helpers';
/* eslint-enable */
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getVersion} from '../components/user/userSelectors';

const page404 = ({version}) => (
    <div className="page404">
        <h1>NOT FOUND</h1>
        <p>{'You just hit a route that doesn\'t exist... the sadness.'}</p>
        <h3>But Wait! Not all is lost yet!</h3>
        <p>
            {`You might have got an outdated link there. We probably deleted the exact version you had in your url.
            This happens a lot, soooo... we created a button for that. When you click on it, you'll be taken to the version with the same major and minor version, but a different patch.`}
        </p>
        <Link to={prefixLink(`/doc/${version}/${getUrlHashIfNotServerSide()}`)}><button>To Correct Version</button></Link>
    </div>
);

function mapStateToProps(state) {
    return {
        version: getVersion(state)
    };
}

page404.propTypes = {
    version: PropTypes.string.isRequired
};

page404.defaultProps = {
    version: 'latest'
};

export default connect(
    mapStateToProps
)(page404);

function getUrlHashIfNotServerSide() {
    if (typeof window !== 'undefined') {
        return window.location.hash;
    }

    return '';
}
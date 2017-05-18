import React from 'react';
import {Link} from 'react-router';
/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import {prefixLink} from 'gatsby-helpers';
/* eslint-enable */
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getVersion} from '../user/userSelectors';
import {switchVersion} from '../user/userActions';

import styleConfig from '../../config/style.config';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="header-container">
                <div>
                    <Link to={prefixLink('/')}
                          style={{
                              textDecoration: 'none',
                              color: styleConfig.header.title.color
                          }}>
                        <span className="brand">Snipsonian</span>
                    </Link>
                </div>
                <span style={{
                    color: styleConfig.color.primary
                }}>
                    Small, re-usable javascript code snippets
                </span>
                <Link to={prefixLink(`/doc/${this.props.version}/`)} style={{color: styleConfig.header.title.color}}>Go To Docs</Link>
                <span>powered by Kunstmaan Development</span>
            </div>
        );
    }
}

Header.propTypes = {
    version: PropTypes.string.isRequired
};

Header.defaultProps = {
    version: 'latest'
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
)(Header);
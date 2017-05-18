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
                <div className="brand">
                    <Link className="brand-name" to={prefixLink('/')}
                          style={{
                              textDecoration: 'none',
                              color: styleConfig.header.title.color
                          }}>
                        <span>Snipsonian</span>
                    </Link>
                    <div style={{
                        color: styleConfig.color.primary
                    }}>
                        Small, re-usable javascript code snippets
                    </div>
                </div>
                <div className="header-content">
                    <Link className="docs-button" to={prefixLink(`/doc/${this.props.version}/`)}
                          style={{color: styleConfig.header.title.color}}><span>Go To Docs</span></Link>
                    <div className="powered-by"><span>Powered by Kunstmaan Development</span></div>
                </div>
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
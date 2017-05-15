import React from 'react';
import {Link} from 'react-router';
import {prefixLink} from 'gatsby-helpers';

import styleConfig from '../../config/style.config';
import Versions from './Versions.component';

const Header = () => (
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
        <Link to={prefixLink('/doc/latest/')} style={{color: styleConfig.header.title.color}}>Go To Docs</Link>
        <span>powered by Kunstmaan</span>
        <Link to={prefixLink('/usage/')}>usage</Link>
    </div>
);

export default Header;
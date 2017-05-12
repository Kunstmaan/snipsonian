import React from 'react';
import Headroom from 'react-headroom';
import {Link} from 'react-router';
import {prefixLink} from 'gatsby-helpers';

import styleConfig from '../../config/style.config';
import LangSwitch from './LangSwitch.component';
import Versions from './Versions.component';

const Header = () => (
    <Headroom>
        <div className="header-container">
            <div className="top-row">
                <div>
                    <Link to={prefixLink('/')}
                          style={{
                              textDecoration: 'none',
                              color: styleConfig.header.title.color
                          }}>
                        <h1 style={{marginBottom: 0}}>Snipsonian</h1>
                    </Link>

                    <span style={{
                        color: styleConfig.color.primary
                    }}>
                    Small, re-usable javascript code snippets
                </span>
                </div>

                <div>
                    <LangSwitch />
                </div>
            </div>
            <div className="bottom-row">
                <Versions />
                <span>powered by Kunstmaan</span>
                <Link to={prefixLink('/usage/')}>usage</Link>
            </div>
        </div>
    </Headroom>
);

export default Header;
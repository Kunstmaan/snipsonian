import React from 'react';
import Headroom from 'react-headroom';
import {Container, Grid, Span} from 'react-responsive-grid';
import {Link} from 'react-router';
import {prefixLink} from 'gatsby-helpers'

import styleConfig from '../../config/style.config';
import {rhythm} from '../../utils/typography';
import LangSwitch from './LangSwitch.component';
import Versions from './Versions.component';

const containerStyle = {
    maxWidth: styleConfig.container.maxWidth,
    paddingTop: 0,
    padding: `${rhythm(1)} ${rhythm(3/4)}`
};

const Header = () => (
    <Headroom
        wrapperStyle={{
            marginBottom: rhythm(1),
        }}
        style={{
            background: styleConfig.header.background,
            color: styleConfig.header.color
        }}
    >
        <Container
            style={containerStyle}
        >
            <Grid columns={12}>
                <Span columns={8}>
                    <Link
                        to={prefixLink('/')}
                        style={{
                            textDecoration: 'none',
                            color: styleConfig.header.title.color
                        }}
                    >
                        <h1 style={{marginBottom: 0}}>Snipsonian</h1>
                    </Link>

                    <span style={{
                        color: styleConfig.color.primary
                    }}>
                        Small re-usable javascript code snippets
                    </span>
                </Span>

                <Span columns={4} last>
                    <LangSwitch />
                </Span>
            </Grid>
            <Grid columns={12}>
                <Versions />
                <span>powered by Kunstmaan</span>
                <Link to={prefixLink('/usage/')}>usage</Link>
            </Grid>
        </Container>
    </Headroom>
);

export default Header;
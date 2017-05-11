import React from 'react';
import Helmet from 'react-helmet';
import {config} from 'config';
import {connect} from 'react-redux';
import {Container, Grid, Span} from 'react-responsive-grid';
import {getVersion} from '../user/userSelectors';

const Version = ({
    version, children
}) => (
    <div>
        <Helmet
            title={`${config.siteTitle} | ${version}`}
        />
        <Container>
            <Grid columns={12}>
                <Span columns={4}>

                </Span>
                <Span columns={8}>
                    <h2>{version}</h2>
                    {children}
                </Span>
            </Grid>
        </Container>
    </div>
);

export default connect(
    mapStateToProps
)(Version);

function mapStateToProps(state, ownProps) {
    return {
        version: getVersion(state),
        children: ownProps.children
    };
}

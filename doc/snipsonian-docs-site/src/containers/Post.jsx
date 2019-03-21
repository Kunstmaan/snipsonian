import React from 'react';
import {withRouteData, Link} from 'react-static';

/* eslint-disable jsx-a11y/anchor-is-valid */
export default withRouteData(({post}) => (
    <div>
        <Link to="/blog/">{'<'} Back</Link>
        <br />
        <h3>{post.title}</h3>
        <p>{post.body}</p>
    </div>
));
/* eslint-enable jsx-a11y/anchor-is-valid */

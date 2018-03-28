import React from 'react';
import {withRouteData, Link} from 'react-static';

/* eslint-disable jsx-a11y/anchor-is-valid */
export default withRouteData(({posts}) => (
    <div>
        <h1>It&apos;s blog time.</h1>
        <br />
        All Posts:
        <ul>
            {posts.map((post) => (
                <li key={post.id}>
                    <Link to={`/blog/post/${post.id}/`}>{post.title}</Link>
                </li>
            ))}
        </ul>
    </div>
));
/* eslint-enable jsx-a11y/anchor-is-valid */

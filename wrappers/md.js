import React from 'react'
import 'css/markdown-styles.css'
import Helmet from 'react-helmet'
import { config } from 'config'

module.exports = React.createClass({
    propTypes () {
        return {
            router: React.PropTypes.object,
        }
    },
    render () {
        const post = this.props.route.page.data;
        const Document = this.props.route.page.data.default;

        return (
            <div className="markdown">
                <Helmet
                    title={`${config.siteTitle} | ${post.title}`}
                />
                <h1>{post.title}</h1>
                {/*<div dangerouslySetInnerHTML={{ __html: post.body }} />*/}
                <Document />
            </div>
        );
    }
});

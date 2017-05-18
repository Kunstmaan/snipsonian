import React from 'react'
//import 'css/markdown-styles.css'
import Helmet from 'react-helmet'
import { config } from 'config'

module.exports = React.createClass({
    propTypes () {
        return {
            router: React.PropTypes.object,
        }
    },
    render () {
        const pageDate = this.props.route.page.data;
        const pageTitle = pageDate.meta.data.title;
        const Document = pageDate.default;

        return (
            <div className="markdown">
                <Helmet
                    title={`${config.siteTitle} | ${pageTitle}`}
                />
                <h1>{pageTitle}</h1>
                <Document />
            </div>
        );
    }
});

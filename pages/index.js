import React from 'react';
import {Link} from 'react-router';
import {prefixLink} from 'gatsby-helpers';
import Helmet from 'react-helmet';
import {config} from 'config';

const Index = () => (
    <div>
        <Helmet title={config.siteTitle}
            meta={[
                {name: 'description', content: 'Snipsonian'},
                {name: 'keywords', content: 'snipsonian javascript js snippet kunstmaan'}
            ]} />

        <p>Snipsonian is a library that contains some re-usable - and tested - javascript snippets, so that we
            @Kunstmaan do not have to rewrite them every time we need them in some project. And we decided to give it
            to the community.</p>
        <p>It does not offer a bundle containing all snippets as that would enlarge your app unnecessarily! Instead you
            should just directly import - using the es6 import syntax - only those snippet you need.</p>

        <h2>Below are some pages showing different capabilities built-in to Gatsby</h2>
        <h3>Supported file types</h3>
        <ul>
            <li>
                <Link to={prefixLink('/react/')}>JSX (React components)</Link>
            </li>
            <li>
                <Link to={prefixLink('/html/')}>HTML</Link>
            </li>
            <li>
                <Link to={prefixLink('/json/')}>JSON</Link>
            </li>
            <li>
                <Link to={prefixLink('/yaml/')}>YAML</Link>
            </li>
            <li>
                <Link to={prefixLink('/toml/')}>TOML</Link>
            </li>
        </ul>
        <h3>Supported CSS processors</h3>
        <ul>
            <li>
                <Link to={prefixLink('/css-modules/')}>CSS Modules</Link>
            </li>
        </ul>
    </div>
);

export default Index;
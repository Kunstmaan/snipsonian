import React from 'react';
import {Link} from 'react-router';
import {prefixLink} from 'gatsby-helpers';
import Helmet from 'react-helmet';
import {config} from 'config';
import Highlight from 'react-highlight';

const Index = () => (
    <div className="front-page">
        <Helmet title={config.siteTitle}
            meta={[
                {name: 'description', content: 'Snipsonian'},
                {name: 'keywords', content: 'snipsonian javascript js snippet kunstmaan'}
            ]} />
        <h1>Snipsonian</h1>
        <p>Snipsonian is a library that contains some re-usable - and tested - javascript snippets, so that we
            of the Kunstmaan Development team do not have to rewrite them every time we need them in some project.
            And we decided to give it to the community.</p>
        <p>It does not offer a bundle containing all snippets as that would enlarge your app unnecessarily! Instead you
            should just directly import - using the es6 import syntax - only those snippets you need.</p>
        <h2>
            Usage
        </h2>
        <h3>Install</h3>
        <Highlight>npm install --save snipsonian</Highlight>
        <h3>Use some snippet</h3>
        <p>Directly import (es6 import syntax) the snippet you need</p>
        <p>Example:</p>
        <Highlight>import is from 'snipsonian/generic/is';</Highlight>
    </div>
);

export default Index;
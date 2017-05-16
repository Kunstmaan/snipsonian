import React from 'react';
import PropTypes from 'prop-types';

import SnippetGroup from './SnippetGroup';

class Snippets extends React.Component {
    componentDidMount() {
        scrollToHash();
    }
    render() {
        console.log(this.props.config.docs);
        return (
            <div className="flex-content">
                <h2>{this.props.config.v}</h2>
                {this.props.config.docs.map((group) => <SnippetGroup key={group.name} group={group} />)}
            </div>
        );
    }
}

Snippets.propTypes = {
    config: PropTypes.shape({
        v: PropTypes.string,
        docs: PropTypes.array
    })
};

export default Snippets;

function scrollToHash() {
    const hash = window.location.hash;
    if (hash) {
        const el = document.getElementById(hash.replace(/^#/, ''));
        el.scrollIntoView();
        window.scrollBy(0, -50);
    }
}
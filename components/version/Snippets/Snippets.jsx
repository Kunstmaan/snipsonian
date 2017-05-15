import React from 'react';
import SnippetGroup from './SnippetGroup';

class Snippets extends React.Component {
    componentDidMount() {
        const hash = window.location.hash;
        if (hash) {
            const el = document.getElementById(hash.replace(/^#/, ''));
            el.scrollIntoView();
        }
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

export default Snippets;
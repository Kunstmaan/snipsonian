import React from 'react';
import SnippetGroup from './SnippetGroup';

class Snippets extends React.Component {
    render() {
        return (
            <div className="flex-content">
                <h2>{this.props.config.v}</h2>
                {this.props.config.docs.map((group) => <SnippetGroup key={group.name} group={group} >
                </SnippetGroup>)}
            </div>
        );
    }
}

export default Snippets;
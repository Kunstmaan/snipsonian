import React from 'react';

import SnippetDetail from './SnippetDetail';

class SnippetGroup extends React.Component {
    render() {
        console.log(this.props.group);
        return (
            <div id={this.props.group.name}>
                <h3>{this.props.group.name}</h3>
                {this.props.group.snippets.map((snippet) => (
                    <div key={snippet.name}>
                        <SnippetDetail snippet={snippet} />
                        <br />
                        <hr />
                    </div>
                ))}
            </div>
        );
    }
}

export default SnippetGroup;
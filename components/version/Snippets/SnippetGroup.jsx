import React from 'react';

import SnippetDetail from './SnippetDetail';

class SnippetGroup extends React.Component {
    render() {
        return (
            <div id={this.props.group.name}>
                <h3>{this.props.group.name}</h3>
                {this.props.group.snippets.map((snippet) => (
                    <div key={snippet.name}>
                        <SnippetDetail snippet={snippet}>
                            {snippet.parts.length > 0 &&
                                snippet.parts.map((part) => (
                                    <SnippetDetail key={`partDetail-${part.name}`} snippet={part} />
                                ))
                            }
                        </SnippetDetail>
                        <br />
                        <hr />
                    </div>
                ))}
            </div>
        );
    }
}

export default SnippetGroup;
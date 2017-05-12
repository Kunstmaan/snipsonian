import React from 'react';

import SnippetParams from './SnippetParams';
import SnippetExample from './SnippetExample';

class SnippetDetail extends React.Component {
    render() {
        return (
            <div>
                <h4>{this.props.snippet.name}</h4>
                <div>
                    <strong>Author{this.props.snippet.authors.length > 1 ? 's' : ''}: </strong>
                    {this.props.snippet.authors.join(', ')}
                </div>
                <div>
                    <strong>Description: </strong>
                    {this.props.snippet.desc}
                </div>
                <div>
                    <strong>Params: </strong>
                    {this.props.snippet.params.length > 0 ?
                        <SnippetParams params={this.props.snippet.params} /> : 'No Params'}
                </div>
                <div>
                    <strong>Example: </strong>
                    {this.props.snippet.examples.map((example) => <SnippetExample key={example} example={example} />)}
                </div>
            </div>
        );
    }
}

export default SnippetDetail;
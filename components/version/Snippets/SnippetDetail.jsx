import React from 'react';

import SnippetParams from './SnippetParams';
import SnippetExample from './SnippetExample';

class SnippetDetail extends React.Component {
    render() {
        return (
            <div className={this.props.snippet.parentName !== undefined && 'snippet-detail__part'}>
                <h4>
                    {`${this.props.snippet.parentName !== undefined ?
                    `${this.props.snippet.parentName}.` : ''}${this.props.snippet.getName()}`
                    }
                    {this.props.snippet.type === 'function' &&
                        ` (${paramsToString(this.props.snippet.params)})`
                    }
                </h4>
                {
                    this.props.snippet.authors.length > 0 &&
                        <div>
                            <strong>Author{this.props.snippet.authors.length > 1 ? 's' : ''}: </strong>
                            {this.props.snippet.authors.join(', ')}
                        </div>
                }
                <div>
                    <strong>Description: </strong>
                    {this.props.snippet.desc}
                </div>
                {
                    this.props.snippet.params.length > 0 &&
                    <div>
                        <strong>Params: </strong>
                        <SnippetParams params={this.props.snippet.params} />
                    </div>
                }
                {this.props.snippet.returns &&
                    <div>
                        <strong>Returns: </strong>
                        {this.props.snippet.returns.type} - {this.props.snippet.returns.desc}
                    </div>
                }
                { this.props.snippet.examples.length > 0 &&
                    <div>
                        <strong>Example: </strong>
                        {this.props.snippet.examples.map((example) => (
                            <SnippetExample key={example} example={example} />
                        ))}
                    </div>
                }
                {this.props.children}
            </div>
        );
    }
}

export default SnippetDetail;

function paramsToString(params) {
    if (params.length <= 0) return '';
    const paramNames = params.map((param) =>
        `${param.isOptional ? '[' : ''}, ${param.name}${param.isOptional ? ']' : ''}`
    );
    paramNames[0] = paramNames[0].replace(', ', '');
    return paramNames.join('');
}
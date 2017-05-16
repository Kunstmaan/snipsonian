import React from 'react';

import SnippetParams from './SnippetParams';
import SnippetExample from './SnippetExample';

class SnippetDetail extends React.Component {
    constructor(props) {
        super(props);
        this.snippet = props.snippet;
        this.id = `${this.snippet.groupName ? `${this.snippet.groupName}-` : ''}${this.snippet.parentName ? `${this.snippet.parentName}-` : ''}${this.snippet.getName()}`;
    }
    render() {
        return (
            <div className={`${this.snippet.parentName !== undefined ? 'snippet-detail__part' : ''} snippet-detail`}
                id={this.id}>
                <h4>
                    {`${this.snippet.parentName !== undefined ?
                    `${this.snippet.parentName}.` : ''}${this.snippet.getName()}`
                    }
                    {this.snippet.type === 'function' &&
                        ` (${paramsToString(this.snippet.params)})`
                    }
                </h4>
                {
                    this.snippet.authors.length > 0 &&
                        <div>
                            <strong>Author{this.snippet.authors.length > 1 ? 's' : ''}: </strong>
                            {this.snippet.authors.join(', ')}
                        </div>
                }
                <div>
                    <strong>Description: </strong>
                    {this.snippet.desc}
                </div>
                {
                    this.snippet.params.length > 0 &&
                    <div>
                        <strong>Params: </strong>
                        <SnippetParams params={this.snippet.params} />
                    </div>
                }
                {this.snippet.returns &&
                    <div>
                        <strong>Returns: </strong>
                        {this.snippet.returns.type} - {this.snippet.returns.desc}
                    </div>
                }
                { this.snippet.examples.length > 0 &&
                    <div>
                        <strong>Example: </strong>
                        {this.snippet.examples.map((example) => (
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
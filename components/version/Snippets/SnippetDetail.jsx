import React from 'react';
import PropTypes from 'prop-types';

import SnippetParams from './SnippetParams';
import SnippetExample from './SnippetExample';

const SnippetDetail = ({children, snippet}) => (
    <div className={`${snippet.parentName !== undefined ? 'snippet-detail__part' : ''} snippet-detail`}
         id={createId(snippet)}>
        <h4>
            {`${snippet.parentName !== undefined ?
                `${snippet.parentName}.` : ''}${snippet.getName()}`
            }
            {snippet.type === 'function' &&
            ` (${paramsToString(snippet.params)})`
            }
        </h4>
        {
            snippet.authors.length > 0 &&
            <div>
                <strong>Author{snippet.authors.length > 1 ? 's' : ''}: </strong>
                {snippet.authors.join(', ')}
            </div>
        }
        <div>
            <strong>Description: </strong>
            {snippet.desc}
        </div>
        {
            snippet.params.length > 0 &&
            <div>
                <strong>Params: </strong>
                <SnippetParams params={snippet.params} />
            </div>
        }
        {snippet.returns &&
        <div>
            <strong>Returns: </strong>
            {snippet.returns.type} - {snippet.returns.desc}
        </div>
        }
        { snippet.examples.length > 0 &&
        <div>
            <strong>Example: </strong>
            {snippet.examples.map((example) => (
                <SnippetExample key={example} example={example} />
            ))}
        </div>
        }
        {children}
    </div>
);

SnippetDetail.propTypes = {
    children: PropTypes.node,
    snippet: PropTypes.shape({
        desc: PropTypes.string,
        example: PropTypes.string,
        getName: PropTypes.func,
        groupName: PropTypes.string,
        parentName: PropTypes.string,
        type: PropTypes.string,
        params: PropTypes.arrayOf(PropTypes.shape({
            desc: PropTypes.string,
            isArray: PropTypes.bool,
            isOptional: PropTypes.bool,
            name: PropTypes.string
        })),
        returns: PropTypes.shape({
            desc: PropTypes.string,
            type: PropTypes.string
        })
    }).isRequired
};

export default SnippetDetail;

function paramsToString(params) {
    if (params.length <= 0) return '';
    const paramNames = params.map(putBracketsAroundOptionalParams);
    paramNames[0] = paramNames[0].replace(', ', '');
    return paramNames.join('');
}

function createId(snippet) {
    return `${snippet.groupName ? `${snippet.groupName}-` : ''}${snippet.parentName ? `${snippet.parentName}-` : ''}${snippet.getName()}`;
}

function putBracketsAroundOptionalParams(param) {
    return `${param.isOptional ? '[' : ''}, ${param.name}${param.isOptional ? ']' : ''}`;
}
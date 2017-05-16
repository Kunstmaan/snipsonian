import React from 'react';
import PropTypes from 'prop-types';

import SnippetDetail from './SnippetDetail';

const SnippetGroup = ({group}) => (
    <div id={group.name} className="snippet">
        <h3>{group.name}</h3>
        {group.snippets.map((snippet) => (
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

SnippetGroup.propTypes = {
    group: PropTypes.shape({
        name: PropTypes.string.isRequired,
        snippets: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            parts: PropTypes.arrayOf(PropTypes.shape({
                name: PropTypes.string
            }))
        })).isRequired
    })
};


export default SnippetGroup;
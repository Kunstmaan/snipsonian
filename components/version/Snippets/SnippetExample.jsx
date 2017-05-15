import React from 'react';
import Highlight from 'react-highlight';
import 'highlight.js/styles/darkula.css';

import beautifyJsCode from '../../../docTreeGenerator/util/beautifyJsCode';

class SnippetExample extends React.Component {
    render() {
        return (
            <Highlight>
                {beautifyJsCode(this.props.example)}
            </Highlight>
        );

    }
}

export default SnippetExample;
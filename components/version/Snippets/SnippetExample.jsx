import React from 'react';
import Highlight from 'react-highlight';
import PropTypes from 'prop-types';

import 'highlight.js/styles/darkula.css';

import beautifyJsCode from '../../../docTreeGenerator/util/beautifyJsCode';

const SnippetExample = ({example}) => (
    <Highlight className="javascript">
        {beautifyJsCode(example)}
    </Highlight>
);

SnippetExample.propTypes = {
    example: PropTypes.func.isRequired
};

export default SnippetExample;
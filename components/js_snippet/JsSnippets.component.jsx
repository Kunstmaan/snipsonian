import React from 'react';
import PropTypes from 'prop-types';

const JsSnippets = ({version}) => (
    <div>version: {version}</div>
);

JsSnippets.propTypes = {
    version: PropTypes.string
};

export default JsSnippets;
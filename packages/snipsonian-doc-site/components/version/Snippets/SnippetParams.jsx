import React from 'react';
import PropTypes from 'prop-types';

const textCenterStyle = {textAlign: 'center'};

const SnippetParams = ({params}) => (
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Description</th>
                <th>Default value</th>
                <th style={textCenterStyle}>isArray</th>
                <th style={textCenterStyle}>isOptional</th>
            </tr>
        </thead>
        <tbody>
            {params.map((param) => (
                <tr key={param.name}>
                    <td>{param.name}</td>
                    <td>{param.type}</td>
                    <td>{param.desc}</td>
                    <td>{param.defaultValue}</td>
                    <td style={textCenterStyle}>{resolveArray(param.isArray, param.canBeArray)}</td>
                    <td style={textCenterStyle}>{resolveBoolToEmoji(param.isOptional)}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

SnippetParams.propTypes = {
    params: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.string,
        desc: PropTypes.string,
        isArray: PropTypes.bool,
        isOptional: PropTypes.bool
    }))
};

export default SnippetParams;

function resolveBoolToEmoji(input) {
    return input ? '✔' : '✖';
}

function resolveArray(isArray, canBeArray) {
    if (canBeArray) return 'can';
    return resolveBoolToEmoji(isArray);
}
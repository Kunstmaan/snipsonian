import React from 'react';
import PropTypes from 'prop-types';

const textCenterStyle = {textAlign: 'center'};

const SnippetParamObjects = ({paramObjects}) => (
    <div>
        {paramObjects.map((paramObject) => (
            <table key={`snippetParamObject-${paramObject.id}`}>
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
                    {paramObject.parts.map((param) => (
                        <tr key={param.name}>
                            <td>{param.name}</td>
                            <td>{param.type}</td>
                            <td>{param.desc}</td>
                            <td>{param.defaultValue}</td>
                            <td style={textCenterStyle}>{resolveBoolToEmoji(param.isArray)}</td>
                            <td style={textCenterStyle}>{resolveBoolToEmoji(param.isOptional)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ))}
    </div>
);


SnippetParamObjects.propTypes = {
    paramObjects: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.string,
        desc: PropTypes.string,
        isArray: PropTypes.bool,
        isOptional: PropTypes.bool
    }))
};

export default SnippetParamObjects;

function resolveBoolToEmoji(input) {
    return input ? '✔' : '✖';
}
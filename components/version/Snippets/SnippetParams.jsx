import React from 'react';

const textCenterStyle = {textAlign: 'center'};

class SnippetParams extends React.Component {
    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Description</th>
                            <th style={textCenterStyle}>isArray</th>
                            <th style={textCenterStyle}>isOptional</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.params.map((param) => (
                            <tr key={param.name}>
                                <td>{param.name}</td>
                                <td>{param.type}</td>
                                <td>{param.desc}</td>
                                <td style={textCenterStyle}>{param.isArray ? '✔' : '✖'}</td>
                                <td style={textCenterStyle}>{param.isOptional ? '✔' : '✖'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default SnippetParams;
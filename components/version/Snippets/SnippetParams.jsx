import React from 'react';

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
                            <th style={{textAlign: 'center'}}>isArray</th>
                            <th style={{textAlign: 'center'}}>isOptional</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.params.map((param) => (
                            <tr key={param.name}>
                                <td>{param.name}</td>
                                <td>{param.type}</td>
                                <td>{param.desc}</td>
                                <td style={{textAlign: 'center'}}>{param.isArray ? '✔' : '✖'}</td>
                                <td style={{textAlign: 'center'}}>{param.isOptional ? '✔' : '✖'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default SnippetParams;
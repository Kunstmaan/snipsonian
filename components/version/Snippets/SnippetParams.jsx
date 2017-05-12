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
                            <th>isArray</th>
                            <th>isOptional</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.params.map((param) => (
                            <tr key={param.name}>
                                <td>{param.name}</td>
                                <td>{param.type}</td>
                                <td>{param.desc}</td>
                                <td>{param.isArray}</td>
                                <td>{param.isOptional}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default SnippetParams;
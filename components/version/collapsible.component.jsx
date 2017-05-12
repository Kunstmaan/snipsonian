import React from 'react';

class Collapsible extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isCollapsed: false};
        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    toggleCollapse() {
        this.setState({isCollapsed: !this.state.isCollapsed});
    }

    render() {
        return (
            <li key={this.props.group.name} className="collapsible">
                <button onClick={this.toggleCollapse} className="collapsible-switch">
                    [{this.state.isCollapsed ? '+' : '-'}]
                </button>
                {this.props.group.name}
                <ul className={`collapsible-content ${this.state.isCollapsed ? 'collapsed' : ''}`}>
                    {this.props.group.snippets.map((snippet) => <li key={snippet.name}>{snippet.name}</li>)}
                </ul>
            </li>
        );
    }
}

Collapsible.propTypes = {
    group: React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        snippets: React.PropTypes.arrayOf(React.PropTypes.shape({
            name: React.PropTypes.string.isRequired
        }))
    })
};

export default Collapsible;
import React from 'react';
import Proptypes from 'prop-types';

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
            <li className="collapsible">
                {this.props.children &&
                    <button onClick={this.toggleCollapse}>{this.state.isCollapsed ? '+' : '-'}</button>
                }
                <a href={`#${this.props.href}`}>{this.props.value}</a>
                {this.props.children &&
                    <ul className={`collapsible-content ${this.state.isCollapsed && 'collapsed'}`}>
                        {this.props.children}
                    </ul>
                }
            </li>
        );
    }
}

Collapsible.propTypes = {
    children: Proptypes.node,
    href: Proptypes.string.isRequired,
    value: Proptypes.string.isRequired
};

export default Collapsible;
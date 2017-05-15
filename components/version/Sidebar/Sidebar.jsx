import React from 'react';

import Collapsible from './collapsible';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="flex-sidbar version-component">
                <ul className="group-list">
                    {this.props.docGroups.map((group) => (
                        <Collapsible key={`sidebar-${group.name}`} value={group.name}>
                            {group.snippets.map((snippet) => (
                                <Collapsible key={`snippet-${snippet.getName()}`} value={snippet.getName()}>
                                    {snippet.parts.length > 0 && snippet.parts.map((part) => (
                                        <Collapsible key={`part${part.getName()}`} value={part.getName()} />
                                    ))}
                                </Collapsible>
                            ))}
                        </Collapsible>
                    ))}
                </ul>
            </div>
        );
    }
}

Sidebar.proptypes = {
    docGroups: React.PropTypes.arrayOf(React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        snippets: React.PropTypes.arrayOf(React.PropTypes.shape({
            name: React.PropTypes.string.isRequired
        }))
    }))
};

Sidebar.defaultValue = {
    docGroups: [{name: 'Default', snippets: [{name: 'Default'}]}]
};

export default Sidebar;
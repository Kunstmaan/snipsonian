import React from 'react';
import PropTypes from 'prop-types';

import Collapsible from './collapsible';
import VersionSelect from '../../versionSelect/VersionSelect';

const Sidebar = ({docGroups}) => (
    <div className="flex-sidbar">
        <div className="version-select-wrapper">Version: <VersionSelect /></div>
        <ul className="group-list">
            {docGroups.map((group) => (
                <Collapsible key={`sidebar-${group.name}`} value={group.name} href={group.name}>
                    {group.snippets.map((snippet) => (
                        <Collapsible key={`snippet-${snippet.getName()}`}
                                     value={snippet.getName()}
                                     href={`${group.name}-${snippet.getName()}`}>
                            {snippet.parts.length > 0 && snippet.parts.map((part) => (
                                <Collapsible key={`part${part.getName()}`}
                                             value={part.getName()}
                                             href={`${group.name}-${snippet.getName()}-${part.getName()}`} />
                            ))}
                        </Collapsible>
                    ))}
                </Collapsible>
            ))}
        </ul>
    </div>
);

Sidebar.propTypes = {
    docGroups: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        snippets: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired
        }))
    }))
};

Sidebar.defaultValue = {
    docGroups: [{name: 'Default', snippets: [{name: 'Default'}]}]
};

export default Sidebar;
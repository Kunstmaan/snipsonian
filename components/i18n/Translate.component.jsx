import React from 'react';
import PropTypes from 'prop-types';
import * as ReactIntl from 'react-intl';

const FormattedMessage = ReactIntl.FormattedMessage;

// TODO specifying a custom attribute (e.g. 'id') in .reactdownrc didn't work
// so re-used the reactdown line attribute but feels hacky
const Translate = ({line = 'test.label'}) => (
    <div>
        <FormattedMessage id={line} />
    </div>
);

Translate.propTypes = {
    line: PropTypes.string
};

export default Translate;
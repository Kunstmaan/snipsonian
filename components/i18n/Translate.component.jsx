import React from 'react';
import * as ReactIntl from 'react-intl';

const FormattedMessage = ReactIntl.FormattedMessage;

// TODO specifying a custom attribute (e.g. 'id') in .reactdownrc didn't work
// so re-used the reactdown line attribute but feels hacky
const Translate = ({line = 'test.label'}) => (
    <div>
        <FormattedMessage id={line} />
    </div>
);

export default Translate;
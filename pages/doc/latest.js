import React from 'react';
import {FormattedMessage} from 'react-intl';
import Version from '../../components/version/Version.component';

export default () => (
    <Version>
        <p>dummy latest</p>
        <FormattedMessage id="test.label"/>
    </Version>
);
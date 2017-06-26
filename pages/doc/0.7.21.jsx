import React from 'react';
import Version from '../../components/version/Version';
import docs from '../../prev_versions/0.7.21/_docs';

const versionConfig = {
    docs,
    v: '0.7.21'
};

export default () => (
    <Version config={versionConfig} />
);
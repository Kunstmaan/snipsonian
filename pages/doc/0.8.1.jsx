import React from 'react';
import Version from '../../components/version/Version';
import docs from '../../prev_versions/0.8.1/_docs';

const versionConfig = {
    docs,
    v: '0.8.1'
};

export default () => (
    <Version config={versionConfig} />
);
import React from 'react';
import Version from '../../components/version/Version';
import docs from '../../prev_versions/0.7.29/_docs';

const versionConfig = {
    docs,
    v: '0.7.29'
};

export default () => (
    <Version config={versionConfig} />
);
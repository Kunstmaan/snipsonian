import React from 'react';
import Version from '../../components/version/Version';
import docs from '../../prev_versions/0.7.42/_docs';

const versionConfig = {
    docs,
    v: '0.7.42'
};

export default () => (
    <Version config={versionConfig} />
);
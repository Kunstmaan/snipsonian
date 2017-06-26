import React from 'react';
import Version from '../../components/version/Version';
import docs from '../../prev_versions/0.7.28/_docs';

const versionConfig = {
    docs,
    v: '0.7.28'
};

export default () => (
    <Version config={versionConfig} />
);
import React from 'react';
import Version from '../../components/version/Version';
import docs from '../../prev_versions/0.7.22/_docs';

const versionConfig = {
    docs,
    v: '0.7.22'
};

export default () => (
    <Version config={versionConfig} />
);
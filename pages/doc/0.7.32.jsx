import React from 'react';
import Version from '../../components/version/Version';
import docs from '../../prev_versions/0.7.32/_docs';

const versionConfig = {
    docs,
    v: '0.7.32'
};

export default () => (
    <Version config={versionConfig} />
);
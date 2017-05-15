import React from 'react';
import Version from '../../components/version/Version.component';
import docs from '../../src/_docs';

const versionConfig = {
    docs,
    v: 'latest'
};

export default () => (
    <Version config={versionConfig} />
);
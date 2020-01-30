import React from 'react';
import { GITHUB_BASE_URL } from '../../../config/documentation';

interface IPublicProps {
    path: string;
    version: string;
}

export default function FilePath({ path, version }: IPublicProps) {
    return (
        <p className="text-sm mt-0">
            <a href={`${GITHUB_BASE_URL}/v${version}/${path}`} target="blank">
                {`${path} (view on GitHub)`}
            </a>
        </p>
    );
}

import React from 'react';
import { GITHUB_BASE_URL } from '../../../config/documentation';

interface IPublicProps {
    path: string;
}

export default function FilePath({ path }: IPublicProps) {
    return (
        <p className="text-sm mt-0">
            <a href={`${GITHUB_BASE_URL}/${path}`} target="blank">
                {`${path} (view latest version on github)`}
            </a>
        </p>
    );
}

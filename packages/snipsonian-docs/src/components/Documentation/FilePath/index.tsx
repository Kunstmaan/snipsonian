import React from 'react';
import './file-path.scss';
import { GITHUB_BASE_URL } from '../../../config/documentation';

interface IPublicProps {
    path: string;
}

export default function FilePath({ path }: IPublicProps) {
    return (
        <p className="FilePath">
            <a href={`${GITHUB_BASE_URL}/${path}`} target="blank">
                {`${path} (view latest version on github)`}
            </a>
        </p>
    );
}

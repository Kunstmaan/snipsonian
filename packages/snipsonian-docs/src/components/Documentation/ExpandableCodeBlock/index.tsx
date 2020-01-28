import React from 'react';
import CodeBlock from '../CodeBlock';

const CLASS_NAME = 'ExpandableCodeBlock';

interface IPublicProps {
    title: string;
    code: string;
}

// TODO: make expandable
export default function ExpandableCodeBlock({
    title,
    code,
}: IPublicProps) {
    if (!code) {
        return null;
    }

    return (
        <div className={CLASS_NAME}>
            <h5>{title}</h5>
            <CodeBlock code={code} />
        </div>

    );
}

import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface IPublicProps {
    code: string;
}

export default function CodeBlock({
    code,
}: IPublicProps) {
    if (!code) { return null; }

    return (
        <SyntaxHighlighter language="typescript" style={atomOneLight}>
            {code}
        </SyntaxHighlighter>
    );
}

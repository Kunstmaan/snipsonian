import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { IDocumentationItem } from '../../../models/documentation';
import './default-export-info.scss';

interface IPublicProps {
    file: IDocumentationItem;
}

export default function DefaultExportInfo({
    file,
}: IPublicProps) {
    if (!file.fileInfo || !file.fileInfo.defaultExport) {
        return null;
    }

    return (
        <SyntaxHighlighter language="typescript" style={atomOneLight}>
            {file.fileInfo.defaultExport}
        </SyntaxHighlighter>
    );
}

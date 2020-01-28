import React from 'react';
import './documentation.scss';
import { IDocumentationItem } from '../../models/documentation';
import ExpandableCodeBlock from './ExpandableCodeBlock';
import CodeBlock from './CodeBlock';
import { sortDocumentationItems } from '../../utils/sort';
import FilePath from './FilePath';

const CLASS_NAME = 'Documentation';

interface IPublicProps {
    documentation: IDocumentationItem[];
}

export default function Documentation({ documentation }: IPublicProps) {
    const level = 1;
    return (
        <div className={CLASS_NAME}>
            {sortDocumentationItems(documentation).map((item) => renderFolder({ item, level }))}
        </div>
    );
}

function renderFolder({ item, level }: { item: IDocumentationItem; level: number }) {
    const { name, slug, type, children } = item;

    if (type === 'file') {
        return (
            <Item item={item} />
        );
    }
    if (type === 'folder') {
        const childLevel = level + 1;
        return (
            <Folder key={slug} title={name}>
                <Children level={childLevel} items={children} />
            </Folder>

        );
    }
    return null;
}

function Item({ item }: { item: IDocumentationItem }) {
    return (
        <div className={`${CLASS_NAME}__item`} id={item.name}>
            <h4><a href={`#${item.name}`}>{item.name}</a></h4>
            <FilePath path={item.path} />
            {item.fileInfo && (
                <>
                    {item.fileInfo.description && <p>{item.fileInfo.description}</p>}
                    <CodeBlock code={item.fileInfo.defaultExport} />
                    <ExpandableCodeBlock title="Example" code={item.fileInfo.example} />
                </>
            )}
        </div>
    );
}

function Folder({ children, title }: { children: React.ReactNode; title: string }) {
    return (
        <div className={`${CLASS_NAME}__folder`}>
            {children}
        </div>
    );
}

function Children({ items, level }: { level: number; items: IDocumentationItem[] }) {
    return (
        <div className={`${CLASS_NAME}__children`}>
            {sortDocumentationItems(items).map((item) => renderFolder({ item, level }))}
        </div>
    );
}

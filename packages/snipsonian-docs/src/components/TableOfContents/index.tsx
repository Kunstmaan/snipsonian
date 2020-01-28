import React from 'react';
import { IDocumentationItem } from '../../models/documentation';
import { capitalize } from '../../utils/format';
import { sortDocumentationItems } from '../../utils/sort';

interface IPublicProps {
    documentation: IDocumentationItem[];
}

export default function TableOfContents({ documentation }: IPublicProps) {
    const level = 1;
    return (
        <div className="mb-12">
            <h3>Table Of Contents</h3>
            {sortDocumentationItems(documentation).map((item) => renderFolder({ item, level }))}
        </div>
    );
}

function renderFolder({ item, level }: { item: IDocumentationItem; level: number }) {
    const { name, slug, type, children } = item;

    if (type === 'file') {
        return (
            <Item key={slug} item={item} />
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
        <div className="my-1 pl-1">
            <a href={`#${item.name}`}>{item.name}</a>
        </div>
    );
}

function Folder({ children, title }: { children: React.ReactNode; title: string }) {
    return (
        <div className="my-1">
            <div>{capitalize(title)}</div>
            {children}
        </div>
    );
}

function Children({ items, level }: { level: number; items: IDocumentationItem[] }) {
    return (
        <div className="my-1 ml-2 pl-1 border-l border-dashed border-primary">
            {sortDocumentationItems(items).map((item) => renderFolder({ item, level }))}
        </div>
    );
}

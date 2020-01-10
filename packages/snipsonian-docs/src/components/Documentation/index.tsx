import React from 'react';
import './documentation.scss';
import { IDocumentationItem } from '../../models/documentation';

const CLASS_NAME = 'Documentation';

interface IPublicProps {
    documentation: IDocumentationItem;
}

export default function Documentation({ documentation }: IPublicProps) {
    const level = 1;
    return (
        <div className={CLASS_NAME}>
            <Folder key={documentation.path} title={documentation.name}>
                <Children level={level} items={documentation.children} />
            </Folder>
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
            <p>{`Path: ${item.path}`}</p>
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
            {items.map((item) => renderFolder({ item, level }))}
        </div>
    );
}

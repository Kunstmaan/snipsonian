import React from 'react';
import { IDocumentationItem } from '../../models/documentation';
import ExpandableCodeBlock from './ExpandableCodeBlock';
import CodeBlock from './CodeBlock';
import { sortDocumentationItems } from '../../utils/sort';
import FilePath from './FilePath';

interface IPublicProps {
    documentation: IDocumentationItem[];
    version: string;
}

export default function Documentation({ documentation, version }: IPublicProps) {
    const startLevel = 1;
    return (
        <div>
            {sortDocumentationItems(documentation).map((item) => renderFolder({ item, level: startLevel }))}
        </div>
    );

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
            <div className="py-6" id={item.name}>
                <h4 className="mb-0">
                    <a className="text-black font-semibold" href={`#${item.name}`}>
                        {item.name}
                    </a>
                </h4>
                <FilePath path={item.path} version={version} />
                {item.fileInfo && (
                    <>
                        {item.fileInfo.description && <p>{item.fileInfo.description}</p>}
                        <CodeBlock code={item.fileInfo.exports} />
                        <ExpandableCodeBlock title="Example" code={item.fileInfo.example} />
                    </>
                )}
            </div>
        );
    }

    function Folder({ children, title }: { children: React.ReactNode; title: string }) {
        return (
            <div>
                {children}
            </div>
        );
    }

    function Children({ items, level }: { level: number; items: IDocumentationItem[] }) {
        return (
            <div>
                {sortDocumentationItems(items).map((item) => renderFolder({ item, level }))}
            </div>
        );
    }
}

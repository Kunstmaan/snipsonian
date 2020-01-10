import { useState, useEffect } from 'react';
import { IDocumentationItem } from '../models/documentation';

interface IDocumentation {
    [folder: string]: IDocumentationItem;
}

const FOLDERS = [
    'snipsonian-analytics',
    'snipsonian-api',
    'snipsonian-axios',
    'snipsonian-browser',
    'snipsonian-core',
];

export function useDocs() {
    const [docs, setDocs] = useState<IDocumentation>({});

    useEffect(() => {
        const getJson = async (folder: string) => {
            const json = await import(`../../static/documentation/${folder}/docs.json`);
            setDocs((prevDocs) => ({
                ...prevDocs,
                [folder]: json,
            }));
        };

        FOLDERS.forEach((folder) => getJson(folder));
    }, []);

    return docs;
}

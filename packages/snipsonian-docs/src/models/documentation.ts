

type TFileType = 'file' | 'folder';

export interface INavigationItem {
    title: string;
    to: string;
}

export interface IPackageDocumentation {
    title: string;
    description: string;
    documentation: IDocumentationItem[];
    slug: string;
}

export interface IDocumentationItem {
    path: string;
    name: string;
    type: TFileType;
    slug: string;
    children?: IDocumentationItem[];
    fileInfo?: {
        defaultExport: string;
    };
}

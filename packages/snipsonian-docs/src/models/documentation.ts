

type TFileType = 'file' | 'folder';

export interface INavigationItem {
    title: string;
    to: string;
}

export interface IPackageVersionDocumentation {
    title: string;
    description: string;
    documentation: IDocumentationItem[];
    slug: string;
    version: string;
}

export interface IDocumentationItem {
    path: string;
    name: string;
    type: TFileType;
    slug: string;
    children?: IDocumentationItem[];
    fileInfo?: IFileInfo;
}

export interface IFileInfo {
    defaultExport: string;
}

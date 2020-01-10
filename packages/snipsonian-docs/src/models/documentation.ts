type TFileType = 'file' | 'folder';

export interface INavigationItem {
    title: string;
    to: string;
}

export interface IDocumentationItem {
    path: string;
    name: string;
    type: TFileType;
    slug: string;
    children?: IDocumentationItem[];
}

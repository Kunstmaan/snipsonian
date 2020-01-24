export interface IAst {
    type: string;
    start: number;
    end: number;
    comments: IAstComment[];
}
export interface IAstManager {
    getAst: () => IAst;
    getDefaultExport: () => string;
    getDescriptionAtStartOfFile: () => string;
}

export interface IAstComment {
    start: number;
    end: number;
    value: string;
}

export interface IAstNodeLocation {
    start: number;
    end: number;
}

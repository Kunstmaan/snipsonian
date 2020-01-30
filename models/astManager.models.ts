export interface IAst {
    type: string;
    start: number;
    end: number;
    comments: IAstComment[];
}
export interface IAstManager {
    getAst: () => IAst;
    getExports: () => string | null;
    getDescriptionAtStartOfFile: () => string | null;
    getExampleCode: () => string | null;
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

export interface IAstMethod extends IAstNodeLocation {
    type: string;
    accessibility: 'public' | 'private';
    body: {
        start: number;
        end: number;
    };
}

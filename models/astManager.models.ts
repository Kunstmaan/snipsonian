export interface IAst {
    type: string;
    start: number;
    end: number;
    comments: {
        start: number;
        end: number;
        value: string;
    }[];
}
export interface IAstManager {
    getAst: () => IAst;
    getDefaultExport: () => string;
    getDescriptionAtStartOfFile: () => string;
}

import React from 'react';

export interface IPagePart<PagePartType = string, PagePartData = {}> {
    type: PagePartType;
    data: PagePartData;
    /* anchorId is not returned by the cms,
       but can be set if you need an anchor link to a specific pagePart */
    anchorId?: string;
}

export interface IPagePartType2ComponentMap {
    [pagePartType: string]: React.FunctionComponent<IPagePartComponentProps<{}>>;
}

export interface IPagePartComponentProps<Data> {
    data: Data;
}

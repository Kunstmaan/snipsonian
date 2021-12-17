import * as React from 'react';
import { IPagePart, IPagePartType2ComponentMap } from '../pageParts.models';

const CLASS_NAME = 'PagePart';

interface IPublicProps {
    pagePart: IPagePart;
    pagePartType2ComponentMap: IPagePartType2ComponentMap;
    index: number;
}

export default function PagePartWrapper({ pagePart, pagePartType2ComponentMap, index }: IPublicProps) {
    const { type, data } = pagePart;
    const Component = pagePartType2ComponentMap[type];

    if (!Component) {
        return null;
    }

    return (
        <div className={CLASS_NAME}>
            <Component data={data} index={index} />
        </div>
    );
}

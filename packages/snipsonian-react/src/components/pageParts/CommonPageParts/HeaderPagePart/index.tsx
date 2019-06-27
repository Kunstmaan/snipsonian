import React from 'react';
import { IPagePartComponentProps } from '../../pageParts.models';
import Translate from '../../../i18n/Translate';

export interface IHeaderPagePartData {
    niv?: number; // header niv, e.g. 2 for a H2
    title: string;
}

export default function HeaderPagePart(props: IPagePartComponentProps<IHeaderPagePartData>) {
    const { data } = props;

    return (
        <h2 className="HeaderPagePart">
            <Translate msg={data.title} />
        </h2>
    );
}

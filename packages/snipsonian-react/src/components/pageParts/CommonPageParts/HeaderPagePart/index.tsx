import * as React from 'react';
import { IPagePartComponentProps } from '../../pageParts.models';
import Translate from '../../../i18n/Translate';
import { toAnchorTargetId } from '../../../../utils/anchor';

export interface IHeaderPagePartData {
    niv?: number; // header niv, e.g. 2 for a H2
    title: string;
}

export default function HeaderPagePart(props: IPagePartComponentProps<IHeaderPagePartData>) {
    const { data } = props;
    const header = `h${data.niv || 2}`; // Default H2

    return React.createElement(header, { id: toAnchorTargetId(data.title), className: 'HeaderPagePart' }, (
        <Translate msg={data.title} />
    ));
}

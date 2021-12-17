import * as React from 'react';
import { IPagePartComponentProps } from '../../pageParts.models';

export interface ITextPagePartData {
    content: string;
}

export default function TextPagePart(props: IPagePartComponentProps<ITextPagePartData>) {
    const { data } = props;

    return (
        <div
            className="TextPagePart"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
                __html: data.content,
            }}
        />
    );
}

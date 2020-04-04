import React from 'react';
import { IPagePart, IPagePartType2ComponentMap } from '../pageParts.models';
import PagePartWrapper from '../PagePartWrapper';
import { toAnchorTargetId } from '../../../utils/anchor';

const DEFAULT_WRAPPER_CLASS_NAME = 'PageParts';

export interface IPagePartsProps {
    pageParts: IPagePart<string, {}>[];
    pagePartType2ComponentMap: IPagePartType2ComponentMap;
    pagePartIdPrefix: string;
    wrapPageParts?: {
        className?: string; // default 'PageParts'
    };
}

export default function PageParts(props: IPagePartsProps) {
    const { wrapPageParts } = props;

    if (wrapPageParts) {
        const {
            className = DEFAULT_WRAPPER_CLASS_NAME,
        } = wrapPageParts;

        return (
            <div className={className}>
                {renderPageParts(props)}
            </div>
        );
    }

    return renderPageParts(props);
}

function renderPageParts({ pageParts, pagePartIdPrefix, pagePartType2ComponentMap }: IPagePartsProps) {
    return (
        <>
            {pageParts
                .map((pagePart, index) => {
                    const pagePartId = pagePart.anchorId
                        ? toAnchorTargetId(pagePart.anchorId)
                        : `${pagePartIdPrefix}-${index}`;

                    return (
                        <div
                            // eslint-disable-next-line react/no-array-index-key
                            key={`${pagePartIdPrefix}-pagePart-${index}`}
                            id={pagePartId}
                        >
                            <PagePartWrapper
                                pagePart={pagePart}
                                pagePartType2ComponentMap={pagePartType2ComponentMap}
                                index={index}
                            />
                        </div>
                    );
                })
            }
        </>
    );
}

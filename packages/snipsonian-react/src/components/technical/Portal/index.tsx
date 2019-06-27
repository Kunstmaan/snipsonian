import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface IProps {
    children: ReactNode;
    domNode: HTMLElement;
}

export default function Portal(props: IProps) {
    const { children, domNode } = props;
    return (
        <>
            {ReactDOM.createPortal(
                children,
                domNode,
            )}
        </>
    );
}

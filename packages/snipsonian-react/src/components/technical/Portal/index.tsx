import * as React from 'react';
import ReactDOM from 'react-dom';

interface IProps {
    children: React.ReactNode;
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

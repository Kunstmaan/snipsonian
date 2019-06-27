import { ComponentClass } from 'react';

export function isReactComponentClass<T>(input: ComponentClass | T): input is ComponentClass {
    return typeof (input as ComponentClass).prototype.render === 'function';
}

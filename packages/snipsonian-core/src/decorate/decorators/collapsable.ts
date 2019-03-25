import isArray from '../../is/isArray';
import { TDecorator } from '../index';

export interface ICollapsableOptions {
    initialIsCollapsed?: boolean;
}

export interface ICollapsable {
    isCollapsed: boolean;
    toggleCollapse: () => void;
}

export default function collapsable({ initialIsCollapsed = false }: ICollapsableOptions = {}): TDecorator {
    return function decorate(target: any) {
        if (isArray(target)) {
            return target.map((entity: any) => enrichToBeCollapsable(entity, initialIsCollapsed));
        }

        return enrichToBeCollapsable(target, initialIsCollapsed);
    };
}

function enrichToBeCollapsable(target: object, initialIsCollapsed: boolean): ICollapsable {
    const collapsable = target as ICollapsable;
    collapsable.isCollapsed = initialIsCollapsed;

    collapsable.toggleCollapse = () => {
        collapsable.isCollapsed = !collapsable.isCollapsed;
    };

    return collapsable;
}

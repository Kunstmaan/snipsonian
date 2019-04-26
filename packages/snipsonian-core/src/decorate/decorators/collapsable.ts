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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function decorate(target: any) {
        if (isArray(target)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return target.map((entity: any) => enrichToBeCollapsable(entity, initialIsCollapsed));
        }

        return enrichToBeCollapsable(target, initialIsCollapsed);
    };
}

function enrichToBeCollapsable(target: object, initialIsCollapsed: boolean): ICollapsable {
    const enrichedTarget = target as ICollapsable;
    enrichedTarget.isCollapsed = initialIsCollapsed;

    enrichedTarget.toggleCollapse = () => {
        enrichedTarget.isCollapsed = !enrichedTarget.isCollapsed;
    };

    return enrichedTarget;
}

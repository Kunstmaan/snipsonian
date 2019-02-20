import isArray from '../../is/isArray';

export interface ICollapsableOptions {
    initialIsCollapsed?: boolean;
}

export interface ICollapsable {
    isCollapsed: boolean;
    toggleCollapse: () => void;
}

export default function collapsable({ initialIsCollapsed = false }: ICollapsableOptions = {}) {
    return function decorate(target) {
        if (isArray(target)) {
            return target.map((entity) => enrichToBeCollapsable(entity, initialIsCollapsed));
        }

        return enrichToBeCollapsable(target, initialIsCollapsed);
    };
}

function enrichToBeCollapsable(target: object, initialIsCollapsed): ICollapsable {
    const collapsable = target as ICollapsable;
    collapsable.isCollapsed = initialIsCollapsed;

    collapsable.toggleCollapse = () => {
        collapsable.isCollapsed = !collapsable.isCollapsed;
    };

    return collapsable;
}

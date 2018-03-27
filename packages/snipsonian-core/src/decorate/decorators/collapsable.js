import isArray from '../../is/isArray';

export default function collapsable({initialIsCollapsed = false} = {}) {
    return function decorate(target) {
        if (isArray(target)) {
            return target.map((entity) => enrichToBeCollapsable(entity, initialIsCollapsed));
        }

        return enrichToBeCollapsable(target, initialIsCollapsed);
    };
}

/* eslint no-param-reassign: ["error", { "props": false }] */
function enrichToBeCollapsable(target, initialIsCollapsed) {
    target.isCollapsed = initialIsCollapsed;

    target.toggleCollapse = () => {
        target.isCollapsed = !target.isCollapsed;
    };

    return target;
}

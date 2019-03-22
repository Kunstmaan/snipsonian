import {is} from '../index';

const collapsable = (initialIsCollapsed = false) =>
    function decorate(target) {
        if (is.array(target)) {
            return target.map((entity) => enrichToBeCollapsable(entity, initialIsCollapsed));
        }

        return enrichToBeCollapsable(target, initialIsCollapsed);
    };

export default collapsable;

/* eslint no-param-reassign: ["error", { "props": false }] */
function enrichToBeCollapsable(target, initialIsCollapsed) {
    target.isCollapsed = initialIsCollapsed;

    target.toggleCollapse = () => {
        target.isCollapsed = !target.isCollapsed;
    };

    return target;
}
import {is} from '../index';

const collapsable = (isCollapsed = false) =>
    function decorate(target) {
        if (is.array(target)) {
            return target.map((entity) => enrichToBeCollapsable(entity, isCollapsed));
        }

        return enrichToBeCollapsable(target, isCollapsed);
    };

export default collapsable;

/* eslint no-param-reassign: ["error", { "props": false }] */
function enrichToBeCollapsable(target, isCollapsed) {
    target.isCollapsed = isCollapsed;

    target.toggleCollapse = () => {
        target.isCollapsed = !target.isCollapsed;
    };

    return target;
}
import is from '../generic/is';

const collapsable = (entity, isCollapsed = false) => {
    if (is.array(entity)) {
        return entity.map((ent) => enrichToBeCollapsable(ent, isCollapsed));
    }

    return enrichToBeCollapsable(entity, isCollapsed);
};

export default collapsable;

/* eslint no-param-reassign: ["error", { "props": false }] */
function enrichToBeCollapsable(entity, isCollapsed) {
    entity.isCollapsed = isCollapsed;

    entity.toggleCollapse = () => {
        entity.isCollapsed = !entity.isCollapsed;
    };

    return entity;
}
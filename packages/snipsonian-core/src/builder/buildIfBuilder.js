import isArray from '../is/isArray';
import isBuilder from '../is/isBuilder';

export default function buildIfBuilder(entity) {
    if (isArray(entity)) {
        return entity.map(buildSingleEntityIfBuilder);
    }

    return buildSingleEntityIfBuilder(entity);
}

function buildSingleEntityIfBuilder(entity) {
    if (isBuilder(entity)) {
        return entity.build();
    }

    return entity;
}

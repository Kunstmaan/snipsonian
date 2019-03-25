import isArray from '../is/isArray';
import isBuilder from '../is/isBuilder';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function buildIfBuilder(entity: any): any {
    if (isArray(entity)) {
        return entity.map(buildSingleEntityIfBuilder);
    }

    return buildSingleEntityIfBuilder(entity);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildSingleEntityIfBuilder(entity: any): any {
    if (isBuilder(entity)) {
        return entity.build();
    }

    return entity;
}

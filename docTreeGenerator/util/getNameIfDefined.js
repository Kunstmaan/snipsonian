import {is} from '../../src/index';

const getNameIfDefined = (entity) => {
    if (is.set(entity)) {
        return entity.name;
    }
    return entity;
};

export default getNameIfDefined;
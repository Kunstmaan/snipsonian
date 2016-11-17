import {is} from '../../index';

const getNameIfDefined = (entity) => {
    if (is.set(entity)) {
        return entity.name;
    }
    return entity;
};

export default getNameIfDefined;
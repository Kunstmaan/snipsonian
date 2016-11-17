import is from '../../generic/is';

const getNameIfDefined = (entity) => {
    if (is.set(entity)) {
        return entity.name;
    }
    return entity;
};

export default getNameIfDefined;
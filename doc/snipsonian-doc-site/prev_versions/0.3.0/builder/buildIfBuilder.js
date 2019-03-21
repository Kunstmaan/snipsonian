import {is} from '../index';

const buildIfBuilder = (entity) => {
    if (is.array(entity)) {
        return entity.map(buildSingleEntityIfBuilder);
    }

    return buildSingleEntityIfBuilder(entity);
};

export default buildIfBuilder;

function buildSingleEntityIfBuilder(entity) {
    if (is.builder(entity)) {
        return entity.build();
    }

    return entity;
}
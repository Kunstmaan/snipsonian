import {is} from '../index';

export const buildIfBuilder = (builder) => {
    if (is.builder(builder)) {
        return builder.build();
    }

    return builder;
};

export const buildIfBuilders = (builders) =>
    builders.map(buildIfBuilder);
import isArray from '../../is/isArray';
import isUndefined from '../../is/isUndefined';

/* eslint no-param-reassign: ["error", { "props": false }] */

export interface IBuilderOptions {
    initialBuildParams?: object;
    buildStateName?: string;
}

export interface IBuilder<Result = {}> {
    getBuildParam: (key: string) => any;
    with: (key: string, val: any) => IBuilder<Result>;
    build: () => Result;
}

export default function builder({
    initialBuildParams = {},
    buildStateName = '_builder',
}: IBuilderOptions = {}) {
    return function decorate(target) {
        if (isArray(target)) {
            return target.map((entity) => enrichToBeBuilder(entity, { initialBuildParams, buildStateName }));
        }

        return enrichToBeBuilder(target, { initialBuildParams, buildStateName });
    };
}

function enrichToBeBuilder(target: object, { initialBuildParams, buildStateName }: IBuilderOptions): IBuilder {
    const builder = target as IBuilder;

    if (isUndefined(builder[buildStateName])) {
        builder[buildStateName] = initialBuildParams;
    } else {
        Object.assign(builder[buildStateName], initialBuildParams);
    }

    builder.with = (key, val) => {
        builder[buildStateName][key] = val;
        return builder;
    };

    builder.getBuildParam = (key) => builder[buildStateName][key];

    builder.build = () => builder[buildStateName];

    return builder;
}

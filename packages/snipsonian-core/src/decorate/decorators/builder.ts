import isArray from '../../is/isArray';
import isUndefined from '../../is/isUndefined';
import { TDecorator } from '../index';

export interface IBuilderOptions {
    initialBuildParams?: object;
    buildStateName?: string;
}

export interface IBuilder<Result = {}> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getBuildParam: (key: string) => any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    with: (key: string, val: any) => IBuilder<Result>;
    build: () => Result;
}

export default function builder({
    initialBuildParams = {},
    buildStateName = '_builder',
}: IBuilderOptions = {}): TDecorator {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function decorate(target: any) {
        if (isArray(target)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return target.map((entity: any) => enrichToBeBuilder(entity, { initialBuildParams, buildStateName }));
        }

        return enrichToBeBuilder(target, { initialBuildParams, buildStateName });
    };
}

function enrichToBeBuilder(target: object, { initialBuildParams, buildStateName }: IBuilderOptions): IBuilder {
    const enrichedTarget = target as IBuilder;

    if (isUndefined(enrichedTarget[buildStateName])) {
        enrichedTarget[buildStateName] = initialBuildParams;
    } else {
        Object.assign(enrichedTarget[buildStateName], initialBuildParams);
    }

    enrichedTarget.with = (key, val) => {
        enrichedTarget[buildStateName][key] = val;
        return enrichedTarget;
    };

    enrichedTarget.getBuildParam = (key) => enrichedTarget[buildStateName][key];

    enrichedTarget.build = () => enrichedTarget[buildStateName];

    return enrichedTarget;
}

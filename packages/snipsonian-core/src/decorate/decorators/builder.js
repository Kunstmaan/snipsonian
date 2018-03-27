import isArray from '../../is/isArray';
import isUndefined from '../../is/isUndefined';

/* eslint no-param-reassign: ["error", { "props": false }] */

export default function builder({initialBuildParams = {}, buildStateName = '_builder'} = {}) {
    return function decorate(target) {
        if (isArray(target)) {
            return target.map((entity) => enrichToBeBuilder(entity, initialBuildParams, buildStateName));
        }

        return enrichToBeBuilder(target, initialBuildParams, buildStateName);
    };
}

function enrichToBeBuilder(target, initialBuildParams, buildStateName) {
    if (isUndefined(target[buildStateName])) {
        target[buildStateName] = initialBuildParams;
    } else {
        Object.assign(target[buildStateName], initialBuildParams);
    }

    target.with = (key, val) => {
        target[buildStateName][key] = val;
        return target;
    };

    target.getBuildParam = (key) => target[buildStateName][key];

    target.build = () => target[buildStateName];

    return target;
}

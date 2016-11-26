import {is} from '../index';

/* eslint no-param-reassign: ["error", { "props": false }] */

const builder = (initialBuildParams = {}, buildStateName = '_builder') =>
    function decorate(target) {
        if (is.undefined(target[buildStateName])) {
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
    };

export default builder;
import localStorageMiddleware from './localStorageMiddleware';
import {isStateStorageEnabled} from '../develop.config';

const middlewares = [];

let preloadedState = {};

if (isStateStorageEnabled) {
    middlewares.push(localStorageMiddleware.createMiddleware());
    preloadedState = localStorageMiddleware.getStore();
}

export default {
    preloadedState,
    middlewares
};

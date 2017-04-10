import {createLogger} from 'redux-logger';
import localStorageMiddleware from './localStorageMiddleware';

const loggerMiddleware = createLogger({
    level: 'info',
    collapsed: true
});

export const middlewares = [
    localStorageMiddleware.createMiddleware(),
    loggerMiddleware
];
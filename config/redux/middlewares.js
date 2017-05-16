import localStorageMiddleware from './localStorageMiddleware';

export const middlewares = [
    localStorageMiddleware.createMiddleware()
];
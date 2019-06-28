import { Action, Dispatch, Middleware } from 'redux';

export interface IErrorLoggerMiddlewareConfig {
    onError: (props: IOnErrorProps) => void;
}

export interface IOnErrorProps {
    action: Action;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any;
}

export default function createErrorLoggerMiddleware({
    onError,
}: IErrorLoggerMiddlewareConfig): Middleware {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const middleware = () =>
        (next: Dispatch<Action>) =>
            (action: Action) => {
                try {
                    return next(action);
                } catch (error) {
                    // An error occured in dispatching an action

                    onError({ action, error });

                    throw error;
                }
            };

    return middleware as Middleware;
}

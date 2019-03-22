type TNotify = (notification: any) => void;

export interface IObserver {
    id: number;
    notify: TNotify;
    notifyError: TNotify;
}

type TRegisterObserver = (props: { onNotify: TNotify, onError: TNotify }) => IObserver;

export interface IObserverManager {
    registerObserver: TRegisterObserver;
    notifyObservers: TNotify;
    notifyObserversOfError: TNotify;
    unRegisterObserver: (observer: IObserver) => void;
}

interface IPrivateObserverManager extends IObserverManager {
    observers: IObserver[];
}

export default function createObserverManager(): IObserverManager {
    let counter = 0;

    const manager: unknown = {
        observers: [],
    };
    const observerManager = manager as IPrivateObserverManager;

    observerManager.registerObserver = ({ onNotify, onError }) => {
        counter += 1;

        const observer: IObserver = {
            notify: onNotify,
            notifyError: onError,
            id: counter,
        };

        observerManager.observers.push(observer);

        return observer;
    };

    observerManager.notifyObservers = (notification) => {
        observerManager.observers.forEach((observer) => observer.notify(notification));
    };

    observerManager.notifyObserversOfError = (error) => {
        observerManager.observers.forEach((observer) => observer.notifyError(error));
    };

    observerManager.unRegisterObserver = (observer) => {
        const observerIndex = observerManager.observers.indexOf(observer);
        if (observerIndex > -1) {
            observerManager.observers.splice(observerIndex, 1);
        }
    };

    return observerManager;
}

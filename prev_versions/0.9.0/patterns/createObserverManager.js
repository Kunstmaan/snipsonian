export default function createObserverManager() {
    let counter = 0;

    const manager = {
        observers: []
    };

    manager.registerObserver = ({onNotify, onError}) => {
        counter += 1;

        const observer = {
            notify: onNotify,
            notifyError: onError,
            id: counter
        };

        manager.observers.push(observer);

        return observer;
    };

    manager.notifyObservers = (notification) => {
        manager.observers.forEach((observer) => observer.notify(notification));
    };

    manager.notifyObserversOfError = (error) => {
        manager.observers.forEach((observer) => observer.notifyError(error));
    };

    manager.unRegisterObserver = (observer) => {
        manager.observers.splice(manager.observers.indexOf(observer), 1);
    };

    return manager;
}

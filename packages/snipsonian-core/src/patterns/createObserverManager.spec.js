import createObserverManager from './createObserverManager';

describe('createObserverManager()', () => {
    it('can create an observer manager object', () => {
        const manager = createObserverManager();

        expect(manager).toBeDefined();
    });

    it('can register a new observer', () => {
        const manager = createObserverManager();

        const observer = manager.registerObserver({
            onNotify: handleNotify,
            onError: handleError
        });

        expect(manager.observers).toContain(observer);
    })

    it('can unregister an observer', () => {
        const manager = createObserverManager();

        const observer = manager.registerObserver({
            onNotify: handleNotify,
            onError: handleError
        });

        manager.unRegisterObserver(observer);

        expect(findObserverInManager({
            manager,
            observerToFind: observer
        })).toBeUndefined();
    });

    it('can notify observers', () => {
        const manager = createObserverManager();

        let hasBeenNotified = false;

        const observer = manager.registerObserver({
            onNotify: () => { hasBeenNotified = handleNotify() },
            onError: handleError
        });

        manager.notifyObservers();

        expect(hasBeenNotified).toBeTruthy();
    });

    it('can notify observers of errors', () => {
        const manager = createObserverManager();

        let hasBeenNotifiedOfErrors = false;

        const observer = manager.registerObserver({
            onNotify: handleNotify,
            onError: () => { hasBeenNotifiedOfErrors = handleError() }
        });

        manager.notifyObserversOfError();

        expect(hasBeenNotifiedOfErrors).toBeTruthy()
    });
});

function findObserverInManager({manager, observerToFind}) {
    return manager.observers.find((observer) => observer === observerToFind);
}

function handleNotify() {
    return true;
}

function handleError() {
    return true;
}

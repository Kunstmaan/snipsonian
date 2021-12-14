import createObserverManager, { IObserver, IObserverManager } from './createObserverManager';

describe('createObserverManager()', () => {
    it('can create an observer manager object', () => {
        const manager = createObserverManager();

        expect(manager).toBeDefined();
    });

    it('can register a new observer', () => {
        const manager = createObserverManager();

        const observer = manager.registerObserver({
            onNotify: handleNotify,
            onError: handleError,
        });

        expect(manager['observers']).toContain(observer); // eslint-disable-line @typescript-eslint/dot-notation
    });

    it('can unregister an observer', () => {
        const manager = createObserverManager();

        const observer = manager.registerObserver({
            onNotify: handleNotify,
            onError: handleError,
        });

        manager.unRegisterObserver(observer);

        expect(findObserverInManager({
            manager,
            observerToFind: observer,
        })).toBeUndefined();
    });

    it('can notify observers', () => {
        const manager = createObserverManager();

        let hasBeenNotified = false;

        manager.registerObserver({
            onNotify: () => { hasBeenNotified = handleNotify(); },
            onError: handleError,
        });

        manager.notifyObservers('some notification');

        expect(hasBeenNotified).toBeTruthy();
    });

    it('can notify observers of errors', () => {
        const manager = createObserverManager();

        let hasBeenNotifiedOfErrors = false;

        manager.registerObserver({
            onNotify: handleNotify,
            onError: () => { hasBeenNotifiedOfErrors = handleError(); },
        });

        manager.notifyObserversOfError('some error');

        expect(hasBeenNotifiedOfErrors).toBeTruthy();
    });
});

function findObserverInManager({ manager, observerToFind }: {
    manager: IObserverManager;
    observerToFind: IObserver;
}): IObserver {
    // eslint-disable-next-line @typescript-eslint/dot-notation
    return (manager['observers'] as IObserver[]).find((observer) => observer === observerToFind);
}

/* eslint-disable @typescript-eslint/explicit-function-return-type */
function handleNotify() {
    return true;
}

function handleError() {
    return true;
}
/* eslint-enable @typescript-eslint/explicit-function-return-type */

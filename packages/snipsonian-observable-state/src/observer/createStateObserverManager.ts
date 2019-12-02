import isArray from '@snipsonian/core/src/is/isArray';

export interface IStateObserverManager<StateChangeNotificationKey> {
    // eslint-disable-next-line max-len
    registerObserver: (props: IRegisterStateObserverProps<StateChangeNotificationKey>) => IStateObserver<StateChangeNotificationKey>;
    unRegisterObserver: (observer: IStateObserver<StateChangeNotificationKey>) => void;
    notifyObserversOfStateChanges: (notificationsToTrigger: StateChangeNotificationKey[]) => void;
}

export interface IRegisterStateObserverProps<StateChangeNotificationKey> {
    observerName: string;
    notificationsToObserve: StateChangeNotificationKey[];
    onNotify: (props: IStateObserverNotifyProps<StateChangeNotificationKey>) => void;
}

export interface IStateObserver<StateChangeNotificationKey> {
    id: number;
    observerName: string;
    notify: (props: IStateObserverNotifyProps<StateChangeNotificationKey>) => void;
}

export interface IStateObserverNotifyProps<StateChangeNotificationKey> {
    notifications: StateChangeNotificationKey[];
}

interface IRegisteredStateObserver<StateChangeNotificationKey> extends IStateObserver<StateChangeNotificationKey> {
    notificationsToObserve: StateChangeNotificationKey[];
}

// eslint-disable-next-line max-len
export default function createStateObserverManager<StateChangeNotificationKey>(): IStateObserverManager<StateChangeNotificationKey> {
    let observerCounter = 0;
    const observerMap: { [observerId: number]: IRegisteredStateObserver<StateChangeNotificationKey> } = {};

    return {
        registerObserver: ({
            observerName,
            notificationsToObserve,
            onNotify,
        }: IRegisterStateObserverProps<StateChangeNotificationKey>) => {
            observerCounter += 1;

            const observer: IStateObserver<StateChangeNotificationKey> = {
                id: observerCounter,
                observerName,
                notify: onNotify,
            };

            observerMap[observer.id] = {
                ...observer,
                notificationsToObserve,
            };

            return observer;
        },
        unRegisterObserver: (observer: IStateObserver<StateChangeNotificationKey>) => {
            delete observerMap[observer.id];
        },
        notifyObserversOfStateChanges: (notificationsToTrigger: StateChangeNotificationKey[]) => {
            if (isArray(notificationsToTrigger) && notificationsToTrigger.length > 0) {
                const uniqueObserversToNotify = notificationsToTrigger
                    .reduce(
                        (accumulator, notificationToTrigger) => {
                            const matchingObservers = Object.values(observerMap)
                                .filter((registeredObserver) =>
                                    registeredObserver.notificationsToObserve.includes(notificationToTrigger));

                            matchingObservers.forEach((observer) => {
                                const alreadyFoundObserver = accumulator
                                    .find((observerToNotify) => observerToNotify.id === observer.id);
                                if (alreadyFoundObserver) {
                                    alreadyFoundObserver.notifications.push(notificationToTrigger);
                                } else {
                                    accumulator.push({
                                        ...observer,
                                        notifications: [notificationToTrigger],
                                    });
                                }
                            });

                            return accumulator;
                        },
                        // eslint-disable-next-line max-len
                        [] as (IStateObserver<StateChangeNotificationKey> & IStateObserverNotifyProps<StateChangeNotificationKey>)[],
                    );

                if (uniqueObserversToNotify && uniqueObserversToNotify.length > 0) {
                    uniqueObserversToNotify.forEach((observerToNotify) => {
                        observerToNotify.notify({ notifications: observerToNotify.notifications });
                    });
                }
            }
        },
    };
}

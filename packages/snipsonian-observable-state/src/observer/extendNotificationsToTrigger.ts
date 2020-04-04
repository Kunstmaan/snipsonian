export type TNrOfParentNotificationLevelsToTrigger = number | false;

export interface ITriggerParentNotifications {
    /* Default 1 (= the direct 'parent' notification will by default also be triggered)
       If false, then no 'parent' notifications will get triggered by default */
    nrOfLevels?: TNrOfParentNotificationLevelsToTrigger;
    notificationDelimiter?: string; // default '.'
}

export const DEFAULT_NR_OF_PARENT_NOTIFICATION_LEVELS_TO_TRIGGER: TNrOfParentNotificationLevelsToTrigger = 1;
export const DEFAULT_PARENT_NOTIFICATIONS_DELIMITER = '.';

export default function extendNotificationsToTrigger<StateChangeNotificationKey>({
    notificationsToTrigger,
    triggerParentNotifications = {},
}: {
    notificationsToTrigger: StateChangeNotificationKey[];
    triggerParentNotifications?: ITriggerParentNotifications;
}): StateChangeNotificationKey[] {
    const {
        nrOfLevels = DEFAULT_NR_OF_PARENT_NOTIFICATION_LEVELS_TO_TRIGGER,
        notificationDelimiter = DEFAULT_PARENT_NOTIFICATIONS_DELIMITER,
    } = triggerParentNotifications;

    if (nrOfLevels >= 1 && notificationsToTrigger && notificationsToTrigger.length > 0) {
        return notificationsToTrigger
            .reduce(
                (accumulator, notificationToTrigger) => {
                    // add original notification
                    accumulator.push(notificationToTrigger);

                    // add parent notifications
                    const parts = (notificationToTrigger as unknown as string).split(notificationDelimiter);
                    let counter = 0;
                    while (counter < nrOfLevels && parts && parts.length > 1) {
                        parts.pop(); // remove last element
                        accumulator.push(parts.join(notificationDelimiter));
                        counter += 1;
                    }

                    return accumulator;
                },
                [],
            );
    }

    return notificationsToTrigger;
}

import extendNotificationsToTrigger from './extendNotificationsToTrigger';

describe('extendNotificationsToTrigger()', () => {
    // eslint-disable-next-line max-len
    it('by default returns the input notifications extend with the immediate parent notifications (who are delimited by a .))', () => {
        const actual = extendNotificationsToTrigger<string>({
            notificationsToTrigger: [
                'parent1.childA',
                'parent2.childB.grandChildX',
                'noParent_noChild',
            ],
        });

        expect(actual).toEqual([
            'parent1.childA',
            'parent1',
            'parent2.childB.grandChildX',
            'parent2.childB',
            'noParent_noChild',
        ]);
    });

    it('returns the input notifications when nrOfLevels < 1', () => {
        const actual = extendNotificationsToTrigger<string>({
            notificationsToTrigger: [
                'parent1.childA',
                'parent2.childB.grandChildX',
            ],
            triggerParentNotifications: {
                nrOfLevels: 0,
            },
        });

        expect(actual).toEqual([
            'parent1.childA',
            'parent2.childB.grandChildX',
        ]);
    });

    it('adds parent levels based on the input nr of levels and parent delimiter', () => {
        const actual = extendNotificationsToTrigger<string>({
            notificationsToTrigger: [
                'parent1_childA_grandChildX',
                'parent2_childB_grandChildY_grandGrandChildM_grandGrandGrandChildK',
                'noParent.noChild.noGrandChild',
            ],
            triggerParentNotifications: {
                nrOfLevels: 3,
                notificationDelimiter: '_',
            },
        });

        expect(actual).toEqual([
            'parent1_childA_grandChildX',
            'parent1_childA',
            'parent1',
            'parent2_childB_grandChildY_grandGrandChildM_grandGrandGrandChildK',
            'parent2_childB_grandChildY_grandGrandChildM',
            'parent2_childB_grandChildY',
            'parent2_childB',
            'noParent.noChild.noGrandChild',
        ]);
    });
});

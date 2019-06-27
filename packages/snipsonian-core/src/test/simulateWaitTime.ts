export function simulateWaitTime({
    waitTimeInMillis = 10,
    onWaited,
}: {
    waitTimeInMillis?: number;
    onWaited?: (props: { waitTimeInMillis: number }) => void;
} = {}): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(
            () => {
                if (onWaited) {
                    onWaited({ waitTimeInMillis });
                }
                resolve();
            },
            waitTimeInMillis,
        );
    });
}

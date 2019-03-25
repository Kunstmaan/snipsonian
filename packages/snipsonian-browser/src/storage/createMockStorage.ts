export default function createMockStorage() {
    const mockStorage = {
        store: {},
        getItem(key: string) {
            if (this.store[key]) {
                return this.store[key];
            }

            return null;
        },
        setItem(key: string, data: string) {
            this.store[key] = data;
        },
        removeItem(key: string) {
            delete this.store[key];
        },
    };

    return mockStorage;
}

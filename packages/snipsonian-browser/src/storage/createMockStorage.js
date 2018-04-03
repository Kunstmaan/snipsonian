export default function createMockStorage() {
    const mockStorage = {
        store: {},
        getItem(key) {
            if (this.store[key]) {
                return this.store[key];
            }

            return null;
        },
        setItem(key, data) {
            this.store[key] = data;
        },
        removeItem(key) {
            delete this.store[key];
        },
    };

    return mockStorage;
}

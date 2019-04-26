interface IMockStorage {
    getItem: (key: string) => string;
    setItem: (key: string, data: string) => void;
    removeItem: (key: string) => void;
}

export default function createMockStorage(): IMockStorage {
    const mockStorage = {
        store: {},
        getItem(key: string) {
            if (mockStorage.store[key]) {
                return mockStorage.store[key];
            }

            return null;
        },
        setItem(key: string, data: string) {
            mockStorage.store[key] = data;
        },
        removeItem(key: string) {
            delete mockStorage.store[key];
        },
    };

    return mockStorage;
}

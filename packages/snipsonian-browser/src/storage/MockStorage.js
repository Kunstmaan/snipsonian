export default class MockStorage {
    constructor(type) {
        this.type = type;
        this.store = {};
    }

    getItem(key) {
        return this.store[key];
    }

    setItem(key, data) {
        this.store[key] = data;
    }

    removeItem(key) {
        this.store[key] = undefined;
    }
}

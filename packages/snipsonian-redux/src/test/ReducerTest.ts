class ReducerTest {
    constructor(reducer) {
        this.reducer = reducer;

        this.initialState = this.reducer(undefined, {});

        this.state = this.initialState;
    }

    handleAction({ action, previousState = this.state }) {
        this.state = this.reducer(previousState, action);
        return this.state;
    }

    updateState(stateUpdates = {}) {
        this.state = Object.assign({}, this.state, stateUpdates);
    }
}

export default ReducerTest;

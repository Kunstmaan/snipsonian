import { IAction, TReducer } from '../reducer/createReducer';

class ReducerTest<ReducerState> {
    reducer: TReducer<ReducerState>;
    initialState: ReducerState;
    state: ReducerState;

    constructor(reducer: TReducer<ReducerState>) {
        this.reducer = reducer;

        this.initialState = this.reducer(undefined, {} as IAction<{}>);

        this.state = this.initialState;
    }

    handleAction({ action, previousState = this.state }: { action: IAction<{}>, previousState: ReducerState }) {
        this.state = this.reducer(previousState, action);
        return this.state;
    }

    updateState(stateUpdates: object = {}) {
        this.state = Object.assign({}, this.state, stateUpdates);
    }
}

export default ReducerTest;

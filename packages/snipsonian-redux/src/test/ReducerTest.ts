import { TReducer } from '../reducer/createReducer';
import { IAction } from '../action/types';

class ReducerTest<ReducerState> {
    public reducer: TReducer<ReducerState>;
    public initialState: ReducerState;
    public state: ReducerState;

    public constructor(reducer: TReducer<ReducerState>) {
        this.reducer = reducer;

        this.initialState = this.reducer(undefined, {} as IAction<{}>);

        this.state = this.initialState;
    }

    public handleAction({
        action,
        previousState = this.state,
    }: {
        action: IAction<{}>;
        previousState: ReducerState;
    }): ReducerState {
        this.state = this.reducer(previousState, action);
        return this.state;
    }

    public updateState(stateUpdates: object = {}): void {
        // eslint-disable-next-line prefer-object-spread
        this.state = Object.assign({}, this.state, stateUpdates);
    }
}

export default ReducerTest;

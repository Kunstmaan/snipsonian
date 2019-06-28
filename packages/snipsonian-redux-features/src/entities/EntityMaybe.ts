import isNull from '@snipsonian/core/src/is/isNull';
import isUndefined from '@snipsonian/core/src/is/isUndefined';

export class EntityMaybe<Data> {
    private readonly value: Data | null | undefined;

    private constructor(data: Data | null | undefined) {
        this.value = data;
    }

    public static of<Data>(data: Data | null | undefined): EntityMaybe<Data | null | undefined> {
        return new EntityMaybe(data);
    }

    public static nothing<Data>(): EntityMaybe<Data> {
        return new EntityMaybe<Data>(null);
    }

    public isEmpty(): boolean {
        return isNull(this.value) || isUndefined(this.value);
    }

    public exists(): boolean {
        return !this.isEmpty();
    }

    public getOrElse(elseValue: Data): Data {
        return this.isEmpty()
            ? elseValue
            : this.value;
    }

    public getOrNull(): Data | null {
        return this.getOrElse(null);
    }

    public getOrEmptyArray(): Data | [] {
        return this.getOrElse([] as unknown as Data);
    }

    public getOrEmptyObject(): Data | {} {
        return this.getOrElse({} as unknown as Data);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public doIfExists(runner: (value: Data) => any): any {
        if (this.isEmpty()) {
            return null;
        }

        return runner(this.value);
    }
}

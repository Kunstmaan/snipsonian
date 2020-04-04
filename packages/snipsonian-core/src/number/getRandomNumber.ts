import assert from '../assert';

export default function getRandomNumber({
    min = 0,
    max = Number.MAX_SAFE_INTEGER,
}: {
    min?: number;
    max?: number;
} = {}): number {
    assert(min, (val) => val >= 0, 'The min value should be minimal 0.');

    return Math.floor((Math.random() * ((max - min) + 1)) + min);
}

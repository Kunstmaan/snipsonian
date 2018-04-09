import isDirectorySync from './isDirectorySync';

describe('isDirectorySync()', () => {
    it('returns true when given a path that is a directory', () => {
        const isDirectory = isDirectorySync({
            inputPath: `${__dirname}/testDir`,
        });

        expect(isDirectory).toBeTruthy();
    });

    it('returns false when given a path that is a directory', () => {
        expect(() => {
            isDirectorySync({
                inputPath: `${__dirname}/testDir2`,
            });
        }).toThrow();
    });
});

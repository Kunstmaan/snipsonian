import getDirectoryNameSync from './getDirectoryNamesSync';

describe('getDirectoryNameSync()', () => {
    it('returns a list of directory names for the given path', () => {
        const directoryNames = getDirectoryNameSync({
            sourcePath: __dirname,
        });

        expect(directoryNames).toEqual(['testDir']);
    });

    it('returns an empty array when no directories are found', () => {
        const directoryNames = getDirectoryNameSync({
            sourcePath: `${__dirname}/testDir`,
        });

        expect(directoryNames).toEqual([]);
    });

    it('throws an errow when given an invalid path', () => {
        expect(() => {
            getDirectoryNameSync({
                sourcePath: `${__dirname}/testDir2`,
            });
        }).toThrow();
    });
});

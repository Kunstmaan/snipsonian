import getFilesRecursiveSync from './getFilesRecursiveSync';

describe('getFilesRecursiveSync()', () => {
    it('returns an array of file contents from a directory', () => {
        const fileContents = getFilesRecursiveSync({
            sourcePath: `${__dirname}/testDir`,
        });

        const fileData = [
            {
                name: 'file.txt',
                path: `${__dirname}/testDir/file.txt`,
            },
            {
                name: 'file2.txt',
                path: `${__dirname}/testDir/file2.txt`,
            },
        ];

        expect(fileContents).toEqual(fileData);
    });

    // Will throw when running on a new machine, because there is no empty folder.
    // Can't add empty folder to GitHub? (.gitkeep gets picked up by this method).
    //
    // it('returns an empty array if given an empty directory', () => {
    //     const fileContents = getFilesRecursiveSync({
    //         sourcePath: `${__dirname}/emptyTestDir`,
    //     });

    //     const fileData = [];

    //     expect(fileContents).toEqual(fileData);
    // });

    it('throws an error when given a bad path', () => {
        expect(() => {
            getFilesRecursiveSync({
                sourcePath: `${__dirname}/testDir2`,
            });
        }).toThrow();
    });
});

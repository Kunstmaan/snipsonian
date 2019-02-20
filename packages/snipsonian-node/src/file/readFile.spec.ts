import readFile from './readFile';

describe('readFile()', () => {
    it('can successfully read a file\'s contents', async () => {
        const fileStream = readFile({
            filePath: `${__dirname}/testFiles/read.txt`,
            options: {
                encoding: 'UTF-8',
            },
        });

        let fileContent;

        await fileStream.then(
            (data) => {
                fileContent = data;
            },
            (err) => {
                console.log(err);
            },
        );

        expect(fileContent.trim()).toBe('hello');
    });

    it('catches the error when given a wrong path', async () => {
        const fileStream = readFile({
            filePath: `${__dirname}/testFiles2/read.txt`,
            options: {
                encoding: 'UTF-8',
            },
        });

        let error;

        await fileStream.then(
            (data) => {
                console.log(data);
            },
            (err) => {
                error = err;
            },
        );

        expect(error).toBeDefined();
    });
});

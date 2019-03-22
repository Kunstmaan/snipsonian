import readFile from './readFile';

describe('readFile()', () => {
    it('can successfully read a file\'s contents', async () => {
        const fileStream = readFile({
            filePath: `${__dirname}/testFiles/read.txt`,
            options: {
                encoding: 'UTF-8',
            },
        });

        let fileContent: string;

        await fileStream.then(
            (data: string) => {
                fileContent = data;
            },
            (err: Error) => {
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

        let error: Error;

        await fileStream.then(
            (data: string) => {
                console.log(data);
            },
            (err: Error) => {
                error = err;
            },
        );

        expect(error).toBeDefined();
    });
});

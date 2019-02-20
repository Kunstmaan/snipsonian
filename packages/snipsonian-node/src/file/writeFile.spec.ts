import writeFile from './writeFile';
import readFile from './readFile';

describe('writeFile()', () => {
    it('can successfully write to a file', async () => {
        const random = Math.random().toString();

        const writeStream = writeFile({
            filePath: `${__dirname}/testFiles/write.txt`,
            data: random,
            options: {
                encoding: 'UTF-8',
            },
        });

        await writeStream.then(
            () => {
                // Handle correct write
            },
            (err: Error) => {
                console.log(err);
            },
        );

        let fileContent: string;

        const readStream = readFile({
            filePath: `${__dirname}/testFiles/write.txt`,
            options: {
                encoding: 'UTF-8',
            },
        });

        await readStream.then(
            (data: string) => {
                fileContent = data;
            },
            (err: Error) => {
                console.log(err);
            },
        );

        expect(fileContent).toBe(random);
    });

    it('catches the error when given a wrong path', async () => {
        const fileStream = writeFile({
            filePath: `${__dirname}/testFiles2/write.txt`,
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

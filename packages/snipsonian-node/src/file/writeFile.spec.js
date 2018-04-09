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
            (err) => {
                console.log(err);
            },
        );

        let fileContent;

        const readStream = readFile({
            filePath: `${__dirname}/testFiles/write.txt`,
            options: {
                encoding: 'UTF-8',
            },
        });

        await readStream.then(
            (data) => {
                fileContent = data;
            },
            (err) => {
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

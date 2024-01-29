import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

function read() {
    const __filename = fileURLToPath(import.meta.url);
    const directory = dirname(__filename);
    const filePath = join(directory, 'files', 'fileToRead.txt');

    const readableStream = fs.createReadStream(filePath);

    readableStream.on('data', (chunk) => {
        process.stdout.write(chunk);
    });

    readableStream.on('end', () => {
        console.log('\nFile reading completed.');
    });

    readableStream.on('error', (error) => {
        console.error('Error reading file:', error);
    });
}

read();

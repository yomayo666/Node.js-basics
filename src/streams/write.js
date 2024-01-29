import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

function write() {
    const __filename = fileURLToPath(import.meta.url);
    const directory = dirname(__filename);
    const filePath = join(directory, 'files', 'fileToWrite.txt');

    const writableStream = fs.createWriteStream(filePath);

    process.stdin.on('data', (chunk) => {
        writableStream.write(chunk);
    });

    process.stdin.on('end', () => {
        writableStream.end();
    });

    writableStream.on('finish', () => {
        console.log(`Data written to ${filePath}`);
    });

    writableStream.on('error', (error) => {
        console.error('Error writing to file:', error);
    });
}

write();

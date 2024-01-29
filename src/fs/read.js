import { access, readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

async function read() {
    const __filename = fileURLToPath(import.meta.url);
    const directory = join(dirname(__filename), 'files');
    const filePath = join(directory, 'fileToRead.txt');

    try {
        await access(filePath);

        const content = await readFile(filePath, 'utf8');
        console.log('Content of "fileToRead.txt":');
        console.log(content);
    } catch (error) {
        console.error('Error reading file:', error);
    }
}

read();

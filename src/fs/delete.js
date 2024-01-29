import { unlink, access } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

async function remove() {
    const __filename = fileURLToPath(import.meta.url);
    const directory = join(dirname(__filename), 'files');
    const filePath = join(directory, 'fileToRemove.txt');

    try {
        await access(filePath);
        await unlink(filePath);
        console.log('File deleted successfully.');
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error('Error: File "fileToRemove.txt" does not exist');
        } else {
            console.error('Error deleting file:', error);
        }
    }
}

remove();

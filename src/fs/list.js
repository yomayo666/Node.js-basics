import { readdir, access } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

async function list() {
    const __filename = fileURLToPath(import.meta.url);
    const currentDirectory = dirname(__filename);
    const filesDirectory = join(currentDirectory, 'files');

    try {
        await access(filesDirectory);

        const files = await readdir(filesDirectory);
        console.log('Files in "files" directory:');
        files.forEach(file => {
            console.log(file);
        });
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error('Error: Directory "files" does not exist');
        } else {
            console.error('Error listing files:', error);
        }
    }
}

list();

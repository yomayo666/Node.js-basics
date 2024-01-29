import { rename } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync, statSync } from 'fs';

async function renameFile() {
    const __filename = fileURLToPath(import.meta.url);
    const directory = join(dirname(__filename), 'files');
    const sourceFile = join(directory, 'wrongFilename.txt');
    const destinationFile = join(directory, 'properFilename.md');

    try {
        if (existsSync(destinationFile)) {
            console.error('Error: Destination file "properFilename.md" already exists');
            return;
        }

        if (!existsSync(sourceFile)) {
            console.error('Error: Source file "wrongFilename.txt" does not exist');
            return;
        }

        await rename(sourceFile, destinationFile);
        console.log('File renamed successfully.');
    } catch (error) {
        console.error('Error renaming file:', error);
    }
}

renameFile();

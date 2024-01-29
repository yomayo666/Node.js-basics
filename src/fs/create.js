import { access, constants, mkdir, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

async function create() {
    const __filename = fileURLToPath(import.meta.url);
    const directory = join(dirname(__filename), 'files');
    const filePath = join(directory, 'fresh.txt');
    const content = 'I am fresh and young';

    try {
        await access(filePath, constants.F_OK);
        console.error('Error: File already exists:', filePath);
        return;
    } catch (error) {
        try {
            await mkdir(directory, { recursive: true });
            await writeFile(filePath, content);
            console.log('File created successfully:', filePath);
        } catch (err) {
            console.error('Error creating file:', err);
        }
    }
}

create();

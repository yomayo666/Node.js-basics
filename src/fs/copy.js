import { existsSync, mkdirSync, readdirSync, statSync, copyFileSync, createReadStream, createWriteStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

async function copy() {
    const __filename = fileURLToPath(import.meta.url);
    const currentDirectory = dirname(__filename);
    const sourceDirectory = join(currentDirectory, 'files');
    const destinationDirectory = join(currentDirectory, 'files_copy');

    if (!existsSync(sourceDirectory)) {
        console.error('Error: Source directory "files" does not exist');
        return;
    }
    if (existsSync(destinationDirectory)) {
        console.error('Error: Destination directory "files_copy" already exists');
        return;
    }

    try {
        mkdirSync(destinationDirectory);
    } catch (error) {
        console.error('Error creating destination directory:', error);
        return;
    }

    try {
        const files = readdirSync(sourceDirectory);
        for (const file of files) {
            const sourcePath = join(sourceDirectory, file);
            const destinationPath = join(destinationDirectory, file);
            const fileStats = statSync(sourcePath);
            if (fileStats.isFile()) {
                await copyFileAsync(sourcePath, destinationPath);
                console.log(`Copied ${file} to files_copy`);
            }
        }
        console.log('Files copied successfully.');
    } catch (error) {
        console.error('Error copying files:', error);
    }
}

async function copyFileAsync(source, destination) {
    return new Promise((resolve, reject) => {
        const readStream = createReadStream(source);
        const writeStream = createWriteStream(destination);

        readStream.on('error', reject);
        writeStream.on('error', reject);

        writeStream.on('finish', resolve);

        readStream.pipe(writeStream);
    });
}

copy();

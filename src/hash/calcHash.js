import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const directory = dirname(__filename);
const filePath = join(directory, 'files', 'fileToCalculateHashFor.txt');

const calculateHash = async () => {
    const hash = createHash('sha256');

    const readStream = createReadStream(filePath);

    readStream.on('data', (chunk) => {
        hash.update(chunk);
    });

    readStream.on('end', () => {
        const sha256Hash = hash.digest('hex');
        console.log(`SHA256 Hash of the file: ${sha256Hash}`);
    });

    readStream.on('error', (error) => {
        console.error('Error reading file:', error);
    });
};

await calculateHash();

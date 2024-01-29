import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { pipeline } from 'stream';
import { fileURLToPath } from 'url';

function compressFile(inputFileName, outputFileName) {
    const currentFilePath = new URL(import.meta.url);
    const currentDirectory = path.dirname(fileURLToPath(currentFilePath));

    const inputFilePath = path.join(currentDirectory, 'files', inputFileName);
    const outputFilePath = path.join(currentDirectory, 'files', outputFileName + '.gz');

    const readStream = fs.createReadStream(inputFilePath);
    const gzipStream = zlib.createGzip();
    const writeStream = fs.createWriteStream(outputFilePath);

    pipeline(
        readStream,
        gzipStream,
        writeStream,
        (err) => {
            if (err) {
                console.error('Compression failed:', err);
            } else {
                console.log('File compressed successfully.');
            }
        }
    );
}

compressFile('fileToCompress.txt', 'archive');

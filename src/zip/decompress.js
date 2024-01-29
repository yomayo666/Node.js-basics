import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { pipeline } from 'stream';
import { fileURLToPath } from 'url';

function decompress(inputFileName, outputFileName) {
    const currentFilePath = new URL(import.meta.url);
    const currentDirectory = path.dirname(fileURLToPath(currentFilePath));

    const inputFilePath = path.join(currentDirectory, 'files', inputFileName + '.gz');
    const outputFilePath = path.join(currentDirectory, 'files', outputFileName);

    const readStream = fs.createReadStream(inputFilePath);
    const gunzipStream = zlib.createGunzip();
    const writeStream = fs.createWriteStream(outputFilePath);

    pipeline(
        readStream,
        gunzipStream,
        writeStream,
        (err) => {
            if (err) {
                console.error('Decompression failed:', err);
            } else {
                console.log('File decompressed successfully.');
            }
        }
    );
}

decompress('archive', 'fileToCompress.txt');

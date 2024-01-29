import { spawn } from 'child_process';
import path from 'path';

function spawnChildProcess(args) {
    const scriptPath = path.join(__dirname, 'files', 'script.js'); // Путь к файлу script.js

    const child = spawn('node', [scriptPath, ...args], {
        stdio: ['pipe', 'pipe', 'inherit']
    });

    child.stdout.on('data', (data) => {
        process.stdout.write(data);
    });

    child.on('error', (err) => {
        console.error('Error occurred in child process:', err);
    });

    child.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
    });

    process.stdin.on('data', (data) => {
        child.stdin.write(data);
    });

    process.on('exit', () => {
        child.kill();
    });
}

export { spawnChildProcess };

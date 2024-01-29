import { Worker, isMainThread, parentPort } from 'worker_threads';
import os from 'os';

if (isMainThread) {
    const numCores = os.cpus().length;
    const workers = [];

    for (let i = 0; i < numCores; i++) {
        const worker = new Worker('./worker.js', { workerData: { n: i + 10 } });

        worker.on('message', (result) => {
            console.log(`Worker ${i}: Result of nth Fibonacci calculation: ${result}`);
            workers[i].status = 'resolved';
            workers[i].data = result;
        });

        worker.on('error', (err) => {
            console.error(`Worker ${i} error:`, err);
            workers[i].status = 'error';
            workers[i].data = null;
        });

        workers.push({ status: 'pending', data: null });
    }

    parentPort.on('message', (message) => {
        if (message === 'finished') {
            console.log('All workers have finished their tasks. Results:');
            console.log(workers);
        }
    });

    setTimeout(() => {
        parentPort.postMessage('finished');
    }, 1000);
}

import { workerData } from 'worker_threads';

const nthFibonacci = (n) => (n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2));

const sendResult = () => {
    const result = nthFibonacci(workerData.n);
    postMessage(result);
};

sendResult();

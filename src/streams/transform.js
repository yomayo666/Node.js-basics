import { Transform } from 'stream';

// Создаем класс Transform, который будет переворачивать текст
class ReverseTransform extends Transform {
    constructor(options) {
        super(options);
    }

    // Метод _transform вызывается для каждого фрагмента данных в потоке
    _transform(chunk, encoding, callback) {
        // Переворачиваем текст и отправляем его дальше в поток
        const reversedChunk = chunk.toString().split('').reverse().join('');
        this.push(reversedChunk);
        callback();
    }
}

function transform() {
    // Создаем поток чтения из process.stdin
    const readableStream = process.stdin;

    // Создаем поток записи в process.stdout
    const writableStream = process.stdout;

    // Создаем поток преобразования
    const reverseTransform = new ReverseTransform();

    // Подключаем потоки
    readableStream.pipe(reverseTransform).pipe(writableStream);
}

transform();

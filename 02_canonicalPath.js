/*        B. Канонический путь
        Ограничение времени	1 секунда
        Ограничение памяти	64Mb
        Ввод	стандартный ввод или input.txt
        Вывод	стандартный вывод или output.txt
        По заданной строке, являющейся абсолютным адресом в Unix-системе, вам необходимо получить канонический адрес.

        В Unix-системе "." соответсвутет текущей директории, ".." — родительской директории, при этом будем считать, что любое количество точек подряд, большее двух, соответствует директории с таким названием (состоящем из точек). "/" является разделителем вложенных директорий, причем несколько "/" подряд должны интерпретироваться как один "/".

        Канонический путь должен обладать следующими свойствами:

        1) всегда начинаться с одного "/"

        2) любые две вложенные директории разделяются ровно одним знаком "/"

        3) путь не заканчивается "/" (за исключением корневой директории, состоящего только из символа "/")

        4) в каноническом пути есть только директории, т.е. нет ни одного вхождения "." или ".." как соответствия текущей или родительской директории

        Формат ввода
        Вводится строка с абсолютным адресом, её длина не превосходит 100.

        Формат вывода
        Выведите канонический путь.

        Пример 1
        Ввод	Вывод
        /home/
        /home
        Пример 2
        Ввод	Вывод
        /../
        /
        Пример 3
        Ввод	Вывод
        /home//foo/
        /home/foo
        Примечания
        В первом примере необходимо убрать "/" в конце строки

        Во втором примере нельзя подняться выше корневой директории

        В третьем примере несколко подряд идущих "/" должны замениться на один, а также необходимо убрать "/" в конце строки
*/

var fs = require('fs');

const content = fs.readFileSync(__dirname + '/input.txt', 'utf-8');

console.log(getCanonicalPath(content));

function getCanonicalPath(path) {
    const pathParts = path.split('/').filter((el) => (Boolean(el) && el !== '.'));
    
    const getPathPartsWithProcessedTransitionToParentDirectory = (rawStringParts) => {
        for (let i = 0; i < rawStringParts.length; i += 1) {
            if (rawStringParts[i] === '..') {
                if (rawStringParts[i - 1]) {
                  rawStringParts.splice(i - 1, 2);
                } else {
                  rawStringParts.splice(i, 1);
                }
                return getPathPartsWithProcessedTransitionToParentDirectory(rawStringParts);
            }
        }
        return rawStringParts;
    }
    
    const resultPath = getPathPartsWithProcessedTransitionToParentDirectory(pathParts).join('/');
    return `/${resultPath}`;
}

// const testData = [['', '/'], ['/home/', '/home'], ['/../', '/'], ['/home//foo/', '/home/foo']];

// testData.forEach(([input, res]) => {
//     console.log('input: ', input, 'rr: ', res, 'fact: ', getCanonicalPath(input));
// });

/*
function getCanonicalPath(path) {
    if (path.length === 0) {
        return '/';
    }
    
    const pathParts = [];
    let wordParts = [];

    const addTheWordToPath = () => {
        if (wordParts.length !== 0) {
            const word = wordParts.join('');
            if (word === '..') {
                pathParts.pop();
            } else if(word !== '.') {
                pathParts.push(word);
            }
            wordParts = [];
        }
    };

    for (let i = 0; i < path.length; i += 1) {
        if (path[i] === '/') {
            addTheWordToPath();
        } else {
            wordParts.push(path[i]);
        }
    }
    addTheWordToPath();

    const resultPath = pathParts.join('/');
    return `/${resultPath}`;
}
*/

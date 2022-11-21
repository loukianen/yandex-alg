/*      https://contest.yandex.ru/contest/40183/problems/E/

        
        E. Путь к файлу
        Ограничение времени 	1 секунда
        Ограничение памяти 	64Mb
        Ввод 	стандартный ввод или input.txt
        Вывод 	стандартный вывод или output.txt

        В операционной системе Xunil информация обо всех файлах и директориях хранится в специальном файле в следующем формате:

        Имена файлов, и только они, содержат точку.

        Требуется по данному имени файла найти путь к нему. Если таких файлов несколько, вывести путь к файлу, который записан выше.
        Формат ввода

        В первой строке вводится имя искомого файла. Во второй строке вводится общее количество файлов и директорий. В остальных строках вводится информация о файлах и директориях в указанном выше формате (директория или файл, находящиеся внутри другой директории, отделяются одним дополнительным пробелом в начале строки). Количество строк в файле и количество символов в каждой строке не превосходит 100.
        Формат вывода

        Выведите путь к файлу в формате /директория/директория/…/файл

        Гарантируется, что такой файл есть.

        Гарантируется, что длина строки ответа не превосходит 255.
        Пример
        Ввод
        Вывод

        1.avi
        12
        emoh
         vonavi
          a.doc
          b.doc 
         vortep
          .bashrc
         vorodis
          onrop
           1.avi
           2.avi 
        rav
         bil

            

        /emoh/vorodis/onrop/1.avi

*/

const fs = require('fs');

const content = fs.readFileSync(__dirname + '/input.txt', 'utf-8');

const data = content.split('\n');

const res = getPath(data);
console.log(res);

function getPath(data) {
    const fileName = data[0];
    const tree = getTree(data.slice(2));

    const iter = (tree, fileName, pathParts) => {
        if (tree.files.includes(fileName)) {
            pathParts.push(tree.name);
            pathParts.push(fileName);
            return pathParts;
        }
        if (tree.dirs.length === 0) {
            return null;
        }
        for (const dir of tree.dirs) {
            const newPathParts = [...pathParts, tree.name];
            const currentPath = iter(dir, fileName, newPathParts);
            if (currentPath !== null) {
                return currentPath;
            }
        }
        return null;
    }
    const res = iter(tree, fileName, []);
    return res.join('/');
}

function getTree(pathParts) {
    const iter = (partName, data, nestednessLevel) => {
        const dirs = [];
        const files = [];
        let currrentDirName = '';
        let currrentDirNameItems = [];
        for (const pathPart of data) {
            if (pathPart[nestednessLevel] !== ' ') {
                if (pathPart.includes('.')) {
                    files.push(pathPart.slice(nestednessLevel));
                } else if (currrentDirName !== '') {
                    dirs.push(iter(currrentDirName, currrentDirNameItems, nestednessLevel + 1));
                    currrentDirNameItems = [];
                    currrentDirName = pathPart.slice(nestednessLevel);
                } else {
                currrentDirName = pathPart.slice(nestednessLevel);
                }
            } else {
                currrentDirNameItems.push(pathPart);
            }
        }
        if (currrentDirName !== '') {
            dirs.push(iter(currrentDirName, currrentDirNameItems, nestednessLevel + 1));
        }
        return { name: partName, dirs, files };
    };
    return iter('', pathParts, 0);
}

// const testData = [
//     [['1.avi', '12', 'emoh', ' vonavi', '  a.doc', '  b.doc', ' vortep', '  .bashrc', ' vorodis', '  onrop', '   1.avi', '   2.avi', 'rav', ' bil'], '/emoh/vorodis/onrop/1.avi'],
// ];

// testData.forEach(([input, res]) => {
//     console.log('input: ', input, 'rr: ', res, 'fact: ', getPath(input));
// });

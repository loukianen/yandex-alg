/*      https://contest.yandex.ru/contest/40183/problems/D/
     
        
        
        D. Размер поддеревьев
        Ограничение времени 	1 секунда
        Ограничение памяти 	64Mb
        Ввод 	стандартный ввод или input.txt
        Вывод 	стандартный вывод или output.txt

        Дано неориентированное дерево, подвешенное за вершину 1. Для каждой вершины подсчитайте, сколько вершин содержится в поддереве, подвешенном за данную вершину.
        Формат ввода

        В первой строке вводится число V — количество вершин (3 ≤ V ≤ 100000)

        В следующих V-1 строках записано по два числа: номера соединенных ребром вершин
        Формат вывода

        Выведите V чисел — размеры поддеревьев для каждой из вершин
        Пример 1
        Ввод
        Вывод

        4
        1 2
        1 3
        1 4

            

        4 1 1 1 

        Пример 2
        Ввод
        Вывод

        7
        1 2
        1 3
        1 4
        5 1
        5 6
        5 7

            

        7 1 1 1 3 1 1 

*/

const fs = require('fs');

const content = fs.readFileSync(__dirname + '/input.txt', 'utf-8');

const data = content.split('\n').map((item) => item.split(' '));

const res = getSubtreesSize(data);
res.forEach((el) => {
    console.log(el);
});


function getSubtreesSize(data) {
    const nodeAmount = Number(data[0]);
    const neighbors = Array.from(Array(nodeAmount + 1), () => []);
    const subtreeSizes = Array.from(Array(nodeAmount + 1), () => -1);
    
    for (const item of data.slice(1)) {
        const a = Number(item[0]);
        const b = Number(item[1]);
        neighbors[a].push(b);
        neighbors[b].push(a);
    }
    

    const iter = (nodeNumber, n, s) => {
        subtreeSizes[nodeNumber] = 1;
        for (const nextNode of neighbors[nodeNumber]) {
            if (subtreeSizes[nextNode] === -1) {
                subtreeSizes[nodeNumber] += iter(nextNode);
            }
        }
        return subtreeSizes[nodeNumber];
    };

    iter(1);

    return subtreeSizes.slice(1);
}

// const testData = [[
//     [
//         ['7'],
//         [ '1', '2' ],
//         [ '1', '3' ],
//         [ '1', '4' ],
//         [ '5', '1' ],
//         [ '5', '6' ],
//         [ '5', '7' ],
//       ],
//     [7, 1, 1, 1, 3, 1, 1]],
//     [
//         [
//             [4],
//             [1, 2],
//             [1, 3],
//             [1, 4],
//         ],
//         [4, 1, 1, 1],
//     ],
// ];

// testData.forEach(([input, res]) => {
//     console.log('input: ', input, 'rr: ', res, 'fact: ', getSubtreesSize(input));
// });

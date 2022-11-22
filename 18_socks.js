/*      https://contest.yandex.ru/contest/40183/problems/C/
     
        
        C. Носки
        Ограничение времени 	1 секунда
        Ограничение памяти 	64Mb
        Ввод 	стандартный ввод или input.txt
        Вывод 	стандартный вывод или output.txt

        Имеется стол длины L. На столе разложено N носков так, что никакой носок не вылезает за границы стола. Далее имеется умный мальчик Васька, который хочет замерить толщину покрытия стола носками в M точках.

        Формат ввода

        Во входном файле даны сначала L, N, M (1 ≤ L ≤ 10000, 1 ≤ N ≤ 10000, 1 ≤ M ≤ 100000).

        Далее идут N пар чисел l ≤ r от 1 до L – левые и правые концы носков.

        Затем идут M чисел от 1 до L интересующие Васька точки.

        Все числа целые.
        Формат вывода

        Выведите M чисел – толщину носкового покрытия в каждой точке.

        Пример
        Ввод
        Вывод

        22 18 8
        6 11
        10 15
        3 18
        1 19
        10 17
        1 10
        6 16
        20 21
        1 1
        12 21
        5 9
        1 10
        5 10
        6 11
        5 6
        7 11
        1 19
        13 15
        5
        22
        19
        3
        8
        16
        16
        21

            

        8
        0
        3
        5
        11
        6
        6
        2

*/

const fs = require('fs');

const content = fs.readFileSync(__dirname + '/input.txt', 'utf-8');

const data = content.split('\n');

function processData(inputData) {
    const constants = inputData[0].split(' ');
    const socksAmount = constants[1];
    const { socks, points } = inputData.reduce((acc, item, i) => {
        if (i === 0) {
            return acc;
        }
        if (i <= socksAmount) {
            acc.socks.push(item.split(' '));
        } else {
            acc.points.push(item);
        }
        return acc;
    }, { socks: [], points: [] });
    return { constants, socks, points };
}

const res = countSocks(processData(data)).join('\n');
console.log(res);


function countSocks(data) {
    const { constants: [tableLength], socks, points } = data;

    const events = Array(Number(tableLength) + 1).fill(0);
    for (const [begin, end] of socks) {
        events[begin - 1] += 1;
        events[end] -= 1;
    }

    const socksAtPoints = [events[0]];
    for (let i = 1; i < events.length; i += 1) {
        socksAtPoints.push(events[i] + socksAtPoints[i - 1]);
    }

    return points.map((point) => socksAtPoints[point - 1]);
}

// const testData = [[
//     {
//         constants: [ '22', '18', '8' ],
//         socks: [
//           [ '6', '11' ],  [ '10', '15' ],
//           [ '3', '18' ],  [ '1', '19' ],
//           [ '10', '17' ], [ '1', '10' ],
//           [ '6', '16' ],  [ '20', '21' ],
//           [ '1', '1' ],   [ '12', '21' ],
//           [ '5', '9' ],   [ '1', '10' ],
//           [ '5', '10' ],  [ '6', '11' ],
//           [ '5', '6' ],   [ '7', '11' ],
//           [ '1', '19' ],  [ '13', '15' ],
//         ],
//         points: [
//           '5',  '22', '19',
//           '3',  '8',  '16',
//           '16', '21',
//         ],
//     },
//     [8, 0, 3, 5, 11, 6, 6, 2]],
// ];

// testData.forEach(([input, res]) => {
//     console.log('input: ', input, 'rr: ', res, 'fact: ', countSocks(input));
// });

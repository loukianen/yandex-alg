/*      https://contest.yandex.ru/contest/40146/enter/

        D. Коровы в стойла
Ограничение времени	1 секунда
Ограничение памяти	64Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt
На прямой расположены стойла, в которые необходимо расставить коров так, чтобы минимальное расcтояние между коровами было как можно больше.

Формат ввода
В первой строке вводятся числа N (2 < N < 10001) – количество стойл и K (1 < K < N) – количество коров. Во второй строке задаются N натуральных чисел в порядке возрастания – координаты стойл (координаты не превосходят 109)

Формат вывода
Выведите одно число – наибольшее возможное допустимое расстояние.

Пример
Ввод	Вывод
6 3
2 5 7 11 15 20
9

*/

const fs = require('fs');

const content = fs.readFileSync(__dirname + '/input.txt', 'utf-8');

const data = content.split('\n');
data[0] = Number(data[0].split(' ')[1]);
data[1] = data[1].split(' ');

const res = getMinDistance(data);
console.log(res);

function getMinDistance(data) {
    const [numberOfCows, plasesCoords] = data;
    let minDistance = 1;
    let maxDistance = plasesCoords[plasesCoords.length - 1] - plasesCoords[0];
    
    while (maxDistance > minDistance) {
        const currentDistance = Math.floor((minDistance + maxDistance + 1) / 2);
        if (isCurDictanceGood(currentDistance, numberOfCows, plasesCoords)) {
            minDistance = currentDistance;
        } else {
            maxDistance = currentDistance - 1;
        }
    }
    return minDistance;
}

function isCurDictanceGood(distance, cowNumber, coords) {
    let cowCount = 1;
    let previousPlace = coords[0];
    for (let i = 1; i < coords.length; i += 1) {
        if ((coords[i] - previousPlace) >= distance) {
            cowCount += 1;
            previousPlace = coords[i];
        }
    }
    return cowCount >= cowNumber;
}

// const testData = [
//     [[2, [2, 5, 7, 11, 15, 20]], 18],
//     [[3, [2, 5, 7, 11, 15, 20]], 9],
//     [[4, [2, 5, 7, 11, 15, 20]], 5],
//     [[5, [2, 5, 7, 11, 15, 20]], 4],
//     [[6, [2, 5, 7, 11, 15, 20]], 2],
//     [[3, [2, 7, 11, 15, 18, 20]], 9],
//     [[3, [2, 7, 10, 15, 18, 20]], 8],
// ];

// testData.forEach(([input, res]) => {
//     console.log('input: ', input, 'rr: ', res, 'fact: ', getMinDistance(input));
// });

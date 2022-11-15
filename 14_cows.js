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
    if (numberOfCows === 2) {
        return maxDistance;
    }
    let currentDistance = Math.floor((maxDistance + minDistance) / (numberOfCows - 1));

    let cowCountWithCurrentDistance = getCowCount(currentDistance, plasesCoords);
    while (minDistance + 1 !== maxDistance) {
        if (cowCountWithCurrentDistance >= numberOfCows) {
            minDistance = currentDistance;
        } else {
            maxDistance = currentDistance;
        }
        currentDistance = Math.floor((maxDistance + minDistance) / 2);
        cowCountWithCurrentDistance = getCowCount(currentDistance, plasesCoords);
    }
    return currentDistance;
}

function getCowCount(distance, coords) {
    function setNextPlace() {
        if ((coords[finish] - coords[start]) < distance) {
            return null;
        }
        let l = start;
        let r = finish;
        let curIndex = null;
        while(l + 1 < r) {
            curIndex = Math.floor((r + l) / 2);
            if ((coords[curIndex] - coords[start]) < distance) {
                l = curIndex;
            } else {
                r = curIndex;
            }

        }
        cowCount += 1;
        start = r;
        return curIndex;
    }

    let cowCount = 1;
    let start = 0;
    let finish = coords.length - 1;

    let nextPlaceIndex;  
    while (nextPlaceIndex !== null) {
        nextPlaceIndex = setNextPlace();
    }
    return cowCount;
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

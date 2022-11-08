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

// const fs = require('fs');

// const content = fs.readFileSync(__dirname + '/input.txt', 'utf-8');

// const data = content.split('\n');
// data[0] = Number(data[0].split(' ')[1]);
// data[1] = data[1].split(' ').map((el) => Number(el));

// const res = getMinDistance(data);
// console.log(res);

function getMinDistance(data) {
    const [numberOfCows, plasesCoords] = data;
    const initialSegments = getSegments(numberOfCows, plasesCoords.length);
    const res = getBestDistance(plasesCoords, initialSegments);
    return res;
}

function getSegments(numberOfCows, numbersOfPlaces) {
    const segments = []
    const numberOfSegmentsBetweenCows = numberOfCows - 1;
    for (let i = 1; i <= numberOfSegmentsBetweenCows; i += 1) {
        const leftIndex = i - 1;
        const rightIndex = i === numberOfSegmentsBetweenCows ? numbersOfPlaces - 1 : i;
        segments.push([leftIndex, rightIndex]);
    }
    return segments;
}

function getBestDistance(coords, segments) {
    const distances = segments.map(([l, r]) => coords[r] - coords[l]);
    const [shortestDistance, shortestSegmentIndex] = getMin(distances);
    return improveDistance(coords, segments, shortestDistance, shortestSegmentIndex);
}

function getMin(arr) {
    let min = arr[0];
    let minIndex = 0;
    for (let i = 1; i < arr.length; i += 1) {
        if (arr[i] < min) {
            min = arr[i];
            minIndex = i;
        }
    }
    return [min, minIndex];
}

function improveDistance(coords, segments, bestDistance, bestIndex) {
    const newSegments = segments.slice(0, bestIndex);
    for (let i = bestIndex; i < segments.length; i += 1) {
        const l = i === bestIndex ? segments[i][0] : newSegments[i - 1][1];
        const r = i === bestIndex || l === segments[i][1] ? segments[i][1] + 1 : segments[i][1];
        if (r < coords.length) {
            newSegments.push([l, r]);
        } else {
            return bestDistance;
        }
    }
    const newDistances = newSegments.map(([l, r]) => coords[r] - coords[l]);
    const [newBestDistance, newBestIndex] = getMin(newDistances);
    const res = newBestDistance < bestDistance ? bestDistance : improveDistance(coords, newSegments, newBestDistance, newBestIndex);
    return res;
}


const testData = [
    [[2, [2, 5, 7, 11, 15, 20]], 18],
    [[3, [2, 5, 7, 11, 15, 20]], 9],
    [[4, [2, 5, 7, 11, 15, 20]], 5],
    [[5, [2, 5, 7, 11, 15, 20]], 4],
    [[6, [2, 5, 7, 11, 15, 20]], 2],
    [[3, [2, 7, 11, 15, 18, 20]], 9],
    [[3, [2, 7, 10, 15, 18, 20]], 8],
];

testData.forEach(([input, res]) => {
    console.log('input: ', input, 'rr: ', res, 'fact: ', getMinDistance(input));
});

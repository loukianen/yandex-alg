/*            D. Majority
            Ограничение времени	1 секунда
            Ограничение памяти	64Mb
            Ввод	стандартный ввод или input.txt
            Вывод	стандартный вывод или output.txt
            Majority (в дословном переводе "большинство") — это значение элемента, который в массиве длиной n встречается более чем n / 2 раз. Определите majority массива, если гарантируется, что такой элемент существует.

            Формат ввода
            В первой строке вводится число n (1 ≤ n ≤ 5 × 104).

            Во второй строке вводится n чисел через пробел, числа не превосходят 109 по модулю.

            Формат вывода
            Выведите majority массива.

            Пример 1
            Ввод	Вывод
            3
            1 2 1
            1
            Пример 2
            Ввод	Вывод
            7
            7 5 5 5 5 4 5
            5
            Пример 3
            Ввод	Вывод
            4
            3 3 3 1
*/

const fs = require('fs');

const content = fs.readFileSync(__dirname + '/input.txt', 'utf-8');

const [, valuesAsString] = content.split('\n');
const data = valuesAsString.split(' ');

const res = getMajority(data);
console.log(res);

function getMajority(arr) {
    const countNumbers = {};
    for (const num of arr) {
        if (!countNumbers[num]) {
            countNumbers[num] = 0;
        }
        countNumbers[num] += 1;
        if (countNumbers[num] > arr.length / 2) {
            return num;
        }
    }
}

// const testData = [[[1, 2, 1], 1], [[7, 5, 5, 5, 5, 4, 5], 5], [[3, 3, 3, 1], 3]];

// testData.forEach(([input, res]) => {
//     console.log('input: ', input, 'rr: ', res, 'fact: ', getMajority(input));
// });

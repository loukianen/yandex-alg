/*        A. Два из трех
        Ограничение времени	1 секунда
        Ограничение памяти	64Mb
        Ввод	стандартный ввод или input.txt
        Вывод	стандартный вывод или output.txt
        Вам даны три списка чисел. Найдите все числа, которые встречаются хотя бы в двух из трёх списков.

        Формат ввода
        Во входных данных описывается три списка чисел. Первая строка каждого описания списка состоит из длины списка n (1 ≤ n ≤ 1000). Вторая строка описания содержит список натуральных чисел, записанных через пробел. Числа не превосходят 109.

        Формат вывода
        Выведите все числа, которые содержатся хотя бы в двух списках из трёх, в порядке возрастания. Обратите внимание, что каждое число необходимо выводить только один раз.

        Пример 1
        Ввод	Вывод
        2
        3 1
        2
        1 3
        2
        1 2
        1 3
        Пример 2
        Ввод	Вывод
        3
        1 2 2
        3
        3 4 3
        1
        5
*/

const fs = require('fs');

const content = fs.readFileSync(__dirname + '/input.txt', 'utf-8');

const data = content.split('\n').filter((el, index) => index % 2 === 1).map((str) => str.split(' '));

const res = getCommonNumbers(data);
console.log(res.join(' '));

function getCommonNumbers(lists) {
    const [numbersA, numbersB, numbersC] = lists.map((list) => new Set(list));
    const commonNumbers = [];

    for (const num of numbersA) {
        if (numbersB.has(num)) {
            commonNumbers.push(num);
            numbersB.delete(num);
        } else if(numbersC.has(num)) {
            commonNumbers.push.num;
        }
    }

    for (const num of numbersB) {
        if (numbersC.has(num)) {
            commonNumbers.push(num);
        }
    }
    return commonNumbers.sort();
}

// const testData = [[[[3, 1], [1, 3], [1, 2]], [1, 3]], [[[1, 1, 2], [3, 4, 3], [5]], []]];

// testData.forEach(([input, res]) => {
//     console.log('input: ', input, 'rr: ', res, 'fact: ', getCommonNumbers(input));
// });

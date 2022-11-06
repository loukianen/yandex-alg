/*      https://contest.yandex.ru/contest/40146/problems/C/

        C. Количество положительных на отрезке
        Ограничение времени	2 секунды
        Ограничение памяти	64Mb
        Ввод	стандартный ввод или input.txt
        Вывод	стандартный вывод или output.txt
        Дана последовательность чисел и запросы вида "определите сколько положительных чисел на отрезке с индексами от L до R".

        Формат ввода
        В первой строке вводится число n (1 ≤ n ≤ 100000) — длина последовательности.

        Во второй строке вводится последовательность из n целых чисел, все числа по модулю не превосходят 100000. Нумерация в последовательности начинается с единицы.

        В первой строке вводится число q (1 ≤ q ≤ 100000) — количество запросов.

        В каждой из следующих q строк вводятся запросы — два индекса l и r (1 ≤ l ≤ r ≤ n)

        Формат вывода
        Для каждого запроса выведите количество положительных на отрезке.

        Пример
        Ввод	Вывод
        5
        2 -1 2 -2 3
        4
        1 1
        1 3
        2 4
        1 5
        1
        2
        1
        3

*/

// const fs = require('fs');

// const content = fs.readFileSync(__dirname + '/input.txt', 'utf-8');

// const data = content.split('\n').reduce((acc, item, i) => {
//     if (i === 1) {
//         acc.collection = item.split(' ');
//     }
//     if (i > 2) {
//         acc.conditions.push(item.split(' '));
//     }
//     return acc;
// }, {conditions: []});

// const res = countPositiveNumbers(data);
// res.forEach((answer) => {
//     console.log(answer);
// });

function countPositiveNumbers(data) {
    const { collection, conditions } = data;
    const res = [];
    conditions.forEach((el) => {
        const start = Number(el[0]) - 1;
        const finish = Number(el[1]) - 1;

        let counter = 0;
        for (i = start; i <= finish; i += 1) {
            if (collection[i] > 0) {
                counter += 1;
            }
        }
        res.push(counter);
    });
    return res;
}

const testData = [
  [{
    conditions: [ [ '1', '1' ], [ '1', '3' ], [ '2', '4' ], [ '1', '5' ], ['4', '4'] ],
    collection: [ '2', '-1', '2', '-2', '3' ],
  }, [1, 2, 1, 3, 0]],
  [{
    conditions: [ [ '1', '1' ] ],
    collection: [ '-2' ],
  }, [0]],
];

testData.forEach(([input, res]) => {
    console.log('input: ', input, 'rr: ', res, 'fact: ', countPositiveNumbers(input));
});

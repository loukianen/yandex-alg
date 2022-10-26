/*        B. Повторяющееся число
        Ограничение времени	1 секунда
        Ограничение памяти	64Mb
        Ввод	стандартный ввод или input.txt
        Вывод	стандартный вывод или output.txt
        Вам дана последовательность измерений некоторой величины. Требуется определить, повторялась ли какое-либо число, причём расстояние между повторами не превосходило k.

        Формат ввода
        В первой строке задаются два числа n и k (1 ≤ n, k ≤ 105).

        Во второй строке задаются n чисел, по модулю не превосходящих 109.

        Формат вывода
        Выведите YES, если найдется повторяющееся число и расстояние между повторами не превосходит k и NO в противном случае.

        Пример 1
        Ввод	Вывод
        4 2
        1 2 3 1
        NO
        Пример 2
        Ввод	Вывод
        4 1
        1 0 1 1
        YES
        Пример 3
        Ввод	Вывод
        6 2
        1 2 3 1 2 3
        NO
*/

const fs = require('fs');

const content = fs.readFileSync(__dirname + '/input.txt', 'utf-8');

const data = content.split('\n').map((el) => el.split(' '));

const res = hasRepeatedNumber(data);
console.log(res);

function hasRepeatedNumber(data) {
    const [[, k], list] = data;
    const controlLength = [list[0]];
    
    for (let i = 1; i < list.length; i += 1) {
        const curNum = list[i];
        if (controlLength.includes(curNum)) {
            return 'YES';
        }
        if (controlLength.length >= k) {
            controlLength.splice(0, 1);
        }
        controlLength.push(curNum);
    }
    return 'NO';
}

// const testData = [[[[4, 2], [1, 2, 3, 1]], 'NO'], [[[4, 1], [1, 0, 1, 1]], 'YES'], [[[6, 2], [1, 2, 3, 1, 2, 3]], 'NO']];

// testData.forEach(([input, res]) => {
//     console.log('input: ', input, 'rr: ', res, 'fact: ', hasRepeatedNumber(input));
// });

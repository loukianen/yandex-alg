/*      https://contest.yandex.ru/contest/40183/problems/

        A. Группы и аудитории
Ограничение времени	1 секунда
Ограничение памяти	64Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt
В университете есть n аудиторий и m учебных групп. Для каждой аудитории задана её вместимость, а для каждой группы — численность. Группа может заниматься в аудитории только если её численность не превосходит размера аудитории. Определите максимальное количество групп, которые можно рассадить по аудиториям.

Формат ввода
В первой строке вводится число n (1 ≤ n ≤ 100000).

Во второй строке вводится n чисел — численность групп. Численность не превосходит 100000.

В третьей строке вводится число m (1 ≤ m ≤ 100000).

В четвертой строке вводится m чисел — вместимость аудиторий. Вместимость не превосходит 100000.

Формат вывода
Выведите ответ на задачу.

Пример 1
Ввод	Вывод
3
3 1 2
2
1 1
1
Пример 2
Ввод	Вывод
2
1 2
3
3 2 1

*/

const fs = require('fs');

const content = fs.readFileSync(__dirname + '/input.txt', 'utf-8');

const data = content.split('\n');

const res = getMaxGroupNumber(data.filter((el, i) => i % 2 > 0).map((el) => el.split(' ')));
console.log(res);

function getMaxGroupNumber(data) {
    const [groups, rooms] = data;
    rooms.sort((a, b) => Number(b) - Number(a));
    groups.sort((a, b) => Number(a) - Number(b));
    let res = 0;

    for (const group of groups) {
        if (rooms.length < 1) {
            break;
        }
        if (Number(group) <= Number(rooms[rooms.length - 1])) {
            res += 1;
            rooms.pop();
        }
    }
    return res;
}

// const testData = [
//     [[[3, 1, 2], [1, 1]], 1],
//     [[[1, 2], [3, 2, 1]], 2],
// ];

// testData.forEach(([input, res]) => {
//     console.log('input: ', input, 'rr: ', res, 'fact: ', getMaxGroupNumber(input));
// });

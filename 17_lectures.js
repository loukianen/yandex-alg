/*      https://contest.yandex.ru/contest/40183/problems/B/

        
        B. Выбор заявки
        Ограничение времени 	1 секунда
        Ограничение памяти 	64Mb
        Ввод 	стандартный ввод или input.txt
        Вывод 	стандартный вывод или output.txt

        Дана лекционная аудитория, в которой несколько профессоров хотят прочесть свои лекции. Для составления расписания профессора подали заявки, вида [si, fi) – время начала и конца лекции. Лекция считается открытым полуинтервалом, то есть какая-то лекция может начаться в момент окончания другой, без перерыва. Составьте расписание занятий так, чтобы выполнить максимальное количество заявок.
        Формат ввода

        В первой строке вводится натуральное число N, не более 1000 – общее количество заявок. Затем вводится N строк с описаниями заявок - по два числа в каждом si и fi.

        Гарантируется, что si < fi. Время начала и окончания лекции – натуральное число, не превышает 1440 (в минутах с начала суток).
        Формат вывода

        Выведите одно число – максимальное количество заявок, которые можно выполнить.

        Пример 1
        Ввод
        Вывод

        1
        5 10

            

        1

        Пример 2
        Ввод
        Вывод

        3
        1 5
        2 3
        3 4

            

        2
*/

const fs = require('fs');

const content = fs.readFileSync(__dirname + '/input.txt', 'utf-8');

const data = content.split('\n').slice(1).map((el) => el.split(' '));

const res = getMaxLecturesNumber(data);
console.log(res);

function getMaxLecturesNumber(data) {
    data.sort((a, b) => a[1] - b[1]);

    let res = 0;
    let curMinStartOfLecture = 0;

    for (const [start, finish] of data) {
        if (Number(start) >= curMinStartOfLecture) {
            res += 1;
            curMinStartOfLecture = Number(finish);
        }
    }

    return res;
}

// const testData = [
//     [[[5, 10]], 1],
//     [[[1, 5], [2, 3], [3, 4]], 2],
// ];

// testData.forEach(([input, res]) => {
//     console.log('input: ', input, 'rr: ', res, 'fact: ', getMaxLecturesNumber(input));
// });

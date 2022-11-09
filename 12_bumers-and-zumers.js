/*      https://contest.yandex.ru/contest/40146/problems/B/

        B. Бумеры и зумеры
        Ограничение времени	1 секунда
        Ограничение памяти	64Mb
        Ввод	стандартный ввод или input.txt
        Вывод	стандартный вывод или output.txt
        Площадка для выгула собак — место, где собираются и общаются люди разных возрастов. На одной из площадок Восточного Бирюлева хозяева собак очень дружны и приглашают друг-друга на день рождения.

        Человек x не приглашает на день рождения человека y если выполнено хотя бы одно из условий:

        - (Возраст человека y) <= 0.5 * (Возраст человека x) + 7

        - (Возраст человека y) > (Возраст человека x)

        - (Возраст человека y) > 100 и одновременно с этим (Возраст человека x) < 100

        Во всех остальных случаях человек x приглашает человека y на день рождения.

        Определите суммарное количество приглашений на день рождения.

        Формат ввода
        В первой строке вводится число n (1 ≤ n ≤ 100000).

        Во второй строке вводится n чисел — возраст людей. Возраст находится в промежутке от 1 до 120.

        Формат вывода
        Выведите одно число — суммарное количество приглашений.

        Пример 1
        Ввод	Вывод
        2
        16 16
        2
        Пример 2
        Ввод	Вывод
        3
        17 16 18
        2
        Пример 3
        Ввод	Вывод
        5
        120 25 30 100 105 
        4

*/

// const fs = require('fs');

// const content = fs.readFileSync(__dirname + '/input.txt', 'utf-8');

// const data = content.split('\n');

// function mySplit(str) {
//     const res = [];
//     let items = '';
//     for (const symbol of str) {
//         if (symbol === ' ') {
//             res.push(Number(items));
//             items = '';
//         } else {
//             items = `${items}${symbol}`;
//         }
//     }
//     res.push(Number(items));
//     return res;
// }

// const res = getInvitationCount(mySplit(data[1]));
// console.log(res);

function getInvitationCount(data) {
    const peopleAges = data.sort((a,b) => a - b);
    let invitationCounter = 0;
    let l = 0;
    let r = 0;

    for (const personAge of peopleAges) {
        while (peopleAges[l] <= personAge * 0.5 + 7) {
            l += 1;
        }
        while (peopleAges[r] <= personAge) {
            r += 1;
        }
        if (l < r) {
            invitationCounter += r - l - 1;
        }
    }
    return invitationCounter;
}

const testData = [[[16, 16], 2], [[17, 16, 18], 2], [[120, 25, 30, 100, 105], 4]];

testData.forEach(([input, res]) => {
    console.log('input: ', input, 'rr: ', res, 'fact: ', getInvitationCount(input));
});

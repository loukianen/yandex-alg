/*        D. Разница во времени
        Ограничение времени	1 секунда
        Ограничение памяти	64Mb
        Ввод	стандартный ввод или input.txt
        Вывод	стандартный вывод или output.txt
        Каждые сутки на вокзал прибывает n электричек. По заданному расписанию прибытия электричек определите минимальное время между прибытием двух разных электричек.

        Формат ввода
        В первой строке задано число n (1 ≤ n ≤ 2 × 104) — количество электричек.

        Во второй строке задано n моментов времени в формате HH:MM (0 ≤ HH ≤ 23, 0 ≤ MM ≤ 59) через пробел.

        Формат вывода
        Выведите одно число — минимальное время в минутах между прибытием двух электричек.

        Пример 1
        Ввод	Вывод
        2
        23:59 00:00
        1
        Пример 2
        Ввод	Вывод
        3
        00:00 23:59 00:00
        0
*/

const fs = require('fs');

const content = fs.readFileSync(__dirname + '/input.txt', 'utf-8');

const getData = (str) => {
    const [, arrStr] = str.split('\n');
    return arrStr ? arrStr.split(' ') : [];
};

const twelveHours = 12 * 60;
const day = twelveHours * 2;

const res = getMinGap(getData(content));
console.log(res);


function getArrivalTime(timeAsString) {
    const [hours, minutes] = timeAsString.split(':');
    return Number(hours) * 60 + Number(minutes);
}

function getMinGap(times) {
    let gap = getArrivalTime('23:59');

    for (let i = 0; i < times.length - 1; i += 1) {
        const currentTime = getArrivalTime(times[i]);
        for (let j = i + 1; j < times.length; j += 1) {
            const nextTime = getArrivalTime(times[j]);
            const calculatedGap = Math.abs(nextTime - currentTime);
            const currentGap = calculatedGap > twelveHours ? day - calculatedGap : calculatedGap;
            if (currentGap === 0) {
                return currentGap;
            }
            if (currentGap < gap) {
                gap = currentGap;
            }
        }
    }
    return gap;
}

// const testData = [[[2, ['23:59', '00:00']], 1], [[3, ['00:00', '23:59', '00:00']], 0], [[2, ['00:00', '12:00']], twelveHours]];

// testData.forEach(([input, res]) => {
//     console.log('input: ', input, 'rr: ', res, 'fact: ', getMinGap(input[1]));
// });

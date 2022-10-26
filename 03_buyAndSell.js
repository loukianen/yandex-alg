/*        C. Купить и продать
        Ограничение времени	1 секунда
        Ограничение памяти	64Mb
        Ввод	стандартный ввод или input.txt
        Вывод	стандартный вывод или output.txt
        У вас есть 1000$, которую вы планируете эффективно вложить. Вам даны цены за 1000 кубометров газа за n дней. Можно один раз купить газ на все деньги в день i и продать его в один из последующих дней j, i < j.

        Определите номера дней для покупки и продажи газа для получения максимальной прибыли.

        Формат ввода
        В первой строке вводится число дней n (1 ≤ n ≤ 100000).

        Во второй строке вводится n чисел — цены за 1000 кубометров газа в каждый из дней. Цена — целое число от 1 до 5000. Дни нумеруются с единицы.

        Формат вывода
        Выведите два числа i и j — номера дней для покупки и продажи газа. Если прибыль получить невозможно, выведите два нуля.

        Пример 1
        Ввод	Вывод
        6
        10 3 5 3 11 9
        2 5
        Пример 2
        Ввод	Вывод
        4
        5 5 5 5
        0 0
*/


// var fs = require('fs');

// const content = fs.readFileSync(__dirname + '/input.txt', 'utf-8');

// const getData = (str) => {
//     const [, arrStr] = str.split('\n');
//     return arrStr ? arrStr.split(' ') : [];
// };

const money = 1;

// const res = getBaySellDays(getData(content));
// console.log(res[0], res[1]);


function getBaySellDays(prices) {
    let income = 0;
    let buyDay = 0;
    let sellDay = 0;
    let gazVolume = 0;

    let middleBuyDay = 0;

    for (i = 0; i < prices.length; i += 1) {
        const currentGazVolume = money / prices[i];
        if(currentGazVolume > gazVolume) {
            gazVolume = currentGazVolume;
            middleBuyDay = i + 1;
        }
        const currentIncom = prices[i] * gazVolume - money;
        if (currentIncom > income) {
            income = currentIncom;
            sellDay = i + 1;
            buyDay = middleBuyDay;
        }
    }
    return [buyDay, sellDay];
}

const testData = [[[6, [10, 3, 5, 3, 11, 9]], [2, 5]], [[4, [5, 5, 5, 5]], [0, 0]], [[1, [10]], [0, 0]], [[0, []], [0, 0]], [[4, [5, 7, 4, 5]], [1, 2]], [[4, [5, 7, 6, 10]], [1, 4]]];

testData.forEach(([input, res]) => {
    console.log('input: ', input, 'rr: ', res, 'fact: ', getBaySellDays(input[1]));
});

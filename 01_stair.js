/*        A. Строительство лесенок
        Ограничение времени	1 секунда
        Ограничение памяти	64Mb
        Ввод	стандартный ввод или input.txt
        Вывод	стандартный вывод или output.txt
        Вася занимается строительством лесенок из блоков. Лесенка состоит из ступенек, при этом i-ая ступенька должна состоять ровно из i блоков.

        По заданному числу блоков n определите максимальное количество ступенек в лесенке, которую можно построить из этих блоков.

        Формат ввода
        Ввводится одно число n (1 ≤ n ≤ 231 - 1).

        Формат вывода
        Выведите одно число — количество ступенек в лесенке.

        Пример 1
        Ввод	Вывод
        5
        2
        Пример 2
        Ввод	Вывод
        8
        3
        Примечания
        Рисунок соответствует примерам. На рисунке черным показаны блоки, использованные при строительстве лестницы, а красным — оставшиеся лишними блоки, которых недостаточно для строительства очередной ступеньки.
*/


// var fs = require('fs');

// const content = fs.readFileSync(__dirname + '/input.txt', 'utf-8');

// console.log(buildStair(content));

function buildStair(blockAmount) {
    let ans = 1;
    let stair = 1;
    for (let i = 2; stair <= blockAmount; i += 1) {
        const nextStair = stair + i;
        if (nextStair === blockAmount) {
            return i;
        }
        if (nextStair > blockAmount) {
            return ans;
        }
        ans = i;
        stair = nextStair;
    }
    return ans;
}

const testData = [[1, 1], [5, 2], [8, 3]];

testData.forEach(([input, res]) => {
    console.log('input: ', input, 'rr: ', res, 'fact: ', buildStair(input));
});

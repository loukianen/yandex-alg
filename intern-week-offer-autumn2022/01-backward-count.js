// https://contest.yandex.ru/contest/40294/problems/?nc=hoLQ7tgy

/*        
        A. Обратный отсчёт
        Ограничение времени 	1 секунда
        Ограничение памяти 	64.0 Мб
        Ввод 	input.json
        Вывод 	output.txt

        Напишите функцию createCountdown, которая будет принимать не отрицательное целое число в качестве единственного аргумента и возвращать новую функцию без аргументов. Возвращаемая функция должна, с каждым своим вызовом, по одному, возвращать целые числа от изначально заданного до нуля. Все последующие вызовы, после вызова вернувшего ноль, должны так же возвращать ноль.

        Например:

        const countdownFrom2 = createCountdown(2)

        countdownFrom2() // 2
        countdownFrom2() // 1
        countdownFrom2() // 0
        countdownFrom2() // 0

        Если единственный аргумент функции createCountdown не является не отрицательным целым числом, это нужно воспринимать как вызов с аргументом равным 0.
        Примечания

        Решение должно представлять из себя валидный JavaScript с определением функции createCountdown на верхнем уровне.

*/


// var fs = require('fs');

// const content = fs.readFileSync(__dirname + '/input.json', 'utf-8');

// console.log(buildStair(content));

function createCountdown(num) {
    const res = () => {
        const currentCount = res.count;
        if (currentCount > 0) {
            res.count -= 1;
        }
        return currentCount;
    };
    res.count = (typeof num === 'number' && num > 0) ? num : 0;
    return res;
}

const testData = [[4, 2]];


const countdownFrom2 = createCountdown(true);

console.log(countdownFrom2()); // 2
console.log(countdownFrom2()); // 1
console.log(countdownFrom2()); // 0
console.log(countdownFrom2()); // 0
// testData.forEach(([input, res]) => {
//     console.log('input: ', input, 'rr: ', res, 'fact: ', buildStair(input));
// });

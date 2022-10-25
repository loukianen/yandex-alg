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

const fs = require('fs');

const content = fs.readFileSync(__dirname + '/input.txt', 'utf-8');

const [, valuesAsString] = content.split('\n');
const data = valuesAsString.split(' ');

const res = getMajority(data);
console.log(res);

function getMajority(arr) {
    const countNumbers = {};
    for (const num of arr) {
        if (!countNumbers[num]) {
            countNumbers[num] = 0;
        }
        countNumbers[num] += 1;
        if (countNumbers[num] > arr.length / 2) {
            return num;
        }
    }
}

// const testData = [[[1, 2, 1], 1], [[7, 5, 5, 5, 5, 4, 5], 5], [[3, 3, 3, 1], 3]];

// testData.forEach(([input, res]) => {
//     console.log('input: ', input, 'rr: ', res, 'fact: ', getMajority(input));
// });

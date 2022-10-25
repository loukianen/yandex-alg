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

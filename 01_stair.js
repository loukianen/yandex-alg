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

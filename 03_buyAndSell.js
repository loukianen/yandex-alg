// var fs = require('fs');

// const content = fs.readFileSync(__dirname + '/input.txt', 'utf-8');

// const getData = (str) => {
//     const [, arrStr] = content.split('\n');
//     return arrStr ? arrStr.split(' ') : [];
// };

// const res = getBaySellDays(getData(content));
// console.log(res[0], res[1]);


function getBaySellDays(prices) {
    console.log(prices);
    let income = 0;
    let buyDay = 0;
    let sellDay = 0;

    for (i = 1; i < prices.length; i += 1) {
        for (j = i + 1; j <= prices.length; j += 1) {
            const currentIncom = prices[j - 1] - prices[i - 1];
            if (currentIncom > income) {
                income = currentIncom;
                buyDay = i;
                sellDay = j;
            }
        }
    }
    return [buyDay, sellDay];
}

const testData = [[[6, [10, 3, 5, 3, 11, 9]], [2, 5]], [[4, [5, 5, 5, 5]], [0, 0]], [[1, [10]], [0, 0]], [[0, []], [0, 0]]];

testData.forEach(([input, res]) => {
    console.log('input: ', input, 'rr: ', res, 'fact: ', getBaySellDays(input[1]));
});

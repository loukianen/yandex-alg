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

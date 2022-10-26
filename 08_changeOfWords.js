const fs = require('fs');

const content = fs.readFileSync(__dirname + '/input.txt', 'utf-8');

const data = content.split('\n');

const res = changeOfWords(data);
console.log(res);

function changeOfWords(data) {
    const [vocabuleryWords, text] = data;
    const vocabulary = vocabuleryWords.split(' ').reduce((acc, word) => {
        acc[word] = word;
        return acc;
    }, {});
    const res = text.split(' ').map((word) => changeWord(vocabulary, word));
    return res.join(' ');
}

function changeWord(voc, item) {
    let currentStr = '';
    for (let i = 0; i < item.length; i += 1) {
        currentStr = currentStr + item[i];
        if (voc[currentStr]) {
            return voc[currentStr];
        } 
    }
    return item;
}

// const testData = [[['a b', 'abdafb basrt casds dsasa a'], 'a b casds dsasa a'], [['aa bc aaa', 'a aa aaa bcd abcd'], 'a aa aa bc abcd']];

// testData.forEach(([input, res]) => {
//     console.log('input: ', input, 'rr: ', res, 'fact: ', changeOfWords(input));
// });

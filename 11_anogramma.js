/*      https://contest.yandex.ru/contest/40146/problems/

        A. Анаграмма?
        Ограничение времени	1 секунда
        Ограничение памяти	64Mb
        Ввод	стандартный ввод или input.txt
        Вывод	стандартный вывод или output.txt
        Задано две строки, необходимо проверить, является ли одна анаграммой другой. Анаграммами называются строки, состоящие из одних и тех же букв.

        Формат ввода
        Строки состоят из маленьких латинских букв, их длина не превосходит 100000. Каждая записана в отдельной строке.

        Формат вывода
        Выведите YES если одна из строк является анаграммой другой и NO в противном случае.

        Пример 1
        Ввод	Вывод
        dusty
        study
        YES
        Пример 2
        Ввод	Вывод
        rat
        bat
*/

// const fs = require('fs');

// const content = fs.readFileSync(__dirname + '/input.txt', 'utf-8');

// const data = content.split('\n');

// const res = isAmogramma(data);
// console.log(res);

function isAmogramma(words) {
    const countLetters = (word) => {
        const letters = {};
        for (let i = 0; i < word.length; i += 1) {
            const curLetter = word[i];
            if (!letters[curLetter]) {
                letters[curLetter] = 0;
            }
            letters[curLetter] += 1;
        }
        return letters;
    };
    
    [first, second] = words.map((item) => countLetters(item));

    if (first.length !== second.length) {
        return 'NO';
    }

    const keys = Object.keys(first);
    const isFirstEqualSecond = keys.every((item) => first[item] === second[item]);
    return isFirstEqualSecond ? 'YES' : 'NO';
}

const testData = [[['dusty', 'study'], 'YES'], [['rat', 'bat'], 'NO'], [['', ''], 'YES']];

testData.forEach(([input, res]) => {
    console.log('input: ', input, 'rr: ', res, 'fact: ', isAmogramma(input));
});

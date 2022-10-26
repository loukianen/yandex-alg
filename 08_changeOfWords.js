/*        C. Замена слов
        Ограничение времени	1 секунда
        Ограничение памяти	64Mb
        Ввод	стандартный ввод или input.txt
        Вывод	стандартный вывод или output.txt
        С целью экономии чернил в картридже принтера было принято решение укоротить некоторые слова в тексте. Для этого был составлен словарь слов, до которых можно сокращать более длинные слова. Слово из текста можно сократить, если в словаре найдется слово, являющееся началом слова из текста. Например, если в списке есть слово "лом", то слова из текста "ломбард", "ломоносов" и другие слова, начинающиеся на "лом", можно сократить до "лом".

        Если слово из текста можно сократить до нескольких слов из словаря, то следует сокращать его до самого короткого слова.

        Формат ввода
        В первой строке через пробел вводятся слова из словаря, слова состоят из маленьких латинских букв. Гарантируется, что словарь не пуст и количество слов в словаре не превышет 1000, а длина слов — 100 символов.

        Во второй строке через пробел вводятся слова текста (они также состоят только из маленьких латинских букв). Количество слов в тексте не превосходит 105, а суммарное количество букв в них — 106.

        Формат вывода
        Выведите текст, в котором осуществлены замены.

        Пример 1
        Ввод	Вывод
        a b
        abdafb basrt casds dsasa a
        a b casds dsasa a
        Пример 2
        Ввод	Вывод
        aa bc aaa
        a aa aaa bcd abcd
        a aa aa bc abcd
*/

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

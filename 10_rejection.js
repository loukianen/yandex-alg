/*            E. Отбраковка
        Ограничение времени	1 секунда
        Ограничение памяти	64Mb
        Ввод	стандартный ввод или input.txt
        Вывод	стандартный вывод или output.txt
        На заводе по производству химических соединений есть реактор, в результате работы которого получаются химические вещества, формула которых записывается в виде строки состоящей из заглавных и строчных латинских букв.

        Также у завода есть список желательных веществ (веществ первого сорта), которые хотелось бы получить.

        Кроме того заводу также интересны вещества второго и третьего сорта.

        Вещество называется веществом первого сорта, если его формула в точности совпадает с формулой из списка желательных веществ.

        Вещество называется веществом второго сорта, если из него можно получить вещество из списка желательных в разультате замены некоторых заглавных букв на строчные и наоборот.

        Вещество называется веществом третьего сорта, если в нем возможны как замены букв с заглавных на строчные и наоборот, так и замены любых гласных букв (aeiou) на другие гласные буквы, таким образом чтобы получилось вещество из списка желательных.

        В связи со сложной экономической ситуацией было принято решение не выбрасывать вещества второго и третьего сорта и для каждого из них найти похожее вещество из списка желательных, причем, если преобразованиями из вещества второго или третьего сорта можно получить несколько веществ из списка желательных, то его следует преобразовывать к тому веществу, которое находится раньше в списке желательных.

        Формат ввода
        В первой строке вводится число n (1 ≤ n ≤ 5000) — количество веществ в списке желательных.

        Во второй строке вводится n слов через пробел — список желательных веществ.

        В третьей строке вводится число k (1 ≤ k ≤ 5000) — количество веществ, полученных в реакторе.

        Во второй строке вводится k слов через пробел — список веществ, полученных в реакторе.

        Длина всех слов не превосходит 7.

        Формат вывода
        Для каждого вещества выведите:

        Если оно является веществом первого сорта — название этого вещества.

        Если оно не является веществом первого сорта, но является веществом второго сорта — первое из списка желательных веществ, к которому можно преобразовать это вещество.

        Если оно не является веществом первого или второго сорта, но является веществом третьего сорта — первое из списка желательных веществ, к которому можно преобразовать это вещество.

        В противном случае выведите пустую строку.

        Все слова в вывод должны быть разделены одним пробелом.

        Пример 1
        Ввод	Вывод
        4
        LiTe lite bare Bare
        10
        Bare BARE Bear bear lite Lite LiTe leti leet leto
        Bare bare   lite LiTe LiTe LiTe  LiTe
        Пример 2
        Ввод	Вывод
        1
        DeLay
        1
        delOy
        DeLay
*/

const fs = require('fs');

const content = fs.readFileSync(__dirname + '/input.txt', 'utf-8');

const data = content.split('\n').filter((el, index) => index % 2 === 1).map((item) => item.split(' '));

const res = sortSubstances(data);
console.log(res);

function sortSubstances(data) {
    const [etalonNames, substances] = data;

    const res = [];
    substances.forEach((substance) => {
        const substanceName = getSubstanceName(etalonNames, substance);
        res.push(substanceName);
    });
    return res.join(' ');
}

function getSubstanceName(vocabulary, substanceName) {
    const firstClassName = getFirstClassName(vocabulary, substanceName);
    if (firstClassName) {
        return firstClassName;
    }

    const secondClassName = getSecondOrThirdClassName(vocabulary, substanceName);
    if (secondClassName) {
        return secondClassName;
    }
    return '';
}

function getFirstClassName(gauge, subName) {
    return gauge.includes(subName) ? subName : null;
}

function getSecondOrThirdClassName(gauge, subName) {
    const vowelLetters = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
    for (const curGauge of gauge) {
        if (curGauge.length !== subName.length) {
            continue;
        }

        let identityCounter = 0;
        for (let i = 0; i < curGauge.length; i += 1) {
            const a = curGauge[i];
            const b = subName[i];
            if (a === b || a === b.toLowerCase() || a === b.toUpperCase() || vowelLetters.includes(a)) {
                identityCounter += 1;
            } else {
                break;
            }
        }
        if (curGauge.length === identityCounter) {
            return curGauge;
        }
    }
    return null;
}

// const testData = [
//     [[['LiTe', 'lite', 'bare', 'Bare'], ['Bare', 'BARE', 'Bear', 'bear', 'lite', 'Lite', 'LiTe', 'leti', 'leet', 'leto']], 'Bare bare   lite LiTe LiTe LiTe  LiTe'],
//     [[['DeLay'], ['delOy']], 'DeLay'],
// ];

// testData.forEach(([input, res]) => {
//     console.log('input: ', input, 'rr: ', res, 'fact: ', sortSubstances(input), res === sortSubstances(input));
// });

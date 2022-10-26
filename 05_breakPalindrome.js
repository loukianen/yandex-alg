/*        E. Сломай палиндром
        Ограничение времени	1 секунда
        Ограничение памяти	64Mb
        Ввод	стандартный ввод или input.txt
        Вывод	стандартный вывод или output.txt
        Палиндромом называется строка, которая читается одинаково слева-направо и справа-налево.

        В заданной строке-палиндроме необходимо заменить один символ, чтобы она перестала быть палиндромом. При этом полученная строка должна быть лексикографически минимальной.

        Строка A лексикографически меньше строки B (той же длины), если на первой различающейся позиции в строке A стоит меньший символ, чем в B. Например, строка adbc меньше строки adca, т.к. первые два символа в строках совпадают, а на третьем месте в строке adbc стоит символ b, который меньше символа c, стоящего на третьей позиции в строке adca.

        Формат ввода
        Вводится строка-палиндром, состоящая из маленьких букв латинского алфавита. Длина строки не превосходит 1000.

        Формат вывода
        Выведите лексикографически минимальную строку, не являющуюяся палиндромом, полученную из исходной строки заменой одного символа.

        Если получить такую строку невозможно - выведите пустую строку.

        Пример 1
        Ввод	Вывод
        abba
        aaba
        Пример 2
        Ввод	Вывод
        a
*/


const fs = require('fs');

const content = fs.readFileSync(__dirname + '/input.txt', 'utf-8');

const res = breakPalindrome(content);
console.log(res);

function breakPalindrome(palindrome) {
    const palindromeMiddleIndex = Math.ceil((palindrome.length - 1) / 2);
    if (palindrome.length < 2) {
        return '';
    }
    for (let i = 0; i < palindromeMiddleIndex; i += 1) {
        if (palindrome[i] !== 'a') {
            return palindrome.slice(0, i).concat('a', palindrome.slice(i + 1));
        }
    }
    return palindrome.slice(0, -1).concat('b');
}

// const testData = [['abba', 'aaba'], ['a', ''], ['aazzaa', 'aaazaa'], ['aazaa', 'aazab'], ['aaaaa', 'aaaab'], ['aa', 'ab']];

// testData.forEach(([input, res]) => {
//     console.log('input: ', input, 'rr: ', res, 'fact: ', breakPalindrome(input));
// });

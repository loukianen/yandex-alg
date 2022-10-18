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

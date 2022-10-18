const fs = require('fs');

const content = fs.readFileSync(__dirname + '/input.txt', 'utf-8');

const res = breakPalindrome(content);
console.log(res);

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const letters = alphabet.reduce((acc, letter, index) => {
    acc[letter] = index;
    return acc;
}, {});

function breakPalindrome(palindrome) {
    const palindromeMiddleIndex = Math.floor((palindrome.length - 1) / 2) + 1;
    if (palindromeMiddleIndex < 1) {
        return '';
    }
    const palindromePartForChange = palindrome.slice(0, palindromeMiddleIndex);
    for (let i = palindromeMiddleIndex; i >= 0; i -= 1) {
        const lastLetter = palindromePartForChange[i];
        const newLetter = alphabet[letters[lastLetter] - 1];
        if (newLetter) {
            const curStr = palindromePartForChange.slice(0, i).concat(newLetter, palindromePartForChange.slice(i + 1));
            if (curStr < palindromePartForChange) {
                return curStr.concat(palindrome.slice(palindromeMiddleIndex));
            }
        }
    }
    return '';
}

// const testData = [['abba', 'aaba'], ['a', ''], ['aza', 'aya']];

// testData.forEach(([input, res]) => {
//     console.log('input: ', input, 'rr: ', res, 'fact: ', breakPalindrome(input));
// });


// for (let i = 0; i < palindromeMiddleIndex; i += 1) {
//     const curStr = palindromePartForChange.slice(0, i).concat('a', palindromePartForChange.slice(i + 1));
//     if (curStr < palindromePartForChange) {
//         return curStr.concat(palindrome.slice(palindromeMiddleIndex));
//     }
// }
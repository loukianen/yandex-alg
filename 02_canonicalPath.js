var fs = require('fs');

const content = fs.readFileSync(__dirname + '/input.txt', 'utf-8');

console.log(getCanonicalPath(content));

function getCanonicalPath(path) {
    const pathParts = path.split('/').filter((el) => (Boolean(el) && el !== '.'));
    
    const getPathPartsWithProcessedTransitionToParentDirectory = (rawStringParts) => {
        for (let i = 0; i < rawStringParts.length; i += 1) {
            if (rawStringParts[i] === '..') {
                if (rawStringParts[i - 1]) {
                  rawStringParts.splice(i - 1, 2);
                } else {
                  rawStringParts.splice(i, 1);
                }
                return getPathPartsWithProcessedTransitionToParentDirectory(rawStringParts);
            }
        }
        return rawStringParts;
    }
    
    const resultPath = getPathPartsWithProcessedTransitionToParentDirectory(pathParts).join('/');
    return `/${resultPath}`;
}

// const testData = [['', '/'], ['/home/', '/home'], ['/../', '/'], ['/home//foo/', '/home/foo']];

// testData.forEach(([input, res]) => {
//     console.log('input: ', input, 'rr: ', res, 'fact: ', getCanonicalPath(input));
// });

/*
function getCanonicalPath(path) {
    if (path.length === 0) {
        return '/';
    }
    
    const pathParts = [];
    let wordParts = [];

    const addTheWordToPath = () => {
        if (wordParts.length !== 0) {
            const word = wordParts.join('');
            if (word === '..') {
                pathParts.pop();
            } else if(word !== '.') {
                pathParts.push(word);
            }
            wordParts = [];
        }
    };

    for (let i = 0; i < path.length; i += 1) {
        if (path[i] === '/') {
            addTheWordToPath();
        } else {
            wordParts.push(path[i]);
        }
    }
    addTheWordToPath();

    const resultPath = pathParts.join('/');
    return `/${resultPath}`;
}
*/

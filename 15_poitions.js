/*      https://contest.yandex.ru/contest/40146/problems/E/

        НЕ РЕШЕНО
        E. Варим зелья
        Ограничение времени 	4 секунды
        Ограничение памяти 	256Mb
        Ввод 	стандартный ввод или input.txt
        Вывод 	стандартный вывод или output.txt
        Богдан учится в Хогвартсе на факультете зельеварения. Завтра ему сдавать свой выпускной проект, но он ничего не успел подготовить. У него есть n ингредиентов, из которых можно сварить зелья. Зелье может состоять либо из одного ингредиента, либо из двух различных. Каждое зелье характеризуется его полезностью. Полезность — это целое число от −106 до 106. Богдану нужно сварить k зелий так, чтобы их суммарная полезность была максимальной (полезность зелья — это сумма полезностей ингредиентов, из которых оно состоит). Очень важно, чтобы все зелья в проекте были различны. Два зелья считаются различными, если найдется хотя бы один ингредиент, который отсутствует в одном зелье, но присутствует в другом. Помогите Богдану с проектом и подсчитайте максимальную суммарную полезность зелий, которую он может получить.
        Формат ввода
        В первой строке записано два числа n и k(1≤n≤105,1≤k≤n⋅(n+1)2) - количество ингредиентов и количество зелий, которые нужно приготовить.

        В следующей строке заданы n целых чисел ai (−106≤ai≤106) — полезность ингредиентов.
        Формат вывода
        Выведите одно целое число — максимальную суммарную полезность зелий.
        Пример 1
        Ввод
        Вывод

        5 5
        -2 3 -5 5 1

            

        26

        Пример 2
        Ввод
        Вывод

        2 1
        -1 1

            

        1

*/

// const fs = require('fs');

// const content = fs.readFileSync(__dirname + '/input.txt', 'utf-8');

// const data = content.split('\n');
// data[0] = Number(data[0].split(' ')[1]);
// data[1] = data[1].split(' ').map((el) => Number(el));

// const res = getMaxPoitionsUsefulness(data);
// console.log(res);

// function getMaxPoitionsUsefulness(data) {
//     let [poitionCounter, ingredients] = data;
//     ingredients.sort((a, b) => b - a);
//     let poitionsUsefulness = 0;

//     let poitions = [ingredients];
//     for (let i = 0; i < ingredients.length - 1; i += 1) {
//         const currentIngredient = ingredients[i];
//         const poitionsForCurrentIngredient = [];
//         for (let j = i + 1; j < ingredients.length; j += 1) {
//             poitionsForCurrentIngredient.push(currentIngredient + ingredients[j]);
//         }
//         poitions.push(poitionsForCurrentIngredient);
//     }

//     while (poitionCounter > 0) {
//         const maxUsefulnesses = poitions.map((item) => item[0]);
//         const [maxUsefulness, maxUsefulnessIndex] = getMax(maxUsefulnesses);
//         poitionsUsefulness += maxUsefulness;
//         poitionCounter -= 1;
//         if (poitionCounter < 1) {
//             return poitionsUsefulness;
//         }
//         poitions = poitions.reduce((acc, item, idx) => {
//             if (idx !== maxUsefulnessIndex) {
//                 acc.push(item);
//             } else {
//                 if (item.length > 1) {
//                     acc.push(item.slice(1));
//                 }
//             }
//             return acc;
//         }, []);
//     }
// }

// function getMax(arr) {
//     let maxValue = arr[0];
//     let maxIndex = 0;
//     for (let i = 0; i < arr.length; i += 1) {
//         if (arr[i] > maxValue) {
//             maxValue = arr[i];
//             maxIndex = i;
//         }
//     }
//     return [maxValue, maxIndex];
// }

const testData = [
    [[ 5, [ -2, 3, -5, 5, 1 ] ], 26],
    [[ 1, [ -1, 1 ] ], 1],
    [[ 2, [ -1, 1 ] ], 1],
    [[ 3, [ -1, 1 ] ], 0],
];

testData.forEach(([input, res]) => {
    console.log('input: ', input, 'rr: ', res, 'fact: ', getMaxPoitionsUsefulness(input));
});

function getMaxPoitionsUsefulness(data) {
    const [poitionsNumber, ingredients] = data;
    ingredients.sort((a, b) => b - a);
    let poitionsUsefulness = 0;
    let minUsefulness = -1000000;
    let maxUsefulness = 1000000;
    
    while (minUsefulness < maxUsefulness) {
        const curUsefulness = Math.floor((minUsefulness + maxUsefulness) / 2);
        const [poitionCounter, totalUsefullness] = calcPoitionsData(curUsefulness, ingredients);
        poitionsUsefulness = totalUsefullness;
        // console.log(minUsefulness, maxUsefulness, curUsefulness);
        if (poitionCounter > poitionsNumber) {
            minUsefulness = curUsefulness + 1;
        } else {
            maxUsefulness = curUsefulness;
        }
        // console.log('poitionCounter: ', poitionCounter, 'poitionsUsefulness: ', poitionsUsefulness);
    }

    return poitionsUsefulness;   
}

function calcPoitionsData(usefulness, ingredients) {
    if (usefulness > ingredients[0]) {
        return [0, 0];
    }
    let poitionCounter = 1;
    let totalUsefullness = 0;
    let isUsefulnessOfPositionsFromSingleIngredientCounted = false;

    const summIngredientsUsefulness = [ingredients[0]];

    let strongestIngIndex = 0;
    let weakestIngIndex = 0;

    for (let i = 1; i < ingredients.length; i += 1) {
        // считаем префиксные суммы (текушее значение + предыдушая сумма)
        const ingUsefulness = ingredients[i];
        summIngredientsUsefulness.push(summIngredientsUsefulness[i - 1] + ingUsefulness);

        // находим количество и общую полезность зелий из одного ингредиента с полезностью не менее заданной
        if (ingUsefulness >= usefulness) {
            poitionCounter += 1;
        } else if (!isUsefulnessOfPositionsFromSingleIngredientCounted) {
            totalUsefullness += summIngredientsUsefulness[i - 1];
            isUsefulnessOfPositionsFromSingleIngredientCounted = true;
        }

        // находим индекс слабейшего ингредиента, который в сумме с первым(сильнейшим) дает требуемую полезность
        const usefulnessOfPoitionFromFirstAndCurrentIngredient = ingredients[0] + ingUsefulness;
        if (usefulnessOfPoitionFromFirstAndCurrentIngredient >= usefulness) {
            weakestIngIndex = i;
            // console.log("weakestIngIndex: ", weakestIngIndex);
        } else {
            break;
        }
    }

    // находим количество и общую полезность зелий из первого и слабее ингредиентов с полезностью не менее заданной
    // console.log(summIngredientsUsefulness);
    const secondIngrudientsAmount = weakestIngIndex - strongestIngIndex;
    poitionCounter += secondIngrudientsAmount;
    
    const summOfSecondIngredientsUsefulness = summIngredientsUsefulness[weakestIngIndex] - summIngredientsUsefulness[strongestIngIndex];
    totalUsefullness += ingredients[0] * secondIngrudientsAmount + summOfSecondIngredientsUsefulness;

    // подсчитываем количество и общую полезность зелий из двух ингредиентов
    while (strongestIngIndex < weakestIngIndex) {
        strongestIngIndex += 1;
        let l = strongestIngIndex;
        let r = weakestIngIndex - 1;
        while (l < r) {
            const curIndex = Math.floor((l + r + 1) / 2);
            if ((ingredients[strongestIngIndex] + ingredients[curIndex]) >= usefulness) {
                l = curIndex;
            } else {
                r = curIndex - 1;
            }
        }
        weakestIngIndex = l;
        const seconds = weakestIngIndex - strongestIngIndex;
        poitionCounter += seconds;
        const sumSecondsIUsefulness = summIngredientsUsefulness[weakestIngIndex] - summIngredientsUsefulness[strongestIngIndex];
        totalUsefullness += ingredients[strongestIngIndex] * seconds + sumSecondsIUsefulness;
    }

    return [poitionCounter, totalUsefullness];
}

// console.log(calcPoitionsData(4, [ 5, 3, 1, -2, -5]));
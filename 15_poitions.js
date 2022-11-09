/*      https://contest.yandex.ru/contest/40146/problems/E/

        
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

const fs = require('fs');

const content = fs.readFileSync(__dirname + '/input.txt', 'utf-8');

const data = content.split('\n');
data[0] = Number(data[0].split(' ')[1]);
data[1] = data[1].split(' ').map((el) => Number(el));

const res = getMaxPoitionsUsefulness(data);
console.log(res);

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

// const testData = [
//     [[ 5, [ -2, 3, -5, 5, 1 ] ], 26],
//     [[ 1, [ -1, 1 ] ], 1],
//     [[ 2, [ -1, 1 ] ], 1],
//     [[ 3, [ -1, 1 ] ], 0],
// ];

// testData.forEach(([input, res]) => {
//     console.log('input: ', input, 'rr: ', res, 'fact: ', getMaxPoitionsUsefulness(input));
// });



function getMaxPoitionsUsefulness(data) {
    let [poitionCounter, ingredients] = data;
    ingredients.sort((a, b) => b - a);
    let poitionsUsefulness = 0;

    const addPoition = (usefulness) => {
        poitionsUsefulness = poitionsUsefulness + usefulness;
        poitionCounter -= 1;
    }

    for (let i = 0; i < ingredients.length; i += 1) {
        const monoIngredientPoitionUsefulness = ingredients[i];
        for (let j = i + 1; j < ingredients.length; j += 1) {
            const dubleIngredientPoitionUsefulness = monoIngredientPoitionUsefulness + ingredients[j];
            if (dubleIngredientPoitionUsefulness >= monoIngredientPoitionUsefulness) {
                // break;
                addPoition(dubleIngredientPoitionUsefulness);
            }
            if (poitionCounter < 1) {
                return poitionsUsefulness;
            }
        }
        addPoition(monoIngredientPoitionUsefulness);
        if (poitionCounter < 1) {
            return poitionsUsefulness;
        }
    }
}
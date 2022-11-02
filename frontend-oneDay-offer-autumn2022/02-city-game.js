// https://new.contest.yandex.ru/41299/problem?id=6805586/2022_10_13/jLdi3jTr85

/*        
        Игра в города (40 баллов) [cloned]
        Не решена

        Рик и Морти играли в города. Герои запомнили названия всех городов, но забыли в каком порядке они следовали. Нужна ваша помощь!

        Напишите программу, которая восстановит порядок следования городов в игре.
        Формат ввода

        На вход подаётся массив cities. Например:

        const cities = [
            'Геленджик',
            'Домодедово',
            'Казань',
            'Люберцы',
            'Нижний Новгород',
            'Орёл',
            'Санкт-Петербург',
        ];

        Формат вывода

        Ожидаемый результат:

        [
            'Санкт-Петербург',
            'Геленджик',
            'Казань',
            'Нижний Новгород',
            'Домодедово',
            'Орёл',
            'Люберцы',
        ]

        Примечание

            На вход всегда передаётся корректный массив городов, которые можно упорядочить единственным верным образом.
            Название последующего города начинается на ту букву, которой оканчивается название предыдущего города.
            Исключения составляют названия, оканчивающиеся на твёрдый и мягкий знаки. В таких случаях берётся предпоследняя буква.
            Решение нужно оформить следующим образом:

        module.exports = function (cities) {
            // ваше решение
        }

*/

function restoreCitiesLine(cities) {
    const citiesData = cities.reduce((acc, city) => {
        if (!acc[city[0]]) {
            acc[city[0]] = city;
        }
        acc[city[0]];
        return acc;
    }, {});

    const getCitiesLine = (item, acc) => {
        if (acc.length === cities.length) {
            return acc;
        }
        const lastLetter = item[item.length - 1] === 'ь' || item[item.length - 1] === 'ъ' ? item[item.length - 2] : item[item.length - 1];
        const nextCity = lastLetter ? citiesData[lastLetter.toUpperCase()] : lastLetter;
        if (!nextCity) {
            return acc;
        }
        return getCitiesLine(nextCity, [...acc, nextCity]);
    }
    
    for (const city of cities) {
        const citiesLine = getCitiesLine(city, [city]);
        if (citiesLine.length === cities.length) {
            return citiesLine;
        }     
    }
}

const cities = [
    'Геленджик',
    'Домодедово',
    'Казань',
    'Люберцы',
    'Нижний Новгород',
    'Орёл',
    'Санкт-Петербург',
];


const res = restoreCitiesLine(cities);

console.log(res); // 2

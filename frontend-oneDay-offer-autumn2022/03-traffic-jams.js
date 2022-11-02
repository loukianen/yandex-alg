// https://new.contest.yandex.ru/41299/problem?id=6588569/2022_10_13/I9idLUlO11

/*        
        Пробки на дороге (60 баллов) [cloned]
        Не решена

        Рик и Морти создали фирму по грузоперевозкам на Земле. Для работы водителями грузовиков они наняли Рики и Морти из других вселенных. Однако грузовикам сильно ограничили скорость и запретили им делать обгоны для безопасности людей, поскольку Рики и Морти из других вселенных не знаю земных правил. Из-за этих ограничений люди стали жаловаться, что грузовики начали собирать много пробок.

        Сколько пробок из грузовиков посчитает Наблюдатель на N-ом километре дороги, если известно на каком километре дороге находится каждый грузовик (position) и его скорость в км/час (speed).

        Дополнительно:

        Если один грузовик догонят другой, то он начинают двигаться со скоростью впереди идущего. Когда один грузовик догнал другой, то расстоянием между ними можно пренебречь и считать что они находятся на одном и том же километре. Если один грузовик догнал другой на 0 километре дороги, то можно считать что они образовали одну пробку. Пробка - это один грузовик, или группа грузовиков которые, которые двигаются с одинаковой скоростью без промежутков.

        Пример:

        Входные данные: {"target":100,"trucks":[{"position":0,"speed":4},{"position":2,"speed":2},{"position":4,"speed":1}]} Ответ: 1

        Объяснение: Грузовики, стартующие на позиции 0 (скорость 4) и 2 (скорость 2), становятся пробкой, встретившись друг с другом на позиции 4. Пробка движется со скоростью 2. Затем эта пробка (скорость 2) и грузовик, стартующий с позиции 4 (скорость 1), становятся пробкой, встречаясь друг с другом на позиции 6. Пробка движется со скоростью 1, пока не достигнет цели.
        Формат ввода

        На вход подается объект следующей структуры:

        {
        target: number,
        trucks: Array<{position: number, speed: number}>
        }

        Где:

        target - километр на котором стоит Наблюдатель trucks: Array<{position: number, speed: number}> - массив объектов с позицией грузовика и его скоростью
        Формат вывода

        Необходимо вернуть number - число пробок которые насчитает наблюдатель
        Примечание

        Исходный код нужно оформить следующим образом:

        module.exports = function (data) {  
            // ваше решение
        }

*/

function getTrafficJamCount(data) {
    const { target, trucks } = data;
    const tick = (truckData) => {
        console.log(truckData);
        const newTruckData = [];
        for (let i = truckData.length - 1; i >= 0; i -=1) {
            const speed = truckData[i].speed;
            const position = truckData[i].position + speed;
            if (position > target) {
                continue;
            }
            const previousPosition = newTruckData[0] ? newTruckData[0].position : target;
            if (position < previousPosition) {
                newTruckData.unshift({position, speed});
            }
        }
        return newTruckData;
    }
    let curTrackData = trucks;
    for (let j = 1; j <= target; j += 1) {
        curTrackData = tick(curTrackData);
        if (curTrackData.length <= 1) {
            break;
        }
    }
    const res = curTrackData.filter(({position}) => position <= target);
    return res.length;
}

const inputData = {"target":100,"trucks":[{"position":0,"speed":4},{"position":2,"speed":2},{"position":4,"speed":1}]};
// Ответ: 1

const res = getTrafficJamCount(inputData);

console.log(res);

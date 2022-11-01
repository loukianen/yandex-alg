// https://contest.yandex.ru/contest/40294/problems/D/

/*       
        D. 2048
        Ограничение времени 	1 секунда
        Ограничение памяти 	64.0 Мб
        Ввод 	стандартный ввод или input.js
        Вывод 	стандартный вывод или output.json

        Помните игру 2048?

        Давайте попробуем её написать!

        Правила простые: - у нас есть поле 4x4 в котором лежат цифры 2, 4, 8, 16 - у нас есть набор "свайпов" разных направлений U, D, R, L - при "свайпе" все циферки двигаются из своих клеток в нужно направлении - если они встречают такую же циферку, то склеиваются в их сумму, например [2, 2, 0, 0] L -> [4, 0, 0, 0] - если они встречают другую цифру, то цифра просто занимает соседнюю свободную клетку [4, 0, 2, 0] L -> [4, 2, 0, 0]
        Формат ввода

        const field = [
        [0, 2, 4, 8],
        [0, 0, 0, 0],
        [0, 2, 2, 8],
        [0, 2, 2, 2],
        ];

        const moves = "U U U";

        solution(field, moves);

        Формат вывода

        На выход надо вернуть после после всех "свайпов":

        Пример: [[0,4,8,16],[0,2,0,2],[0,0,0,0],[0,0,0,0]]

*/

function tick(field) {
    return field.map((row) => {
        for (let i = 1; i < row.length; i += 1) {
            if (row[i - 1] === 0) {
                row[i - 1] = row[i];
                row[i] = 0;
            }
            if (row[i - 1] === row[i]) {
                row[i - 1] = row[i] * 2;
                row[i] = 0;
            }
        }
        return row;
    });
}

function rotateContrClock90(matrix) {
    const matrixSize = matrix.length;
    const res = matrix.map((el) => [...el]);
    for (let y = 0; y < matrixSize; y += 1) {
        for (let x = matrixSize - 1; x >= 0; x -= 1) {
            res[matrixSize - 1 - x][y] = matrix[y][x];
        }
    };
    return res;
}

function rotateToClock90(matrix) {
    const matrixSize = matrix.length;
    const res = matrix.map((el) => [...el]);
    for (let y = matrixSize - 1; y >= 0; y -= 1) {
        for (let x = matrixSize - 1; x >= 0; x -= 1) {
            res[x][matrixSize - 1 - y] = matrix[y][x];
        }
    };
    return res;
}

function solution(field, moves) {
    let currentField = field;
    const movesParts = moves.split(' ');
    const moviesMapping = {
        L: () => tick(currentField),
        R: () => {
            currentField.forEach((row) => row.reverse());
            tick(currentField);
            currentField.forEach((row) => row.reverse());
        },
        U: () => {
            currentField = rotateContrClock90(currentField);
            tick(currentField);
            currentField = rotateToClock90(currentField);
        },
        D: () => {
            currentField = rotateToClock90(currentField);
            tick(currentField);
            currentField = rotateContrClock90(currentField);
        },
    };
    movesParts.forEach((move) => {
        moviesMapping[move]();
    });
    return currentField;
}


const field = [
    [0, 2, 4, 8],
    [0, 0, 0, 0],
    [0, 2, 2, 8],
    [0, 2, 2, 2],
    ];

    const moves = "U U U";

    console.log(solution(field, moves));

   
   // Пример: [[0,4,8,16],[0,2,0,2],[0,0,0,0],[0,0,0,0]]

// https://contest.yandex.ru/contest/40294/problems/E/

/*        
        
        E. npm install

        Вася устроился фронтенд-разработчиком в крупную IT компанию. В свой первый рабочий день он клонировал себе git репозиторий проекта и сразу же стал смотреть package.json. Будучи любителем всего нового, Вася сразу увидел, что некоторые пакеты в dependencies устарели. Недолго думая, он сразу поменял в файле их версии на самые последние и выполнил npm install. Какой ужас! консоль заполнили строки с описанием ошибок, ведь оказалось, что многие пакеты были связаны между собой через peerDependencies, а их свежие версии несовместимы.

        Помогите Васе обновить зависимости до самых свежих совместимых версий.

        Далее зависимости пакета обозначают peerDependencies.
        Условия

            Версии пакетов представляют собой натуральные числа
            Самые свежие зависимости — набор совместимых версий пакетов; такой, что любой другой набор совместимых версий имеет по крайней мере в одном из пакетов меньшую версию.
            Пакеты зависят от других пакетов, не допуская циклических зависимостей. Если некая версия пакета A — транзитивная зависимость некой версии пакета B, то никакая версия B не может являться транзитивной зависимостью никакой версии A.
            Зависимости возрастают монотонно. То есть при обновлении версии любого пакета его зависимости не могут понизить свои версии, только повысить либо не измениться.
            Список зависимостей у пакета постоянный, меняются только их версии
            Версии зависимостей каждого пакета фиксированы (нет диапазонов)
            Совместимые версии гарантированно существуют

        Формат входных данных

        ? - необязательные поля (могут отсутствовать в объекте)

        input types
        Формат выходных данных

        Объект с версиями пакетов.

        output types
        Шаблон решения


        function getLastCompatibleDependencies(data, packageA, packageB) {
        // ваше решение
        }

        exports.getLastCompatibleDependencies = getLastCompatibleDependencies;

        Примеры

        Красными стрелками показаны зависимости у совместимых версий, красным текстом выделены версии запрашиваемых пакетов (uikit и router).

        example

        Вход

        {
            react: {
                versions: [
                    { version: 18 },
                    { version: 17 },
                    { version: 16 },
                ],
            },
            router: {
                versions: [
                    {
                        version: 21,
                        dependencies: [{packageName: 'react', version: 18}]
                    },
                    {
                        version: 20,
                        dependencies: [{packageName: 'react', version: 18}]
                    },
                    {
                        version: 19,
                        dependencies: [{packageName: 'react', version: 17}]
                    },
                    {
                        version: 18,
                        dependencies: [{packageName: 'react', version: 17}]
                    },
                    {
                        version: 17,
                        dependencies: [{packageName: 'react', version: 16}]
                    },
                ]
            },
            uikit: {
                versions: [
                    {
                        version: 9,
                        dependencies: [
                            {packageName: 'router', version: 20},
                            {packageName: 'react', version: 17},
                        ]
                    },
                    {
                        version: 8,
                        dependencies: [
                            {packageName: 'router', version: 19},
                            {packageName: 'react', version: 17},
                        ]
                    },
                    {
                        version: 7,
                        dependencies: [
                            {packageName: 'router', version: 18},
                            {packageName: 'react', version: 17},
                        ]
                    },
                ]
            }
        }

        'uikit'

        'router'

        Выход

        {
            uikit: 8,
            router: 19,
        }

        Более сложный пример

        Здесь мы ищем свежие совместимые версии у lite-components и lite-design (14 и 2 соотвественно).

        example

        Заметьте, если мы будем рассматривать другую пару пакетов, то картина меняется: lite-design = 5 и css-helper = 41 дают самые свежие версии (если бы в package.json были бы только эти два пакета).

        example

*/


function getLastCompatibleDependencies(data, packageA, packageB) {
    const versionsA = getVersionNumbers(data[packageA]);
    const versionsB = getVersionNumbers(data[packageB]);
    const result = {};
    for (const versionA of versionsA) {
        for (const versionB of versionsB) {
            if (compairVersions(versionA, versionB)) {
                result[packageA] = versionA;
                result[packageB] = versionB;
                return result;
            }
        }
    }
    
    function compairVersions(versionA, versionB) {
        const dependenciesA = getDependencies(data, packageA, versionA);
        const dependenciesB = getDependencies(data, packageB, versionB);
        const isACompatibleWithB = Object.keys(dependenciesA).every((depName) => {
            if (depName === packageB && dependenciesA[depName] !== versionB) {
                return false;
            }
            if (!dependenciesB[depName]) {
                return true;
            }
            return dependenciesA[depName] === dependenciesB[depName];
        });
        const isBCompatibleWithA = Object.keys(dependenciesB).every((depName) => {
            if (depName === packageA && dependenciesA[depName] !== versionA) {
                return false;
            }
            if (!dependenciesA[depName]) {
                return true;
            }
            return dependenciesB[depName] === dependenciesA[depName];
        });
        return isACompatibleWithB && isBCompatibleWithA;
    }
}

function getVersionNumbers(package) {
    return package.versions.map(({version}) => version).sort().reverse();
}

function getDependencies(data, package, version) {
    return data[package].versions.reduce((acc, item) => {
        if (item.version === version && item.dependencies) {
            item.dependencies.forEach((dep) => {
                const depDependensies = getDependencies(data, dep.packageName, dep.version);
                acc = {...acc, [dep.packageName]: dep.version, ...depDependensies};
            });
        }
        return acc;
    }, {});
}


exports.getLastCompatibleDependencies = getLastCompatibleDependencies;



const res = getLastCompatibleDependencies(
    {
        react: {
            versions: [
                { version: 18 },
                { version: 17 },
                { version: 16 },
            ],
        },
        router: {
            versions: [
                {
                    version: 21,
                    dependencies: [{ packageName: 'react', version: 18 }]
                },
                {
                    version: 20,
                    dependencies: [{ packageName: 'react', version: 18 }]
                },
                {
                    version: 19,
                    dependencies: [{ packageName: 'react', version: 17 }]
                },
                {
                    version: 18,
                    dependencies: [{ packageName: 'react', version: 17 }]
                },
                {
                    version: 17,
                    dependencies: [{ packageName: 'react', version: 16 }]
                },
            ]
        },
        uikit: {
            versions: [
                {
                    version: 9,
                    dependencies: [
                        { packageName: 'router', version: 20 },
                        { packageName: 'react', version: 17 },
                    ]
                },
                {
                    version: 8,
                    dependencies: [
                        { packageName: 'router', version: 19 },
                        { packageName: 'react', version: 17 },
                    ]
                },
                {
                    version: 7,
                    dependencies: [
                        { packageName: 'router', version: 18 },
                        { packageName: 'react', version: 17 },
                    ]
                },
            ]
        }
    },
    'uikit',
    'router',
);
console.log(res);
// {
//     uikit: 8,
//     router: 19,
// }

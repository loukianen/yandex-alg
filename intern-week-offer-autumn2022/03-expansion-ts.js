// https://contest.yandex.ru/contest/40294/problems/C/

/*        
        C. Расширение транспортной системы
        Ограничение времени 	1 секунда
        Ограничение памяти 	64.0 Мб
        Ввод 	input.json
        Вывод 	output.txt

        В светлом космическом будущем люди колонизировали Луну и имеют возможность создавать работающие маршруты отправки посылок как на Землю, так и на Луну. Это выражено в виде двух классов EarthRoute и MoonRoute:

        class EarthRoute {
            static vault = []
            transfer(parcel) {
            parcel.destination = 'Earth'
            EarthRoute.vault.push(parcel)
            }
        }

        class MoonRoute {
            static warehouse = []
            transfer(parcel) {
            parcel.destination = 'Moon'
            MoonRoute.warehouse.push(parcel)
            }
        }

        Из каждого из этих классов можно создавать отдельные маршруты и отправлять любой JavaScript-объект в виде посылки. Каждому такому объекту будет прописываться поле destination, соответствующее используемому маршруту. И каждый из этих объектов попадёт в хранилище посылок, специфичное для места назначения.

        Человечество готовится к дальнейшей экспансии в космос и уже построен соответствующий корабль — «Mothership». За некоторое время до вылета, нужно начать дублировать все посылки, идущие на Землю и на Луну, ещё и на корабль «Mothership».

        Напишите функцию extendTransportSystem(EarthRoute, MoonRoute), которая будет:

            принимать оба класса существующих транспортных маршрутов (EarthRoute и MoonRoute) и сможет менять их
            возвращать массив, в который будут попадать такие же посылки, каждый раз, когда кто-то посылает что-то по любому из маршрутов (с помощью метода transfer)

        Единственное отличие посылок на «Mothership» должно состоять в том, что у них поле destination должно быть равным 'Mothership', а изначальное значение destination должно попасть в поле origin. Все остальные поля посылки должны быть такими же.

        В тестах функция extendTransportSystem(EarthRoute, MoonRoute) будет вызвана перед отправками посылок, а содержимое возвращаемого ей массива будет проверено после всех отправок.

        Упрощённый пример теста:

        const mothershipStorage = extendTransportSystem(EarthRoute, MoonRoute)

        const earthRoute1 = new EarthRoute()
        const moonRoute2 = new MoonRoute()

        earthRoute1.transfer({ content: 123 })
        moonRoute2.transfer({ text: 'abc' })

        console.log(mothershipStorage)
        [
           { content: 123, origin: 'Earth', destination: 'Mothership' },
           { text: 'abc', origin: 'Moon', destination: 'Mothership' }
        ]
        

        console.log(EarthRoute.vault)
        [
          { content: 123, destination: 'Earth' }
        ]
        

        console.log(MoonRoute.warehouse)
         [
           { text: 'abc', destination: 'Moon' }
         ]
        

        Примечания

        Решение должно представлять из себя валидный JavaScript с определением функции extendTransportSystem на верхнем уровне.
*/

class EarthRoute {
  static vault = []
  transfer(parcel) {
    parcel.destination = 'Earth'
    EarthRoute.vault.push(parcel)
  }
}

class MoonRoute {
  static warehouse = []
  transfer(parcel) {
    parcel.destination = 'Moon'
    MoonRoute.warehouse.push(parcel)
  }
}

function extendTransportSystem(classEarthRoute, classMoonRoute) {
  const storage = [];
  classEarthRoute.prototype.transfer = function (parcel) {
    storage.push({...parcel, origin: 'Earth', destination: 'Mothership'});
    parcel.destination = 'Moon';
    EarthRoute.vault.push(parcel);
  };
  classMoonRoute.prototype.transfer = function (parcel) {
    storage.push({...parcel, origin: 'Moon', destination: 'Mothership'});
    parcel.destination = 'Moon';
    MoonRoute.warehouse.push(parcel);
  };
  return storage;
}


const mothershipStorage = extendTransportSystem(EarthRoute, MoonRoute);

const earthRoute1 = new EarthRoute();
const moonRoute2 = new MoonRoute();
const earthRoute11 = new EarthRoute();
const moonRoute22 = new MoonRoute();

earthRoute1.transfer({ content: 123 });
moonRoute2.transfer({ text: 'abc' });
earthRoute1.transfer({ tent: {type: 'large'} });
moonRoute2.transfer({ isAnimal: true });
earthRoute11.transfer({ tent: {type: 'small'} });
moonRoute22.transfer({ isAnimal: false });

// mothershipStorage.push({h: 'h'});

console.log('mothershipStorage :', mothershipStorage);
// mothershipStorage
// [
//     { content: 123, origin: 'Earth', destination: 'Mothership' },
//     { text: 'abc', origin: 'Moon', destination: 'Mothership' }
// ]


console.log('EarthRoute.vault :', EarthRoute.vault);
// EarthRoute.vault
// [
//     { content: 123, destination: 'Earth' }
// ]


console.log('MoonRoute.warehouse', MoonRoute.warehouse);
// MoonRoute.warehouse
// [
//     { text: 'abc', destination: 'Moon' }
// ]

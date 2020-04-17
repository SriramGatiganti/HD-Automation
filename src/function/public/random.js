const random = require('random-js')();

const prefix = 'x8EEn';

const number = (digits = 4) => String(random.integer(Math.pow(10, digits - 1), Math.pow(10, digits) - 1));

// Only generate times which can be entered via keyboard with the time picker used on the page.
const time = () => `${random.integer(11, 14)}:00`;

const string = (length = 4) => `${prefix}${random.string(length)}`;

const email = () => `${string(5)}@mail.com`;

const country = () => random.pick(['Deutschland']);
//--'Italia', 'Türkiye', 'China', 'Polska', 'España','Österreich' - For phone number verification reason

function city(user_country) {
  let cities = [{
      c: 'germany',
      value: ['Hamburg', 'Düsseldorf', 'Munic']
    },
    {
      c: 'italy',
      value: ['Rome', 'Milan', 'Naples']
    },
    {
      c: 'austria',
      value: ['Vienna', 'Graz', 'Linz']
    },
    {
      c: 'belgium',
      value: ['Aalst', 'Aarschot', 'Andenne']
    },
    {
      c: 'croatia',
      value: ['Zagreb', 'Rijeka', 'Velika Gorica']
    },
    {
      c: 'czech republic',
      value: ['Prague', 'Brno', 'Ostrava']
    },
    {
      c: 'france',
      value: ['Paris', 'Marseille', 'Lyon']
    },
    {
      c: 'hungary',
      value: ['Budapest', 'Szeged', 'Debrecen']
    },
    {
      c: 'portugal',
      value: ['Abrantes', 'Alcobaça', 'Braga']
    },
    {
      c: 'russia',
      value: ['Ачинск', 'Билибино', 'Демидов']
    },
    {
      c: 'poland',
      value: ['Kraków', 'Łódź', 'Gdańsk']
    },
    {
      c: 'spain',
      value: ['Madrid', 'Barcelona', 'Zaragoza']
    },
    {
      c: 'turkey',
      value: ['Istanbul', 'Adana', 'Şanlıurfa']
    },
    {
      c: 'ukraine',
      value: ['Київ', 'Харків', 'Одеса']
    },
    {
      c: 'netherlands',
      value: ['Amsterdam', 'Rotterdam', 'Leiden']
    },
    {
      c: 'romania',
      value: ['Bucharest', 'Cluj-Napoca', 'Timișoara']
    }
  ];
  return random.pick(cities.find(function(ele) {
    return ele.c === user_country;
  }).value);
};

const rus_city = () => random.pick(['Москва', 'Санкт-Петербург', 'Новосибирск', 'Нижний Новгород']);

const url = () => `https://${string()}.com`;

const bool = () => random.bool();

const pick = (set) => random.pick(set);

module.exports = {
  number,
  time,
  string,
  email,
  country,
  city,
  rus_city,
  url,
  bool,
  pick
};

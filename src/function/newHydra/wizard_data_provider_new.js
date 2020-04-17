const random = require('../public/random');
const prefix = 'x8EEn aut';
let rightNow = new Date();
let cur_time = rightNow.toISOString().replace(/-|T|:|\.|Z/g, "")
let path = require('path');
let t_path = path.join(__dirname, '..', 'data', 'Testing_Data.csv');
let t_d_path = path.join(__dirname, '..', 'data', 'SETUP.txt');
let fs = require("fs");
let endOfLine = require('os').EOL;
let addressfile = fs.readFileSync('address.json', 'utf8');
let address = JSON.parse(addressfile);

//let t_path = "../data/Testing_Data.csv";
function filter_2(a, b, c) {
  return a.find(function(element) {
    return element.split(';')[1] == b && element.split(';')[2] == c;
  }).split(';')[3];
}

function filter_3(a, b, c, d) {
  return a.find(function(element) {
    return element.split(';')[1] == b && element.split(';')[2] == c && element.split(';')[3] == d;
  }).split(';')[4];
}

function random_pick(a) {
  return a[Math.floor(Math.random() * a.length)]
}

function pick_countries(p) {
  const countries = ['Germany'];
  const codes = ['XX'];
  const dish_countries = ['Germany', 'Italy', 'France', 'Croatia', 'Austria', 'Belgium', 'Czech Republic', 'Hungary', 'Portugal', 'Turkey', 'Ukraine', 'Poland', 'Spain', 'Netherlands', 'Romania'];
  const dish_codes = ['DE', 'IT', 'FR', 'HR', 'AT', 'BE', 'CZ', 'HU', 'PT', 'TR', 'UA', 'PL', 'ES', 'NL', 'RO'];
  if (p) {
    if (p == 'DISH') {
      return random_pick(dish_countries);
    };
    if (p == 'RU') {
      return 'Russia';
    };
    if (codes.indexOf(p) > -1) {
      return countries[codes.indexOf(p)];
    } else {
      if (dish_codes.indexOf(p) > -1) {
        return dish_countries[dish_codes.indexOf(p)];
      } else {
        return random_pick(countries);
      }
    }
  } else {
    return random_pick(countries);
  }
}

function getCountryCode(country) {
  const dish_countries = ['Germany', 'Italy', 'France', 'Croatia', 'Austria', 'Belgium', 'Czech Republic', 'Hungary', 'Portugal', 'Spain', 'Turkey', 'Ukraine', 'Poland', 'Netherlands', 'Romania'];
  const dish_codes = ['DE', 'IT', 'FR', 'HR', 'AT', 'BE', 'CZ', 'HU', 'PT', 'ES', 'TR', 'UA', 'PL', 'NL', 'RO'];
  return dish_codes[dish_countries.indexOf(country)];
}

function getLanguage(lang) {
  const dish_lang = ['de', 'it', 'fr', 'hr', 'de', 'nl', 'cs', 'hu', 'pt', 'es', 'tr', 'uk', 'pl', 'nl', 'ro'];
  if (lang == 'random') {
    return random_pick(dish_lang);
  } else {
    return lang;
  }
}
/* Data Types For Sales Flow
Category	1
Types	2
Contact Number and Address	3
Payment Method	4
Facility	5
Imprint Field	6
Domain	7
*/
const country = pick_countries(process.profile.split(':')[3]);
let countryCode = getCountryCode(country);
//country = 'Austria';
let category;
let type = "";
let contact;
let payment;
let facility;
let imprint_fields = "";
let domain;
let v;
let contents = fs.readFileSync(t_path, 'utf8');
let arr = contents.split(endOfLine);

function main() {
  console.log(country);
  let c_l = country.toLowerCase();
  if (c_l == 'czech republic') {
    c_l = 'czechRepublic';
  };
  //Get Data
  //Category
  v = filter_2(arr, '1', c_l).split(',');
  category = random_pick(v);
  //category = 'cookingSchool';
  console.log(category);
  //Type
  v = filter_3(arr, '2', c_l, category).split(',');
  type = random_pick(v);
  console.log(type);
  //Contact
  contact = filter_2(arr, '3', c_l).split(',');
  //Special for Germany
  if (country == 'Germany') {
    const rrag = require('real-random-address');
    rrag.de()
  }
  console.log(contact);
  //Payment
  v = filter_2(arr, '4', c_l).split(',');
  payment = random_pick(v);
  console.log(payment);
  //Facility
  v = filter_3(arr, '5', c_l, category).split(',');
  facility = random_pick(v);
  console.log(facility);
  //Imprint
  if (country != 'Russia') {
    imprint_fields = filter_2(arr, '6', c_l);
    console.log(imprint_fields);
  }
  //domain
  v = filter_2(arr, '7', c_l).split(',');
  //domain = random_pick(v).replace([A-Z],);
  domain = random_pick(v).replace(/[A-Z]/g, function(match) {
    return '.' + match.toLowerCase();
  });
  console.log(domain);

  let wizardForNewUser = {
    country: country,
    countryCode: countryCode,
    salesId: prefix + cur_time.substring(2),
    business: {
      value: prefix + ' ' + random.string(4).slice(5) + ' ' + cur_time.slice(cur_time.length - 3)
    },
    contact: {
      businessName: prefix + ' ' + random.string(4).slice(5) + ' ' + cur_time.slice(cur_time.length - 3),
      dialCode: contact[1],
      phone: contact[0],
      email: 'testreser0@gmail.com',
      country: country,
      city: contact[2],
      streetName: contact[3],
      streetNumber: contact[4],
      postalCode: contact[5],
      websiteTitle: prefix,
      websiteDescription: 'Life is too short to have bad BBQ'
    },
    company: {
      businessName: prefix + ' ' + cur_time.substring(2) + '_cmp',
      dialCode: contact[1],
      phone: contact[0],
      email: 'testreser0+cmp@gmail.com',
      country: country,
      city: contact[2],
      streetName: contact[3] + '_cmp',
      streetNumber: contact[4] + '0',
      postalCode: contact[5] + '0',
    },
    category: category,
    type: type,
    facility: facility,
    payment: payment,
    createUser: true,
    user: {
      username: "test.reser0+aut" + cur_time.substring(2) + "@gmail.com",
      password: 'Test1234!',
      maxwaittime: 30,
      salutation: 'Mr.',
      firstName: 'x8EEn' + cur_time.substring(2),
      lastName: 'HD*' + cur_time.substring(2), //'Test' + cur_time.substring(2),
      phone: "+722222222222"
    },
    registration: {
      username: "test.reser0+aut" + cur_time.substring(2) + "@gmail.com",
      password: "Test1234!"
    },
    imprint: imprint_fields,
    subdomain: prefix.replace(' ', '') + cur_time.substring(2),
    domain: domain,
    r_time: cur_time.substring(2),
    toString: () => {
      return "Creating new user account";
    }
  };
  return wizardForNewUser;
};

let env = process.profile.split(':')[0];
let lang = process.profile.split(':')[4];
let language;
if (lang) {
  language = getLanguage(lang);
} else {
  language = 'en'
}
let url;
let res_url;
let wizard;

switch (env) {
  case 'acc':
    d_url = 'https://dish-acc:hd-digital-dish@www.acc.dish.co/'
    url = 'https://website.acc.dish.co/';
    res_url = 'https://reservation.acc.dish.co/';
    break;
  case 'prd':
    d_url = 'https://www.dish.co/';
    url = 'https://website.dish.co/';
    res_url = 'https://reservation.dish.co/';
    break;
  case 'dev':
    d_url = 'https://dish-dev:hd-digital-dish@www.dev.dish.co/'
    url = 'https://website.dev.dish.co/';
    res_url = 'https://reservation.dev.dish.co/';
    break;
  case 'stg':
    d_url = 'https://dish-stg:hd-digital-dish@www.stg.dish.co/'
    url = 'https://website.stg.dish.co/';
    res_url = 'https://reservation.stg.dish.co/';
    break;
};


wizard = main();

if (env != 'prd') {
  wizard.domain = env + '.' + wizard.domain;
}

if (country == 'Germany') {
  wizard.contact.city = address.city;
  wizard.contact.streetName = address.street;
  wizard.contact.streetNumber = address.number;
  wizard.contact.postalCode = address.zip;
}

module.exports = {
  wizard,
  url,
  res_url,
  env,
  d_url,
  language
};

// Cockpit data provider reads the csv file provided by the pos-ms script and return a JSON object with all the data regarding the different revenues
function convertNumberToOutputString(inputString) {

  let localeString = 'de-DE';
  let inputNumber = parseFloat(inputString);
  if (inputNumber === 0)
    return 0;
  if (Number.isInteger(inputNumber))
    return inputNumber.toLocaleString(localeString);
  return (Math.floor(inputNumber)+1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");    //toLocaleString(localeString);

}

function mapMyRow(myRow = []) {
  myDate = {};
  if (myRow != []) {
    myDate = {
      previousDayTotalMoney: parseFloat(myRow[2]),
      currentWeekTotalMoney: parseFloat(myRow[3]),
      currentMonthTotalMoney: parseFloat(myRow[4]),
      currentYearTotalMoney: parseFloat(myRow[5]),
      previousDayNetMoney: parseFloat(myRow[6]),
      currentMonthnetMoney: parseFloat(myRow[7]),
      currentYearNetMoney: parseFloat(myRow[8]),
      customDateSelectionTotalMoney: parseFloat(myRow[9]),
      customDaySelectionStart: parseFloat(myRow[10]),
      customDaySelectionEnd: parseFloat(myRow[11])
    };
    return myDate;
  }
}

function daysIntoYear(date){
    return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
}

const beverages = ['Radler', 'Pils', 'Evian'];
let rightNow = new Date();
let cur_time = rightNow.toISOString().replace(/-|T|:|\.|Z/g, "")
let path = require('path');
let t_path = path.join(__dirname, '..', 'data', 'cockpitdata.csv');
let fs = require("fs");
let endOfLine = require('os').EOL;
let contents = fs.readFileSync(t_path, 'utf8');
let arr = contents.split(endOfLine);
let firstRow = arr[1].split(",");
let loginUserName= firstRow[1];


let revenues = mapMyRow(firstRow);

let servicesRevenuesObject = {
  currentWeek: [],
  currentMonth: [],
  currentYear: [],
  previousDay: [],
  currentWeek: []
};

let avgServicesRevenuesObject = {
  currentWeek: 0,
  currentMonth: 0,
  currentYear: 0,
  previousDay: 0,
  currentWeek: 0
};

let topSellerFood = {
  currentWeek: [],
  currentMonth: [],
  currentYear: [],
  previousDay: [],
  currentWeek: []
}

let topSellerBeverages = {
  currentWeek: [],
  currentMonth: [],
  currentYear: [],
  previousDay: [],
  currentWeek: []
}

let tablesRevenuesObject = {
  currentWeek: [],
  currentMonth: [],
  currentYear: [],
  previousDay: []
};

let avgTablesRevenuesObject = {
  currentWeek: 0,
  currentMonth: 0,
  currentYear: 0,
  previousDay: 0
};

let totalTableRotations = {
  currentWeek: 0,
  currentMonth: 0,
  currentYear: 0,
  previousDay: 0
};

let breakEvenValues = {
  currentWeek: 10000/7,
  currentMonth: 1000,
  currentYear: 12000,
  previousDay: 10000/30
};

let productsRevenuesObject = {
};

let foodRevenues = {};
let beveragesRevenues = {};
let tablesRevenue = {};
let productsRevenue = {};
let weeklyServiceRevenues = [];
let monthlyServiceRevenues = [];
let yearlyServiceRevenues = [];
let dayServiceRevenues = [];
let topSellerWeeklyFoodRevenues = [];
let topSellerMonthlyFoodRevenues = [];
let topSellerYearlyFoodRevenues = [];
let topSellerDayFoodRevenues = [];
let topSellerWeeklyBevRevenues = [];
let topSellerMonthlyBevRevenues = [];
let topSellerYearlyBevRevenues = [];
let topSellerDayBevRevenues = [];
let weeklyTableRevenues = [];
let monthlyTableRevenues = [];
let yearlyTableRevenues = [];
let dayTableRevenues = [];

let totalDayRev = 0.0;
arr.forEach((item, i) => {
  let currentRow = item.split(",");

  if (currentRow[0] === 'service') {
      weeklyServiceRevenues.push({ 'name': currentRow[1] ,
                                  'total': currentRow[3] });
      monthlyServiceRevenues.push({ 'name': currentRow[1] ,
                    'total': currentRow[4] });
      yearlyServiceRevenues.push({ 'name': currentRow[1] ,
                    'total': currentRow[5] });
      dayServiceRevenues.push({ 'name': currentRow[1] ,
                    'total': currentRow[2] });
  }
  if (currentRow[1] === 'Food') {
      foodRevenues = mapMyRow(currentRow);
  }
  if (currentRow[1] === 'Beverages') {
      beveragesRevenues = mapMyRow(currentRow);
  }
  if (currentRow[0] === 'table') {

      weeklyTableRevenues.push({ 'name': currentRow[1] ,
                    'total': currentRow[3] });
      monthlyTableRevenues.push({ 'name': currentRow[1] ,
                    'total': currentRow[4] });
      yearlyTableRevenues.push({ 'name': currentRow[1] ,
                    'total': currentRow[5] });
      dayTableRevenues.push({ 'name': currentRow[1] ,
                    'total': currentRow[2] });
      totalTableRotations.previousDay += parseInt(currentRow[6]);
      totalTableRotations.currentWeek += parseInt(currentRow[7]);
      totalTableRotations.currentMonth += parseInt(currentRow[8]);
      totalTableRotations.currentYear += parseInt(currentRow[9]);
  }
  if (currentRow[0] === 'product') {  // Building the top seller array

    let newEl = { 'name': currentRow[1] ,
                  'total': currentRow[3] };
    totalDayRev = totalDayRev + parseFloat(currentRow[3]);
    if (beverages.indexOf(newEl.name) > -1) {
      topSellerWeeklyBevRevenues.push({ 'name': currentRow[1] ,
                    'total': currentRow[3] });
    } else {
      topSellerWeeklyFoodRevenues.push({ 'name': currentRow[1] ,
                    'total': currentRow[3] });
    }
    if (beverages.indexOf(newEl.name) > -1) {
      topSellerMonthlyBevRevenues.push({ 'name': currentRow[1] ,
                    'total': currentRow[4] });
    } else {
      topSellerMonthlyFoodRevenues.push({ 'name': currentRow[1] ,
                    'total': currentRow[4] });
    }
    //newEl.total = currentRow[4];
    if (beverages.indexOf(newEl.name) > -1) {
      topSellerYearlyBevRevenues.push({ 'name': currentRow[1] ,
                    'total': currentRow[5] });
    } else {
      topSellerYearlyFoodRevenues.push({ 'name': currentRow[1] ,
                    'total': currentRow[5] });
    }
    //newEl.total = currentRow[2];
    if (beverages.indexOf(newEl.name) > -1) {
      topSellerDayBevRevenues.push({ 'name': currentRow[1] ,
                    'total': currentRow[2] });
    } else {
      topSellerDayFoodRevenues.push({ 'name': currentRow[1] ,
                    'total': currentRow[2] });
    }
  }
});

// Sorting the array containing service revenues in descending order
weeklyServiceRevenues.sort( ((a, b) =>
    parseFloat(b.total) - parseFloat(a.total))
);
monthlyServiceRevenues.sort( ((a, b) =>
    parseFloat(b.total) - parseFloat(a.total))
);
yearlyServiceRevenues.sort( ((a, b) =>
    parseFloat(b.total) - parseFloat(a.total))
);
dayServiceRevenues.sort( ((a, b) =>
    parseFloat(b.total) - parseFloat(a.total))
);
weeklyTableRevenues.sort( ((a, b) =>
    parseFloat(b.total) - parseFloat(a.total))
);
monthlyTableRevenues.sort( ((a, b) =>
    parseFloat(b.total) - parseFloat(a.total))
);
yearlyTableRevenues.sort( ((a, b) =>
    parseFloat(b.total) - parseFloat(a.total))
);
dayTableRevenues.sort( ((a, b) =>
    parseFloat(b.total) - parseFloat(a.total))
);
topSellerWeeklyBevRevenues.sort( ((a, b) =>
    parseFloat(b.total) - parseFloat(a.total))
);
topSellerYearlyBevRevenues.sort( ((a, b) =>
    parseFloat(b.total) - parseFloat(a.total))
);
topSellerMonthlyBevRevenues.sort( ((a, b) =>
    parseFloat(b.total) - parseFloat(a.total))
);
topSellerDayBevRevenues.sort( ((a, b) =>
    parseFloat(b.total) - parseFloat(a.total))
);
topSellerWeeklyFoodRevenues.sort( ((a, b) =>
    parseFloat(b.total) - parseFloat(a.total))
);
topSellerYearlyFoodRevenues.sort( ((a, b) =>
    parseFloat(b.total) - parseFloat(a.total))
);
topSellerMonthlyFoodRevenues.sort( ((a, b) =>
    parseFloat(b.total) - parseFloat(a.total))
);
topSellerDayFoodRevenues.sort( ((a, b) =>
    parseFloat(b.total) - parseFloat(a.total))
);


date = new Date();
servicesRevenuesObject.currentWeek = weeklyServiceRevenues;
servicesRevenuesObject.currentMonth = monthlyServiceRevenues;
servicesRevenuesObject.currentYear = yearlyServiceRevenues;
servicesRevenuesObject.previousDay = dayServiceRevenues;
//avgServicesRevenuesObject.currentWeek = Math.floor(parseFloat(revenues.currentWeekTotalMoney)/3/(date.getDay())) + 1;
avgServicesRevenuesObject.currentWeek = convertNumberToOutputString(revenues.currentWeekTotalMoney/3/(date.getDay()));
console.log(revenues.currentWeekTotalMoney + "---" + avgServicesRevenuesObject.currentWeek);
avgServicesRevenuesObject.currentMonth = convertNumberToOutputString(revenues.currentMonthTotalMoney/3/(date.getDate()));
avgServicesRevenuesObject.currentYear = convertNumberToOutputString(revenues.currentYearTotalMoney/3/(daysIntoYear(date)));  // daysIntoYear
avgServicesRevenuesObject.previousDay = convertNumberToOutputString(revenues.previousDayTotalMoney/3);
//avgTablesRevenuesObject.currentWeek = Math.floor(parseFloat(revenues.currentWeekTotalMoney)/5/(date.getDay())) + 1;
avgTablesRevenuesObject.currentWeek = convertNumberToOutputString(revenues.currentWeekTotalMoney/5/(date.getDay()));
avgTablesRevenuesObject.currentMonth = convertNumberToOutputString(revenues.currentMonthTotalMoney/5/(date.getDate()));
avgTablesRevenuesObject.currentYear = convertNumberToOutputString(revenues.currentYearTotalMoney/5/(daysIntoYear(date)));  // daysIntoYear
avgTablesRevenuesObject.previousDay = convertNumberToOutputString(revenues.previousDayTotalMoney/5);
totalTableRotations.previousDay = convertNumberToOutputString(totalTableRotations.previousDay/5);
//totalTableRotations.currentWeek = Math.floor(parseInt(totalTableRotations.currentWeek)/5/(date.getDay())) + 1;  //parseInt(currentRow[6]);
totalTableRotations.currentWeek = convertNumberToOutputString(totalTableRotations.currentWeek/5/(date.getDay()));  //parseInt(currentRow[6]);
console.log("Got weekly avg "+totalTableRotations.currentWeek + " ### " + revenues.currentWeekTotalMoney/5/(date.getDay()));
totalTableRotations.currentMonth = convertNumberToOutputString(totalTableRotations.currentMonth/5/(date.getDate()));
totalTableRotations.currentYear = convertNumberToOutputString(totalTableRotations.currentYear/5/(daysIntoYear(date)));
tablesRevenuesObject.currentWeek = weeklyTableRevenues;
tablesRevenuesObject.currentMonth = monthlyTableRevenues;
tablesRevenuesObject.currentYear = yearlyTableRevenues;
tablesRevenuesObject.previousDay = dayTableRevenues;
topSellerFood.currentWeek = topSellerWeeklyFoodRevenues;
topSellerFood.currentMonth = topSellerMonthlyFoodRevenues;
topSellerFood.currentYear = topSellerYearlyFoodRevenues;
topSellerFood.previousDay = topSellerDayFoodRevenues;
topSellerBeverages.currentWeek = topSellerWeeklyBevRevenues;
topSellerBeverages.currentMonth = topSellerMonthlyBevRevenues;
topSellerBeverages.currentYear = topSellerYearlyBevRevenues;
topSellerBeverages.previousDay = topSellerDayBevRevenues;

// Once we get the data for the service revenue, we will create an array for the subtotals

for (var key in revenues) {
    if (revenues.hasOwnProperty(key)) {
        revenues[key] = convertNumberToOutputString(revenues[key]);
    }
}

for (var key in foodRevenues) {
    if (foodRevenues.hasOwnProperty(key)) {
        foodRevenues[key] = convertNumberToOutputString(foodRevenues[key]);
    }
}

for (var key in beveragesRevenues) {
    if (beveragesRevenues.hasOwnProperty(key)) {
        beveragesRevenues[key] = convertNumberToOutputString(beveragesRevenues[key]);
    }
}

let cockpit_user = {
  username: loginUserName, // 'testreser+cockpit1580401421@gmail.com', //testreser0@gmail.com
  password: 'Hallo123!',
  c_url: 'https://acc.cockpit.app.hd.digital/login',
  total_revenues: revenues,
  food_revenues: foodRevenues,
  beverages_revenue: beveragesRevenues,
  service_revenues: servicesRevenuesObject,
  avg_service_revenues: avgServicesRevenuesObject,
  table_revenues: tablesRevenuesObject,
  avg_tables_revenues: avgTablesRevenuesObject,
  topseller_food: topSellerFood,
  topseller_beverages: topSellerBeverages,
  product_revenues: productsRevenuesObject,
  table_revenues: tablesRevenuesObject,
  table_rotations: totalTableRotations,
  breakeven_values: breakEvenValues
}

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

module.exports = {
  cockpit_user
  //wizard,
  //url,
  //res_url,
  //env
};

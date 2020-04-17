const user = require('../../function/data/user').user;
const cockpit_user = require('../../function/cockpit/cockpit_data_provider');
const revenueWidget = require('./components/revenueWidget');
const breakevenWidget = require('./components/breakevenWidget');
const serviceWidget = require('./components/serviceWidget');
const tableWidget = require('./components/tableWidget');
const topSellerWidget = require('./components/topSellerWidget');
const dateFilter = require('./components/dateFilter');
const homePage = require('./components/homePage');
const overviewPage = require('./components/overviewPage');

function parseNumber(inputString) {

  let localeString = 'en';
  let inputNumber = parseFloat(inputString);
  if (inputNumber === 0)
    return 0;
  if (Number.isInteger(inputNumber))
    return inputNumber.toLocaleString(localeString);
  return (Math.floor(inputNumber)+1).toLocaleString(localeString);
}

Feature('Landing Page @cockpit_probe');
//Feature('Landing Page @debug');

Scenario('Breakeven component', (CockpitFunc, I) => {

  CockpitFunc.login(cockpit_user.cockpit_user);

  let currentWeekRevenue = cockpit_user.cockpit_user.total_revenues.currentWeekTotalMoney;     //(cockpit_user.cockpit_user.total_revenues.currentWeekTotalMoney == 0 ? 0 : Math.floor(cockpit_user.cockpit_user.total_revenues.currentWeekTotalMoney)+1).toLocaleString('de-DE');
  let currentWeekFoodRevenue = cockpit_user.cockpit_user.food_revenues.currentWeekTotalMoney; // (cockpit_user.cockpit_user.food_revenues.currentWeekTotalMoney == 0 ? 0 : Math.floor(cockpit_user.cockpit_user.food_revenues.currentWeekTotalMoney)+1).toLocaleString('de-DE');
  let currentWeekBeveragesRevenue = cockpit_user.cockpit_user.beverages_revenue.currentWeekTotalMoney;// (cockpit_user.cockpit_user.beverages_revenue.currentWeekTotalMoney == 0 ? 0 : Math.floor(cockpit_user.cockpit_user.beverages_revenue.currentWeekTotalMoney)+1).toLocaleString('de-DE');
  let currentMonthRevenue = cockpit_user.cockpit_user.total_revenues.currentMonthTotalMoney; // (Math.floor(cockpit_user.cockpit_user.total_revenues.currentMonthTotalMoney)+1).toLocaleString('de-DE');
  let currentMonthFoodRevenue = cockpit_user.cockpit_user.food_revenues.currentMonthTotalMoney; // (Math.floor(cockpit_user.cockpit_user.food_revenues.currentMonthTotalMoney)+1).toLocaleString('de-DE');
  let currentMonthBeveragesRevenue = cockpit_user.cockpit_user.beverages_revenue.currentMonthTotalMoney; //(Math.floor(cockpit_user.cockpit_user.beverages_revenue.currentMonthTotalMoney)+1).toLocaleString('de-DE');
  let currentYearRevenue = cockpit_user.cockpit_user.total_revenues.currentYearTotalMoney; // (Math.floor(cockpit_user.cockpit_user.total_revenues.currentYearTotalMoney)+1).toLocaleString('de-DE');
  let currentYearFoodRevenue = cockpit_user.cockpit_user.food_revenues.currentYearTotalMoney; // (Math.floor(cockpit_user.cockpit_user.food_revenues.currentYearTotalMoney)+1).toLocaleString('de-DE');
  let currentYearBeveragesRevenue = cockpit_user.cockpit_user.beverages_revenue.currentYearTotalMoney; // (Math.floor(cockpit_user.cockpit_user.beverages_revenue.currentYearTotalMoney)+1).toLocaleString('de-DE');
  let previousDayRevenue = cockpit_user.cockpit_user.total_revenues.previousDayTotalMoney; // (Math.floor(cockpit_user.cockpit_user.total_revenues.previousDayTotalMoney)+1).toLocaleString('de-DE');
  let previousDayFoodRevenue = cockpit_user.cockpit_user.food_revenues.previousDayTotalMoney; //(Math.floor(cockpit_user.cockpit_user.food_revenues.previousDayTotalMoney)+1).toLocaleString('de-DE');
  let previousDayBeveragesRevenue = cockpit_user.cockpit_user.beverages_revenue.previousDayTotalMoney; //(Math.floor(cockpit_user.cockpit_user.beverages_revenue.previousDayTotalMoney)+1).toLocaleString('de-DE');
  let selectedDayRangeRevenue = cockpit_user.cockpit_user.total_revenues.customDateSelectionTotalMoney; // (Math.floor(cockpit_user.cockpit_user.total_revenues.customDateSelectionTotalMoney)+1).toLocaleString('de-DE');
  let selectedDayFoodRevenue = cockpit_user.cockpit_user.food_revenues.customDateSelectionTotalMoney; //(Math.floor(cockpit_user.cockpit_user.food_revenues.customDateSelectionTotalMoney)+1).toLocaleString('de-DE');
  let selectedDayBeveragesRevenue = cockpit_user.cockpit_user.beverages_revenue.customDateSelectionTotalMoney; //(Math.floor(cockpit_user.cockpit_user.beverages_revenue.customDateSelectionTotalMoney)+1).toLocaleString('de-DE');

  // Check yearly tiles
  I.wait(5);
  I.see(currentYearRevenue, homePage.getYearlyRevenueTile);
  I.see(currentMonthRevenue, homePage.getMonthlyRevenueTile);
  I.see(currentWeekRevenue, homePage.getWeeklyRevenueTile);

  // Check Monthly Revenue
  I.see(currentMonthRevenue, revenueWidget.getTotalRevenue);
  I.see(currentMonthFoodRevenue, revenueWidget.getFoodTotalRevenue);
  I.see(currentMonthBeveragesRevenue, revenueWidget.getBeveragesTotalRevenue);

  /**
  let breakeven_value = cockpit_user.cockpit_user.breakeven_values.currentMonth;
  console.log('Got breakeven value '+ breakeven_value + ' and monthRevenue '+currentMonthRevenue);
  if (cockpit_user.cockpit_user.total_revenues.currentMonthTotalMoney < breakeven_value)
    I.see('Mache noch', breakevenWidget.getWidgetText);
  else
    I.see('Gewinn gemacht', breakevenWidget.getWidgetText);
    **/

  let avgRevenue = cockpit_user.cockpit_user.avg_service_revenues.currentMonth;
  if (avgRevenue != 0)
    I.see(avgRevenue, serviceWidget.getAvgRevenue);

  let avgRotation = cockpit_user.cockpit_user.table_rotations.currentMonth;
  if (avgRotation != 0)
    I.see(avgRotation, tableWidget.getAvgRotation);

  let avgTableRevenue = cockpit_user.cockpit_user.avg_tables_revenues.currentMonth;
  if (avgTableRevenue != 0)
    I.see(avgTableRevenue, tableWidget.getAvgRevenue);

  let foodItems = cockpit_user.cockpit_user.topseller_food.currentMonth;
  let beverageItems = cockpit_user.cockpit_user.topseller_beverages.currentMonth;

  I.see(foodItems[0].name, topSellerWidget.getFirstFoodItem);
  I.see(foodItems[1].name, topSellerWidget.getSecondFoodItem);
  I.see(foodItems[2].name, topSellerWidget.getThirdFoodItem);
  I.see(beverageItems[0].name, topSellerWidget.getFirstBeveragesItem);
  I.see(beverageItems[1].name, topSellerWidget.getSecondBeveragesItem);
  I.see(beverageItems[2].name, topSellerWidget.getThirdBeveragesItem);

  // Check yearly resolution data
  I.click(dateFilter.openDateFilter);
  I.wait(1);
  I.click(dateFilter.selectYearlyResolution);
  I.wait(5);
  I.see(currentYearRevenue, revenueWidget.getTotalRevenue);
  I.see(currentYearFoodRevenue, revenueWidget.getFoodTotalRevenue);
  I.see(currentYearBeveragesRevenue, revenueWidget.getBeveragesTotalRevenue);

  /**
  breakeven_value = cockpit_user.cockpit_user.breakeven_values.currentYear;
  if (cockpit_user.cockpit_user.total_revenues.currentYearTotalMoney < breakeven_value)
    I.see('Mache noch', breakevenWidget.getWidgetText);
  else
    I.see('Gewinn gemacht', breakevenWidget.getWidgetText);
    **/

  avgRevenue = cockpit_user.cockpit_user.avg_service_revenues.currentYear;
  if (avgRevenue != 0)
    I.see(avgRevenue, serviceWidget.getAvgRevenue);

  avgRotation = cockpit_user.cockpit_user.table_rotations.currentYear;
  if (avgRotation != 0)
    I.see(avgRotation, tableWidget.getAvgRotation);

  avgTableRevenue = cockpit_user.cockpit_user.avg_tables_revenues.currentYear;
  if (avgTableRevenue != 0)
    I.see(avgTableRevenue, tableWidget.getAvgRevenue);

  foodItems = cockpit_user.cockpit_user.topseller_food.currentYear;
  beverageItems = cockpit_user.cockpit_user.topseller_beverages.currentYear;

  I.see(foodItems[0].name, topSellerWidget.getFirstFoodItem);
  I.see(foodItems[1].name, topSellerWidget.getSecondFoodItem);
  I.see(foodItems[2].name, topSellerWidget.getThirdFoodItem);
  I.see(beverageItems[0].name, topSellerWidget.getFirstBeveragesItem);
  I.see(beverageItems[1].name, topSellerWidget.getSecondBeveragesItem);
  I.see(beverageItems[2].name, topSellerWidget.getThirdBeveragesItem);

  // Check weekly resoultion data
  I.click(dateFilter.selectWeeklyResolution);
  I.wait(5);
  I.see(currentWeekRevenue, revenueWidget.getTotalRevenue);
  I.see(currentWeekFoodRevenue, revenueWidget.getFoodTotalRevenue);
  I.see(currentWeekBeveragesRevenue, revenueWidget.getBeveragesTotalRevenue);

  /**
  breakeven_value = cockpit_user.cockpit_user.breakeven_values.currentWeek;
  if (cockpit_user.cockpit_user.total_revenues.currentWeekTotalMoney < breakeven_value)
    I.see('Mache noch', breakevenWidget.getWidgetText);
  else
    I.see('Gewinn gemacht', breakevenWidget.getWidgetText);
    **/

  avgRevenue = cockpit_user.cockpit_user.avg_service_revenues.currentWeek;
  if (avgRevenue != 0)
    I.see(avgRevenue, serviceWidget.getAvgRevenue);

  avgRotation = cockpit_user.cockpit_user.table_rotations.currentWeek;
  if (avgRotation != 0)
    I.see(avgRotation, tableWidget.getAvgRotation);

  avgTableRevenue = cockpit_user.cockpit_user.avg_tables_revenues.currentWeek;
  if (avgTableRevenue != 0)
    I.see(avgTableRevenue, tableWidget.getAvgRevenue);

  foodItems = cockpit_user.cockpit_user.topseller_food.currentWeek;
  beverageItems = cockpit_user.cockpit_user.topseller_beverages.currentWeek;
  if (foodItems[0].total != 0) {
    I.see(foodItems[0].name, topSellerWidget.getFirstFoodItem);
    I.see(foodItems[1].name, topSellerWidget.getSecondFoodItem);
    I.see(foodItems[2].name, topSellerWidget.getThirdFoodItem);
    I.see(beverageItems[0].name, topSellerWidget.getFirstBeveragesItem);
    I.see(beverageItems[1].name, topSellerWidget.getSecondBeveragesItem);
    I.see(beverageItems[2].name, topSellerWidget.getThirdBeveragesItem);
  }

  // Slide to previous day in order to check data for previous day
  I.click(dateFilter.selectDailyResolution);
  I.wait(1);
  I.click(dateFilter.slideToPreviousDay);
  I.wait(5);
  I.see(previousDayRevenue, revenueWidget.getTotalRevenue);
  I.see(previousDayFoodRevenue, revenueWidget.getFoodTotalRevenue);
  I.see(previousDayBeveragesRevenue, revenueWidget.getBeveragesTotalRevenue);

  /**
  breakeven_value = cockpit_user.cockpit_user.breakeven_values.previousDay;
  if (cockpit_user.cockpit_user.total_revenues.previousDayTotalMoney < breakeven_value)
    I.see('Mache noch', breakevenWidget.getWidgetText);
  else
    I.see('Gewinn gemacht', breakevenWidget.getWidgetText);
  **/

  avgRevenue = cockpit_user.cockpit_user.avg_service_revenues.previousDay;
  if (avgRevenue != 0)
    I.see(avgRevenue, serviceWidget.getAvgRevenue);

  avgRotation = cockpit_user.cockpit_user.table_rotations.previousDay;
  if (avgRotation != 0)
    I.see(avgRotation, tableWidget.getAvgRotation);

  avgTableRevenue = cockpit_user.cockpit_user.avg_tables_revenues.previousDay;
  if (avgTableRevenue != 0)
    I.see(avgTableRevenue, tableWidget.getAvgRevenue);

  foodItems = cockpit_user.cockpit_user.topseller_food.previousDay;
  beverageItems = cockpit_user.cockpit_user.topseller_beverages.previousDay;
  if (foodItems[0].total != 0)
    I.see(foodItems[0].name, topSellerWidget.getFirstFoodItem);
  if (foodItems[1].total != 0)
    I.see(foodItems[1].name, topSellerWidget.getSecondFoodItem);
  if (foodItems[2].total != 0)
    I.see(foodItems[2].name, topSellerWidget.getThirdFoodItem);
  if (beverageItems[0].total != 0)
    I.see(beverageItems[0].name, topSellerWidget.getFirstBeveragesItem);
  if (beverageItems[1].total != 0)
    I.see(beverageItems[1].name, topSellerWidget.getSecondBeveragesItem);
  if (beverageItems[2].total != 0)
    I.see(beverageItems[2].name, topSellerWidget.getThirdBeveragesItem);

    /**
  I.wait(2);
  I.click(homePage.clickOverviewIcon);
  I.wait(2);

  currentWeekRevenue = parseFloat(cockpit_user.cockpit_user.total_revenues.currentWeekTotalMoney).toLocaleString('de-DE');
  currentMonthRevenue = parseFloat(cockpit_user.cockpit_user.total_revenues.currentMonthTotalMoney).toLocaleString('de-DE');
  currentYearRevenue = parseFloat(cockpit_user.cockpit_user.total_revenues.currentYearTotalMoney).toLocaleString('de-DE');
  previousDayRevenue = parseFloat(cockpit_user.cockpit_user.total_revenues.previousDayTotalMoney).toLocaleString('de-DE');

  I.see(currentMonthRevenue, overviewPage.getTotalRevenue);
  I.see(currentMonthRevenue, overviewPage.getWidgetValue);

  I.click(dateFilter.openDateFilter);
  I.wait(2);

  I.wait(2);
  I.click(dateFilter.selectWeeklyResolution);
  I.wait(2);
  I.click(dateFilter.openDateFilter);
  I.see(currentWeekRevenue, overviewPage.getTotalRevenue);
  I.see(currentWeekRevenue, overviewPage.getWidgetValue);
  I.wait(2);
  // Slide to previous day in order to check the daily revenue
  I.click(dateFilter.openDateFilter);
  I.click(dateFilter.selectDailyResolution);
  I.wait(2);
  // I.click(dateFilter.slideToPreviousDay);
  I.click(dateFilter.openDateFilter);
  I.wait(2);
  I.see(previousDayRevenue, overviewPage.getTotalRevenue);
  I.see(previousDayRevenue, overviewPage.getWidgetValue);

  // Check current year total revenue
  I.click(dateFilter.openDateFilter);
  I.click(dateFilter.selectYearlyResolution);
  I.click(dateFilter.openDateFilter);
  I.wait(2);
  I.see(currentYearRevenue, overviewPage.getTotalRevenue);
  I.see(currentYearRevenue, overviewPage.getWidgetValue);
  **/
  //Logout
  CockpitFunc.logout();
});

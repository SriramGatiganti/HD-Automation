const user = require('../../function/data/user').user;
const cockpit_user = require('../../function/cockpit/cockpit_data_provider');
const revenueWidget = require('./components/revenueWidget');
const dateFilter = require('./components/dateFilter');
const homePage = require('./components/homePage');

Feature('Landing Page @cockpit_revenue');
//Feature('Landing Page @debug');

Scenario('Breakeven component', (CockpitFunc, I) => {

  CockpitFunc.login(cockpit_user.cockpit_user);
  //console.log(cockpit_user.cockpit_user.total_revenues.currentWeekTotalMoney);
  let currentWeekRevenue = (cockpit_user.cockpit_user.total_revenues.currentWeekTotalMoney == 0 ? 0 : Math.floor(cockpit_user.cockpit_user.total_revenues.currentWeekTotalMoney)+1).toLocaleString('de-DE');
  let currentWeekFoodRevenue = (cockpit_user.cockpit_user.food_revenues.currentWeekTotalMoney == 0 ? 0 : Math.floor(cockpit_user.cockpit_user.food_revenues.currentWeekTotalMoney)+1).toLocaleString('de-DE');
  let currentWeekBeveragesRevenue = (cockpit_user.cockpit_user.beverages_revenue.currentWeekTotalMoney == 0 ? 0 : Math.floor(cockpit_user.cockpit_user.beverages_revenue.currentWeekTotalMoney)+1).toLocaleString('de-DE');
  let currentMonthRevenue = (Math.floor(cockpit_user.cockpit_user.total_revenues.currentMonthTotalMoney)+1).toLocaleString('de-DE');
  let currentMonthFoodRevenue = (Math.floor(cockpit_user.cockpit_user.food_revenues.currentMonthTotalMoney)+1).toLocaleString('de-DE');
  let currentMonthBeveragesRevenue = (Math.floor(cockpit_user.cockpit_user.beverages_revenue.currentMonthTotalMoney)+1).toLocaleString('de-DE');
  let currentYearRevenue = (Math.floor(cockpit_user.cockpit_user.total_revenues.currentYearTotalMoney)+1).toLocaleString('de-DE');
  let currentYearFoodRevenue = (Math.floor(cockpit_user.cockpit_user.food_revenues.currentYearTotalMoney)+1).toLocaleString('de-DE');
  let currentYearBeveragesRevenue = (Math.floor(cockpit_user.cockpit_user.beverages_revenue.currentYearTotalMoney)+1).toLocaleString('de-DE');
  let previousDayRevenue = (Math.floor(cockpit_user.cockpit_user.total_revenues.previousDayTotalMoney)+1).toLocaleString('de-DE');
  let previousDayFoodRevenue = (Math.floor(cockpit_user.cockpit_user.food_revenues.previousDayTotalMoney)+1).toLocaleString('de-DE');
  let previousDayBeveragesRevenue = (Math.floor(cockpit_user.cockpit_user.beverages_revenue.previousDayTotalMoney)+1).toLocaleString('de-DE');
  let selectedDayRangeRevenue = (Math.floor(cockpit_user.cockpit_user.total_revenues.customDateSelectionTotalMoney)+1).toLocaleString('de-DE');
  let selectedDayFoodRevenue = (Math.floor(cockpit_user.cockpit_user.food_revenues.customDateSelectionTotalMoney)+1).toLocaleString('de-DE');
  let selectedDayBeveragesRevenue = (Math.floor(cockpit_user.cockpit_user.beverages_revenue.customDateSelectionTotalMoney)+1).toLocaleString('de-DE');

  console.log("Found following total revenues :");
  console.log("Current Month is "+currentMonthRevenue);
  console.log("Current Year is "+currentYearRevenue);
  console.log("Previous Day is "+previousDayRevenue);
  console.log("Day range revenue is "+selectedDayRangeRevenue);
  console.log("Start date is "+cockpit_user.cockpit_user.total_revenues.customDaySelectionStart);
  console.log("End date is "+cockpit_user.cockpit_user.total_revenues.customDaySelectionEnd);


  I.see(currentMonthRevenue, revenueWidget.getTotalRevenue);
  I.see(currentMonthFoodRevenue, revenueWidget.getFoodTotalRevenue);
  I.see(currentMonthBeveragesRevenue, revenueWidget.getBeveragesTotalRevenue);

  I.click(dateFilter.openDateFilter);
  I.wait(1);
  I.click(dateFilter.selectWeeklyResolution);
  I.wait(1);
  I.see(currentWeekRevenue, revenueWidget.getTotalRevenue);
  I.see(currentWeekFoodRevenue, revenueWidget.getFoodTotalRevenue);
  I.see(currentWeekBeveragesRevenue, revenueWidget.getBeveragesTotalRevenue);
  // Slide to previous day in order to check the daily revenue
  I.click(dateFilter.selectDailyResolution);
  I.wait(2);
  I.click(dateFilter.slideToPreviousDay);
  I.wait(2);
  I.see(previousDayRevenue, revenueWidget.getTotalRevenue);
  I.see(previousDayFoodRevenue, revenueWidget.getFoodTotalRevenue);
  I.see(previousDayBeveragesRevenue, revenueWidget.getBeveragesTotalRevenue);
  // Check yearly resolution
  I.click(dateFilter.selectYearlyResolution);
  I.wait(2);
  I.see(currentYearRevenue, revenueWidget.getTotalRevenue);
  I.see(currentYearFoodRevenue, revenueWidget.getFoodTotalRevenue);
  I.see(currentYearBeveragesRevenue, revenueWidget.getBeveragesTotalRevenue);
  // Select a date range as the one specified in date range

  /*
  I.click(dateFilter.openCustomSelection);
  I.wait(2);
  let originalStartSelectionDate = cockpit_user.cockpit_user.total_revenues.customDaySelectionStart;
  let startSelectionDate = originalStartSelectionDate.slice(0,2)+"."+originalStartSelectionDate.slice(2,4)+"."+originalStartSelectionDate.slice(4,8);
  let originalEndSelectionDate = cockpit_user.cockpit_user.total_revenues.customDaySelectionEnd;
  let endSelectionDate = originalEndSelectionDate.slice(0,2)+"."+originalEndSelectionDate.slice(2,4)+"."+originalEndSelectionDate.slice(4,8);
  I.wait(1);
  I.fillField(dateFilter.setDaySelectionStart, originalStartSelectionDate);
  I.wait(2);
  I.fillField(dateFilter.setDaySelectionFinish, originalEndSelectionDate);
  I.wait(1);
  I.click(dateFilter.confirmCustomSelection);
  I.wait(1);
  I.see(selectedDayRangeRevenue, revenueWidget.getTotalRevenue);
  I.see(selectedDayFoodRevenue, revenueWidget.getFoodTotalRevenue);
  I.see(selectedDayBeveragesRevenue, revenueWidget.getBeveragesTotalRevenue);
  */

  //Logout
  CockpitFunc.logout();
});

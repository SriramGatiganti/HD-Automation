const user = require('../../function/data/user').user;
const cockpit_user = require('../../function/cockpit/cockpit_data_provider');
const topSellerWidget = require('./components/topSellerWidget');
const dateFilter = require('./components/dateFilter');
const homePage = require('./components/homePage');

Feature('Landing Page @cockpit_topseller');

Scenario('topseller component', (CockpitFunc, I) => {
  CockpitFunc.login(cockpit_user.cockpit_user);

  console.log(cockpit_user.cockpit_user.topseller_food);
  console.log(cockpit_user.cockpit_user.topseller_beverages);

  // Check topseller items displayed in the widget for monthly resolution
  I.wait(1);
  let foodItems = cockpit_user.cockpit_user.topseller_food.currentMonth;
  let beverageItems = cockpit_user.cockpit_user.topseller_beverages.currentMonth;

  I.see(foodItems[0].name, topSellerWidget.getFirstFoodItem);
  I.see(foodItems[1].name, topSellerWidget.getSecondFoodItem);
  I.see(foodItems[2].name, topSellerWidget.getThirdFoodItem);
  I.see(beverageItems[0].name, topSellerWidget.getFirstBeveragesItem);
  I.see(beverageItems[1].name, topSellerWidget.getSecondBeveragesItem);
  I.see(beverageItems[2].name, topSellerWidget.getThirdBeveragesItem);

  // Check current year top seller items
  foodItems = cockpit_user.cockpit_user.topseller_food.currentYear;
  beverageItems = cockpit_user.cockpit_user.topseller_beverages.currentYear;

  I.click(dateFilter.openDateFilter);
  I.click(dateFilter.selectYearlyResolution);
  I.wait(1);
  I.see(foodItems[0].name, topSellerWidget.getFirstFoodItem);
  I.see(foodItems[1].name, topSellerWidget.getSecondFoodItem);
  I.see(foodItems[2].name, topSellerWidget.getThirdFoodItem);
  I.see(beverageItems[0].name, topSellerWidget.getFirstBeveragesItem);
  I.see(beverageItems[1].name, topSellerWidget.getSecondBeveragesItem);
  I.see(beverageItems[2].name, topSellerWidget.getThirdBeveragesItem);

  // Check current week top seller items
  foodItems = cockpit_user.cockpit_user.topseller_food.currentWeek;
  beverageItems = cockpit_user.cockpit_user.topseller_beverages.currentWeek;

  I.click(dateFilter.selectWeeklyResolution);
  I.wait(1);
  if (foodItems[0].total != 0) {
    I.see(foodItems[0].name, topSellerWidget.getFirstFoodItem);
    I.see(foodItems[1].name, topSellerWidget.getSecondFoodItem);
    I.see(foodItems[2].name, topSellerWidget.getThirdFoodItem);
    I.see(beverageItems[0].name, topSellerWidget.getFirstBeveragesItem);
    I.see(beverageItems[1].name, topSellerWidget.getSecondBeveragesItem);
    I.see(beverageItems[2].name, topSellerWidget.getThirdBeveragesItem);
  }

  // Check previous day top seller
  foodItems = cockpit_user.cockpit_user.topseller_food.previousDay;
  beverageItems = cockpit_user.cockpit_user.topseller_beverages.previousDay;
  I.click(dateFilter.selectDailyResolution);
  I.wait(1);
  I.click(dateFilter.slideToPreviousDay);
  I.wait(1);
  // pause();
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


  //Logout
  CockpitFunc.logout();
});

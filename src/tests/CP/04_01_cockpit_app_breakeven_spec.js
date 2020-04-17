const user = require('../../function/data/user').user;
const cockpit_user = require('../../function/cockpit/cockpit_data_provider');
const revenueWidget = require('./components/revenueWidget');
const dateFilter = require('./components/dateFilter');
const homePage = require('./components/homePage');
const settingsPage = require('./components/settingsPage');
const accountDetails = require('./components/accountDetails');
const overviewPage = require('./components/overviewPage');

Feature('Landing Page @cockpit_firstaccess');
//Feature('Landing Page @debug');

Scenario('Breakeven component', (CockpitFunc, I) => {

  CockpitFunc.login(cockpit_user.cockpit_user);
  //Open open details

  //CockpitFunc.deleteAccount();
  CockpitFunc.firstaccess(cockpit_user.cockpit_user);
  CockpitFunc.set_branch(cockpit_user.cockpit_user);
  I.wait(2);
  I.click(homePage.clickOverviewIcon);
  I.wait(2);

  let currentWeekRevenue = parseFloat(cockpit_user.cockpit_user.total_revenues.currentWeekTotalMoney).toLocaleString('de-DE');
  let currentMonthRevenue = parseFloat(cockpit_user.cockpit_user.total_revenues.currentMonthTotalMoney).toLocaleString('de-DE');
  let currentYearRevenue = parseFloat(cockpit_user.cockpit_user.total_revenues.currentYearTotalMoney).toLocaleString('de-DE');
  let previousDayRevenue = parseFloat(cockpit_user.cockpit_user.total_revenues.previousDayTotalMoney).toLocaleString('de-DE');

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
  I.click(dateFilter.slideToPreviousDay);
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

  //Logout
  CockpitFunc.logout();
});

Feature('Landing Page @cockpit_deleteaccount');
//Feature('Landing Page @debug');

Scenario('Overall component', (CockpitFunc, I) => {

  CockpitFunc.login(cockpit_user.cockpit_user);
  CockpitFunc.deleteAccount();

});

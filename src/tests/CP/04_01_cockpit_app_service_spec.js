const user = require('../../function/data/user').user;
const cockpit_user = require('../../function/cockpit/cockpit_data_provider');
const serviceWidget = require('./components/serviceWidget');
const dateFilter = require('./components/dateFilter');
const homePage = require('./components/homePage');

Feature('Landing Page @cockpit_service');

Scenario('Service component', (CockpitFunc, I) => {
  CockpitFunc.login(cockpit_user.cockpit_user);


  /**
  console.log("Found following service revenues : ");
  console.log(serviceRevenue);


  I.wait(2);
  I.click(serviceWidget.openServiceWidgetTile);
  I.wait(4);

  console.log('Service revenue '+JSON.stringify(serviceRevenue));
  let monthlyIndex = getEmployeeNameIndex('monthly');
  console.log('Max rev '+serviceRevenue[employee1].currentMonthTotalMoney);
  let employeeName = getEmployeeName(monthlyIndex);
  console.log('Service revenue '+serviceRevenue);
  console.log('Max rev '+serviceRevenue[employeeName].currentMonthTotalMoney);
  /// "//*[@id="gc-module__details"]/app-service-details/app-module-details/div/div/div/div[2]/div[1]/div[2]/div[2]"
  const firstEmployee = I.grabTextFrom(serviceWidget.getFirstEmployeeName);
  console.log("----"+firstEmployee+"----");
  //I.wait(10);
  //pause();
  **/

  console.log(cockpit_user.cockpit_user.service_revenues.toString());
  I.click(serviceWidget.openServiceWidgetTile);
  I.wait(1);
  let serviceRevenues = cockpit_user.cockpit_user.service_revenues.currentMonth;
  console.log(serviceRevenues);
  if (parseFloat(serviceRevenues[0].total) !== 0.0) {
    I.see(serviceRevenues[0].name, serviceWidget.getFirstEmployeeName);
    I.see(parseFloat(serviceRevenues[0].total).toLocaleString('de-DE'), serviceWidget.getFirstEmployeeRevenue);
    I.see(serviceRevenues[1].name, serviceWidget.getSecondEmployeeName);
    I.see(parseFloat(serviceRevenues[1].total).toLocaleString('de-DE'), serviceWidget.getSecondEmployeeRevenue);
    I.see(serviceRevenues[2].name, serviceWidget.getThirdEmployeeName);
    I.see(parseFloat(serviceRevenues[2].total).toLocaleString('de-DE'), serviceWidget.getThirdEmployeeRevenue);
  }

  // Check current year service revenues
  serviceRevenues = cockpit_user.cockpit_user.service_revenues.currentYear;
  I.click(dateFilter.openDateFilter);
  I.click(dateFilter.selectYearlyResolution);
  I.wait(1);
  I.see(serviceRevenues[0].name, serviceWidget.getFirstEmployeeName);
  I.see(parseFloat(serviceRevenues[0].total).toLocaleString('de-DE'), serviceWidget.getFirstEmployeeRevenue);
  I.see(serviceRevenues[1].name, serviceWidget.getSecondEmployeeName);
  I.see(parseFloat(serviceRevenues[1].total).toLocaleString('de-DE'), serviceWidget.getSecondEmployeeRevenue);
  I.see(serviceRevenues[2].name, serviceWidget.getThirdEmployeeName);
  I.see(parseFloat(serviceRevenues[2].total).toLocaleString('de-DE'), serviceWidget.getThirdEmployeeRevenue);

  // Check current week service revenues
  serviceRevenues = cockpit_user.cockpit_user.service_revenues.currentWeek;
  I.click(dateFilter.selectWeeklyResolution);
  I.wait(1);
  if (parseFloat(serviceRevenues[0].total) !== 0.0) { // If you execute the tests on Monday, this will we empty
    I.see(serviceRevenues[0].name, serviceWidget.getFirstEmployeeName);
    I.see(parseFloat(serviceRevenues[0].total).toLocaleString('de-DE'), serviceWidget.getFirstEmployeeRevenue);
    I.see(serviceRevenues[1].name, serviceWidget.getSecondEmployeeName);
    I.see(parseFloat(serviceRevenues[1].total).toLocaleString('de-DE'), serviceWidget.getSecondEmployeeRevenue);
    I.see(serviceRevenues[2].name, serviceWidget.getThirdEmployeeName);
    I.see(parseFloat(serviceRevenues[2].total).toLocaleString('de-DE'), serviceWidget.getThirdEmployeeRevenue);
  }


  // Check previous day service revenues
  serviceRevenues = cockpit_user.cockpit_user.service_revenues.previousDay;
  I.click(dateFilter.selectDailyResolution);
  I.wait(1);
  I.click(dateFilter.slideToPreviousDay);
  I.wait(1);
  I.see(serviceRevenues[0].name, serviceWidget.getFirstEmployeeName);
  I.see(parseFloat(serviceRevenues[0].total).toLocaleString('de-DE'), serviceWidget.getFirstEmployeeRevenue);
  I.see(serviceRevenues[1].name, serviceWidget.getSecondEmployeeName);
  I.see(parseFloat(serviceRevenues[1].total).toLocaleString('de-DE'), serviceWidget.getSecondEmployeeRevenue);
  I.see(serviceRevenues[2].name, serviceWidget.getThirdEmployeeName);
  I.see(parseFloat(serviceRevenues[2].total).toLocaleString('de-DE'), serviceWidget.getThirdEmployeeRevenue);

  I.click(serviceWidget.closeServiceWidget);
  //pause();
  //Logout
  CockpitFunc.logout();
});

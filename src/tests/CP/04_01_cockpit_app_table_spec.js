const user = require('../../function/data/user').user;
const cockpit_user = require('../../function/cockpit/cockpit_data_provider');
const tableWidget = require('./components/tableWidget');
const dateFilter = require('./components/dateFilter');
const homePage = require('./components/homePage');

Feature('Landing Page @cockpit_table');

Scenario('Table component', (CockpitFunc, I) => {
  CockpitFunc.login(cockpit_user.cockpit_user);

  //console.log(cockpit_user.cockpit_user.table_revenues.toString());

  let tableRevenues = cockpit_user.cockpit_user.table_revenues.currentMonth;
  //console.log(tableRevenues);
  I.click(tableWidget.openTableWidgetTile);
  I.wait(1);

  I.see(tableRevenues[0].name, tableWidget.getFirstTableName);
  I.see(parseFloat(tableRevenues[0].total).toLocaleString('de-DE'), tableWidget.getFirstTableRevenue);
  I.see(tableRevenues[1].name, tableWidget.getSecondTableName);
  I.see(parseFloat(tableRevenues[1].total).toLocaleString('de-DE'), tableWidget.getSecondTableRevenue);
  I.see(tableRevenues[2].name, tableWidget.getThirdTableName);
  I.see(parseFloat(tableRevenues[2].total).toLocaleString('de-DE'), tableWidget.getThirdTableRevenue);
  I.see(tableRevenues[3].name, tableWidget.getFourthTableName);
  I.see(parseFloat(tableRevenues[3].total).toLocaleString('de-DE'), tableWidget.getFourthTableRevenue);
  I.see(tableRevenues[4].name, tableWidget.getFifthTableName);
  I.see(parseFloat(tableRevenues[4].total).toLocaleString('de-DE'), tableWidget.getFifthTableRevenue);
  // pause();

  // Check current year service revenues
  tableRevenue = null;
  tableRevenues = cockpit_user.cockpit_user.table_revenues.currentYear;

  tableRevenues.forEach((item, i) => {
    console.log(item);
    }
  )
  // console.log("This year yearly revenues are "+tableRevenues);
  I.click(dateFilter.openDateFilter);
  I.click(dateFilter.selectYearlyResolution);
  I.wait(1);
  I.see(tableRevenues[0].name, tableWidget.getFirstTableName);
  I.see(parseFloat(tableRevenues[0].total).toLocaleString('de-DE'), tableWidget.getFirstTableRevenue);
  I.see(tableRevenues[1].name, tableWidget.getSecondTableName);
  I.see(parseFloat(tableRevenues[1].total).toLocaleString('de-DE'), tableWidget.getSecondTableRevenue);
  I.see(tableRevenues[2].name, tableWidget.getThirdTableName);
  I.see(parseFloat(tableRevenues[2].total).toLocaleString('de-DE'), tableWidget.getThirdTableRevenue);
  I.see(tableRevenues[3].name, tableWidget.getFourthTableName);
  I.see(parseFloat(tableRevenues[3].total).toLocaleString('de-DE'), tableWidget.getFourthTableRevenue);
  I.see(tableRevenues[4].name, tableWidget.getFifthTableName);
  I.see(parseFloat(tableRevenues[4].total).toLocaleString('de-DE'), tableWidget.getFifthTableRevenue);

  // Check current year service revenues
  tableRevenues = cockpit_user.cockpit_user.table_revenues.currentWeek;
  I.click(dateFilter.selectWeeklyResolution);
  I.wait(1);
  I.see(tableRevenues[0].name, tableWidget.getFirstTableName);
  I.see(parseFloat(tableRevenues[0].total).toLocaleString('de-DE'), tableWidget.getFirstTableRevenue);
  I.see(tableRevenues[1].name, tableWidget.getSecondTableName);
  I.see(parseFloat(tableRevenues[1].total).toLocaleString('de-DE'), tableWidget.getSecondTableRevenue);
  I.see(tableRevenues[2].name, tableWidget.getThirdTableName);
  I.see(parseFloat(tableRevenues[2].total).toLocaleString('de-DE'), tableWidget.getThirdTableRevenue);
  I.see(tableRevenues[3].name, tableWidget.getFourthTableName);
  I.see(parseFloat(tableRevenues[3].total).toLocaleString('de-DE'), tableWidget.getFourthTableRevenue);
  I.see(tableRevenues[4].name, tableWidget.getFifthTableName);
  I.see(parseFloat(tableRevenues[4].total).toLocaleString('de-DE'), tableWidget.getFifthTableRevenue);


  // Check previous day service revenues
  tableRevenues = cockpit_user.cockpit_user.table_revenues.previousDay;
  I.click(dateFilter.selectDailyResolution);
  I.wait(1);
  I.click(dateFilter.slideToPreviousDay);
  I.wait(1);
  I.see(tableRevenues[0].name, tableWidget.getFirstTableName);
  I.see(parseFloat(tableRevenues[0].total).toLocaleString('de-DE'), tableWidget.getFirstTableRevenue);
  I.see(tableRevenues[1].name, tableWidget.getSecondTableName);
  I.see(parseFloat(tableRevenues[1].total).toLocaleString('de-DE'), tableWidget.getSecondTableRevenue);
  I.see(tableRevenues[2].name, tableWidget.getThirdTableName);
  I.see(parseFloat(tableRevenues[2].total).toLocaleString('de-DE'), tableWidget.getThirdTableRevenue);
  I.see(tableRevenues[3].name, tableWidget.getFourthTableName);
  I.see(parseFloat(tableRevenues[3].total).toLocaleString('de-DE'), tableWidget.getFourthTableRevenue);
  I.see(tableRevenues[4].name, tableWidget.getFifthTableName);
  I.see(parseFloat(tableRevenues[4].total).toLocaleString('de-DE'), tableWidget.getFifthTableRevenue);

  I.click(tableWidget.closetableWidget);
  //pause();
  //Logout
  CockpitFunc.logout();
});

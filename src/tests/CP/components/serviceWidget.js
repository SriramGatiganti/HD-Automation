const avgRevenueTile = '//*[@id="gc-dashboard"]/app-module[3]/div/div[2]/app-service-kachel/div/div/div[1]';
const firstEmployeeRevenue = '//*[@id="gc-module__details"]/app-service-details/app-module-details/div/div/div/div[2]/div[2]/div[2]/div[1]/div[3]';
const secondEmployeeRevenue = '//*[@id="gc-module__details"]/app-service-details/app-module-details/div/div/div/div[2]/div[2]/div[2]/div[2]/div[3]';
const thirdEmployeeRevenue = '//*[@id="gc-module__details"]/app-service-details/app-module-details/div/div/div/div[2]/div[2]/div[2]/div[3]/div[3]';
const firstEmployeeName = '//*[@id="gc-module__details"]/app-service-details/app-module-details/div/div/div/div[2]/div[1]/div[2]/div[2]';
const secondEmployeeName = '//*[@id="gc-module__details"]/app-service-details/app-module-details/div/div/div/div[2]/div[1]/div[3]';
const thirdEmployeeName = '//*[@id="gc-module__details"]/app-service-details/app-module-details/div/div/div/div[2]/div[1]/div[4]/div[2]';
const serviceWidgetTile = '//*[@id="gc-dashboard"]/app-module[3]/div/div[2]/app-service-kachel/div/div/div[1]'; //'//*[@id="gc-dashboard"]/app-module[3]/div/div[1]';
const closeIcon = '//*[@id="gc-module__details"]/app-service-details/app-module-details/div/div/app-filter-bar/div/div[2]';

module.exports = {
  getAvgRevenue: avgRevenueTile,
  getFirstEmployeeRevenue : firstEmployeeRevenue,
  getSecondEmployeeRevenue : secondEmployeeRevenue,
  getThirdEmployeeRevenue : thirdEmployeeRevenue,
  getFirstEmployeeName: firstEmployeeName,
  getSecondEmployeeName: secondEmployeeName,
  getThirdEmployeeName: thirdEmployeeName,
  openServiceWidgetTile: serviceWidgetTile,
  closeServiceWidget: closeIcon
}

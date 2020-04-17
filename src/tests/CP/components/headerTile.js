const overviewPage = '/html/body/div[1]/app-root/app-pages/div/app-header/header/div/div[1]/div[1]/app-navigation-overview/div/div[1]/div[2]'; //'//*[@id="gc-dashboard"]/app-module[3]/div/div[1]';
const closeIcon = '//*[@id="gc-module__details"]/app-tableanalysis-details/app-module-details/div/div/app-filter-bar/div/div[2]';
const firstTableName = '//*[@id="gc-module__details"]/app-tableanalysis-details/app-module-details/div/div/div/div/app-active-tables/div/table/tbody/tr[1]/td[2]/span';
const secondTableName = '//*[@id="gc-module__details"]/app-tableanalysis-details/app-module-details/div/div/div/div/app-active-tables/div/table/tbody/tr[2]/td[2]/span';
const thirdTableName = '//*[@id="gc-module__details"]/app-tableanalysis-details/app-module-details/div/div/div/div/app-active-tables/div/table/tbody/tr[3]/td[2]/span';
const fourthTableName = '//*[@id="gc-module__details"]/app-tableanalysis-details/app-module-details/div/div/div/div/app-active-tables/div/table/tbody/tr[4]/td[2]/span';
const fifthTableName = '//*[@id="gc-module__details"]/app-tableanalysis-details/app-module-details/div/div/div/div/app-active-tables/div/table/tbody/tr[5]/td[2]/span';
const firstTableRevenue = '//*[@id="gc-module__details"]/app-tableanalysis-details/app-module-details/div/div/div/div/app-active-tables/div/table/tbody/tr[1]/td[4]';
const secondTableRevenue = '//*[@id="gc-module__details"]/app-tableanalysis-details/app-module-details/div/div/div/div/app-active-tables/div/table/tbody/tr[2]/td[4]';
const thirdTableRevenue = '//*[@id="gc-module__details"]/app-tableanalysis-details/app-module-details/div/div/div/div/app-active-tables/div/table/tbody/tr[3]/td[4]';
const fourthTableRevenue = '//*[@id="gc-module__details"]/app-tableanalysis-details/app-module-details/div/div/div/div/app-active-tables/div/table/tbody/tr[4]/td[4]';
const fifthTableRevenue = '//*[@id="gc-module__details"]/app-tableanalysis-details/app-module-details/div/div/div/div/app-active-tables/div/table/tbody/tr[5]/td[4]';

module.exports = {
  clickOverviewIcon: overviewPage,
  getSecondTableName: secondTableName,
  getThirdTableName: thirdTableName,
  getFourthTableName: fourthTableName,
  getFifthTableName: fifthTableName,
  getFirstTableRevenue: firstTableRevenue,
  getSecondTableRevenue: secondTableRevenue,
  getThirdTableRevenue: thirdTableRevenue,
  getFourthTableRevenue: fourthTableRevenue,
  getFifthTableRevenue: fifthTableRevenue,
  openTableWidgetTile : tableWidgetTile,
  closeTableWidgetTile : closeIcon
}

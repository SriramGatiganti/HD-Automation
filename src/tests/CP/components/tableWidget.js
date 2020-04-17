const tableWidgetTile = '//*[@id="gc-dashboard"]/app-module[4]/div/div[2]/app-tableanalysis-kachel/div/div[2]/div[1]'; //'//*[@id="gc-dashboard"]/app-module[3]/div/div[1]';
const tableWidgetRotation = '//*[@id="gc-dashboard"]/app-module[4]/div/div[2]/app-tableanalysis-kachel/div/div[1]/div[1]';
const tableWidgetAvgRevenue = '//*[@id="gc-dashboard"]/app-module[4]/div/div[2]/app-tableanalysis-kachel/div/div[2]/div[1]';
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
  getAvgRotation: tableWidgetRotation,
  getAvgRevenue: tableWidgetAvgRevenue,
  getFirstTableName: firstTableName,
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

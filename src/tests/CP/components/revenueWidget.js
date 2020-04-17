const revenueWidgetTile='#gc-dashboard > app-module.ng-tns-c46-3.ng-star-inserted > div > div.gc-module-body > app-sales-kachel > div > div.gc-main-value__container.goldenRatioMajorV.gc-component-loading.gc-component-loading--loaded > div.gc-main-value.positive';
const closeIcon='//*[@id="gc-module__details"]/app-sales-details/app-module-details/div/div/app-filter-bar/div/div[2]';
//totalRevenue = '#gc-dashboard > app-module.ng-tns-c35-2.ng-star-inserted > div > div.gc-module-body > app-sales-kachel > div > div.gc-main-value__container.goldenRatioMajorV.gc-component-loading.gc-component-loading--loaded > div.gc-main-value.positive';
const category1Revenue= '//*[@id="gc-dashboard"]/app-module[1]/div/div[2]/app-sales-kachel/div/div[2]/div[1]/span[2]'; //'#gc-dashboard > app-module.ng-tns-c46-3.ng-star-inserted > div > div.gc-module-body > app-sales-kachel > div > div.gc-detail-value__container.goldenRatioMinorV.gc-component-loading.gc-component-loading--loaded > div:nth-child(1) > span.gc-detail-value__value.food-color';
const category2Revenue= '//*[@id="gc-dashboard"]/app-module[1]/div/div[2]/app-sales-kachel/div/div[2]/div[2]/span[2]'; // '#gc-dashboard > app-module.ng-tns-c46-3.ng-star-inserted > div > div.gc-module-body > app-sales-kachel > div > div.gc-detail-value__container.goldenRatioMinorV.gc-component-loading.gc-component-loading--loaded > div:nth-child(2) > span.gc-detail-value__value.beverages-color'
const totalRevenue = '//*[@id="gc-dashboard"]/app-module[1]/div/div[2]/app-sales-kachel/div/div[1]/div[1]'; // '#gc-dashboard > app-module.ng-tns-c46-3.ng-star-inserted > div > div.gc-module-body > app-sales-kachel > div > div.gc-main-value__container.goldenRatioMajorV.gc-component-loading.gc-component-loading--loaded > div.gc-main-value.positive';
//                #gc-dashboard > app-module.ng-tns-c35-2.ng-star-inserted > div > div.gc-module-body > app-sales-kachel > div > div.gc-main-value__container.goldenRatioMajorV.gc-component-loading.gc-component-loading--loaded > div.gc-main-value.positive
//exports.revenueWidgetTile = revenueWidgetTile;
module.exports = {
  revenueWidgetTile : revenueWidgetTile,
  getTotalRevenue : totalRevenue,
  getFoodTotalRevenue: category1Revenue,
  getBeveragesTotalRevenue: category2Revenue,
  closeRevenueWidgetTile: closeIcon
}

// #gc-dashboard > app-module.ng-tns-c35-2.ng-star-inserted > div > div.gc-module-body > app-sales-kachel > div > div.gc-main-value__container.goldenRatioMajorV.gc-component-loading.gc-component-loading--loaded > div.gc-main-value.positive

// #gc-dashboard > app-module.ng-tns-c35-8.ng-star-inserted > div > div.gc-module-body > app-sales-kachel > div > div.gc-main-value__container.goldenRatioMajorV.gc-component-loading.gc-component-loading--loaded > div.gc-main-value.positive

//'#gc-dashboard > app-module.ng-tns-c45-3.ng-star-inserted > div > div.gc-module-body > app-sales-kachel > div > div.gc-main-value__container.goldenRatioMajorV.gc-component-loading.gc-component-loading--loaded > div.gc-main-value.positive';

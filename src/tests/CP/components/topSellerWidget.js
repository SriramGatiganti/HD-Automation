const foodFirst = '//*[@id="gc-dashboard"]/app-module[5]/div/div[2]/app-topseller-kachel/div/div/table/tbody/tr[1]/td[1]';
const foodSecond = '//*[@id="gc-dashboard"]/app-module[5]/div/div[2]/app-topseller-kachel/div/div/table/tbody/tr[2]/td[1]';
const foodThird = '//*[@id="gc-dashboard"]/app-module[5]/div/div[2]/app-topseller-kachel/div/div/table/tbody/tr[3]/td[1]';
const bevFirst = '//*[@id="gc-dashboard"]/app-module[5]/div/div[2]/app-topseller-kachel/div/div/table/tbody/tr[1]/td[2]';
const bevSecond = '//*[@id="gc-dashboard"]/app-module[5]/div/div[2]/app-topseller-kachel/div/div/table/tbody/tr[2]/td[2]';
const bevThird = '//*[@id="gc-dashboard"]/app-module[5]/div/div[2]/app-topseller-kachel/div/div/table/tbody/tr[3]/td[2]';
const serviceWidgetTile = '//*[@id="gc-dashboard"]/app-module[3]/div/div[2]/app-service-kachel/div/div/div[1]'; //'//*[@id="gc-dashboard"]/app-module[3]/div/div[1]';
const closeIcon = '//*[@id="gc-module__details"]/app-service-details/app-module-details/div/div/app-filter-bar/div/div[2]';

module.exports = {
  getFirstFoodItem : foodFirst,
  getSecondFoodItem : foodSecond,
  getThirdFoodItem : foodThird,
  getFirstBeveragesItem : bevFirst,
  getSecondBeveragesItem : bevSecond,
  getThirdBeveragesItem : bevThird
}

const totalRevenue = '/html/body/div[1]/app-root/app-pages/div/div/app-comparing/main/div/div/app-total-revenue/div/div[1]'; //'//*[@id="gc-dashboard"]/app-module[3]/div/div[1]';
const widgetTitle = '/html/body/div[1]/app-root/app-pages/div/div/app-comparing/main/div/div/div/app-compare-module/div/div[1]/h3';
const widgetRevenue = '/html/body/div[1]/app-root/app-pages/div/div/app-comparing/main/div/div/div/app-compare-module/div/div[2]/div/div/div[1]';

module.exports = {
  // clickAccountManagement: accountManagementSection,
  getWidgetTitle: widgetTitle,
  getWidgetValue: widgetRevenue,
  getTotalRevenue: totalRevenue
}

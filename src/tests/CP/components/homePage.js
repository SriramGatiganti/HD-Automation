const overviewPage = '/html/body/div[1]/app-root/app-pages/div/app-header/header/div/div[1]/div[1]/app-navigation-overview/div/div[1]/div[2]'; //'//*[@id="gc-dashboard"]/app-module[3]/div/div[1]';
const yearlyRevenueTile = '/html/body/div[1]/app-root/app-pages/div/div/app-dashboard/main/app-comparison-box/div/div[4]/div/div[1]/div';
const monthlyRevenueTile = '/html/body/div[1]/app-root/app-pages/div/div/app-dashboard/main/app-comparison-box/div/div[3]/div/div[1]/div';
const weeklyRevenueTile = '/html/body/div[1]/app-root/app-pages/div/div/app-dashboard/main/app-comparison-box/div/div[2]/div/div[1]';
const logoutButton = '//*[@id="navLinkLogout"]';
const appCuesBanner = '/html/body/appcues/cue/div/div/a';

module.exports = {
  clickOverviewIcon: overviewPage,
  getYearlyRevenueTile: yearlyRevenueTile,
  getMonthlyRevenueTile: monthlyRevenueTile,
  getWeeklyRevenueTile: weeklyRevenueTile,
  logoutUser: logoutButton,
  clickRandomPopup: appCuesBanner
}

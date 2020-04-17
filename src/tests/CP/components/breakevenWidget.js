const widgetText='//*[@id="gc-dashboard"]/app-module[2]/div/div[2]/app-breakeven-kachel/div/div/div/div';
const openWidget='//*[@id="gc-breakeven-chart__container"]/div/div/svg/g[1]/path';
const closeIcon='//*[@id="gc-module__details"]/app-breakeven-details/app-module-details/div/div/app-filter-bar/div/div[2]';

module.exports = {

  getWidgetText : widgetText,
  openWidget: openWidget,
  closeWidgetTile: closeIcon

}

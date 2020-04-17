var fs = require("fs");
const {
  wizard,
  url,
  res_url
} = require('../../function/newHydra/wizard_data_provider_new');
let users = [""];

Feature('Reservation - Remove Reservation Account @removeReservation');

Scenario('Remove Reservation Account',
  async function(I, ResFunc) {
    for (var i = 0; i < users.length; i++) {
      wizard.user.username = users[i];
      ResFunc.login(wizard.user);
      if (process.profile.split(':')[5] == "Android" && process.profile.split(':')[6] == "portrait") { //For Mobile Portrait to show settings
        I.click(ResFunc.RTPages.dashboardPages.mobileHiddenMenu);
      };
      I.click(ResFunc.RTPages.dashboardPages.settingsDropdown);
      I.waitForVisible(ResFunc.RTPages.dashboardPages.accountSettings);
      I.click(ResFunc.RTPages.dashboardPages.accountSettings);
      I.waitForVisible('.btn-primary.btn');
      let overall = await I.grabTextFrom('//body');
      if (overall.indexOf("Deletion in progress") == -1) {
        I.click('Delete Account');
        I.waitForVisible(ResFunc.RTPages.dashboardPages.deletePassword + '[2]');
        I.appendField(ResFunc.RTPages.dashboardPages.deletePassword, user.password);
        I.click(ResFunc.RTPages.dashboardPages.deleteConfirm);
        I.waitForText('Deletion in progress');
      }
      ResFunc.logout();
    }
  });

/*
Scenario('Remove Restaurant from Reservation Tool side', function*(I, ResFunc) {
  ResFunc.login(user);
  I.click('Integration');
  let code = yield I.grabTextFrom("//code[contains(text(),'widget/hydra-')]");
  code = code.split('hydra-')[1].split('?')[0];
  console.log(code);
  remFunc.remove('hydra', code, user.r_url);
});
*/

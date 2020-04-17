const random = require('../../function/public/random');
const {
  wizard,
  url,
  res_url
} = require('../../function/newHydra/wizard_data_provider_new');
let user = wizard.user;

Feature('New Hydra Dashboard @newHydra_dashboard');
//Feature('New Hydra Dashboard @debug');

Scenario('Change User Name',
  function(I, NewHydra) {
    NewHydra.landing(url + 'logout');
    NewHydra.login(user);
    NewHydra.openTab('account');

    I.waitForElement(NewHydra.WBPages.dashboardPages.userSalutation);
    I.selectOption(NewHydra.WBPages.dashboardPages.userSalutation, 'Mr.');
    let username = random.string(8);
    let lastname = random.string(10);
    I.fillField(NewHydra.WBPages.dashboardPages.userFirstName, username);
    I.fillField(NewHydra.WBPages.dashboardPages.userLastName, lastname);
    I.click(NewHydra.WBPages.dashboardPages.saveUser);
    I.waitForVisible(NewHydra.WBPages.dashboardPages.successMessage);
    I.seeInField(NewHydra.WBPages.dashboardPages.userFirstName, username);
    I.seeInField(NewHydra.WBPages.dashboardPages.userLastName, lastname);
    NewHydra.logout();
  });

Scenario('Change User Password',
  function(I, NewHydra) {
    NewHydra.landing(url + 'logout');
    NewHydra.login(user);
    NewHydra.openTab('account');
    I.waitForVisible(NewHydra.WBPages.dashboardPages.changePassword);
    I.click(NewHydra.WBPages.dashboardPages.changePassword);
    NewHydra.changePassword(user);
    NewHydra.logout();
  });

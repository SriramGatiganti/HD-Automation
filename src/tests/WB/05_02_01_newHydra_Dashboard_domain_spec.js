const {
  wizard,
  url,
  res_url,
  env
} = require('../../function/newHydra/wizard_data_provider_new');

Feature('New Hydra Dashboard @newHydra_dashboard');
//Feature('New Hydra Dashboard @debug');

Scenario('Change business subdomain',
  (I, NewHydra) => {
    //After logout DISH, website builder not log out
    I.amOnPage(url + 'logout');
    NewHydra.landing(url);
    NewHydra.login(wizard.user);
    NewHydra.openTab('domain');
    I.waitForVisible(NewHydra.WBPages.dashboardPages.subdomain);
    I.fillField(NewHydra.WBPages.dashboardPages.subdomain, wizard.subdomain);
    I.click(NewHydra.WBPages.dashboardPages.domain.replace('targetDomain', wizard.domain.replace(env + '.', '')));
    I.click(NewHydra.WBPages.dashboardPages.saveButton);
    I.waitForVisible(NewHydra.WBPages.dashboardPages.successMessage);
    NewHydra.logout();
    NewHydra.landingBusinessPage(wizard, "");
  });

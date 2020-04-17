const {
  wizard,
  url,
  res_url
} = require('../../function/newHydra/wizard_data_provider_new');
let user;

Feature('New Hydra Dashboard @newHydra_dashboard');
//Feature('New Hydra Dashboard @debug');

Scenario('Unselect all Offerings',
  (I, NewHydra) => {
    user = wizard.user;
    NewHydra.landing(url + 'logout');
    NewHydra.login(user);
    NewHydra.openTab('offering');
    I.waitInUrl('/dashboard/offering');
    I.executeScript(() => {
      let services = document.getElementsByName('codes');
      services.forEach(function(element) {
        if (element.getAttribute('checked') == 'checked') {
          element.click();
        }
      });
    });
    I.click(NewHydra.WBPages.dashboardPages.saveButton);
    I.waitForVisible(NewHydra.WBPages.dashboardPages.successMessage);
    NewHydra.logout();
    //NewHydra.landingBusinessPage(wizard, '');
  });

Scenario('Select all Offerings',
  (I, NewHydra) => {
    NewHydra.landing(url + 'logout');
    NewHydra.login(user);
    NewHydra.openTab('offering');
    I.waitInUrl('/dashboard/offering');
    I.executeScript(() => {
      let services = document.getElementsByName('codes');
      services.forEach(function(element) {
        if (element.getAttribute('checked') != 'checked') {
          element.click();
        }
      });
    });
    I.click(NewHydra.WBPages.dashboardPages.saveButton);
    I.waitForVisible(NewHydra.WBPages.dashboardPages.successMessage);
    NewHydra.logout();
    //Check Services
    //NewHydra.landingBusinessPage(wizard, '');
  });

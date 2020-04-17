const {
  wizard,
  url,
  res_url
} = require('../../function/newHydra/wizard_data_provider_new');
let user;
let i;

Feature('New Hydra Dashboard @newHydra_dashboard');
//Feature('New Hydra Dashboard @debug');

Scenario('Unselect all services',
  (I, NewHydra) => {
    user = wizard.user;
    NewHydra.landing(url + 'logout');
    NewHydra.login(user);
    NewHydra.openTab('services');
    I.waitInUrl('/dashboard/services');
    I.executeScript(() => {
      let services = document.getElementsByName('codes');
      for (var i = 0; i < services.length; i++) {
        if (services[i].getAttribute('checked') == 'checked') {
          services[i].click();
        }
      };
    });
    I.click(NewHydra.WBPages.dashboardPages.saveButton); //Save it
    I.waitForVisible(NewHydra.WBPages.dashboardPages.successMessage);
    NewHydra.logout();
    //Check Services
    NewHydra.landingBusinessPage(wizard, '#services');
    I.dontSeeElement(NewHydra.WBPages.website.serviceSection);
  });

Scenario('Select all services',
  (I, NewHydra) => {
    NewHydra.landing(url + 'logout');
    NewHydra.login(user);
    NewHydra.openTab('services');
    I.waitInUrl('/dashboard/services');
    I.executeScript(() => {
      let services = document.getElementsByName('codes');
      for (var i = 0; i < services.length; i++) {
        if (services[i].getAttribute('checked') != 'checked') {
          services[i].click();
        }
      };
    });

    I.click(NewHydra.WBPages.dashboardPages.saveButton);
    I.waitForVisible(NewHydra.WBPages.dashboardPages.successMessage);
    NewHydra.logout();

    //Check Services
    NewHydra.landingBusinessPage(wizard, '#services');
    I.seeElement(NewHydra.WBPages.website.serviceSection);
  });

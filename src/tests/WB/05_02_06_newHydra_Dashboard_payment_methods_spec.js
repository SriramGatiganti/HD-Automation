const {
  wizard,
  url,
  res_url
} = require('../../function/newHydra/wizard_data_provider_new');
let user;
let i;

Feature('New Hydra Dashboard @newHydra_dashboard');
//Feature('New Hydra Dashboard @debug');

Scenario('Unselect all Payment Methods',
  (I, NewHydra) => {
    user = wizard.user;
    NewHydra.landing(url + 'logout');
    NewHydra.login(user);
    NewHydra.openTab('payment');
    I.waitInUrl('/dashboard/payment');
    I.executeScript(() => {
      let payments = document.getElementsByName('paymentMethodCodes');
      for (var i = 0; i < payments.length; i++) {
        if (payments[i].getAttribute('checked') == 'checked') {
          payments[i].click();
        }
      };
    });
    I.click(NewHydra.WBPages.dashboardPages.saveButton); //Save it
    I.waitForVisible(NewHydra.WBPages.dashboardPages.successMessage);
    NewHydra.logout();
    //Check payments
    NewHydra.landingBusinessPage(wizard, '#payment');
    I.dontSeeElement(NewHydra.WBPages.website.paymentSection);
  });

Scenario('Select all Payment Methods',
  (I, NewHydra) => {
    NewHydra.landing(url + 'logout');
    NewHydra.login(user);
    NewHydra.openTab('payment');
    I.waitInUrl('/dashboard/payment');
    I.executeScript(() => {
      let payments = document.getElementsByName('paymentMethodCodes');
      for (var i = 0; i < payments.length; i++) {
        if (payments[i].getAttribute('checked') != 'checked') {
          payments[i].click();
        }
      };
    });
    I.click(NewHydra.WBPages.dashboardPages.saveButton); //Save it
    I.waitForVisible(NewHydra.WBPages.dashboardPages.successMessage);
    NewHydra.logout();
    //Check payments
    NewHydra.landingBusinessPage(wizard, '#payment');
    I.seeElement(NewHydra.WBPages.website.paymentSection);
  });

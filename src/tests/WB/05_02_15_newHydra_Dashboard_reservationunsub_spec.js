const {
  wizard,
  url,
  res_url
} = require('../../function/newHydra/wizard_data_provider_new');
let user = wizard.user;

Feature('New Hydra Dashboard @newHydra_dashboard');
//Feature('New Hydra Dashboard @debug');

Scenario('Turn on reservation tool and unsubscribe res',
  function(I, NewHydra, ResFunc) {
    NewHydra.landing(url + 'logout');
    NewHydra.login(user);

    NewHydra.openTab('reservation');
    NewHydra.turnOnHDReservation();
    NewHydra.logout(); //Last step to logout
    NewHydra.landingBusinessPage(wizard, '#reservation');
    I.seeElement(NewHydra.WBPages.website.reservationToolBox);
    ResFunc.login(wizard.user);
    ResFunc.removeAccount(wizard.user);
    I.wait(10);
    NewHydra.landingBusinessPage(wizard, '#reservation');
    I.dontSeeElement(NewHydra.WBPages.website.reservationToolBox);
  });

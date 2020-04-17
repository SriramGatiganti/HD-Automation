const {
  wizard,
  url,
  res_url
} = require('../../function/newHydra/wizard_data_provider_new');
let user = wizard.user;

Feature('New Hydra Dashboard @newHydra_dashboard');
//Feature('New Hydra Dashboard @debug');

Scenario('Check your data',
  function(I, NewHydra) {
    NewHydra.landing(url + 'logout');
    NewHydra.login(user);
    NewHydra.openTab('dataPrivacy');
    I.waitInUrl('/dashboard/dataPrivacy')
    //Click each link
    for (let i = 1; i <= 5; i++) {
      I.click(NewHydra.WBPages.dashboardPages.dataPrivacyLink.replace('num', i));
      I.wait(2);
    };
    //Export
    I.click(NewHydra.WBPages.dashboardPages.exportData);
    I.wait(2);
    NewHydra.logout();
  });

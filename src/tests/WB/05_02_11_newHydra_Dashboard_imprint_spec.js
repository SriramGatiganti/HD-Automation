const random = require('../../function/public/random');
const {
  wizard,
  url,
  res_url
} = require('../../function/newHydra/wizard_data_provider_new');
let user;

Feature('New Hydra Dashboard @newHydra_dashboard');
//Feature('New Hydra Dashboard @debug');

Scenario('Change Imprint',
  async function(I, NewHydra) {
    user = wizard.user;
    NewHydra.landing(url + 'logout');
    NewHydra.login(user);
    NewHydra.openTab('imprint');
    I.waitForVisible(NewHydra.WBPages.dashboardPages.imprintFieldValue);
    let arr = wizard.imprint.split(',');
    let imprint_length;

    imprint_length = await I.grabNumberOfVisibleElements(NewHydra.WBPages.dashboardPages.imprintFieldValue);
    for (let i = 1; i <= Math.min(imprint_length, arr.length); i++) {
      I.fillField(NewHydra.WBPages.dashboardPages.imprintInput + '[' + i + ']', arr[i - 1]);
    };
    I.click(NewHydra.WBPages.dashboardPages.saveButton);
    I.waitForVisible(NewHydra.WBPages.dashboardPages.successMessage);
    NewHydra.logout();
    //Check Story
    NewHydra.landingBusinessPage(wizard, '#contact');
    //Imprint
    I.scrollPageToBottom();
    I.executeScript(() => {
      document.getElementsByClassName("link-imprint")[0].click();
    });
    I.waitForVisible(NewHydra.WBPages.website.imprint);
    I.wait(2);
    for (i = 0; i < Math.min(imprint_length, arr.length); i++) {
      I.see(arr[i]);
    };

  });

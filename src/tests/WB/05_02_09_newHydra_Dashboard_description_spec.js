const random = require('../../function/public/random');
const {
  wizard,
  url,
  res_url
} = require('../../function/newHydra/wizard_data_provider_new');

Feature('New Hydra Dashboard @newHydra_dashboard');
//Feature('New Hydra Dashboard @debug');

Scenario('Clear Welcome Title',
  function(I, NewHydra) {
    NewHydra.landing(url + 'logout');
    NewHydra.login(wizard.user);
    NewHydra.openTab('description');

    I.waitForVisible(NewHydra.WBPages.dashboardPages.headerWelcomeTitle);
    //Change to manual description
    if (wizard.country != 'Romania') {
      I.click(NewHydra.WBPages.dashboardPages.manualDescription);
      I.click(NewHydra.WBPages.dashboardPages.multipleLanguage);
    }
    I.clearField(NewHydra.WBPages.dashboardPages.headerWelcomeTitle);
    I.clearField(NewHydra.WBPages.dashboardPages.headerTitle);
    I.clearField(NewHydra.WBPages.dashboardPages.headerDescription);
    I.scrollPageToBottom();
    I.click(NewHydra.WBPages.dashboardPages.saveButton);
    I.waitForVisible(NewHydra.WBPages.dashboardPages.successMessage);
    NewHydra.logout();
    //Check Welcome Title
    NewHydra.landingBusinessPage(wizard, '');
    I.dontSeeElement(NewHydra.WBPages.website.welcomeTitle);
    I.dontSeeElement(NewHydra.WBPages.website.title);
    I.dontSeeElement(NewHydra.WBPages.website.description);
  });

Scenario('Add Welcome Title',
  function(I, NewHydra) {
    NewHydra.landing(url + 'logout');
    NewHydra.login(wizard.user);
    NewHydra.openTab('description');

    I.waitForVisible(NewHydra.WBPages.dashboardPages.headerWelcomeTitle);
    let welcome_title = random.string(4);
    I.appendField(NewHydra.WBPages.dashboardPages.headerWelcomeTitle, welcome_title);
    let header_title = random.string(8);
    I.appendField(NewHydra.WBPages.dashboardPages.headerTitle, header_title);
    let header_description = random.string(12);
    I.appendField(NewHydra.WBPages.dashboardPages.headerDescription, header_description);
    I.click(NewHydra.WBPages.dashboardPages.saveButton);
    I.waitForVisible(NewHydra.WBPages.dashboardPages.successMessage);
    NewHydra.logout();
    //Check Welcome Title
    NewHydra.landingBusinessPage(wizard, '');
    I.see(welcome_title, NewHydra.WBPages.website.welcomeTitle);
    I.see(header_title, NewHydra.WBPages.website.title);
    I.see(header_description, NewHydra.WBPages.website.description);
  });

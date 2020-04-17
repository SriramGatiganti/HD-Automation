const {
  wizard,
  url,
  res_url
} = require('../../function/newHydra/wizard_data_provider_new');
let user = wizard.user;
let i;

Feature('New Hydra Dashboard @newHydra_dashboard');
//Feature('New Hydra Dashboard @debug');

Scenario('Upload Menu picture with improper size',
  function(I, NewHydra) {
    NewHydra.landing(url + 'logout');
    NewHydra.login(user);
    NewHydra.openTab('menu');
    I.waitForElement(NewHydra.WBPages.dashboardPages.uploadMenu);
    I.attachFile(NewHydra.WBPages.dashboardPages.uploadMenu, './src/function/data/big_picture_1_oversize.jpg');
    I.click(NewHydra.WBPages.dashboardPages.saveButton);
    //I.waitForText('The image size exceeded the allowed limit (max. 10 MB)');
    I.waitForVisible(NewHydra.WBPages.dashboardPages.errorMessage);

    I.attachFile(NewHydra.WBPages.dashboardPages.uploadMenu, './src/function/data/big_picture_2_overdimension.jpg');
    I.click(NewHydra.WBPages.dashboardPages.saveButton);
    //I.waitForText('The image dimensions are too big (max. 6,000x6,000 pixels)');
    I.waitForVisible(NewHydra.WBPages.dashboardPages.errorMessage);

    NewHydra.logout();
  });

Scenario('Upload Menu',
  function(I, NewHydra) {
    NewHydra.landing(url + 'logout');
    NewHydra.login(user);
    NewHydra.openTab('menu');
    I.waitForElement(NewHydra.WBPages.dashboardPages.uploadMenu);
    I.attachFile(NewHydra.WBPages.dashboardPages.uploadMenu, './src/function/data/menu.pdf');
    I.click(NewHydra.WBPages.dashboardPages.saveButton);
    I.waitForVisible(NewHydra.WBPages.dashboardPages.successMessage);
    I.waitForInvisible(NewHydra.WBPages.dashboardPages.successMessage);
    I.fillField(NewHydra.WBPages.dashboardPages.menuTitle, 'Test for Fun');
    I.wait(1);
    I.click(NewHydra.WBPages.dashboardPages.saveButton);
    I.waitForVisible(NewHydra.WBPages.dashboardPages.successMessage);
    I.waitForInvisible(NewHydra.WBPages.dashboardPages.successMessage);
    NewHydra.logout();
    //Check Menu
    NewHydra.landingBusinessPage(wizard, '#menu');
    I.seeElement(NewHydra.WBPages.website.menuSection);
    I.see('Test for Fun');
  });

Scenario('Delete Menu',
  (I, NewHydra) => {
    NewHydra.landing(url + 'logout');
    NewHydra.login(user);
    NewHydra.openTab('menu');
    I.waitForElement(NewHydra.WBPages.dashboardPages.uploadMenu);
    I.click(NewHydra.WBPages.dashboardPages.deleteMenu + '[2]');
    I.waitForVisible(NewHydra.WBPages.dashboardPages.successMessage);
    NewHydra.logout();
    //Check Menu
    NewHydra.landingBusinessPage(wizard, '#menu');
    I.dontSeeElement(NewHydra.WBPages.website.menuSection);
    I.dontSee('Test for Fun');
  });

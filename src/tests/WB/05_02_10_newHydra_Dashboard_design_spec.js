const random = require('../../function/public/random');
const {
  wizard,
  url,
  res_url
} = require('../../function/newHydra/wizard_data_provider_new');

Feature('New Hydra Dashboard @newHydra_dashboard');
//Feature('New Hydra Dashboard @debug');

Scenario('Change Cover Image from local with improper size',
  (I, NewHydra) => {
    NewHydra.landing(url + 'logout');
    NewHydra.login(wizard.user);
    NewHydra.openTab('design');
    I.waitForElement(NewHydra.WBPages.dashboardPages.designUpload)
    I.attachFile(NewHydra.WBPages.dashboardPages.designUpload, './src/function/data/big_picture_1_oversize.jpg');
    //I.waitForText('The image size exceeded the allowed limit (max. 10 MB)');
    I.waitForVisible(NewHydra.WBPages.dashboardPages.errorMessage)
    I.waitForInvisible(NewHydra.WBPages.dashboardPages.errorMessage);
    I.attachFile(NewHydra.WBPages.dashboardPages.designUpload, './src/function/data/big_picture_2_overdimension.jpg');
    //I.waitForText('The image dimensions are too big (max. 6,000x6,000 pixels)');
    I.waitForVisible(NewHydra.WBPages.dashboardPages.errorMessage);
    I.waitForInvisible(NewHydra.WBPages.dashboardPages.errorMessage);
    //I.click('(//button/span[.="×"])[1]');
    NewHydra.logout();
    //Check Image
    NewHydra.landingBusinessPage(wizard, '');
  });

Scenario('Change Cover Image from local',
  (I, NewHydra) => {
    NewHydra.landing(url + 'logout');
    NewHydra.login(wizard.user);
    NewHydra.openTab('design');

    I.attachFile(NewHydra.WBPages.dashboardPages.designUpload, './src/function/data/test.jpg');
    //I.waitForText('Image successfully added.');
    I.waitForVisible(NewHydra.WBPages.dashboardPages.successMessage)
    NewHydra.logout();
    //Check Image
    NewHydra.landingBusinessPage(wizard, '');
  });

Scenario('Change Cover Image from Metro DB',
  (I, NewHydra) => {
    NewHydra.landing(url + 'logout');
    NewHydra.login(wizard.user);
    NewHydra.openTab('design');
    I.waitForVisible(NewHydra.WBPages.dashboardPages.metroImage);
    I.click(NewHydra.WBPages.dashboardPages.metroImage);
    I.wait(2);
    NewHydra.chooseMetroImage();
    I.waitForVisible(NewHydra.WBPages.dashboardPages.successMessage)
    NewHydra.logout();
    //Check Services
    NewHydra.landingBusinessPage(wizard, '');
  });

Scenario('Change Darkening and Colors',
  async function(I, NewHydra) {
    NewHydra.landing(url + 'logout');
    NewHydra.login(wizard.user);
    NewHydra.openTab('design');
    //Darkening
    I.scrollPageToTop();
    I.waitForVisible(NewHydra.WBPages.dashboardPages.darkening + '[1]');
    I.click(NewHydra.WBPages.dashboardPages.darkening + '[1]');
    I.wait(2);
    I.click(NewHydra.WBPages.dashboardPages.darkening + '[2]');
    I.wait(2);
    //Colors
    let total = await I.grabNumberOfVisibleElements('strong');
    for (let i = 1; i <= total; i++) {
      I.click('(//strong)[' + i + ']');
      I.wait(0.5);
    }
    NewHydra.logout();
    //Check Colors
    NewHydra.landingBusinessPage(wizard, '');
  });

Scenario('Change Fonts',
  async function(I, NewHydra) {
    NewHydra.landing(url + 'logout');
    NewHydra.login(wizard.user);
    NewHydra.openTab('design');

    I.waitForVisible(NewHydra.WBPages.dashboardPages.fontOption);
    let total = await I.grabNumberOfVisibleElements(NewHydra.WBPages.dashboardPages.fontOption);
    let values = [];
    let num;
    for (i = 1; i <= total; i++) {
      let value = await I.grabAttributeFrom(NewHydra.WBPages.dashboardPages.fontOption + '[' + i + ']', 'value');
      values.push(value);
    };
    I.wait(2);
    I.say(values);
    I.selectOption(NewHydra.WBPages.dashboardPages.titleFont, values[Math.floor(Math.random() * total)]);
    I.selectOption(NewHydra.WBPages.dashboardPages.subtitleFont, values[Math.floor(Math.random() * total)]);
    I.selectOption(NewHydra.WBPages.dashboardPages.bodyFont, values[Math.floor(Math.random() * total)]);
    I.click(NewHydra.WBPages.dashboardPages.saveButton);
    I.waitForVisible(NewHydra.WBPages.dashboardPages.successMessage);
    NewHydra.logout();
    NewHydra.landingBusinessPage(wizard, '');
  });

Scenario('Check establishent logo',
  (I, NewHydra) => {
    //Change logo
    NewHydra.landing(url + 'logout');
    NewHydra.login(wizard.user);
    NewHydra.openTab('design');
    //Add invalid picture to logo
    I.waitForElement(NewHydra.WBPages.dashboardPages.imageLogo);
    I.attachFile(NewHydra.WBPages.dashboardPages.imageLogo, './src/function/data/big_picture_1_oversize.jpg');
    //I.waitForText('The image size exceeded the allowed limit (max. 10 MB).');
    I.waitForVisible(NewHydra.WBPages.dashboardPages.errorMessage);
    I.waitForInvisible(NewHydra.WBPages.dashboardPages.errorMessage);
    I.attachFile(NewHydra.WBPages.dashboardPages.imageLogo, './src/function/data/big_picture_2_overdimension.jpg');
    I.click(NewHydra.WBPages.dashboardPages.saveButton + '[3]');
    //I.waitForText('The image dimensions are too big (max. 6,000x6,000 pixels)');
    I.waitForVisible(NewHydra.WBPages.dashboardPages.errorMessage);
    //Add valid picture to log
    I.attachFile(NewHydra.WBPages.dashboardPages.imageLogo, './src/function/data/test.jpg');
    I.click(NewHydra.WBPages.dashboardPages.saveButton + '[3]');
    I.waitForVisible(NewHydra.WBPages.dashboardPages.successMessage);
    NewHydra.landingBusinessPage(wizard, '');
    I.waitForVisible(NewHydra.WBPages.website.logoImg)
    //Remove picture and turn off logo
    NewHydra.landing(url);;
    NewHydra.openTab('design');
    I.wait(2);
    I.waitForVisible(NewHydra.WBPages.dashboardPages.deleteLogo);
    I.click(NewHydra.WBPages.dashboardPages.deleteLogo);
    I.waitForVisible(NewHydra.WBPages.dashboardPages.successMessage);
    I.waitForVisible(NewHydra.WBPages.dashboardPages.showLogo);
    I.click(NewHydra.WBPages.dashboardPages.showLogo);
    I.click(NewHydra.WBPages.dashboardPages.saveButton + '[3]');
    I.waitForVisible(NewHydra.WBPages.dashboardPages.successMessage);
    NewHydra.landingBusinessPage(wizard, '');
    I.dontSee(wizard.contact.businessName.toUpperCase(), '.logo-name');
    NewHydra.landing(url + 'logout');
  });

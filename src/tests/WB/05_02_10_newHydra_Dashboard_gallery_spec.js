const random = require('../../function/public/random');
const {
  wizard,
  url,
  res_url
} = require('../../function/newHydra/wizard_data_provider_new');
let user = wizard.user;

Feature('New Hydra Dashboard @newHydra_dashboard');
//Feature('New Hydra Dashboard @debug');

Scenario('Upload Gallery picture with improper size',
  function(I, NewHydra) {
    NewHydra.landing(url + 'logout');
    NewHydra.login(user);
    NewHydra.openTab('galleryMedia');
    I.waitForElement(NewHydra.WBPages.dashboardPages.uploadImage);
    I.attachFile(NewHydra.WBPages.dashboardPages.uploadImage, './src/function/data/big_picture_1_oversize.jpg');
    //I.waitForText('The image size exceeded the allowed limit (max. 10 MB)');
    I.waitForVisible(NewHydra.WBPages.dashboardPages.errorMessage);
    I.attachFile(NewHydra.WBPages.dashboardPages.uploadImage, './src/function/data/big_picture_2_overdimension.jpg');
    I.waitForVisible(NewHydra.WBPages.dashboardPages.updateGallery);
    I.click(NewHydra.WBPages.dashboardPages.updateGallery);
    //I.waitForText('The image dimensions are too big (max. 6,000x6,000 pixels).');
    I.waitForVisible(NewHydra.WBPages.dashboardPages.errorMessage);
    NewHydra.logout();
  });

Scenario('Add image to Gallery',
  function(I, NewHydra) {
    NewHydra.landing(url + 'logout');
    NewHydra.login(user);
    NewHydra.openTab('galleryMedia');
    I.waitForElement(NewHydra.WBPages.dashboardPages.uploadImage);
    I.attachFile(NewHydra.WBPages.dashboardPages.uploadImage, './src/function/data/test.jpg');
    I.waitForVisible(NewHydra.WBPages.dashboardPages.galleryDescription);
    I.fillField(NewHydra.WBPages.dashboardPages.galleryDescription, 'Hello World');
    I.click(NewHydra.WBPages.dashboardPages.updateGallery);
    I.waitForVisible(NewHydra.WBPages.dashboardPages.successMessage);
    I.waitForVisible(NewHydra.WBPages.dashboardPages.listDescription);
    NewHydra.logout();
    NewHydra.landingBusinessPage(wizard, '#impressions');
    I.waitForVisible('//img[@alt="Hello World"]');
    I.see('Hello World', NewHydra.WBPages.website.gallery);
  });

Scenario('Edit text from Gallery',
  function(I, NewHydra) {
    NewHydra.landing(url + 'logout');
    NewHydra.login(user);
    NewHydra.openTab('galleryMedia');
    I.waitForVisible(NewHydra.WBPages.dashboardPages.editGallery);
    I.click(NewHydra.WBPages.dashboardPages.editGallery);
    I.waitForVisible(NewHydra.WBPages.dashboardPages.cancelChangeGallery);
    I.fillField(NewHydra.WBPages.dashboardPages.listDescription, 'Hello World 1');
    I.click(NewHydra.WBPages.dashboardPages.saveChangeGallery);
    I.waitForVisible(NewHydra.WBPages.dashboardPages.successMessage);
    NewHydra.logout();
    NewHydra.landingBusinessPage(wizard, '#impressions');
    I.waitForVisible('//img[@alt="Hello World 1"]');
    I.see('Hello World 1', NewHydra.WBPages.website.gallery);
  });

Scenario('Delete image from Gallery',
  function(I, NewHydra) {
    NewHydra.landing(url + 'logout');
    NewHydra.login(user);
    NewHydra.openTab('galleryMedia');
    I.waitForVisible(NewHydra.WBPages.dashboardPages.deleteGallery);
    I.click(NewHydra.WBPages.dashboardPages.deleteGallery);
    I.waitForVisible(NewHydra.WBPages.dashboardPages.removeConfirm)
    I.click(NewHydra.WBPages.dashboardPages.removeConfirm)
    I.waitForVisible(NewHydra.WBPages.dashboardPages.successMessage);
    NewHydra.logout();
    NewHydra.landingBusinessPage(wizard, '#impressions');
    I.dontSee('//img[@alt="Hello World 1"]');
  });

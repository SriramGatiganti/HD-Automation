const random = require('../../function/public/random');
const {
  wizard,
  url,
  res_url
} = require('../../function/newHydra/wizard_data_provider_new');
let user = wizard.user;
const image_to_load = 10;
let story = {
  story_title: random.string(6),
  story_subtitle: random.string(10),
  story_description: random.string(18),
  story_url: 'https://www.google.com'
}

Feature('New Hydra Dashboard @newHydra_dashboard');
//Feature('New Hydra Dashboard @debug');

Scenario('Add Story Image from Local with improper size',
  function(I, NewHydra) {
    NewHydra.landing(url + 'logout');
    NewHydra.login(user);
    NewHydra.openTab('content');

    //Adding improper image
    NewHydra.addContentBlock(1);

    I.waitForElement(NewHydra.WBPages.dashboardPages.uploadFile.replace('number', '1'));
    I.attachFile(NewHydra.WBPages.dashboardPages.uploadFile.replace('number', '1'), './src/function/data/big_picture_1_oversize.jpg');
    //I.waitForText('The image size exceeded the allowed limit (max. 10 MB)');
    I.waitForVisible(NewHydra.WBPages.dashboardPages.errorMessage)
    I.waitForInvisible(NewHydra.WBPages.dashboardPages.errorMessage);
    //Will appear only after filling story contents
    I.refreshPage();
    NewHydra.addContentBlock(1);
    NewHydra.addStory(story, 1);
    I.waitForElement(NewHydra.WBPages.dashboardPages.uploadFile.replace('number', '1'));
    I.attachFile(NewHydra.WBPages.dashboardPages.uploadFile.replace('number', '1'), './src/function/data/big_picture_2_overdimension.jpg');
    I.wait(2);
    I.click(NewHydra.WBPages.dashboardPages.saveButton + '[2]');
    //I.waitForText('The image dimensions are too big (max. 6,000x6,000 pixels)');
    I.waitForVisible(NewHydra.WBPages.dashboardPages.errorMessage);
    I.waitForInvisible(NewHydra.WBPages.dashboardPages.errorMessage);
    NewHydra.deleteStory(1);
    NewHydra.logout();
  });

Scenario('Add Story Image from Metro',
  function(I, NewHydra) {
    NewHydra.landing(url + 'logout');
    NewHydra.login(user);
    NewHydra.openTab('content');
    NewHydra.addContentBlock(1);
    NewHydra.addStory(story, 1);
    //Adding image from Metro
    I.scrollPageToTop();
    I.click(NewHydra.WBPages.dashboardPages.metroImage);
    NewHydra.chooseMetroImage();
    I.click(NewHydra.WBPages.dashboardPages.saveButton + '[2]');
    I.waitForVisible(NewHydra.WBPages.dashboardPages.successMessage);
    I.wait(image_to_load);
    NewHydra.logout();
    //Check Story
    NewHydra.landingBusinessPage(wizard, '#journals');
    NewHydra.checkStory(story);
  });

Scenario('Add Story Image from Local',
  async function(I, NewHydra) {
    NewHydra.landing(url + 'logout');
    NewHydra.login(user);
    NewHydra.openTab('content');

    let story = await {
      story_title: random.string(6),
      story_subtitle: random.string(10),
      story_description: random.string(18),
      story_url: 'https://www.google.com'
    }
    NewHydra.addContentBlock(1);
    NewHydra.addStory(story, 1);
    //Adding image
    I.waitForElement(NewHydra.WBPages.dashboardPages.uploadFile.replace('number', '1'));
    I.attachFile(NewHydra.WBPages.dashboardPages.uploadFile.replace('number', '1'), './src/function/data/story.jpg');
    I.click(NewHydra.WBPages.dashboardPages.saveButton + '[2]');
    I.waitForVisible(NewHydra.WBPages.dashboardPages.successMessage);
    I.wait(image_to_load);
    NewHydra.logout();
    //Check Story
    NewHydra.landingBusinessPage(wizard, '#journals');
    NewHydra.checkStory(story);
  });

Scenario('Delete Story',
  function(I, NewHydra) {
    NewHydra.landing(url + 'logout');
    NewHydra.login(user);
    NewHydra.openTab('content');
    I.waitForVisible(NewHydra.WBPages.dashboardPages.storyList);
    I.click(NewHydra.WBPages.dashboardPages.storyList);
    NewHydra.deleteStoryFromList(1);
    I.wait(2);
    NewHydra.deleteStoryFromList(1);
    I.wait(2);
    NewHydra.logout();
    //Check Story
    NewHydra.landingBusinessPage(wizard, '#journals');
    I.dontSeeElement(NewHydra.WBPages.website.storyImage);
    I.dontSeeElement(NewHydra.WBPages.website.storySection);
  });
//Add the voucher
Scenario('Add Voucher using Image from Local',
  function(I, NewHydra) {
    NewHydra.landing(url + 'logout');
    NewHydra.login(user);
    NewHydra.openTab('content');
    I.waitForVisible(NewHydra.WBPages.dashboardPages.voucherList);
    I.click(NewHydra.WBPages.dashboardPages.voucherList);
    I.waitForVisible(NewHydra.WBPages.dashboardPages.addItem + '[2]');
    I.click(NewHydra.WBPages.dashboardPages.addItem + '[2]');
    NewHydra.addStory(story, 2);
    //Adding image from Local
    I.attachFile(NewHydra.WBPages.dashboardPages.uploadFile.replace('number', '2'), './src/function/data/story.jpg');
    I.wait(2);
    I.click(NewHydra.WBPages.dashboardPages.saveButton + '[3]');
    I.waitForVisible(NewHydra.WBPages.dashboardPages.successMessage);
    I.wait(image_to_load);
    NewHydra.logout();

    //Check Story
    NewHydra.landingBusinessPage(wizard, '#vouchers');
    NewHydra.checkStory(story);
  });
Feature('New Hydra Dashboard @newHydra_dashboard');
Scenario('Delete Voucher',
  function(I, NewHydra) {
    NewHydra.landing(url + 'logout');
    NewHydra.login(user);
    NewHydra.openTab('content');
    I.waitForVisible(NewHydra.WBPages.dashboardPages.voucherList);
    I.click(NewHydra.WBPages.dashboardPages.voucherList);
    NewHydra.deleteStoryFromList(2);
    I.wait(2);
    NewHydra.logout();
    //Check Story
    NewHydra.landingBusinessPage(wizard, '#vouchers');
    I.dontSeeElement(NewHydra.WBPages.website.storyImage);
    I.dontSeeElement(NewHydra.WBPages.website.storySection);
  });

Scenario('Add Story Image from Local afterwards',
  function(I, NewHydra) {
    NewHydra.landing(url + 'logout');
    NewHydra.login(user);
    NewHydra.openTab('content');
    NewHydra.addContentBlock(1);
    NewHydra.addStory(story, 1);
    I.click(NewHydra.WBPages.dashboardPages.saveButton + '[2]'); //Save it
    I.waitForVisible(NewHydra.WBPages.dashboardPages.successMessage);
    //Add image
    I.waitForElement(NewHydra.WBPages.dashboardPages.uploadFile.replace('number', '1'));
    I.attachFile(NewHydra.WBPages.dashboardPages.uploadFile.replace('number', '1'), './src/function/data/story.jpg');
    I.click(NewHydra.WBPages.dashboardPages.saveButton + '[2]');
    I.waitForVisible(NewHydra.WBPages.dashboardPages.successMessage);
    I.wait(image_to_load);
    NewHydra.logout();
    //Check Story
    NewHydra.landingBusinessPage(wizard, '#journals');
    NewHydra.checkStory(story);
    NewHydra.landing(url + 'logout');
    NewHydra.login(user);
    NewHydra.openTab('content');
    I.waitForVisible(NewHydra.WBPages.dashboardPages.storyList);
    I.click(NewHydra.WBPages.dashboardPages.storyList);
    NewHydra.deleteStoryFromList(1);
    I.wait(2);
    NewHydra.logout();
    //Check Story not there
    NewHydra.landingBusinessPage(wizard, '#journals');
    I.dontSeeElement(NewHydra.WBPages.website.storyImage);
    I.dontSeeElement(NewHydra.WBPages.website.storySection);
  });

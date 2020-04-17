const {
  wizard,
  url,
  res_url
} = require('../../function/newHydra/wizard_data_provider_new');
let languages = ['en', 'de', 'fr', 'it', 'ru', 'es', 'tr', 'cs', 'pl', 'pt', 'hr', 'hu', 'uk', 'nl', 'ja', 'zh'];
let t_url = 'https://' + wizard.subdomain + '.' + wizard.domain;

Feature('Check texts generated for multiple languages @newHydra_dashboard');
//Feature('Check texts generated for multiple languages @debug');
//Initial stats: multi language disabled, keep updated disabled,manual description
if (wizard.country != 'Romania') {
  Scenario('Turn on multiple languages and check',
    async function(I, NewHydra) {
      NewHydra.landing(url + 'logout');
      NewHydra.login(wizard.user);
      NewHydra.openTab('description');

      I.scrollPageToBottom();
      I.click(NewHydra.WBPages.dashboardPages.multipleLanguage);
      I.wait(1);
      I.click(NewHydra.WBPages.dashboardPages.saveButton);
      I.waitForVisible(NewHydra.WBPages.dashboardPages.successMessage);
      I.waitForInvisible(NewHydra.WBPages.dashboardPages.successMessage);
      //Generate one
      I.scrollPageToTop();
      I.click(NewHydra.WBPages.dashboardPages.autoDescription);
      I.waitForVisible(NewHydra.WBPages.dashboardPages.generateButton);
      I.click(NewHydra.WBPages.dashboardPages.generateButton);
      I.waitForVisible(NewHydra.WBPages.dashboardPages.confirmButton);
      I.click(NewHydra.WBPages.dashboardPages.confirmButton);
      I.waitForInvisible(NewHydra.WBPages.dashboardPages.confirmButton);
      I.waitForDetached(NewHydra.WBPages.dashboardPages.loadingState);
      I.wait(5);
      I.scrollTo(NewHydra.WBPages.dashboardPages.saveButton);
      I.click(NewHydra.WBPages.dashboardPages.saveButton);
      I.waitForVisible(NewHydra.WBPages.dashboardPages.successMessage);
      I.waitForInvisible(NewHydra.WBPages.dashboardPages.successMessage);
      //Get descriptions and prepare for checking languages
      let description = await I.grabTextFrom(NewHydra.WBPages.dashboardPages.headerDescription);
      let w_description;
      let result = '';
      const LanguageDetect = require('languagedetect');
      const lngDetector = new LanguageDetect();
      //Check languages: all the languages
      I.wait(5);
      for (var i in languages) {
        NewHydra.landing(t_url + '?lang=' + languages[i]);
        I.waitForVisible(NewHydra.WBPages.website.description);
        w_description = await I.grabTextFrom(NewHydra.WBPages.website.description);
        result = result + languages[i] + ' : ' + lngDetector.detect(w_description[0], 1) + '\n';
      }
      I.say(result);
    });

  //Stats: multi language enabled, keep updated enabled
  Scenario('Turn off multiple languages and check',
    async function(I, NewHydra) {
      NewHydra.landing(url + 'logout');
      NewHydra.login(wizard.user);
      NewHydra.openTab('description');
      //Turn off multiple languages
      I.click(NewHydra.WBPages.dashboardPages.multipleLanguage);
      //I.waitForText('Do you really want to disable multi-language support?');
      //I.click('//button[@type="reset"]/../button[2]');
      I.click(NewHydra.WBPages.dashboardPages.saveButton);
      I.waitForVisible(NewHydra.WBPages.dashboardPages.successMessage);
      I.waitForInvisible(NewHydra.WBPages.dashboardPages.successMessage);
      //Generate one
      I.scrollPageToTop();
      I.waitForVisible(NewHydra.WBPages.dashboardPages.generateButton);
      I.click(NewHydra.WBPages.dashboardPages.generateButton);
      I.waitForVisible(NewHydra.WBPages.dashboardPages.confirmButton);
      I.click(NewHydra.WBPages.dashboardPages.confirmButton);
      I.waitForInvisible(NewHydra.WBPages.dashboardPages.confirmButton);
      I.waitForDetached(NewHydra.WBPages.dashboardPages.loadingState);
      I.wait(5);
      I.scrollTo(NewHydra.WBPages.dashboardPages.saveButton);
      I.click(NewHydra.WBPages.dashboardPages.saveButton);
      I.waitForVisible(NewHydra.WBPages.dashboardPages.successMessage);
      I.waitForInvisible(NewHydra.WBPages.dashboardPages.successMessage);
      //Get descriptions and prepare for checking languages
      let description = await I.grabTextFrom(NewHydra.WBPages.dashboardPages.headerDescription);
      let w_description;
      let result = '';
      const LanguageDetect = require('languagedetect');
      const lngDetector = new LanguageDetect();
      //Check languages: all the languages
      I.wait(5);
      for (var i in languages) {
        NewHydra.landing(t_url + '?lang=' + languages[i]);
        I.waitForVisible(NewHydra.WBPages.website.description);
        w_description = await I.grabTextFrom(NewHydra.WBPages.website.description);
        result = result + languages[i] + ' : ' + lngDetector.detect(w_description[0], 1) + '\n';
      }
      I.say(result);
    });

  //Status: multi language disabled, keep updated enabled
  Scenario('Check the changes for turn on multiple languages',
    async function(I, NewHydra) {
      NewHydra.landing(url + 'logout');
      NewHydra.login(wizard.user);
      NewHydra.openTab('description');
      //Turn on multiple languages
      I.click(NewHydra.WBPages.dashboardPages.multipleLanguage);
      I.click(NewHydra.WBPages.dashboardPages.saveButton);
      I.waitForVisible(NewHydra.WBPages.dashboardPages.successMessage);
      I.waitForInvisible(NewHydra.WBPages.dashboardPages.successMessage);
      //Generate one
      I.scrollPageToTop();
      I.click(NewHydra.WBPages.dashboardPages.generateButton);
      I.waitForVisible(NewHydra.WBPages.dashboardPages.confirmButton);
      I.click(NewHydra.WBPages.dashboardPages.confirmButton);
      I.waitForInvisible(NewHydra.WBPages.dashboardPages.confirmButton);
      I.waitForDetached(NewHydra.WBPages.dashboardPages.loadingState);
      I.wait(5);
      //Change text
      I.click(NewHydra.WBPages.dashboardPages.manualDescription);
      I.waitForVisible(NewHydra.WBPages.dashboardPages.headerDescription);
      I.fillField(NewHydra.WBPages.dashboardPages.headerDescription, 'TestTestTest');
      //Save
      I.scrollTo(NewHydra.WBPages.dashboardPages.saveButton);
      I.click(NewHydra.WBPages.dashboardPages.saveButton);
      I.waitForVisible(NewHydra.WBPages.dashboardPages.successMessage);
      I.waitForInvisible(NewHydra.WBPages.dashboardPages.successMessage);
      //Check each languages
      let result = '';
      let w_description = '';
      I.wait(5);
      for (var i in languages) {
        NewHydra.landing(t_url + '?lang=' + languages[i]);
        I.waitForVisible(NewHydra.WBPages.website.description);
        w_description = await I.grabTextFrom(NewHydra.WBPages.website.description);
        result = result + languages[i] + ' : ' + (w_description[0] == 'TestTestTest') + '\n';
      }
      I.say(result);
    });
  //Status: multi language enabled, keep updated disabled
  Scenario('Check the changes for turn off multiple languages',
    async function(I, NewHydra) {
      NewHydra.landing(url + 'logout');
      NewHydra.login(wizard.user);
      NewHydra.openTab('description');
      //Turn off multiple languages
      I.click(NewHydra.WBPages.dashboardPages.manualDescription);
      I.click(NewHydra.WBPages.dashboardPages.multipleLanguage);
      I.click(NewHydra.WBPages.dashboardPages.saveButton);
      I.waitForVisible(NewHydra.WBPages.dashboardPages.successMessage);
      I.waitForInvisible(NewHydra.WBPages.dashboardPages.successMessage);
      //Generate one
      I.scrollPageToTop();
      //Change text
      I.waitForVisible(NewHydra.WBPages.dashboardPages.headerDescription);
      I.fillField(NewHydra.WBPages.dashboardPages.headerDescription, 'TestTestTest');
      //Save
      I.scrollTo(NewHydra.WBPages.dashboardPages.saveButton);
      I.click(NewHydra.WBPages.dashboardPages.saveButton);
      I.waitForVisible(NewHydra.WBPages.dashboardPages.successMessage);
      I.waitForInvisible(NewHydra.WBPages.dashboardPages.successMessage);
      //Check each languages
      let result = '';
      let w_description = '';
      I.wait(5);
      for (var i in languages) {
        NewHydra.landing(t_url + '?lang=' + languages[i]);
        I.waitForVisible(NewHydra.WBPages.website.description);
        w_description = await I.grabTextFrom(NewHydra.WBPages.website.description);
        result = result + languages[i] + ' : ' + (w_description[0] == 'TestTestTest') + '\n';
      }
      I.say(result);
    });
}

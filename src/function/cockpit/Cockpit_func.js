const user = require('../data/user').user;
let path = require('path');
let t_path = path.join(__dirname, '..', 'data', 'Testing_Data.csv');
//let t_d_path = path.join(__dirname, '..', 'data', 'SETUP.txt');
let t_d_path = path.join(__dirname, '..', 'data', 'Testing_Data.csv');
let fs = require("fs");
let endOfLine = require('os').EOL;
let I;

module.exports = {
  _init() {
    I = actor();
  },

  //Login cockpit app
  login(user) {
    I.amOnPage(user.c_url);
    I.setCookie({
      name: 'DISABLE_TRACKING',
      value: 'true'
    });
    //I.waitForVisible('//button[contains(.,"agree to cookies")]');
    //I.click('//button[contains(.,"agree to cookies")]');
    I.wait(3);
    I.click('/html/body/div[1]/app-root/div/div/div/div[2]/button[1]/div');
    //pause();
    I.seeElement('.gc-page');
    I.fillField('body > div.gc-page > app-root > app-login > app-public-page > div > div.gc-public-page__content > div.gc-login__card > app-card > div > div.gc-card__content > div > form > gc-text-field:nth-child(1) > div > div.gc-text-field__infix > input', user.username); // 'user@fandbtool.com'
    I.fillField('body > div.gc-page > app-root > app-login > app-public-page > div > div.gc-public-page__content > div.gc-login__card > app-card > div > div.gc-card__content > div > form > gc-text-field:nth-child(2) > div > div.gc-text-field__infix > input', 'Hallo123!');
    //I.waitForVisible('//div[contains(@class,"gc-button-container gc-button-primary")]/button');
    I.click('body > div.gc-page > app-root > app-login > app-public-page > div > div.gc-public-page__content > div.gc-login__card > app-card > div > div.gc-card__content > div > form > div.gc-login__card-login > button > div');
    I.wait(2);
    // Click appcues bannner if showing
    // I.see('Verstanden').catch( () => console.log('No appcues'));
    /**
    try{
      I.see('Verstanden');
    }
    catch(error){
      console.log('Clicked app cues');
    } **/
  },
  firstaccess(user) {
    I.waitForElement(".gc-header__button.active");
    I.waitForVisible(".gc-header__button.active");
    I.wait(5);
    I.click('body > div.gc-page > app-root > app-pages > div > div > app-settings > main > div > app-module-settings > div.gc-module-settings__header > div > app-menu > div > app-text-field > div');
    I.click('body > div.gc-page > app-root > app-pages > div > div > app-settings > main > div > app-module-settings > div.gc-module-settings__header > div > app-menu > div > div > app-list > app-list-item > div');
    //pause();
    I.wait(2);
    I.click('body > div.gc-page > app-root > app-pages > div > app-header > header > div > div.gc-header__outer-layout-container > div.gc-header__inner-layout-container > app-navigation-overview > div > div.gc-header__navigation-button.gc-header__navigation-button--right.inactive.ng-star-inserted > div.gc-header__navigation-button-text');
    I.wait(3);
    I.click('Alles klar!');
    I.click('/html/body/div[1]/app-root/app-pages/div/div/app-dashboard/main/div[1]/app-modal/div/div/div/div[3]/div/app-button/div/button');
    //I.click('body > div.gc-page > app-root > app-pages > div > div > app-dashboard > main > div:nth-child(2) > app-modal > div > div > div > div.gc-modal__custom-footer > app-default-revenue-goal-modal-custom-footer > div > div.gc-revenue-goal-modal__footer-button-confirm > app-button > div > button > div');
    //I.click('.gc-button');


  },
  check_settings(user) {
    pause();
    I.waitForElement(".gc-header__button.active");
    I.waitForVisible(".gc-header__button.active");
    I.wait(5);
    I.click('body > div.gc-page > app-root > app-pages > div > div > app-settings > main > div > app-module-settings > div.gc-module-settings__header > div > app-menu > div > app-text-field > div');
    I.click('body > div.gc-page > app-root > app-pages > div > div > app-settings > main > div > app-module-settings > div.gc-module-settings__header > div > app-menu > div > div > app-list > app-list-item > div');
    //pause();
    I.wait(2);
    I.click('body > div.gc-page > app-root > app-pages > div > app-header > header > div > div.gc-header__outer-layout-container > div.gc-header__inner-layout-container > app-navigation-overview > div > div.gc-header__navigation-button.gc-header__navigation-button--right.inactive.ng-star-inserted > div.gc-header__navigation-button-text');
    I.wait(3);
    I.click('Alles klar!');
    //I.click('body > div.gc-page > app-root > app-pages > div > div > app-dashboard > main > div:nth-child(2) > app-modal > div > div > div > div.gc-modal__custom-footer > app-default-revenue-goal-modal-custom-footer > div > div.gc-revenue-goal-modal__footer-button-confirm > app-button > div > button > div');
    //I.click('.gc-button');

  },
  set_branch(user) {

    I.click('#navLinkSettings');
    //I.click('//*[@id="navLinkSettings"]/div');
    // Set revenue goal
    I.click('/html/body/div[1]/app-root/app-pages/div/div/app-settings/main/div/app-module-settings/div[2]/app-sidebar/div/app-list/app-list-item[2]/div/div');
    I.fillField('/html/body/div[1]/app-root/app-pages/div/div/app-settings/main/div/app-module-settings/div[2]/div/app-budget-settings/div[3]/div/div[4]/app-number-input/div/input', '12000');
    I.click('/html/body/div[1]/app-root/app-pages/div/div/app-settings/main/div/app-module-settings/div[2]/app-sidebar/div/app-list/app-list-item[1]/div/div');
    I.click('/html/body/div[1]/app-root/app-pages/div/div/app-settings/main/div/app-module-settings/div[2]/div/app-budget-settings/app-budget-chart/app-budget-chart-feedback-toast/div/div[2]/div[2]/button[2]');
    I.click('/html/body/div[1]/app-root/app-pages/div/div/app-settings/main/div/app-module-settings/div[2]/app-sidebar/div/app-list/app-list-item[1]/div/div');
    // Set food costs
    I.click('/html/body/div[1]/app-root/app-pages/div/div/app-settings/main/div/app-module-settings/div[2]/div/app-costs-settings/div[2]/table/tbody[1]/tr/td[2]/div/span');
    I.fillField('/html/body/div[1]/app-root/app-pages/div/div/app-settings/main/div/app-module-settings/div[2]/div/app-costs-settings/div[2]/table/tbody[1]/tr[1]/td[2]/input', 'Waren');
    I.click('/html/body/div[1]/app-root/app-pages/div/div/app-settings/main/div/app-module-settings/div[2]/div/app-costs-settings/div[2]/table/tbody[1]/tr[1]/td[3]/app-number-input/div/div[2]/div[2]');
    I.fillField('/html/body/div[1]/app-root/app-pages/div/div/app-settings/main/div/app-module-settings/div[2]/div/app-costs-settings/div[2]/table/tbody[1]/tr[1]/td[3]/app-number-input/div/input','10');
    I.click('/html/body/div[1]/app-root/app-pages/div/div/app-settings/main/div/app-module-settings/div[2]/div/app-costs-settings/div[2]/table/tbody[1]/tr[1]/td[4]/div/div[1]');

    I.click('/html/body/div[1]/app-root/app-pages/div/div/app-settings/main/div/app-module-settings/div[2]/div/app-costs-settings/div[2]/table/tbody[2]/tr/td[2]/div/span');
    I.fillField('/html/body/div[1]/app-root/app-pages/div/div/app-settings/main/div/app-module-settings/div[2]/div/app-costs-settings/div[2]/table/tbody[2]/tr[1]/td[2]/input', 'Lohnen');
    I.click('/html/body/div[1]/app-root/app-pages/div/div/app-settings/main/div/app-module-settings/div[2]/div/app-costs-settings/div[2]/table/tbody[2]/tr[1]/td[3]/app-number-input/div/div[2]/div[2]');
    I.fillField('/html/body/div[1]/app-root/app-pages/div/div/app-settings/main/div/app-module-settings/div[2]/div/app-costs-settings/div[2]/table/tbody[2]/tr[1]/td[3]/app-number-input/div/input','40');
    //pause();
    I.click('/html/body/div[1]/app-root/app-pages/div/div/app-settings/main/div/app-module-settings/div[2]/div/app-costs-settings/div[2]/table/tbody[2]/tr[1]/td[4]/div/div[1]');
    I.click('/html/body/div[1]/app-root/app-pages/div/div/app-settings/main/div/app-module-settings/div[2]/div/app-costs-settings/div[2]/table/tbody[4]/tr/td[2]/div/span');
    I.fillField('/html/body/div[1]/app-root/app-pages/div/div/app-settings/main/div/app-module-settings/div[2]/div/app-costs-settings/div[2]/table/tbody[4]/tr[1]/td[2]/input', 'Steuern');
    I.click('/html/body/div[1]/app-root/app-pages/div/div/app-settings/main/div/app-module-settings/div[2]/div/app-costs-settings/div[2]/table/tbody[4]/tr[1]/td[3]/app-number-input/div/div[2]/div[2]');
    I.fillField('/html/body/div[1]/app-root/app-pages/div/div/app-settings/main/div/app-module-settings/div[2]/div/app-costs-settings/div[2]/table/tbody[4]/tr[1]/td[3]/app-number-input/div/input','50');
    I.click('/html/body/div[1]/app-root/app-pages/div/div/app-settings/main/div/app-module-settings/div[2]/div/app-costs-settings/div[2]/table/tbody[4]/tr[1]/td[4]/div/div[1]');
  },


  //Adding branch office
  async addBranchoffice(user){

    //Delete account
    I.click('#navLinkSettings');
    I.waitForVisible('//span[contains(text(),"Office and account management")]');
    I.click('//span[contains(text(),"Office and account management")]');
    I.waitForVisible('//div[contains(text(),"Branch offices")]');
    I.click('//div[contains(text(),"Branch offices")]');
    I.waitForVisible('//span[@class="gc-create-new-store__icon gc-icon__add"]');
    I.click('//span[@class="gc-create-new-store__icon gc-icon__add"]');
    I.waitForVisible('//input[@placeholder="Name of branch office"]');
    I.fillField('//input[@placeholder="Name of branch office"]',user.c_branchofficeNew);
    I.fillField('//div[@class="gc-form-field__content"]//input[@placeholder="Street"]',);
    I.fillField('//div[@class="gc-form-field__content"]//input[@placeholder="House no."]',);
    I.fillField('//div[@class="gc-form-field__content"]//input[@placeholder="Postcode"]',);
    I.fillField('//div[@class="gc-form-field__content"]//input[@placeholder="City"]',);
    I.selectOption('//select[@class="ng-tns-c66-18 gc-def-select__field ng-pristine ng-invalid ng-touched"]','Germany');
    I.click('//button[contains(text(),"Apply & connect POS system")]"]');

    //CnfMsg = await I.grabTextFrom('//div[@class="gc-snackbar__message"]');
    //I.seeTextEquals('Your account has been successfully deleted. Register for the cockpit at any time in the future to be able to analyze your POS data again!',CnfMsg);
  },

  //Logout cockpit app
  logout() {
    I.click("//*[@id=\"navLinkLogout\"]");
    //I.waitForVisible("//span[contains(.,'chez juliette')]");
    //I.click('//div[contains(@routerlink,"/pages/login")]');
  },
  deleteAccount() {
    I.click('#navLinkAccount');
    I.click('/html/body/div[1]/app-root/app-pages/div/div/app-settings/main/div/app-account-management-settings/div/div/app-company-settings/form/div[2]/app-your-account-settings/form/div[4]/app-button/div/button');
    I.click('/html/body/div[1]/app-root/app-pages/div/div/app-settings/main/div/app-account-management-settings/div/div/app-company-settings/form/div[2]/app-your-account-settings/app-modal/div/div/div/div[4]/div[2]/app-button/div/button');
  }
};

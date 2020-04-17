const {
  wizard,
  url,
  res_url,
  d_url,
  language
} = require('../../function/newHydra/wizard_data_provider_new');
let user = wizard.user
let result = '';
let users = [""];

Feature('DISH Login @dish_login');

Scenario('Login into DISH',
  async function(I, DISH, NewHydra) {
    NewHydra.landing(d_url + wizard.countryCode);
    for (var i = 0; i < users.length; i++) {
      I.wait(2);
      user.username = users[i];
      DISH.login(user);
      I.waitForVisible('(//h2)[1]');
      let text = await I.grabTextFrom('(//h2)[1]');
      result = result + users[i] + '\t' + text + '\n';
      DISH.logout();
    };
    I.say(result);
  })

Feature('DISH Login @dish_delete');
Scenario('Delete users in DISH',
  async function(I, DISH, NewHydra) {
    NewHydra.landing(d_url + DISH.getCountryCode(wizard.country));
    for (var i = 0; i < users.length; i++) {
      I.wait(2);
      user.username = users[i];
      I.clearCookie();
      I.waitForVisible(DISH.DISHPages.homePage.loginButton);
      I.click(DISH.DISHPages.homePage.loginButton);
      I.waitForVisible(DISH.DISHPages.loginPage.emailTab);
      I.click(DISH.DISHPages.loginPage.emailTab);
      I.wait(1);
      I.fillField(DISH.DISHPages.loginPage.username, user.username);
      I.fillField(DISH.DISHPages.loginPage.password, user.password);
      I.click(DISH.DISHPages.loginPage.loginButton);
      I.wait(1);
      //Add number for legacy users
      let n = await I.grabNumberOfVisibleElements('.country-prefix.mobile-verify-country-prefix');
      I.say(n)
      if (n != 0) {
        I.selectOption('.country-prefix.mobile-verify-country-prefix', 'RU');
        I.fillField('.mobile-verify-phone-number', '22222222222');
        I.click('.icon-check.tc-agree');
        I.click('#kc-mobile-verify');
        I.waitForVisible('#sms_code');
        I.fillField('#sms_code', '0000');
        I.click(DISH.DISHPages.loginPage.loginButton);
      }
      I.waitForVisible(DISH.DISHPages.profilePage.logOutButton);

      let s = await I.grabCurrentUrl();
      I.say(s);
      if (s.includes('first_login=yes')) { // First login
        I.wait(2);
        I.click('//button[.="Skip"]');
        I.waitForInvisible('//button[.="Skip"]');
      };
      DISH.deleteUser(user.password);
      DISH.logout();
      I.clearCookie();
    };
  })

const {
  wizard,
  url,
  res_url
} = require('../../function/newHydra/wizard_data_provider_new');

Feature('Check SSO @ssoRegression');
//Feature('Check SSO @debug');
Scenario('Check SSO',
  async function(I, NewHydra) {
    let sso_url;
    let env = process.profile.split(':')[2];

    if (env == 'dev') {
      sso_url = 'https://dev.sso.app.hd.digital/auth/';
    }
    if (env == 'acc') {
      sso_url = 'https://acc.sso.app.hd.digital/auth/';
    }
    if (env == 'prd') {
      sso_url = 'https://sso.dish.co';
    }
    //login
    I.amOnPage(sso_url);
    I.click('Administration Console');
    I.waitForVisible('#username');
    I.fillField('#username', 'eric');
    //I.fillField('#password', '');
    //I.click('Log In');
    //After login
    I.waitForVisible('//a[contains(.,"Users")]');
    I.click('//a[contains(.,"Users")]');

    //Create user
    I.waitForVisible('#createUser');
    I.click('#createUser');
    I.waitForVisible('#username');
    I.fillField('#username', wizard.user.username);
    I.fillField('#email', wizard.user.username);
    I.fillField('#firstName', 'x8EEn');
    I.fillField('#lastName', 'Test');
    I.click('//label[@for="emailVerified"]');
    I.click('Save');

    //Edit User, reset password
    I.waitForVisible('//a[.="Credentials"]');
    I.click('//a[.="Credentials"]');
    I.waitForVisible('#newPas');
    I.fillField('#newPas', 'Test1234!');
    I.fillField('#confirmPas', 'Test1234!');
    I.click('//label[@for="temporaryPassword"]');
    I.click('Reset Password');
    I.waitForText('Change password');
    I.click('Change password');
    //Try login website dashboard
    NewHydra.landing(url);
    I.waitForVisible('//a[contains(.,"Login")]');
    I.click('Login');
    I.wait(1);
    I.executeScript(function() { //Agree to cookie
      let xpath = '//a[@href="/login"]'
      let ele = document.evaluate(xpath,
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
      if (ele) {
        ele.click();
      }
    });
    I.waitForVisible('#username');
    I.click('#email-tab');
    I.fillField('#username', wizard.user.username);
    I.fillField('#password', wizard.user.password);
    I.click('#kc-login');
    //Add phone number
    I.waitForText('Add Mobile Number');
    I.selectOption('//select[contains(@class,"country-prefix")]', 'RU');
    I.fillField('.mobile-verify-phone-number', '22222222222');
    I.click('.tc-agree');
    I.click('#kc-mobile-verify');
    I.waitForVisible('#sms_code');
    I.fillField('#sms_code', '0000');
    I.click('#kc-login');
    I.waitForText('You do not have an Internet Presence product purchased. Please go to DISH to purchase the tool.');
    //Try to log in RT
    NewHydra.landing(res_url + 'dashboard');
    I.waitForVisible('#username');
    I.click('#email-tab');
    I.fillField('#username', wizard.user.username);
    I.fillField('#password', wizard.user.password);
    I.click('#kc-login');
    I.waitForText('The user was not found.');
    //Go back to SSO
    I.amOnPage(sso_url + 'admin');
    I.waitForVisible('//a[contains(.,"Users")]');
    I.click('//a[contains(.,"Users")]');
    I.waitForVisible('//input');
    I.fillField('//input', wizard.user.username);
    I.click('.input-group-addon');
    I.waitForVisible('//td[.="Edit"]');
    I.click('//td[.="Edit"]');

    //Delete user
    I.waitForVisible('#removeUser');
    I.click('#removeUser');
    I.waitForVisible('//button[.="Delete"]');
    I.click('//button[.="Delete"]');
    I.waitForText('Success! The user has been deleted.');

    //Try log in and password not correct
    NewHydra.landing(url + 'dashboard');
    I.waitForVisible('#username');
    I.click('#email-tab');
    I.fillField('#username', wizard.user.username);
    I.fillField('#password', wizard.user.password);
    I.click('#kc-login');
    I.waitForText('Invalid email or password');
  });

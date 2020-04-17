const {
  wizard,
  url,
  res_url
} = require('../../function/newHydra/wizard_data_provider_new');
// Reservation tool
Feature('Check users from reservation tool admin panel @res_admin_check_user');
Scenario('Check users from reservation tool admin panel',
  async function(I) {
    usernames = ['']
    let result = '';
    let num = 0;
    let role = '';
    let country = '';
    //prod
    I.amOnPage('https://reservation.dish.co');
    I.wait(20);
    I.waitForVisible('//a[@href="/users"]');
    I.click('//a[@href="/users"]');
    //Go to users page, check one by one
    for (var i = 0; i < usernames.length; i++) {
      I.waitForVisible('#search-restaurant-name-email');
      I.fillField('#search-restaurant-name-email', usernames[i]);
      I.pressKey('Enter');
      I.wait(1);
      num = await I.grabNumberOfVisibleElements('.no-users');
      if (num == 1) {
        result = result + usernames[i] + ' ' + 'NonExist\n'
      } else {
        I.waitForVisible('.edit-button');
        I.click('.edit-button');
        I.waitForVisible('#user-roles');
        role = await I.grabValueFrom('#user-roles');
        country = await I.grabValueFrom('#user-countries');
        result = result + usernames[i] + ' ' + role + ' ' + country + '\n';
        I.click('Back to list');
      }
    }
    I.say(result);
  });

Feature('Check establishments from reservation tool @res_admin_check_est');
Scenario('Check establishments from reservation tool',
  async function(I) {
    EstablishmentIds = ['']
    let result = '';
    let num = 0;
    //prod
    I.amOnPage('https://reservation.dish.co');
    I.wait(20);
    I.waitForVisible('//input[@name="q"]');
    //Go to users page, check one by one
    for (var i = 0; i < EstablishmentIds.length; i++) {
      I.amOnPage('https://reservation.dish.co/statistics?q=' + EstablishmentIds[i]);
      I.wait(2)
      num = await I.grabNumberOfVisibleElements('.no-establishments');
      if (num == 1) {
        result = result + EstablishmentIds[i] + ' ' + 'Deleted\n'
      } else {
        result = result + EstablishmentIds[i] + ' ' + 'Exists\n'
      }
    }
    I.say(result);
  });

Feature('Delete users from reservation tool admin panel @res_admin_delete_user');
Scenario('Delete users from reservation tool admin panel',
  async function(I) {
    usernames = ['']
    //prod
    I.amOnPage('https://reservation.dish.co');
    I.wait(20);
    I.waitForVisible('//a[@href="/users"]');
    I.click('//a[@href="/users"]');
    //Go to users page, check one by one
    for (var i = 0; i < usernames.length; i++) {
      I.waitForVisible('#search-restaurant-name-email');
      I.fillField('#search-restaurant-name-email', usernames[i]);
      I.pressKey('Enter');
      I.wait(1);
      I.waitForVisible('//button[contains(@class,"delete")]');
      I.click('//button[contains(@class,"delete")]');
      I.waitForVisible('#password');
      I.fillField('#password', 'Test43211234!"');
      I.click('.btn-confirm');
      I.waitForText('User deleted');
    }
  });

Feature('Create users from reservation tool admin panel @res_admin_create_user');
Scenario('Check users from reservation tool admin panel',
  async function(I) {
    countries = [''];
    usernames = [''];
    //prod
    I.amOnPage('https://reservation.dish.co');
    I.wait(20);
    I.waitForVisible('//a[@href="/users"]');
    I.click('//a[@href="/users"]');
    //Go to users page, check one by one
    for (var i = 0; i < usernames.length; i++) {
      I.waitForVisible('//a[@href="/user/add"]');
      I.click('//a[@href="/user/add"]');
      I.waitForVisible('#user-email');
      I.fillField('#user-email', usernames[i]);
      I.fillField('#user-firstName', usernames[i]);
      I.fillField('#user-lastName', usernames[i]);
      I.fillField('#user-login', usernames[i]);
      I.fillField('#user-password', 'Metro2019.')
      I.fillField('#user-passwordRepeat', 'Metro2019.');
      I.selectOption('#user-rol', 'SYSTEM_ADMIN');
      I.selectOption('#user-countries', countries[i]);
      I.click('Add user');
      I.waitForText("The user has been created successfully.");
    }
  });

// Website builder
Feature('Delete users from website builder tool admin panel @wb_admin_user_delete');
Scenario('Delete users from website builder tool admin panel',
  async function(I) {
    establishmentIDs = ['']
    //prod
    I.amOnPage('https://website.dish.co');
    I.wait(20);
    //Go to users page, check one by one
    for (var i = 0; i < establishmentIDs.length; i++) {
      I.waitForVisible('//input[@name="q"]');
      I.fillField('//input[@name="q"]', establishmentIDs[i]);
      I.pressKey('Enter');
      I.waitForVisible('.btn.btn-danger.delete');
      I.click('.btn.btn-danger.delete');
      I.waitForVisible('(//button[@class="btn btn-danger delete"])[2]');
      I.click('(//button[@class="btn btn-danger delete"])[2]');
      I.waitForText('Item deleted successfully.');
    }
  });

Feature('Check establishments from website builder admin panel @wb_admin_check_est');
Scenario('Check establishments from website builder admin panel',
  async function(I) {
    EstablishmentIds = ['']
    let result = '';
    let num = 0;
    let name;
    let email;
    let street;
    let zipcode;
    let city;
    let country;
    //prod
    I.amOnPage(url);
    I.waitForVisible('//input[@name="q"]');
    //Go to users page, check one by one
    for (var i = 0; i < EstablishmentIds.length; i++) {
      I.waitForVisible('//input[@name="q"]');
      I.fillField('//input[@name="q"]', EstablishmentIds[i]);
      I.pressKey('Enter');
      I.wait(2);
      num = await I.grabNumberOfVisibleElements('.no-items');
      if (num == 1) {
        result = result + EstablishmentIds[i] + '$' + 'Deleted\n'
      } else {
        I.waitForVisible('.btn.btn-default.edit');
        I.click('.btn.btn-default.edit');
        I.waitForVisible('#details-name');
        name = await I.grabValueFrom('#details-name');
        email = await I.grabValueFrom('#details-email');
        street = await I.grabValueFrom('#details-street');
        zipcode = await I.grabValueFrom('#details-zipCode');
        city = await I.grabValueFrom('#details-city');
        country = await I.grabValueFrom('#details-country');
        domain = await I.grabValueFrom('#details-domain');
        result = result + EstablishmentIds[i] + '$' + name + '$' + email + '$' + street + '$' + zipcode + '$' + city + '$' + country + '$' + domain + '$' + '\n'
        I.click('Back');
      }
    }
    I.say(result);
  });

Feature('Create users from website builder admin panel @wb_admin_create_user');
Scenario('Check users from website builder admin panel',
  async function(I) {
    countries = [''];
    usernames = [''];
    //prod
    I.amOnPage('https://website.dish.co');
    I.wait(20);
    I.waitForVisible('//a[@href="/adminpanel/entity/User/list"]');
    I.click('//a[@href="/adminpanel/entity/User/list"]');
    I.waitForVisible('//a[@href="/adminpanel/entity/User/add"]');
    I.click('//a[@href="/adminpanel/entity/User/add"]');
    //Go to users page, check one by one
    for (var i = 0; i < usernames.length; i++) {
      I.waitForVisible('.checkbox-control');
      I.click('.checkbox-control');
      I.fillField('#details-email', usernames[i]);
      I.selectOption('#details-salutation', 'Mr.');
      I.fillField('#details-firstName', usernames[i]);
      I.fillField('#details-lastName', usernames[i]);
      I.fillField('#details-login', usernames[i]);
      I.fillField('#details-password', 'Metro2020.')
      I.fillField('#details-passwordRepeat', 'Metro2020.');
      I.selectOption('#details-userRoles', 'CCAGENT');
      I.selectOption('#details-countries', countries[i]);
      I.click('(//button[@name="submitAndContinueEditing"])[2]');
      I.waitForText("Your changes have been saved.");
    }
  });

Feature('New Hydra Unsubscribe business @newHydra_unsubscribe');

Scenario('Unsubscribe Business',
  async function(I, NewHydra) {
    let user;
    let password = 'Test1234!';
    let users = [''];
    for (var i = 0; i < users.length; i++) {
      user = users[i];
      NewHydra.landing(url);
      I.amOnPage(url + 'logout');
      I.waitForText('Create a new website');
      I.click('Login');
      I.amOnPage(url + 'dashboard/account');
      I.waitForVisible('#username');
      I.fillField('#username', user);
      I.fillField('#password', password);
      I.click('#kc-login');
      I.waitForText('User profile');
      let overall = await I.grabTextFrom('//body');
      if (overall.indexOf("There is no restaurant website connected to this account (yet).") == -1) {
        let status = await I.grabTextFrom('.btn-danger.btn');
        if (status.indexOf("Deletion in progress") == -1) {
          I.click('.btn-danger.btn');
          I.waitForVisible('#establishmentDeletePassword');
          I.fillField('#establishmentDeletePassword', password);
          I.click('.btn.btn-danger.delete');
          I.wait(2);
          overall = await I.grabTextFrom('//body');
          if (overall.indexOf("The deletion has not been done, please try again later.") == -1) {
            I.waitForText('Your request for deletion has been successful.');
          }
        }
      }
    }
  });

Feature('Check users from WB admin panel @wb_admin_check_user');
Scenario('Check users from WB admin panel',
  async function(I) {
    usernames = ['']
    let result = '';
    let num = 0;
    let country = '';
    let salutation = '';
    let firstname = '';
    let lastname = '';
    let login = '';
    let sfid = '';
    let role = '';
    //prod
    I.amOnPage('https://website.dish.co');
    I.waitForVisible('//a[@href="/adminpanel/entity/User/list"]');
    I.click('//a[@href="/adminpanel/entity/User/list"]');
    //Go to users page, check one by one
    for (var i = 0; i < usernames.length; i++) {
      I.waitForVisible('//input[@name="q"]');
      I.fillField('//input[@name="q"]', usernames[i]);
      I.pressKey('Enter');
      I.wait(1);
      num = await I.grabNumberOfVisibleElements('.no-items');
      if (num == 1) {
        result = result + usernames[i] + '$' + 'NonExist\n'
      } else {
        I.waitForVisible('.btn.btn-default.edit');
        /*
        I.click('.btn.btn-default.edit');
        I.waitForVisible('#details-salutation');
        salutation = await I.grabValueFrom('#details-salutation');
        firstname = await I.grabValueFrom('#details-firstName');
        lastname = await I.grabValueFrom('#details-lastName');
        sfid = await I.grabValueFrom('#details-salesforceId');
        country = await I.grabValueFrom('#details-country');
        role = await I.grabValueFrom('#details-userRoles');
        result = result + usernames[i] + '$' + salutation + '$' + firstname + '$' + lastname + '$' + sfid + '$' + country + '$' + role + '\n';
        I.click('Back');
        */
        login = await I.grabTextFrom('//td[contains(@class,"attribute-login")]');
        firstname = await I.grabTextFrom('//td[contains(@class,"attribute-firstName")]');
        lastname = await I.grabTextFrom('//td[contains(@class,"attribute-lastName")]');
        result = result + usernames[i] + '$' + login + '$' + firstname + '$' + lastname + '\n';
      }
      I.say(result);
    }
    I.say(result);
  });

Feature('Impersonate and check deletion @wb_imp_check');
Scenario('Impersonate from SSO and check deletion in progress',
  async function(I) {
    usernames = [''];
    let result = '';
    let num = 0;
    I.amOnPage('https://sso.dish.co');
    I.click('Administration Console');
    I.waitForVisible('#username');
    I.fillField('#username', 'eric');
    I.wait(20);
    I.waitForVisible('//a[contains(.,"Users")]');
    I.click('//a[contains(.,"Users")]');
    //Go to users page, check one by one
    for (var i = 0; i < usernames.length; i++) {
      I.waitForVisible('//input[@placeholder="Search..."]');
      I.fillField('//input[@placeholder="Search..."]', usernames[i]);
      I.click('#userSearch');
      I.waitForVisible('//td[.="Impersonate"]');
      I.click('//td[.="Impersonate"]');
      I.switchToNextTab();
      I.waitForVisible('//a[@href="https://website.dish.co"]');
      I.click('//a[@href="https://website.dish.co"]');
      I.waitForText('Login');
      I.click('Login');
      I.waitForVisible('//a[@href="/dashboard/account"]');
      I.click('//a[@href="/dashboard/account"]');
      I.waitForText('Change your password');
      num = await I.grabNumberOfVisibleElements('//button[contains(.,"Deletion in progress")]');
      result = result + usernames[i] + ' ' + num + '\n';
      I.click('//a[@href="/logout"]');
      I.waitForVisible('//a[@href="/login"]');
      I.closeCurrentTab();
    }
    I.say(result);
  });

Feature('Check accounts in SSO @check_user_sso');
Scenario('Check if account in SSO',
  async function(I, NewHydra) {
    let users = [''];
    let search_result = '';
    let result = '';
    let sfid = '';
    let mobile = '';
    let count = 0;

    NewHydra.landing('https://sso.dish.co');
    I.click('Administration Console');
    I.waitForVisible('#username');
    I.fillField('#username', 'eric');
    I.waitForVisible('//a[contains(.,"Users")]');
    I.click('//a[contains(.,"Users")]');
    for (var i = 0; i < users.length; i++) {
      I.waitForVisible('//input[@placeholder="Search..."]');
      I.fillField('//input[@placeholder="Search..."]', users[i]);
      I.click('#userSearch');
      I.wait(2);
      search_result = await I.grabTextFrom('//tbody//td[2]');
      result = result + users[i] + ' ' + search_result + '\n';
      search_result = '';
      //NewHydra.logout();
    }
    I.say(result);
  });

Feature('Remove mobile numbers from SSO @remove_mobile_SSO');
Scenario('Check if account in SSO',
  async function(I, NewHydra) {
    let users = [''];
    let result = '';

    NewHydra.landing('https://sso.dish.co');
    I.click('Administration Console');
    I.waitForVisible('#username');
    I.fillField('#username', 'eric');
    I.waitForVisible('//a[contains(.,"Users")]');

    for (var i = 0; i < users.length; i++) {
      I.amOnPage('https://sso.dish.co/auth/admin/master/console/#/realms/HD-SSO/users/' + users[i] + '/user-attributes');
      I.wait(1);
      I.waitInUrl('/user-attributes');
      I.click('//td[.="mobile"]/../td[.="Delete"]');
      I.wait(1);
      I.click('//button[@type="submit" and .="Save"]');
      I.waitForText('Your changes have been saved to the user.');
      I.wait(1);
      I.waitForVisible('//a[@href="#/realms/HD-SSO/users"]');
      I.click('//a[@href="#/realms/HD-SSO/users"]');
      result = result + users[i] + ' mobile removed.\n';
    }
    I.say(result);

  });

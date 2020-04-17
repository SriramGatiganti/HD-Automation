const {
  wizard,
  url,
  res_url,
  d_url,
  language
} = require('../../function/newHydra/wizard_data_provider_new');
let dish_countries = ['DE', 'IT', 'FR', 'HR', 'TR', 'BE', 'HU', 'AT', 'PT', 'CZ', 'UA', 'PL', 'ES', 'XX'];
let languages = ['en', 'de', 'it', 'fr', 'hr', 'hu', 'es', 'pl', 'tr', 'nl', 'pt', 'uk', 'cs'];
let dish_url = d_url + wizard.countryCode + '/' + language;

Feature('Check DISH dashboard @dish_dashboard');
//Feature('Check DISH dashboard @debug');

Scenario('DISH register and link establishments',
  function(I, DISH, NewHydra) {
    NewHydra.landing(dish_url);
    DISH.signup(wizard);
    DISH.linkestablishment(wizard);
    //Add the 2nd establishment
    wizard.contact.businessName = wizard.contact.businessName + '_2';
    wizard.contact.streetNumber = wizard.contact.streetNumber + '2';
    wizard.contact.postalCode = wizard.contact.postalCode + '2';
    wizard.contact.phone = wizard.contact.phone + '2';
    wizard.contact.city = wizard.contact.city + '2';
    wizard.company.businessName = wizard.company.businessName + '2';
    wizard.company.streetNumber = wizard.company.streetNumber + '2';
    wizard.company.postalCode = wizard.company.postalCode + '2';
    wizard.company.phone = wizard.company.phone + '2';
    wizard.company.city = wizard.company.city + '2';
    DISH.linkestablishment(wizard, 1);
    DISH.logout();
  })

Scenario('Check IP override for all the countries',
  function(I, DISH, NewHydra) {
    let dish_countries = ['DE', 'IT', 'FR', 'HR', 'TR', 'BE', 'ES', 'PO', 'AU', 'PT', 'CZ', 'UA', 'NL'];
    let c;
    let cookie;

    for (c in dish_countries) {
      I.amOnPage(d_url + dish_countries[c]);
      I.click(DISH.DISHPages.homePage.signUpButton);
      I.dontSee('DISH.CO will be available in your country, soon.');
    }
    I.amOnPage(d_url + 'XX');
    I.click(DISH.DISHPages.homePage.signUpButton + '[2]');
    I.waitForText('DISH.CO will be available in your country, soon.');
  })

Scenario('Change password',
  function(I, DISH, NewHydra) {
    NewHydra.landing(d_url);
    DISH.login(wizard.user);
    I.click(DISH.DISHPages.homePage.profileIcon);
    I.waitForVisible(DISH.DISHPages.profilePage.changePasswordButton);
    I.click(DISH.DISHPages.profilePage.changePasswordButton);
    NewHydra.changePassword(user);
    I.wait(2);
    DISH.logout();
  });

Scenario('DISH all signup URLs check',
  async function(I, DISH, NewHydra) {
    let languages = ['en', 'de', 'it', 'fr', 'hr', 'hu', 'tr', 'nl', 'pt', 'uk', 'cs', 'pl', 'es'];
    let url = d_url + wizard.countryCode;
    for (var l in languages) {
      NewHydra.landing(url + '/' + languages[l] + '/user/sign-up/');
      I.waitForVisible(DISH.DISHPages.signUpPage.firstName);
    }
  })

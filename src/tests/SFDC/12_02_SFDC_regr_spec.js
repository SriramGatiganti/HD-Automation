// let mainPage = require('../../function/financialForce/main.page.js');
// let personAccountPage = require('../../function/financialForce/person.account.page.js');
// let establishmentPage = require('../../function/financialForce/establishment.page.js');
// let assetListPage = require('../../function/financialForce/asset.list.page');
// let assetPage = require('../../function/financialForce/asset.page');
let all = require('../../function/financialForce/pages/all.pages.js');

const {
  wizard,
  url
} = require('../../function/newHydra/wizard_data_provider_new');
let d_url = url.replace('website.', 'www.');

const { I } = inject();
const assert = require('assert');

let path = require('path');
let rightNow = new Date();
let res = rightNow.toISOString().slice(0, 10).replace(/-/g, "");
let fs = require("fs");
let endOfLine = require('os').EOL;

function writeWLPData(filename, product) {
  let SFDCData = wizard.user.firstName + ' ' + wizard.user.lastName + endOfLine + wizard.contact.businessName + endOfLine + wizard.user.username + endOfLine + wizard.user.password + endOfLine + res + endOfLine + product + endOfLine;
  fs.writeFile(filename, SFDCData, {
    'flag': 'a'
  }, function (err) {
    if (err) {
      return console.error(err);
    }
  });
}

function assertStictEquality(a, b, message = null) {
  try {
    assert.strictEqual(a.toString(), b.toString(), message);
    I.addMochawesomeContext('Checking ' + a + ' === ' + b);
  } catch (e) {
    I.addMochawesomeContext('FAILURE OF ' + a + ' to match ' + b);
    return false;
  }
  return true;
}

async function toLoginDish(I, DISH) {

  I.closeOtherTabs();

  let header = await I.grabTextFrom({
    id: 'shared-header'
  });
  if (!(header.includes("EN"))) {
    I.click('#shared-header-menu-holder > * .current-language');
    I.waitForVisible('.mod-select-language > select');
    I.selectOption('.mod-select-language > select', 'English');
    I.click('#CountryLanguageSwitcher > * .country-language-button');
    I.waitForText('Log in');
    header = await I.grabTextFrom({
      id: 'shared-header'
    });
  }
  if (!(header.includes("Log in"))) {
    DISH.logout();
  }
  // user.username = 'test.reser0+aut200211140157816sf@gmail.com';
  DISH.login(user);
}

async function checkAsset(exResult) {
  await all.main.login();
  I.wait(5);
  await all.main.submitSearch(wizard.registration.username, wizard.user.firstName + ' ' + wizard.user.lastName);
  // await all.mainPage.searchPersonAccount('test.reser0+aut200207125153807@gmail.com');    
  // await all.main.searchPersonAccount(wizard.registration.username);
  // I.wait(5);

  // // all.mainPage.openPersonAccount('x8EEn200207125153807 HD*200207125153807');
  // all.main.openPersonAccount(wizard.user.firstName + ' ' + wizard.user.lastName);
  I.wait(5);
  // all.mainPage.search(wizard.registration.username, wizard.user.firstName + ' ' + wizard.user.lastName);
  // I.wait(5);
  var link = all.personAccount.establishment(wizard.contact.businessName);
  all.personAccount.openPage(link);
  // all.personAccountPage.openAccount('x8EEn aut L5t5 807');
  I.wait(5);
  link = all.establishment.relatedTab;
  all.establishment.openPage(link);
  I.wait(5);
  link = all.establishment.assetTab;
  all.establishment.openPage(link);
  I.wait(5);
  link = all.assetList.assetLink(exResult.product);
  all.assetList.openPage(link);
  // all.assetList.openAsset(exResult.product);
  I.wait(5);
  let name = await I.grabTextFrom(all.asset.name);
  let product = await I.grabTextFrom(all.asset.product);
  let establishment = await I.grabTextFrom(all.asset.establishment);
  let status = await I.grabTextFrom(all.asset.status);
  let res = true;
  res = assertStictEquality(name, exResult.name);
  res = assertStictEquality(product, exResult.product);
  res = assertStictEquality(establishment, exResult.establishment);
  res = assertStictEquality(status, exResult.status);
  assert(res);
  all.asset.logout();
}

// Feature('Dish to SFDC regression @dish_sfdc_regr');

Feature('SFDC Signup DISH @SFDC_dregister');
Scenario('Signup a new user in Dish',
  function (I, DISH, NewHydra) {
    NewHydra.landing(d_url + DISH.getCountryCode(wizard.country));
    I.click('Sign up now');
    I.waitForText('Welcome to Dish');
    DISH.signup(wizard);
    DISH.logout();
    I.addMochawesomeContext({
      title: 'Input data',
      value: wizard
    });
  })

Feature('Check signup @SFDC_check_signup');
Scenario('Check person account data from SFDC after signup',
  async function (I) {
    let exResult = {
      email: wizard.registration.username,
      mobile: '+722222222222\nValidated\nValidated\nChange',
      verified: 'Validated',
      name: wizard.user.firstName + ' ' + wizard.user.lastName,
      country: wizard.country
    };
    await all.main.login();
    I.wait(10);
    // await all.mainPage.searchPersonAccount('test.reser0+aut200207125153807@gmail.com');  
    await all.main.submitSearch(wizard.registration.username, wizard.user.firstName + ' ' + wizard.user.lastName);
    // await all.main.searchPersonAccount(wizard.registration.username);
    // I.wait(5);

    // // all.mainPage.openPersonAccount('x8EEn200207125153807 HD*200207125153807');
    // all.main.openPersonAccount(wizard.user.firstName + ' ' + wizard.user.lastName);
    I.wait(5);
    // all.mainPage.search(wizard.registration.username, wizard.user.firstName + ' ' + wizard.user.lastName);
    let email = await I.grabTextFrom(all.personAccount.email);
    let mobile = await I.grabTextFrom(all.personAccount.mobile);
    let verified = await I.grabTextFrom(all.personAccount.verified);
    let name = await I.grabTextFrom(all.personAccount.name);
    let country = await I.grabTextFrom(all.personAccount.country);
    assertStictEquality(email, exResult.email);
    assertStictEquality(mobile, exResult.mobile);
    assertStictEquality(verified, exResult.verified);
    assertStictEquality(name, exResult.name);
    assertStictEquality(country, exResult.country);
    // all.personAccountPage.logout();
  })

Feature('SFDC add establishment in DISH @SFDC_dadd_est');
Scenario('Add an establishment to an existing user in Dish',
  async function (I, DISH, NewHydra) {
    NewHydra.landing(d_url + DISH.getCountryCode(wizard.country));
    await toLoginDish(I, DISH);
    I.click('//i[@class="icon-User_Outline"]');
    I.waitForText('Add Establishment');
    I.click('Add Establishment');
    DISH.linkestablishment(wizard);
    DISH.logout();
  })

Feature('Check Establishment @SFDC_check_establishment');
Scenario('check establishment created successfully in SFDC',
  async function (I) {
    let exResult = {
      estAddress: wizard.contact.streetName + ' ' + wizard.contact.streetNumber + '\n' + wizard.contact.postalCode + ' ' + wizard.contact.city + '\n' + wizard.contact.country,
      compAddress: wizard.company.streetName + ' ' + wizard.company.streetNumber + '\n' + wizard.company.postalCode + ' ' + wizard.company.city + '\n' + wizard.company.country,
      name: wizard.contact.businessName,
      type: wizard.category
    };
    await all.main.login();
    I.wait(5);
    await all.main.submitSearch(wizard.registration.username, wizard.user.firstName + ' ' + wizard.user.lastName);
    // await all.mainPage.searchPersonAccount('test.reser0+aut200207125153807@gmail.com');    
    // await all.main.searchPersonAccount(wizard.registration.username);
    // I.wait(5);

    // // all.mainPage.openPersonAccount('x8EEn200207125153807 HD*200207125153807');
    // all.main.openPersonAccount(wizard.user.firstName + ' ' + wizard.user.lastName);
    I.wait(5);
    let address = await I.grabTextFrom(all.personAccount.address);
    // all.mainPage.search(wizard.registration.username, wizard.user.firstName + ' ' + wizard.user.lastName);
    I.wait(5);
    var link = all.personAccount.establishment(wizard.contact.businessName);
    all.personAccount.openPage(link);
    // all.personAccount.openAccount(wizard.contact.businessName);
    // all.personAccountPage.openAccount('x8EEn aut L5t5 807');
    I.wait(5);

    let estName = await I.grabTextFrom(all.establishment.accountName);
    let estType = await I.grabTextFrom(all.establishment.estType);
    assertStictEquality(address[0], exResult.estAddress);
    assertStictEquality(address[1], exResult.compAddress);
    assertStictEquality(estName, exResult.name);
    assertStictEquality(estType, exResult.type);
    // accountPage.logout();
  })

Feature('SFDC create WB DISH @SFDC_dpurchase_p_wb');
Scenario('Purchase premium website builder with existing establishment in Dish',
  async function (I, DISH, NewHydra) {
    NewHydra.landing(d_url + DISH.getCountryCode(wizard.country));
    await toLoginDish(I, DISH);
    DISH.purchaseProduct(wizard, '.mod-tool-website', 1, 1);
    I.switchToNextTab();
    DISH.registerWB(wizard, NewHydra, 2);
    I.closeCurrentTab();
    DISH.logout();
  })

Feature('Check Website Builder @SFDC_check_p_wb');
Scenario('check premium website builder asset & order created successfully in SFDC',
  async function (I) {
    let exResult = {
      name: 'presence_premium',
      product: 'presence_premium',
      establishment: wizard.contact.businessName,
      status: 'Active'
    };
    await checkAsset(exResult);
    // await all.mainPage.login();
    // I.wait(5);
    // // await all.mainPage.searchPersonAccount('test.reser0+aut200207125153807@gmail.com');    
    // await all.mainPage.searchPersonAccount(wizard.registration.username);
    // I.wait(5);
    // all.mainPage.closeTabs();
    // I.wait(5);
    // // all.mainPage.openPersonAccount('x8EEn200207125153807 HD*200207125153807');
    // all.mainPage.openPersonAccount(wizard.user.firstName + ' ' + wizard.user.lastName);
    // // all.mainPage.search(wizard.registration.username, wizard.user.firstName + ' ' + wizard.user.lastName);
    // I.wait(5);
    // all.personAccountPage.openAccount(wizard.contact.businessName);
    // // all.personAccountPage.openAccount('x8EEn aut L5t5 807');
    // I.wait(5);
    // accountPage.openRelated();
    // I.wait(5);
    // accountPage.openAssetList();
    // I.wait(5);
    // all.assetListPage.openAsset(exResult.product);
    // I.wait(5);
    // let name = await I.grabTextFrom(all.assetPage.name);
    // let product = await I.grabTextFrom(all.assetPage.product);
    // let establishment = await I.grabTextFrom(all.assetPage.establishment);
    // let status = await I.grabTextFrom(all.assetPage.status);
    // assertStictEquality(name, exResult.name);
    // assertStictEquality(product, exResult.product);
    // assertStictEquality(establishment, exResult.establishment);
    // assertStictEquality(status, exResult.status);
    // all.assetPage.logout();
  })

Feature('SFDC purchase WL Basic DISH @SFDC_dpurchase_b_wl');
Scenario('Purchase website listing basic with existing establishment in Dish',
  async function (I, DISH, NewHydra) {
    NewHydra.landing(d_url + DISH.getCountryCode(wizard.country));
    await toLoginDish(I, DISH);
    DISH.purchaseProduct(wizard, '.mod-tool-ubicus', 2, 1);
    I.switchToNextTab();
    DISH.registerWL(wizard, NewHydra, 2);
    I.closeCurrentTab();
    DISH.logout();
  })

Feature('Check Web Listing @SFDC_check_b_wl');
Scenario('check basic web listing asset & order created successfully in SFDC',
  async function (I) {
    let exResult = {
      name: 'Web_Listing_basic',
      product: 'Web_Listing_basic',
      establishment: wizard.contact.businessName,
      status: 'Active'
    };
    await checkAsset(exResult);
    // await all.mainPage.login();
    // I.wait(5);
    // // await all.mainPage.searchPersonAccount('test.reser0+aut200207125153807@gmail.com');    
    // await all.mainPage.searchPersonAccount(wizard.registration.username);
    // I.wait(5);
    // all.mainPage.closeTabs();
    // I.wait(5);
    // // all.mainPage.openPersonAccount('x8EEn200207125153807 HD*200207125153807');
    // all.mainPage.openPersonAccount(wizard.user.firstName + ' ' + wizard.user.lastName);
    // // all.mainPage.search(wizard.registration.username, wizard.user.firstName + ' ' + wizard.user.lastName);
    // I.wait(5);
    // all.personAccountPage.openAccount(wizard.contact.businessName);
    // // all.personAccountPage.openAccount('x8EEn aut L5t5 807');
    // I.wait(5);
    // accountPage.openRelated();
    // I.wait(5);
    // accountPage.openAssetList();
    // I.wait(5);
    // all.assetListPage.openAsset(exResult.product);
    // I.wait(5);
    // let name = await I.grabTextFrom(all.assetPage.name);
    // let product = await I.grabTextFrom(all.assetPage.product);
    // let establishment = await I.grabTextFrom(all.assetPage.establishment);
    // let status = await I.grabTextFrom(all.assetPage.status);
    // assertStictEquality(name, exResult.name);
    // assertStictEquality(product, exResult.product);
    // assertStictEquality(establishment, exResult.establishment);
    // assertStictEquality(status, exResult.status);
    // all.assetPage.logout();
  })

Feature('SFDC purchase Res @SFDC_dpurchase_p_res');
Scenario('DISH purchase premium Reservation tool for existing website',
  async function (I, DISH, NewHydra) {
    NewHydra.landing(d_url + DISH.getCountryCode(wizard.country));
    await toLoginDish(I, DISH);
    DISH.purchaseProduct(wizard, '.mod-tool-reservation', 1, 1);
    I.switchToNextTab();
    I.waitForText('I accept the Terms & Conditions.');
    I.click('I accept the Terms & Conditions.');
    I.click('Continue');
    DISH.registerResWiz(wizard, 1);
    I.closeCurrentTab();
    DISH.logout();
  })

Feature('Check Premium Reservation Tool @SFDC_check_p_res');
Scenario('check premium reservation tool asset & order created successfully in SFDC',
  async function (I) {
    let exResult = {
      name: 'reservation_premium',
      product: 'reservation_premium',
      establishment: wizard.contact.businessName,
      status: 'Active'
    };
    await checkAsset(exResult);
    // await all.mainPage.login();
    // I.wait(5);
    // // await all.mainPage.searchPersonAccount('test.reser0+aut200207125153807@gmail.com');    
    // await all.mainPage.searchPersonAccount(wizard.registration.username);
    // I.wait(5);
    // all.mainPage.closeTabs();
    // I.wait(5);
    // // all.mainPage.openPersonAccount('x8EEn200207125153807 HD*200207125153807');
    // all.mainPage.openPersonAccount(wizard.user.firstName + ' ' + wizard.user.lastName);
    // // all.mainPage.search(wizard.registration.username, wizard.user.firstName + ' ' + wizard.user.lastName);
    // I.wait(5);
    // all.personAccountPage.openAccount(wizard.contact.businessName);
    // // all.personAccountPage.openAccount('x8EEn aut L5t5 807');
    // I.wait(5);
    // accountPage.openRelated();
    // I.wait(5);
    // accountPage.openAssetList();
    // I.wait(5);
    // all.assetListPage.openAsset(exResult.product);
    // I.wait(5);
    // let name = await I.grabTextFrom(all.assetPage.name);
    // let product = await I.grabTextFrom(all.assetPage.product);
    // let establishment = await I.grabTextFrom(all.assetPage.establishment);
    // let status = await I.grabTextFrom(all.assetPage.status);
    // assertStictEquality(name, exResult.name);
    // assertStictEquality(product, exResult.product);
    // assertStictEquality(establishment, exResult.establishment);
    // assertStictEquality(status, exResult.status);
    // all.assetPage.logout();

  })

Feature('SFDC change establishment name in DISH @SFDC_dchng_est');
Scenario('Change an establishment name in Dish',
  async function (I, DISH, NewHydra) {
    NewHydra.landing(d_url + DISH.getCountryCode(wizard.country));
    await toLoginDish(I, DISH);
    I.click('//i[@class="icon-User_Outline"]');
    I.waitForText('My Establishments');
    let newName = {
      contact: {
        businessName: 'Establishment 1',
        streetName: 'fake st',
        streetNumber: '123',
        postalCode: '12345',
        city: 'Köln'
      }
    };
    DISH.changeEstablishment(newName);
    DISH.logout();
  })


Feature('SFDC Create WLP @SFDC_purchase_WLP');
Scenario('SFDC create establishment and purchase Web Listing Premium',
  function (I, DISH, NewHydra) {
    let product = 'Web Listing';
    NewHydra.landing(d_url + DISH.getCountryCode(wizard.country));
    DISH.login(user);
    DISH.purchaseProduct(wizard, product, 1);
    DISH.orderPayment(wizard);
    //Back to DISH page
    I.waitForText('Get started');
    I.click('Get started');
    //Continue to set up
    I.switchToNextTab();
    DISH.registerWL(wizard, NewHydra, 2);
    //Logout
    I.closeCurrentTab();
    DISH.logout();
    let filename = path.join(__dirname, '../../function/', 'data', 'financialForceData' + res + '.txt')
    writeWLPData(filename, product);
  })

Feature('Check Premium Web Listing @SFDC_check_p_WLP');
Scenario('check premium web listing asset & order created successfully in SFDC',
  async function (I) {
    let exResult = {
      name: 'Web_Listing_premium',
      product: 'Web_Listing_premium',
      establishment: wizard.contact.businessName,
      status: 'Active'
    };
    await checkAsset(exResult);
    // await all.mainPage.login();
    // I.wait(5);
    // // await all.mainPage.searchPersonAccount('test.reser0+aut200207125153807@gmail.com');    
    // await all.mainPage.searchPersonAccount(wizard.registration.username);
    // I.wait(5);
    // all.mainPage.closeTabs();
    // I.wait(5);
    // // all.mainPage.openPersonAccount('x8EEn200207125153807 HD*200207125153807');
    // all.mainPage.openPersonAccount(wizard.user.firstName + ' ' + wizard.user.lastName);
    // // all.mainPage.search(wizard.registration.username, wizard.user.firstName + ' ' + wizard.user.lastName);
    // I.wait(5);
    // all.personAccountPage.openAccount(wizard.contact.businessName);
    // // all.personAccountPage.openAccount('x8EEn aut L5t5 807');
    // I.wait(5);
    // accountPage.openRelated();
    // I.wait(5);
    // accountPage.openAssetList();
    // I.wait(5);
    // all.assetListPage.openAsset(exResult.product);
    // I.wait(5);
    // let name = await I.grabTextFrom(all.assetPage.name);
    // let product = await I.grabTextFrom(all.assetPage.product);
    // let establishment = await I.grabTextFrom(all.assetPage.establishment);
    // let status = await I.grabTextFrom(all.assetPage.status);
    // assertStictEquality(name, exResult.name);
    // assertStictEquality(product, exResult.product);
    // assertStictEquality(establishment, exResult.establishment);
    // assertStictEquality(status, exResult.status);
    // all.assetPage.logout();

  })

Feature('Delete Account from Dish @SFDC_d_delete_acc');
Scenario('Delete the account from dish',
  async function (I, DISH, NewHydra) {
    NewHydra.landing(d_url + DISH.getCountryCode(wizard.country));
    await toLoginDish(I, DISH);
    DISH.deleteUser(wizard.user.password);

  })
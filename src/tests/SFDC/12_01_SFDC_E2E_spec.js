const {
  wizard,
  url,
  // res_url
} = require('../../function/newHydra/wizard_data_provider_new');

let user = wizard.user;
let d_url = url.replace('website.', 'www.');
let path = require('path');
let rightNow = new Date();
let res = rightNow.toISOString().slice(0, 10).replace(/-/g, "");
// let t_d_path = path.join(__dirname, '../../function/', 'data', 'financialForceData' + res + '.txt');
let fs = require("fs");
let endOfLine = require('os').EOL;



async function toLoginDish(I, DISH) {

  I.closeOtherTabs();

  let header = await I.grabTextFrom({
    id: 'shared-header'
  });
  console.log(header);
  console.log(typeof header);
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
  console.log(header);
  if (!(header.includes("Log in"))) {
    DISH.logout();
  }
  // user.username = 'test.reser0+aut200211140157816sf@gmail.com';
  DISH.login(user);
}


function writeWLPData(filename, product) {
  let SFDCData = wizard.user.firstName + ' ' + wizard.user.lastName + endOfLine + wizard.contact.businessName + endOfLine + wizard.user.username + endOfLine + wizard.user.password + endOfLine + res + endOfLine + product + endOfLine;
  fs.writeFile(filename, SFDCData, {
    'flag': 'a'
  }, function(err) {
    if (err) {
      return console.error(err);
    }
  });
}


Feature('SFDC Signup DISH @OLD_dregister');
Scenario('Signup a new user in Dish',
  function(I, DISH, NewHydra) {
    NewHydra.landing(d_url + DISH.getCountryCode(wizard.country), 1);
    I.click('Sign up now');
    I.waitForText('Welcome to Dish');
    DISH.signup(wizard);
    DISH.logout();
    I.addMochawesomeContext({
      title: 'Input data',
      value: wizard
    });
  })

Feature('Check signup @OLD_check_signup');
Scenario('Check person account data from SFDC after signup',
  async function(I, financialForce, salesForce) {
    let exResult = {
      email: wizard.registration.username,
      mobile: '+722222222222\nValidated\nValidated\nChange',
      verified: 'Validated',
      name: wizard.user.firstName + ' ' + wizard.user.lastName,
      country: wizard.country
    };
    await financialForce.SFDCLogin();
    I.wait(5);
    financialForce.closeTabs();
    I.wait(5);
    financialForce.submitSearch(wizard.registration.username, wizard.user.firstName + ' ' + wizard.user.lastName);
    I.wait(5);
    await salesForce.checkSignup(exResult);
    financialForce.SFDCLogout();
  })

Feature('SFDC add establishment in DISH @OLD_dadd_est');
Scenario('Add an establishment to an existing user in Dish',
  async function(I, DISH, NewHydra) {
    NewHydra.landing(d_url + DISH.getCountryCode(wizard.country), 1);
    await toLoginDish(I, DISH);
    I.click('//i[@class="icon-User_Outline"]');
    I.waitForText('Add Establishment');
    I.click('Add Establishment');
    DISH.linkestablishment(wizard);
    DISH.logout();
  })

Feature('Check Establishment @OLD_check_establishment');
Scenario('check establishment created successfully in SFDC',
  async function(I, financialForce, salesForce) {
    let exResult = {
      estAddress: wizard.contact.streetName + ' ' + wizard.contact.streetNumber + '\n' + wizard.contact.postalCode + ' ' + wizard.contact.city + '\n' + wizard.contact.country,
      compAddress: wizard.company.streetName + ' ' + wizard.company.streetNumber + '\n' + wizard.company.postalCode + ' ' + wizard.company.city + '\n' + wizard.company.country,
      name: wizard.contact.businessName,
      type: wizard.category
    };
    await financialForce.SFDCLogin();
    I.wait(5);
    financialForce.closeTabs();
    I.wait(5);
    financialForce.submitSearch(wizard.registration.username, wizard.user.firstName + ' ' + wizard.user.lastName);
    I.wait(5);
    await salesForce.checkEstablishmentAddress(exResult);
    I.wait(5);
    financialForce.openEstablishment(wizard.contact.businessName);
    I.wait(5);
    await salesForce.checkEstablishment(exResult);
    financialForce.SFDCLogout();

  })

Feature('SFDC create WB DISH @OLD_dpurchase_p_wb');
Scenario('Purchase premium website builder with existing establishment in Dish',
  async function(I, DISH, NewHydra) {
    NewHydra.landing(d_url + DISH.getCountryCode(wizard.country), 1);
    await toLoginDish(I, DISH);
    DISH.purchaseProduct(wizard, '.mod-tool-website', 1, 1);
    I.switchToNextTab();
    DISH.registerWB(wizard, NewHydra, 2);
    I.closeCurrentTab();
    DISH.logout();
  })

Feature('Check Website Builder @OLD_check_p_wb');
Scenario('check premium website builder asset & order created successfully in SFDC',
  async function(I, financialForce, salesForce) {
    let exResult = {
      name: 'presence_premium',
      product: 'presence_premium',
      establishment: wizard.contact.businessName,
      status: 'Active'
    };
    await financialForce.SFDCLogin();
    I.wait(5);
    financialForce.closeTabs();
    I.wait(5);
    financialForce.submitSearch(wizard.registration.username, wizard.user.firstName + ' ' + wizard.user.lastName);
    I.wait(5);
    financialForce.openEstablishment(wizard.contact.businessName);
    I.wait(5);
    financialForce.openRelatedTab();
    I.wait(5);
    financialForce.openAssetTab();
    I.wait(5);
    financialForce.openAsset('presence_premium');
    I.wait(5);
    await salesForce.checkAsset(exResult, 'presence_premium');
    financialForce.SFDCLogout();

  })

Feature('SFDC purchase WL DISH @OLD_dpurchase_wl');
Scenario('Purchase website listing basic with existing establishment in Dish',
  async function(I, DISH, NewHydra) {
    NewHydra.landing(d_url + DISH.getCountryCode(wizard.country), 1);
    await toLoginDish(I, DISH);
    DISH.purchaseProduct(wizard, '.mod-tool-ubicus', 2, 1);
    I.switchToNextTab();
    DISH.registerWL(wizard, NewHydra, 2);
    I.closeCurrentTab();
    DISH.logout();
  })

Feature('SFDC purchase Res @OLD_dpurchase_p_res');
Scenario('DISH purchase premium Reservation tool for existing website',
  async function(I, DISH, NewHydra, ResFunc) {
    NewHydra.landing(d_url + DISH.getCountryCode(wizard.country), 1);
    await toLoginDish(I, DISH);
    DISH.purchaseProduct(wizard, '.mod-tool-reservation', 1, 1);
    I.switchToNextTab();
    //New DISH 2
    I.waitForText('I accept the Terms & Conditions.');
    I.click('I accept the Terms & Conditions.');
    I.click('Continue');
    DISH.registerResWiz(wizard, 1);
    ResFunc.checkIntegration();
    I.waitForVisible("//code[contains(text(),'widget/hydra')]");
    wizard.r_url = await I.grabTextFrom("//code[contains(text(),'widget/hydra')]");
    I.say(wizard.r_url);
    //Logout
    I.closeCurrentTab();
    DISH.logout();
  })

Feature('SFDC create WL DISH @SFDC_dcreate_wl');
Scenario('Create an establishment and add web listing from website builder in Dish',
  //NEEDS WORK; CURRENTLY BROKEN WHEN ADDING NEW ESTABLISHMENT
  async function(I, DISH, NewHydra) {
    NewHydra.landing(d_url + DISH.getCountryCode(wizard.country), 1);
    await toLoginDish(I, DISH);
    //create on establishment and purchase WL
    wizard.contact.businessName = wizard.contact.businessName + "WL";
    DISH.purchaseProduct(wizard, '.mod-tool-website', 1, 2);
    I.switchToNextTab();
    NewHydra.registerWB(wizard, 2, 1);
    //Logout
    I.closeCurrentTab();
    DISH.logout();
    DISH.login(user);
    DISH.openWL();
  })

Feature('SFDC create WB DISH @SFDC_dcreate_wb');
Scenario('Create an establishment and add premium website builder in Dish',
  //NEEDS WORK; CURRENTLY BROKEN WHEN ADDING NEW ESTABLISHMENT
  async function(I, DISH, NewHydra) {
    NewHydra.landing(d_url + DISH.getCountryCode(wizard.country), 1);
    await toLoginDish(I, DISH);
    wizard.contact.businessName = wizard.contact.businessName + "WB";
    wizard.subdomain = wizard.subdomain + "WB";
    DISH.purchaseProduct(wizard, '.mod-tool-website', 1, 2);
    I.switchToNextTab();
    DISH.registerWB(wizard, NewHydra, 2);
    I.closeCurrentTab();
    DISH.logout();
  })

Feature('SFDC purchase WL Premium for existing Est. @SFDC_purchase_existing_wlpre');
Scenario('DISH purchase premium website listing with existing establishment',
  async function(I, DISH, NewHydra) {
    let product = 'Web Listing';
    NewHydra.landing(d_url + DISH.getCountryCode(wizard.country), 1);
    await toLoginDish(I, DISH);
    //Purchase on existing establishment
    DISH.purchaseProduct(wizard, '.mod-tool-ubicus', 1, 1);
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

Feature('SFDC purchase WL Premium for existing Est. @SFDC_sepa_purchase_existing_wlpre');
Scenario('DISH purchase premium website listing with existing establishment',
  async function(I, DISH, NewHydra) {
    let product = 'Web Listing';
    NewHydra.landing(d_url + DISH.getCountryCode(wizard.country), 1);
    await toLoginDish(I, DISH);
    //Purchase on existing establishment
    DISH.purchaseProduct(wizard, '.mod-tool-ubicus', 1, 1);
    DISH.orderPayment(wizard, 'SEPA');
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

Feature('SFDC Create fast bundle @SFDC_purchase_fastbun');
Scenario('SFDC create establishment and purchase fast bundle',
  function(I, DISH, NewHydra) {
    let product = 'Advanced Bundle';
    NewHydra.landing(d_url + DISH.getCountryCode(wizard.country), 1);
    DISH.login(user);
    DISH.purchaseProduct(wizard, product, 1);
    DISH.orderPayment(wizard);
    //Back to DISH page
    I.waitForText('Get started');
    I.click('//a[starts-with(@href,"https://reservation")][contains(.,"Get started")]');
    //Continue to set up
    I.switchToNextTab();
    I.waitForText('I accept the Terms & Conditions.');
    I.click('I accept the Terms & Conditions.');
    I.click('Continue');
    I.closeCurrentTab();
    I.click('//a[starts-with(@href,"https://website")][contains(.,"Get started")]');
    I.switchToNextTab();
    I.closeCurrentTab();
    DISH.logout();
    let filename = path.join(__dirname, '../../function/', 'data', 'fastbundledata' + res + '.txt')
    writeWLPData(filename, product);
  })

Feature('SFDC purchase Fast Bundle for existing Est. @SFDC_purchase_existing_fastbun');
Scenario('DISH purchase Fast Bundle with existing establishment',
  function(I, DISH, NewHydra) {
    let product = 'Advanced Bundle';
    NewHydra.landing(d_url + DISH.getCountryCode(wizard.country), 1);
    DISH.login(user);
    //Purchase on existing establishment
    DISH.purchaseProduct(wizard, product, 1, 1);
    DISH.orderPayment(wizard);
    //Back to DISH page
    I.waitForText('Get started');
    I.click('//a[starts-with(@href,"https://reservation")][contains(.,"Get started")]');
    //Continue to set up
    I.switchToNextTab();
    I.waitForText('I accept the Terms & Conditions.');
    I.click('I accept the Terms & Conditions.');
    I.click('Continue');
    I.closeCurrentTab();
    I.click('//a[starts-with(@href,"https://website")][contains(.,"Get started")]');
    I.switchToNextTab();
    I.closeCurrentTab();
    DISH.logout();
    let filename = path.join(__dirname, '../../function/', 'data', 'fastbundledata' + res + '.txt')
    writeWLPData(filename, product);
  })



Feature('Open Dish and all tools @OLD_d_open_tools');
Scenario('Open all the tools available from Dish',
  async function(I, DISH, NewHydra) {
    NewHydra.landing(d_url + DISH.getCountryCode(wizard.country), 1);
    await toLoginDish(I, DISH);
    I.waitForVisible('//a[@title="Home"]');
    I.click('//a[@title="Home"]');
    var products = ''
    I.waitForVisible('//div[@class="row loggedin-tools"]');
    I.wait(2);
    products = await I.grabTextFrom('//div[@class="row loggedin-tools"]');
    I.say(products);
    I.addMochawesomeContext(products);



    if (products.includes('Simple Shifts')) {
      I.addMochawesomeContext('SS');
      I.click('Simple Shifts');
      I.switchToNextTab();
      I.seeInCurrentUrl('frag-paul');
      I.closeCurrentTab();
    };
    if (products.includes('Internet Presence')) {
      I.click('Internet Presence');
      I.switchToNextTab();
      I.seeInCurrentUrl('website');
      I.closeCurrentTab();
    };
    if (products.includes('Reservation Tool')) {
      I.click('Reservation Tool');
      I.switchToNextTab();
      I.seeInCurrentUrl('reservation');
      I.closeCurrentTab();
    };
    if (products.includes('Web Listing')) {
      I.click('Web Listing');
      I.switchToNextTab();
      I.seeInCurrentUrl('weblisting');
      I.closeCurrentTab();
    };
    DISH.logout();
  })

Feature('Delete Account from Dish @OLD_d_delete_acc');
Scenario('Delete the account from dish',
  async function(I, DISH, NewHydra) {
    NewHydra.landing(d_url + DISH.getCountryCode(wizard.country), 1);
    await toLoginDish(I, DISH);
    DISH.deleteUser(wizard.user.password);

  })

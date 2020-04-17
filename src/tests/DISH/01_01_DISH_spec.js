const {
  wizard,
  url,
  res_url,
  d_url,
  language
} = require('../../function/newHydra/wizard_data_provider_new');
let dish_url = d_url + wizard.countryCode + '/' + language;

Feature('DISH Signup @dish_register');
Scenario('Signup DISH',
  function(I, DISH, NewHydra) {
    NewHydra.landing(dish_url);
    DISH.signup(wizard);
    DISH.logout();
  })

Feature('DISH add link establishment @dish_add_establishment');
Scenario('Signup DISH',
  function(I, DISH, NewHydra) {
    NewHydra.landing(dish_url);
    DISH.login(wizard.user);
    //Add establishment
    DISH.linkestablishment(wizard);
    DISH.logout();
  })

// Website builder
Feature('DISH purchase WB @dish_purchase_wb');
Scenario('DISH purchase premium website builder',
  function(I, DISH, NewHydra) {
    NewHydra.landing(dish_url);
    DISH.login(wizard.user);
    DISH.purchaseProduct(wizard, DISH.DISHPages.toolPage.WBProduct, 1);
    I.switchToNextTab();
    NewHydra.registerWB(wizard, 2);
    //Logout
    I.closeCurrentTab();
    DISH.logout();
  })

Feature('DISH purchase WB for existing est. @dish_purchase_existing_wb');
Scenario('DISH purchase premium Website builder tool for existing establishment',
  async function(I, DISH, NewHydra) {
    NewHydra.landing(dish_url);
    DISH.login(wizard.user);
    DISH.purchaseProduct(wizard, DISH.DISHPages.toolPage.WBProduct, 1, 1);
    I.switchToNextTab();
    NewHydra.registerWB(wizard, 2);
    //Logout
    I.closeCurrentTab();
    DISH.logout();
  })

Feature('DISH purchase WB @dish_add_wb_for_existing');
Scenario('DISH add premium website builder for one with existing other establishment',
  function(I, DISH, NewHydra) {
    NewHydra.landing(dish_url);
    DISH.login(wizard.user);
    DISH.purchaseProduct(wizard, DISH.DISHPages.toolPage.WBProduct, 1, 2); //Add website builder premium for existing
    I.switchToNextTab();
    I.waitForText(wizard.contact.businessName);
    I.click(wizard.contact.businessName);
    I.click(NewHydra.WBPages.wizardPages.continueButton);
    NewHydra.registerWB(wizard, 2);
    //Logout
    I.closeCurrentTab();
    DISH.logout();
  })
// Reservation tool
Feature('DISH purchase Res @dish_purchase_res');
Scenario('DISH purchase premium Reservation tool',
  async function(I, DISH, NewHydra, ResFunc) {
    NewHydra.landing(dish_url);
    DISH.login(wizard.user);
    DISH.purchaseProduct(wizard, DISH.DISHPages.toolPage.RTProduct, 1);
    I.switchToNextTab();
    //New DISH 2
    ResFunc.registerResWiz(wizard);
    ResFunc.checkIntegration();
    I.waitForVisible(ResFunc.RTPages.dashboardPages.widgetURL + '[1]');
    wizard.r_url = await I.grabTextFrom(ResFunc.RTPages.dashboardPages.widgetURL + '[1]');
    I.say(wizard.r_url);
    //Logout
    I.closeCurrentTab();
    DISH.logout();
  })

Feature('DISH purchase Res @dish_purchase_existing_res');
Scenario('DISH purchase premium Reservation tool for existing establishment',
  async function(I, DISH, NewHydra, ResFunc) {
    NewHydra.landing(dish_url);
    DISH.login(wizard.user);
    DISH.purchaseProduct(wizard, DISH.DISHPages.toolPage.RTProduct, 1, 1);
    I.switchToNextTab();
    //New DISH 2
    ResFunc.registerResWiz(wizard, 1);
    ResFunc.checkIntegration();
    I.waitForVisible(ResFunc.RTPages.dashboardPages.widgetURL + '[1]');
    wizard.r_url = await I.grabTextFrom(ResFunc.RTPages.dashboardPages.widgetURL + '[1]');
    I.say(wizard.r_url);
    //Logout
    I.closeCurrentTab();
    DISH.logout();
  })

Feature('DISH purchase RESM @dish_add_res_for_existing');
Scenario('DISH add premium reservation for one with existing establishment',
  function(I, DISH, NewHydra, ResFunc) {
    NewHydra.landing(dish_url);
    DISH.login(wizard.user);
    DISH.purchaseProduct(wizard, DISH.DISHPages.toolPage.RTProduct, 1, 2); //Add reservation tool premium for existing
    I.switchToNextTab();
    I.waitForText(wizard.contact.businessName);
    ResFunc.registerResWiz(wizard, 1);
    //Logout
    I.closeCurrentTab();
    DISH.logout();
  })

Feature('DISH purchase 2 Res @dish_purchase_2_res');
Scenario('DISH purchase one premium Reservation tool, one basic reservation tool',
  async function(I, DISH, NewHydra, ResFunc) {
    NewHydra.landing(dish_url);
    DISH.login(wizard.user);
    let wb = wizard.contact.businessName
    //First one with _1, premium
    wizard.contact.businessName = wb + '_1';
    DISH.purchaseProduct(wizard, DISH.DISHPages.toolPage.RTProduct, 1, 2);
    I.switchToNextTab();
    DISH.registerRes(wizard, ResFunc, res_url);
    ResFunc.checkIntegration();
    wizard.r_url = await I.grabTextFrom(ResFunc.RTPages.dashboardPages.widgetURL + '[1]');
    I.say(wizard.r_url);

    //Second one with _2, basic
    I.closeCurrentTab();
    wizard.contact.businessName = wb + '_2';
    I.say(wizard.contact.businessName);
    DISH.purchaseProduct(wizard, DISH.DISHPages.toolPage.RTProduct, 2, 2);
    I.switchToNextTab();
    DISH.registerRes(wizard, ResFunc, res_url);
    ResFunc.checkIntegration();
    wizard.r_url = await I.grabTextFrom(ResFunc.RTPages.dashboardPages.widgetURL + '[1]');
    I.say(wizard.r_url);
    //Logout
    I.closeCurrentTab();
    DISH.logout();
  })

// Web Listing
Feature('DISH Create WL Basic @dish_purchase_wlbas');
Scenario('DISH create establishment and purchase website listing basic',
  function(I, DISH, NewHydra) {
    NewHydra.landing(dish_url);
    DISH.login(wizard.user);
    DISH.purchaseProduct(wizard, DISH.DISHPages.toolPage.WLProduct, 2);
    I.switchToNextTab();
    DISH.registerWL(wizard, NewHydra, 2);
    //Logout
    I.closeCurrentTab();
    DISH.logout();
  })

Feature('DISH purchase WL Basic for existing Est. @dish_purchase_existing_wlbas');
Scenario('DISH purchase premium website listing with existing establishment',
  function(I, DISH, NewHydra) {
    NewHydra.landing(dish_url);
    DISH.login(wizard.user);
    //Purchase on existing establishment
    DISH.purchaseProduct(wizard, DISH.DISHPages.toolPage.WLProduct, 2, 1);
    I.switchToNextTab();
    DISH.registerWL(wizard, NewHydra, 2);
    //Logout
    I.closeCurrentTab();
    DISH.logout();
  })

Feature('DISH Create WL Premium @dish_purchase_wlpre');
Scenario('DISH create establishment and purchase website listing premium',
  function(I, DISH, NewHydra) {
    NewHydra.landing(dish_url);
    DISH.login(wizard.user);
    DISH.purchaseProduct(wizard, DISH.DISHPages.toolPage.WLProduct, 1);
    DISH.orderPayment(wizard);
    //Back to DISH page
    I.waitForVisible(DISH.DISHPages.shopPage.getStartedLink);
    I.click(DISH.DISHPages.shopPage.getStartedLink);
    //Continue to set up
    I.switchToNextTab();
    DISH.registerWL(wizard, NewHydra, 2);
    //Logout
    I.closeCurrentTab();
    DISH.logout();
  })

Feature('DISH purchase WL Premium for existing Est. @dish_purchase_existing_wlpre');
Scenario('DISH purchase premium website listing with existing establishment',
  function(I, DISH, NewHydra) {
    NewHydra.landing(dish_url);
    DISH.login(wizard.user);
    //Purchase on existing establishment
    DISH.purchaseProduct(wizard, DISH.DISHPages.toolPage.WLProduct, 1, 1);
    DISH.orderPayment(wizard);
    //Back to DISH page
    I.waitForVisible(DISH.DISHPages.shopPage.getStartedLink);
    I.click(DISH.DISHPages.shopPage.getStartedLink);
    //Continue to set up
    I.switchToNextTab();
    DISH.registerWL(wizard, NewHydra, 2);
    //Logout
    I.closeCurrentTab();
    DISH.logout();
  })

Feature('DISH Create fast bundle @dish_purchase_fastbun');
Scenario('DISH create establishment and purchase fast bundle',
  function(I, DISH, NewHydra) {
    NewHydra.landing(dish_url);
    DISH.login(wizard.user);
    DISH.purchaseProduct(wizard, 'Advanced Bundle', 1);
    DISH.orderPayment(wizard);
    //Back to DISH page
    I.waitForVisible(DISH.DISHPages.shopPage.getStartedLink);
    //Open each product
    I.click('//a[starts-with(@href,"https://reservation")][contains(.,"Get started")]');
    I.switchToNextTab();
    I.waitForText('I accept the Terms & Conditions.');
    I.click('I accept the Terms & Conditions.');
    I.click('Continue');
    I.closeCurrentTab();
    I.click('//a[starts-with(@href,"https://website")][contains(.,"Get started")]');
    I.switchToNextTab();
    I.closeCurrentTab();
    DISH.logout();
  })

Feature('DISH purchase Fast Bundle for existing Est. @dish_purchase_existing_fastbun');
Scenario('DISH purchase Fast Bundle with existing establishment',
  function(I, DISH, NewHydra) {
    NewHydra.landing(dish_url);
    DISH.login(wizard.user);
    //Purchase on existing establishment
    DISH.purchaseProduct(wizard, 'Advanced Bundle', 1, 1);
    DISH.orderPayment(wizard);
    //Back to DISH page
    I.waitForVisible(DISH.DISHPages.shopPage.getStartedLink);
    I.click('//a[starts-with(@href,"https://reservation")][contains(.,"Get started")]');
    //Open each product
    I.switchToNextTab();
    I.waitForText('I accept the Terms & Conditions.');
    I.click('I accept the Terms & Conditions.');
    I.click('Continue');
    I.closeCurrentTab();
    I.click('//a[starts-with(@href,"https://website")][contains(.,"Get started")]');
    I.switchToNextTab();
    I.closeCurrentTab();
    DISH.logout();
  })


Feature('DISH activate WL from WB  @dish_wb_wl_nowiz');
Scenario('DISH purchase premium website builder and activate WL after the wizard flow',
  function(I, DISH, NewHydra) {
    NewHydra.landing(dish_url);
    DISH.login(wizard.user);
    DISH.purchaseProduct(wizard, DISH.DISHPages.toolPage.WBProduct, 1);
    I.switchToNextTab();
    NewHydra.registerWB(wizard, 2);
    NewHydra.openTab('socialMedia');
    NewHydra.activateWebListing();
    //Logout
    I.closeCurrentTab();
    DISH.logout();
    DISH.login(wizard.user);
    DISH.openWL();
  })

Feature('DISH activate WL from WB in the wizard @dish_wb_wl_wiz');
Scenario('DISH purchase premium website builder and activate WL during the wizard flow',
  function(I, DISH, NewHydra) {
    NewHydra.landing(dish_url);
    DISH.login(wizard.user);
    DISH.purchaseProduct(wizard, DISH.DISHPages.toolPage.WBProduct, 1);
    I.switchToNextTab();
    NewHydra.registerWB(wizard, 2, 1);
    //Logout
    I.closeCurrentTab();
    DISH.logout();
    DISH.login(wizard.user);
    DISH.openWL();
  })

// Sales flow
Feature('DISH Sales Signup @dish_sales_register');
Scenario('Sales Signup DISH, WB and RES',
  async function(I, DISH, NewHydra, ResFunc) {
    //Sales Login
    NewHydra.landing(dish_url + '/user/sales-login/');
    DISH.saleslogin();
    //Signup
    DISH.signup(wizard);
    I.wait(2);
    //Signup WB
    DISH.purchaseProduct(wizard, DISH.DISHPages.toolPage.WBProduct, 1, 0, 1);
    I.switchToNextTab();
    NewHydra.registerWB(wizard, 2);
    I.closeCurrentTab();
    //Signup Res
    NewHydra.landing(d_url);
    DISH.logout();
    NewHydra.landing(dish_url + '/user/sales-login/');
    DISH.saleslogin();
    DISH.login(wizard.user);
    DISH.purchaseProduct(wizard, DISH.DISHPages.toolPage.RTProduct, 2, 1, 1);
    I.switchToNextTab();
    ResFunc.registerResWiz(wizard, 1);
    ResFunc.checkIntegration();
    I.waitForVisible(ResFunc.RTPages.dashboardPages.widgetURL + '[1]');
    wizard.r_url = await I.grabTextFrom(ResFunc.RTPages.dashboardPages.widgetURL + '[1]');
    I.say(wizard.r_url);
    //Logout
    I.closeCurrentTab();
    DISH.logout();
  })

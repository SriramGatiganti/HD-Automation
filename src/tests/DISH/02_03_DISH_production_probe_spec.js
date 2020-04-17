const {
  wizard,
  url,
  res_url,
  d_url
} = require('../../function/newHydra/wizard_data_provider_new');

Feature('DISH Production Probe @dish_production_probe');
Scenario('Signup DISH, purchase website builder and delete account',
  function(I, DISH, NewHydra) {
    NewHydra.landing(d_url + wizard.countryCode);
    DISH.signup(wizard);
    //Purchase with waiting 10 seconds for creating establishment
    DISH.purchaseProduct(wizard, DISH.DISHPages.toolPage.WBProduct, 1, 0, 0, 10);
    I.switchToNextTab();
    I.closeCurrentTab();
    DISH.deleteUser(wizard.user.password);
  })

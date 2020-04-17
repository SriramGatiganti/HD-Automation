const wizardDataProvider = require('../function/newHydra/wizard_data_provider_new');
let wizard = wizardDataProvider.wizard;

//Not able to test as link in text
Feature('Test SLAP @signups');
Scenario('Sign up',
  function(I) {
    //I.installApp("D:\\Arbeit\\Metro\\E2E_test_automation\\src\\function\\data\\mobile_app\\ShoppingApp-debug-staging.apk");
    I.seeAppIsInstalled("com.robusta.shoppingapp");
    I.see('Snap');
    I.see('List');
    I.wait(10);
    //I.tap('#com.robusta.shoppingapp:id/sign_up_tv'); //Not working since sign up is at right
    I.touchPerform([{
      action: 'press',
      options: {
        x: 980,
        y: 1900
      }
    }, {
      action: 'release'
    }])
    I.wait(5);
    I.fillField('#com.robusta.shoppingapp:id/user_restaurant', 'Test');
    I.tap('#com.robusta.shoppingapp:id/user_restaurant_type_spinner');
    I.tap('Pizza');
    I.fillField('#com.robusta.shoppingapp:id/user_name', wizard.business.value);
    I.fillField('#com.robusta.shoppingapp:id/user_email', wizard.user.username);
    I.fillField('#com.robusta.shoppingapp:id/user_password', wizard.user.password);
    I.tap('#com.robusta.shoppingapp:id/sign_up_btn');
    I.wait(5);
  })

Feature('Test SLAP @signin');
Scenario('Sign in',
  function(I) {
    //I.installApp("D:\\Arbeit\\Metro\\E2E_test_automation\\src\\function\\data\\mobile_app\\ShoppingApp-debug-staging.apk");
    I.seeAppIsInstalled("com.robusta.shoppingapp");
    I.see('Snap');
    I.see('List');
    I.wait(10);
    I.fillField('#com.robusta.shoppingapp:id/user_email', wizard.user.username);
    I.fillField('#com.robusta.shoppingapp:id/user_password', wizard.user.password);
    I.tap('#com.robusta.shoppingapp:id/submit_btn');
    I.wait(10);
    I.tap('~Navigate up');
    I.tap('Market Place');
    I.wait(2);
    I.fillField('Search For item', 'Test');
    I.wait(5);
    I.tap('~Navigate up');
    I.tap('Shopping lists');
    I.wait(5);
    I.tap('~Navigate up');
    I.tap('Logout');
    I.wait(5);
  })

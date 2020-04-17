Feature('DISH2 @dish2install');
Scenario('Install',
  async function(I) {
    I.seeAppIsInstalled('de.horecadigital.dishhubmobileapp');
    I.waitForText('Connect');
    I.swipeLeft('#de.horecadigital.dishhubmobileapp:id/image_tutorial');
    I.waitForText('Your Tools');
    I.swipeLeft('#de.horecadigital.dishhubmobileapp:id/image_tutorial');
    I.waitForText('Notification');
    I.click('NEXT');
    I.wait(5);
    I.click('#com.android.packageinstaller:id/permission_allow_button');
    I.wait(2);
    I.click('#com.android.packageinstaller:id/permission_allow_button');
    I.switchToNative();
    I.see('Please, sign-in with your Dish account.');
    I.click('SIGN UP');
    I.waitForText('Welcome to Dish. Please enter your details to start.');
  })
Feature('DISH2 @dish2loginlogout');
Scenario('Login and logout',
  async function(I) {
    I.seeAppIsInstalled('de.horecadigital.dishhubmobileapp');
    I.waitForText('We are happy to welcome you back!');
    I.wait(10);
  })

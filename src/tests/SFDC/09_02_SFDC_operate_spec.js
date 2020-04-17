Feature('Remove logs @sfdc_remove_logs');

Scenario('Remove debug logs',
  async function(I, NewHydra) {
    let sfdc_url;
    let username;
    let env = process.profile.split(':')[2];
    if (env == 'dev') {
      sfdc_url = '';
    }
    if (env = 'acc') {
      sfdc_url = 'https://horecadigital--full.lightning.force.com';
      username = 'g.zhou@reply.de.full';
    }
    if (env = 'prd') {
      sfdc_url = 'https://horecadigital.my.salesforce.com';
      username = 'g.zhou@reply.de';
    }

    I.amOnPage(sfdc_url);
    I.fillField('#username', username);
    I.fillField('#password', 'Test1234!"');
    I.click('#Login');
    I.wait(10);

    I.amOnPage(sfdc_url + '/lightning/setup/ApexDebugLogs/home')


    for (var i = 0; i < sfdc_user_ids.length; i++) {
      my_url = b_url + sfdc_user_ids[i] + '/view?0.source=alohaHeader';
      I.amOnPage(my_url);
      I.wait(2);
      I.waitForVisible('(//a[contains(@href,"mailto")])[1]');
      email = await I.grabTextFrom('(//a[contains(@href,"mailto")])[1]');
      I.say(sfdc_user_ids[i] + '\t' + email);
      result = result + email + '\n';
    }
    I.say(result);
  });

Feature('Unsubscribe asset @sfdc_mass_unsubscribe');
Scenario('Mass unsubscription',
  async function(I) {
    assetIDs = [''];
    //prod
    I.amOnPage('https://horecadigital.lightning.force.com');
    I.wait(20);
    //Login and enter verifiy code
    //I.waitForVisible('#save');
    //Wait for success login page
    I.waitForVisible('//div[@class="uiInput uiAutocomplete uiInput--default"]');
    //Go to assets page, disable it
    for (var i = 0; i < assetIDs.length; i++) {
      I.amOnPage('https://horecadigital.lightning.force.com/lightning/r/Asset/' + assetIDs[i] + '/view');
      I.wait(2);
      I.waitInUrl(assetIDs[i]);
      I.waitForVisible('//div[.="Unsubscribe"]');
      I.click('//div[.="Unsubscribe"]');
      I.waitForVisible('//button[.="Unsubscribe"]');
      I.click('//button[.="Unsubscribe"]');
      I.waitForText('Asset unsubscribed');
      I.click('//button[@class="slds-button slds-button_icon-x-small slds-button_icon-container"]');
    }
  });

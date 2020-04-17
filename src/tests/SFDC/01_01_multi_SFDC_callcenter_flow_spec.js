const {
  wizard,
  url,
  res_url
} = require('../../function/newHydra/wizard_data_provider_new');

Feature('Multiple call center agent flow @sfdc_multi_callcenter');
//Feature('Call center agent flow @debug');

Scenario('Multiple SFDC Call center flow',
  async function(I, NewHydra) {
    wizard.user.username = wizard.user.username.replace('@gmail.com', '') + 'msf' + '@gmail.com';
    let sfdc_url;
    let env = process.profile.split(':')[2];
    if (env == 'acc') {
      sfdc_url = 'https://horecadigital--full.lightning.force.com';
      username = 'k.dasugari@reply.de.full';
      password = await SFDC.getPassword('VGVzdEAxMjM=')
    }
    if (env == 'prd') {
      sfdc_url = 'https://horecadigital.my.salesforce.com';
      username = 'k.dasugari@reply.de';
      password = await SFDC.getPassword('VGVzdEAxMjM=')
    }
    if (env == 'dev') {
      sfdc_url = 'https://horecadigital--develop.lightning.force.com';
      username = 'g.zhou@reply.de.develop';
      password = await SFDC.getPassword('VGVzdDEyMzQh');
    }
    I.amOnPage(sfdc_url + '/lightning/n/Add_Leads');
    I.waitForVisible('#username');
    I.fillField('#username', username);
    I.fillField('#password', password);
    I.click('#Login');
    I.waitForText('Add Leads');


    for (var i = 0; i < 100; i++) {
      //Change data:
      //var i = 0;
      var num;
      if (i == 0) {
        num = 100
      } else if (i == 10) {
        num = -1
      } else {
        num = -(i.toString().length);
      }
      I.say(i);
      wizard.user.firstName = wizard.user.firstName.slice(0, num) + i.toString();
      wizard.user.lastName = wizard.user.lastName.slice(0, num) + i.toString();
      wizard.user.username = wizard.user.username.replace('@gmail.com', '').slice(0, num) + i.toString() + '@gmail.com';
      wizard.contact.streetNumber = wizard.contact.streetNumber.slice(0, num) + i.toString();
      wizard.company.businessName = wizard.company.businessName.slice(0, num) + i.toString();
      wizard.company.streetNumber = wizard.company.streetNumber.slice(0, num) + i.toString();

      //### Personal information
      I.amOnPage(sfdc_url + '/lightning/n/Add_Leads');
      I.waitForVisible('//input[@name="FirstName"]');
      I.wait(1);
      I.fillField('//input[@name="FirstName"]', wizard.user.firstName);
      I.fillField('//input[@name="LastName"]', wizard.user.lastName);
      I.moveCursorTo('//input[@name="Project__c"]');
      I.click('//input[@name="Project__c"]');
      I.wait(2);
      I.executeScript(function() { //select country
        let xpath = '//span[@title="Test"]';
        let ele = document.evaluate(xpath,
          document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
          null).singleNodeValue;
        ele.click();
      });
      I.fillField('//input[@name="Email"]', wizard.user.username);
      I.selectOption('(//select)[2]', '+7');
      I.fillField('//input[@name="MobilePhone"]', '22222222222');
      I.moveCursorTo('//input[@name="ChannelV2__c"]');
      I.click('//input[@name="ChannelV2__c"]');
      I.wait(2);
      //I.click('//*[@data-value="HD Sales"]');
      I.executeScript(function() {
        let xpath = '//*[@data-value="HD Sales"]';
        let ele = document.evaluate(xpath,
          document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
          null).singleNodeValue;
        ele.click();
      });
      I.moveCursorTo('//input[@name="country"]');
      I.click('//input[@name="country"]');
      I.wait(2);
      I.executeScript(function(c) { //select country
        let xpath = '//span[@title="' + c + '"]';
        let ele = document.evaluate(xpath,
          document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
          null).singleNodeValue;
        ele.click();
      }, wizard.country);
      //I.click('//span[@title="' + wizard.country + '"]');
      I.fillField('//textarea[@name="street"]', wizard.contact.streetName + ' ' + wizard.contact.streetNumber);
      I.fillField('//input[@name="postalCode"]', wizard.contact.postalCode);
      I.fillField('//input[@name="city"]', wizard.contact.city);

      //### Establishments
      //Company
      I.fillField('//input[@name="CompanyName__c"]', wizard.company.businessName);
      I.fillField('//textarea[@name="CompanyStreet__c"]', wizard.company.streetName + ' ' + wizard.company.streetNumber);
      I.fillField('//input[@name="CompanyPostalCode__c"]', wizard.company.postalCode);
      I.fillField('//input[@name="CompanyCity__c"]', wizard.company.city);
      //Establishment
      I.fillField('//input[@name="Establishment__c"]', wizard.contact.businessName);
      I.moveCursorTo('//input[@name="Establishment_Type__c"]');
      I.click('//input[@name="Establishment_Type__c"]');
      I.wait(2);
      //I.click('//*[@data-value="' + wizard.category + '"]');
      I.executeScript(function(c) {
        let xpath = '//*[@data-value="' + c + '"]';
        let ele = document.evaluate(xpath,
          document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
          null).singleNodeValue;
        ele.click();
      }, wizard.category);
      I.fillField('//textarea[@name="EstablishmentStreet__c"]', wizard.contact.streetName + ' ' + wizard.contact.streetNumber);
      I.fillField('//input[@name="EstablishmentPostalCode__c"]', wizard.contact.postalCode);
      I.fillField('//input[@name="EstablishmentCity__c"]', wizard.contact.city);
      //Products
      I.moveCursorTo('//input[@placeholder="Add Product"]');
      I.fillField('//input[@placeholder="Add Product"]', 'WB');
      I.waitForVisible('//span[.="Website Builder"]');
      I.click('//span[.="Website Builder"]');
      I.fillField('//input[@placeholder="Add Product"]', 'RT');
      I.waitForVisible('//span[.="Reservation Tool"]');
      I.click('//span[.="Reservation Tool"]');
      I.click('//button[@title="Save"]');
      I.wait(2);
      I.executeScript(function(c) {
        let xpath = '//button[@title="OK"]/span';
        let ele = document.evaluate(xpath,
          document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
          null).singleNodeValue;
        if (ele) {
          ele.click();
        }
      });
      //Open the leads
      I.waitForVisible('//a[contains(@title,"' + wizard.user.lastName + '")]');
      I.wait(2);
      //I.click('//a[contains(@title,"' + wizard.user.lastName + '")]');
      I.executeScript(function(n) {
        let xpath = '//a[contains(@title,"' + n + '")]';
        let ele = document.evaluate(xpath,
          document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
          null).singleNodeValue;
        ele.click();
      }, wizard.user.lastName);
      I.waitForVisible('//div[@title="Convert / Accept T&Cs"]');
      //Verify Number
      I.refreshPage(); //Avoid crash
      I.waitForVisible('//button[@title="Send"]');
      I.wait(5);
      //I.click('//button[@title="Send"]');
      I.executeScript(function(n) {
        let xpath = '//button[@title="Send"]';
        let ele = document.evaluate(xpath,
          document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
          null).singleNodeValue;
        ele.click();
      });
      I.waitForText('The verification Code has been sent to the given Mobile Number');
      I.fillField('//label[.="Verification Code"]/../div/input', '0000');
      I.click('//button[@title="Validate"]');
      I.waitForText('Mobile phone has been verified');
      //Covert leads
      I.waitForVisible('//div[.="Convert / Accept T&Cs"]');
      I.wait(2);
      I.click('//div[.="Convert / Accept T&Cs"]');
      I.waitForVisible('//input[@placeholder="Password..."]');
      I.fillField('//input[@placeholder="Password..."]', wizard.user.password);
      //I.click('//button[@title="Convert to Opportunity"]');
      I.executeScript(function() {
        let xpath = '//button[@title="Convert to Opportunity"]';
        let ele = document.evaluate(xpath,
          document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
          null).singleNodeValue;
        ele.click();
      });
      I.waitForText('Lead has been converted.', 120);
      I.refreshPage(); //Avoid crash
      //Work on the Opportunity
      //RES premium
      I.waitForVisible('(//div[contains(.,"Reservation Tool")]/../div[2]/lightning-radio-group//span[.="Accepted"])[2]');
      I.scrollTo('(//div[contains(.,"Reservation Tool")]/../div[2]/lightning-radio-group//span[.="Accepted"])[2]');
      I.moveCursorTo('(//div[contains(.,"Reservation Tool")]/../div[2]/lightning-radio-group//span[.="Accepted"])[2]');
      //I.click('(//div[contains(.,"Reservation Tool")]/../div[2]/lightning-radio-group//span[.="Accepted"])[2]');
      I.executeScript(function() {
        let xpath = '(//div[contains(.,"Reservation Tool")]/../div[2]/lightning-radio-group//span[.="Accepted"])[2]';
        let ele = document.evaluate(xpath,
          document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
          null).singleNodeValue;
        ele.click();
      });
      I.waitForVisible('//label[contains(.,"reservation_premium")]/span');
      I.wait(2);
      //I.click('//label[contains(.,"reservation_premium")]/span');
      I.executeScript(function() {
        let xpath = '//label[contains(.,"reservation_premium")]/span';
        let ele = document.evaluate(xpath,
          document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
          null).singleNodeValue;
        ele.click();
      });
      //WB Premium
      I.scrollTo('(//div[contains(.,"Website Builder")]/../div[2]/lightning-radio-group//span[.="Accepted"])[2]');
      I.moveCursorTo('(//div[contains(.,"Website Builder")]/../div[2]/lightning-radio-group//span[.="Accepted"])[2]');
      //I.click('(//span[.="Accepted"])[4]');
      I.executeScript(function() {
        let xpath = '(//div[contains(.,"Website Builder")]/../div[2]/lightning-radio-group//span[.="Accepted"])[2]';
        let ele = document.evaluate(xpath,
          document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
          null).singleNodeValue;
        ele.click();
      });
      I.waitForVisible('//label[contains(.,"presence_premium")]/span');
      I.scrollTo('//label[contains(.,"presence_premium")]/span');
      I.wait(2);
      //I.click('//label[contains(.,"presence_premium")]/span');
      I.executeScript(function() {
        let xpath = '//label[contains(.,"presence_premium")]/span';
        let ele = document.evaluate(xpath,
          document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
          null).singleNodeValue;
        ele.click();
      });
      //I.click('//button[.="Next"]');
      I.executeScript(function() {
        let xpath = '//button[.="Next"]';
        let ele = document.evaluate(xpath,
          document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
          null).singleNodeValue;
        ele.click();
      });
      I.waitForVisible('//button[.="Confirm"]');
      I.scrollTo('//button[.="Confirm"]');
      //I.click('//button[.="Confirm"]');
      I.executeScript(function() {
        let xpath = '//button[.="Confirm"]';
        let ele = document.evaluate(xpath,
          document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
          null).singleNodeValue;
        ele.click();
      });
      I.waitForVisible('//a[contains(@href,"dish.co")]', 120);
      //I.wait(10);

      I.waitForVisible('//div[contains(@class,"close")]/button[contains(@class,"slds-button_icon-x-small")]')
      //I.click('//div[contains(@class,"close")]/button[contains(@class,"slds-button_icon-x-small")]')
      I.executeScript(function() {
        let xpath = '//div[contains(@class,"close")]/button[contains(@class,"slds-button_icon-x-small")]';
        let ele = document.evaluate(xpath,
          document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
          null).singleNodeValue;
        ele.click();
      });
      I.wait(2);
      I.executeScript(function() {
        let xpath = '//div[contains(@class,"close")]/button[contains(@class,"slds-button_icon-x-small")]';
        let ele = document.evaluate(xpath,
          document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
          null).singleNodeValue;
        ele.click();
      });
    }

  });

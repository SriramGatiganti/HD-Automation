const {
  wizard,
  url,
  res_url,
} = require('../../function/newHydra/wizard_data_provider_new');
// let mainPage = require('../../function/financialForce/main.page.js');
// let opportunityPage = require('../../function/financialForce/pages/opportunity.page');
// let personAccountPage = require('../../function/financialForce/pages/person.account.page.js/index.js');
let pg = require('../../function/financialForce/pages/all.pages');
// var includeFolder = require('include-folder');
// var pg = includeFolder('../../function/financialForce/pages');

Feature('Call center agent flow @sfdc_callcenter');
//Feature('Call center agent flow @debug');
//ADD CHECK THAT ESTABLISHMENT IS CREATED!!!!

Scenario('SFDC Call center flow',
  async function(I) {
    // wizard.user.username = wizard.user.username.replace('@gmail.com', '') + 'sf' + '@gmail.com';
    let suffix = wizard.r_time;
    // let sfdc_url;
    // if (env == 'acc') {
    //   sfdc_url = 'https://horecadigital--full.lightning.force.com';
    //   username = 'k.dasugari@reply.de.full';
    //   password = await SFDC.getPassword('VGVzdEAxMjM=')
    // }
    // if (env == 'prd') {
    //   sfdc_url = 'https://horecadigital.my.salesforce.com';
    //   username = 'k.dasugari@reply.de';
    //   password = await SFDC.getPassword('VGVzdDEyMzQh');
    // }
    // if (env == 'dev') {
    //   sfdc_url = 'https://horecadigital--develop.lightning.force.com';
    //   username = 'g.zhou@reply.de.develop';
    //   password = await SFDC.getPassword('VGVzdDEyMzQh');
    // }
    // I.amOnPage(sfdc_url + '/lightning/n/Add_Leads');
    // I.waitForVisible('#username');
    // I.fillField('#username', username);
    // I.fillField('#password', password);
    // I.click('#Login');
    await pg.main.login();
    I.waitForText('Leads');

    //for (var i = 0; i < 50; i++) {
    //Change data:
    var i = 0;
    var num;
    if (i == 0) {
      num = 100
    } else if (i == 10) {
      num = -1
    } else {
      num = -(i.toString().length);
    }
    wizard.user.firstName = wizard.user.firstName.slice(0, num) + i.toString();
    wizard.user.lastName = wizard.user.lastName.slice(0, num) + i.toString();
    //wizard.user.username = wizard.user.username.replace('@gmail.com', '').slice(0, num) + i.toString() + '@gmail.com';
    wizard.contact.streetNumber = suffix;
    wizard.company.businessName = wizard.company.businessName.slice(0, num) + i.toString();
    wizard.company.streetNumber = suffix;

    //temporary overide of emai/username
    // wizard.user.username = 'HD*TUESDAY1234@gmail.com';

    I.addMochawesomeContext({
      title: 'Input data',
      value: wizard
    });

    //### Personal information
    // I.amOnPage(sfdc_url + '/lightning/n/Add_Leads');
    pg.main.openLeads();
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
    I.click('//div/label/span[text()="Primary Language"]//ancestor::div/div/div/select[@class="slds-select"]');
    I.click('//option[@value="en"]');
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
    I.wait(3);
    I.waitForVisible('//span[.="Website Builder"]');
    I.click('//span[.="Website Builder"]');
    I.fillField('//input[@placeholder="Add Product"]', 'UB');
    I.wait(3);
    I.click('//span[.="Web Listing"]');
    I.fillField('//input[@placeholder="Add Product"]', 'RT');
    I.wait(3);
    I.click('//span[.="Reservation Tool"]');
    I.click('//button[@title="Save"]');
    I.wait(2);
    I.executeScript(function() {
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
    I.executeScript(function(s) {
      let xpath = '//a[contains(@title,"' + s + '")]';
      let ele = document.evaluate(xpath,
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
      ele.click();
    }, wizard.user.lastName);
    I.waitForVisible('//a[contains(@title,"more actions")]');
    //Verify Number
    I.refreshPage(); //Avoid crash
    var link = pg.main.relatedTab;
    pg.personAccount.openPage(link);
    link = pg.personAccount.opportunity;
    pg.personAccount.openPage(link);
    I.waitForVisible('//button[@title="Send"]');
    I.wait(2);
    //I.click('//button[@title="Send"]');
    I.executeScript(function() {
      let xpath = '//button[@title="Send"]';
      let ele = document.evaluate(xpath,
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
      ele.click();
    });
    I.waitForVisible('//lightning-formatted-text[contains(.,"has been sent")]');
    I.fillField('//label[.="Verification Code"]/../div/input', '0000');
    //I.click('//button[@title="Validate"]');
    I.executeScript(function() {
      let xpath = '//button[@title="Validate"]';
      let ele = document.evaluate(xpath,
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
      ele.click();
    });
    I.waitForVisible('//lightning-formatted-text[contains(.,"Validated")]');
    //Covert leads
    I.wait(2);
    I.waitForVisible('//a[contains(@title,"more actions")]');
    //I.click('//a[contains(@title,"more actions")]');
    I.executeScript(function() {
      let xpath = '//a[contains(@title,"more actions")]';
      let ele = document.evaluate(xpath,
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
      ele.click();
    });
    I.waitForElement('//div[.="Convert / Accept T&Cs"]');
    //I.click('//div[.="Convert / Accept T&Cs"]');
    I.executeScript(function() {
      let xpath = '//div[.="Convert / Accept T&Cs"]';
      let ele = document.evaluate(xpath,
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
      ele.click();
    });
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
    //WL BASIC
    I.scrollTo('(//div[contains(.,"Web Listing")]/../div[2]/lightning-radio-group//span[.="Accepted"])[2]');
    I.moveCursorTo('(//div[contains(.,"Web Listing")]/../div[2]/lightning-radio-group//span[.="Accepted"])[2]');
    //I.click('(//span[.="Accepted"])[4]');
    I.executeScript(function() {
      let xpath = '(//div[contains(.,"Web Listing")]/../div[2]/lightning-radio-group//span[.="Accepted"])[2]';
      let ele = document.evaluate(xpath,
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
      ele.click();
    });
    I.waitForVisible('//label[contains(.,"Web_Listing_basic")]/span');
    I.wait(2);
    //I.click('//label[contains(.,"reservation_premium")]/span');
    I.executeScript(function() {
      let xpath = '//label[contains(.,"Web_Listing_basic")]/span';
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
    I.wait(10);

    //Check reservation tool
    I.scrollTo('//a[contains(@href,"' + res_url + '")]');
    //I.click('(//a[contains(@href,"dish.co")])[1]');
    I.executeScript(function(r) {
      let xpath = '//a[contains(@href,"' + r + '")]';
      let ele = document.evaluate(xpath,
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
      ele.click();
    }, res_url);
    I.switchToNextTab();
    I.waitForText(wizard.contact.businessName);
    I.closeCurrentTab();
    //Check website builder
    I.scrollTo('//a[contains(@href,"' + url + '")]');
    //I.click('(//a[contains(@href,"dish.co")])[2]');
    I.executeScript(function(u) {
      let xpath = '//a[contains(@href,"' + u + '")]';
      let ele = document.evaluate(xpath,
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
      ele.click();
    }, url);
    I.switchToNextTab();
    I.waitForText('Opening hours');
    I.closeCurrentTab();

    I.waitForVisible('//div[contains(@class,"close")]/button[contains(@class,"slds-button_icon-x-small")]')
    I.executeScript(function() {
      let xpath = '//div[contains(@class,"close")]/button[contains(@class,"slds-button_icon-x-small")]';
      let ele = document.evaluate(xpath,
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
      if (ele) {
        ele.click();
      }
    });
    I.wait(2);

    pg.opportunity.openPage(pg.opportunity.personAccountLink(wizard.user.firstName));
    // pg.personAccount.checkEstablishment(wizard.contact.businessName);

    I.executeScript(function() {
      let xpath = '//div[contains(@class,"close")]/button[contains(@class,"slds-button_icon-x-small")]';
      let ele = document.evaluate(xpath,
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
      if (ele) {
        ele.click();
      }
    });


  });

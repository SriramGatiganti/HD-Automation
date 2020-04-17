let page = require('./page.js');
const { I } = inject();

class personAccountPage extends page {
    // constructor() {
    //     this.personAccountEmailXPath = this.currentTab+'//a[@class="emailuiFormattedEmail"]';
    //     this.personAccountMobileXPath = this.currentTab+'//dd[text()="+722222222222"]';
    //     this.personAccountMobileVerifiedXPath = this.currentTab+'//span[text()="Validated"]';
    //     this.personAccountNameXPath = this.currentTab+'//dd[starts-with(text(),"x8EEn")]';
    //     this.personAccountCompanyAddressXPath = this.currentTab+'//span[text()="Company Address"]//parent::div//following-sibling::div//div[contains(@class,"forceOutputAddressText") and text() != ""]';
    // }

    // get email() { return await I.grabTextFrom(this.personAccountEmailXPath);}
    // get mobile() { return await I.grabTextFrom(this.personAccountMobileXPath);}
    // get verified() {return await I.grabTextFrom(this.personAccountMobileVerifiedXPath);}
    // get name() { return await I.grabTextFrom(this.personAccountNameXPath);}
    // get address() {return await I.grabTextFrom(this.personAccountCompanyAddressXPath);}

    get email() { return this.currentTab + '//a[@class="emailuiFormattedEmail"]'; }
    get mobile() { return this.currentTab + '//dd[text()="+722222222222"]'; }
    get verified() { return this.currentTab + '//span[text()="Validated"]'; }
    get name() { return this.currentTab + '//dd[starts-with(text(),"x8EEn")]'; }
    get country() { return this.currentTab + '//span[text()="Company Address"]//parent::div//following-sibling::div//div[contains(@class,"slds-truncate") and text() != ""]';}
        // old '//span[text()="Company Address"]//parent::div//following-sibling::div//div[contains(@class,"forceOutputAddressText") and text() != ""]'; }
    // get country() { return '(//span[text()="Country"]//parent::div//following-sibling::div//div/a)[1]'; }
        // '//span[text()="Country"]//parent::div//following-sibling::div//a[contains(@class,"slds-grow flex-wrap-ie11")]';}
    get address() { return this.currentTab + '//lightning-formatted-address'; }
    get opportunity() {return this.currentTab + '//span[text()="Opportunities (Establishment)"]//ancestor::div[@class="slds-grid slds-page-header forceRelatedListCardHeader"]//following-sibling::div//a[contains(@class,"textUnderline outputLookupLink")]'}
    
    establishment(name) { return this.currentTab + '//a[contains(.,"' + name + '")]'; }

    // openAccount(estName) {
    //     // I.waitForText(estName);
    //     I.executeScript(function (xpath) {
    //         let ele = document.evaluate(xpath,
    //             document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
    //             null).singleNodeValue;
    //         if (ele) {
    //             ele.click();
    //         }
    //     }, (this.establishment + estName + this.xpathEnd));
    // }

    checkEstablishment(estName) {
        I.see(estName);
    }

}
module.exports = new personAccountPage();
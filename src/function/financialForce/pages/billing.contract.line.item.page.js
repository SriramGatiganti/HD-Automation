let page = require('./page.js');
const { I } = inject();

class billingContractLineItemPage extends page {
    get salesPrice() { return this.currentTab + '//span[text()="Sales Price"]//parent::div//following-sibling::div//lightning-formatted-text'; }
    get billingTerm() { return this.currentTab + '//span[text()="Billing Term"]//parent::div//following-sibling::div//a[contains(@class,"slds-grow flex-wrap")]' ;}
    get contractLineItemNumber() { return this.currentTab + '//span[text()="Contract Line Item Number"]//parent::div//following-sibling::div//lightning-formatted-text'; }
    get contractNumber() { return this.currentTab + '//span[text()="Contract"]//parent::div//following-sibling::div//a[contains(@class,"slds-grow flex-wrap")]' ;}
    get billingSchedulesTab() { return this.currentTab + '//span[@title="Related Billing Schedules"]'; }
}
module.exports = new billingContractLineItemPage();
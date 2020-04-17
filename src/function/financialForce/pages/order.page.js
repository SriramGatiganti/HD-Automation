let page = require('./page.js');
const { I } = inject();

class orderPage extends page {
    get invoicesTab() { return this.currentTab + '//span[@title="Notes & Attachments"]'; }
    get PSPTransactionId() { return this.currentTab + '//span[text()="PSP Transaction ID"]//parent::div//following-sibling::div//span[contains(@class,"uiOutputText")]'; }
    get UID() { return this.currentTab + '//span[text()="UID"]//parent::div//following-sibling::div//span[contains(@class,"uiOutputText")]'; }
    get accountName() { return this.currentTab + '//span[text()="Account Name"]//parent::div//following-sibling::div//a[contains(@class,"textUnderline outputLookupLink")]'; }
    get amount() { return this.currentTab + '//span[text()="Order Amount"]//parent::div//following-sibling::div//span[contains(@class,"forceOutputCurrency")]'; }
    get startDate() { return this.currentTab + '//span[text()="Order Start Date"]//parent::div//following-sibling::div//span[contains(@class,"uiOutputDate")]'; }

    get paymentGateway() { return this.currentTab + '//span[text()="Payment Gateway"]//parent::div//following-sibling::div/span/span'; }
    // prepaymentAmount() { return this.currentTab + '//span[text()="Prepayment Amount"]//parent::div//following-sibling::div//span[contains(@class,"forceOutputCurrency")]' ;}
    get billingContract() { return this.currentTab + '//span[text()="Billing Contract"]//parent::div//following-sibling::div//a[contains(@class,"outputLookupLink") and starts-with(text(),"CT")]'; }
    get billingContractLink() { return this.currentTab + '//span[text()="Billing Contract"]//parent::div//following-sibling::div//a[contains(@class,"outputLookupLink") and starts-with(text(),"CT")]' }
   


    // openInvoicesList() {
    //     I.executeScript(function (xpath) {
    //         let ele = document.evaluate(xpath,
    //             document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
    //             null).singleNodeValue;
    //         if (ele) {
    //             ele.click();
    //         }
    //     }, this.invoicesTab);
    //     I.wait(2);
    //     I.scrollPageToBottom();
    //     I.wait(2);
    //     I.scrollPageToBottom();
    // }

    // openBillingContract() {
    //     I.executeScript(function (xpath) {
    //         let ele = document.evaluate(xpath,
    //             document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
    //             null).singleNodeValue;
    //         if (ele) {
    //             ele.click();
    //         }
    //     }, this.billingContractLink);
    //     I.wait(2);
    //     I.scrollPageToBottom();
    //     I.wait(2);
    //     I.scrollPageToBottom();
    // }
}
module.exports = new orderPage();
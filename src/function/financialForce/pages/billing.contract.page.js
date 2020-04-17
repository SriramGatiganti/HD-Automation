let page = require('./page.js');
const { I } = inject();

class billingContractPage extends page {
    get number() { return this.currentTab + '//span[text()="Contract Number"]//parent::div//following-sibling::div//lightning-formatted-text[starts-with(text(),"CT")]'; }

    contractLineItemXpath(product) {
        return (this.currentTab + '//th[text()="Product or Service"]//ancestor::thead//following-sibling::tbody//a[contains(@class,"outputLookupLink") and text() = "' + product + '"]//ancestor::tr//a[contains(@class,"outputLookupLink") and starts-with(text(),"CTLI")]');
    }

    // openContractLineItem(xp) {
    //     I.executeScript(function (xpath) {
    //         let ele = document.evaluate(xpath,
    //             document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
    //             null).singleNodeValue;
    //         if (ele) {
    //             ele.click();
    //         }
    //     }, this.contractLineItemXpath(xp));
    // }
}
module.exports = new billingContractPage();
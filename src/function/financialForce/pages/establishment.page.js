let page = require('./page.js');
const { I } = inject();

class establishmentPage extends page {
  get accountName() { return this.currentTab + '//span[text()="Account Name"]//parent::div//following-sibling::div//lightning-formatted-text';}
    // OLD'//span[text()="Account Name"]//parent::div//following-sibling::div//span[contains(@class,"uiOutputText")]'; }
  get estType() { return this.currentTab + '//span[text()="Establishment Type"]//parent::div//following-sibling::div//lightning-formatted-text'; }
  get assetTab() { return this.currentTab + '//span[text()="Assets" and @title="Assets"]'; }
  get asset() { return this.currentTab + '//th[@title="Asset Name"]//ancestor::thead//following-sibling::tbody//a[contains(@class,"outputLookupLink") and contains(text(), "'; }
  get ordersTab() { return this.currentTab + '//span[@title="Orders"]'; }
  get invoicesTab() { return this.currentTab + '//span[@title="Notes & Attachments"]'; }

  // openAssetList() {
  //   I.executeScript(function (xpath) {
  //     let ele = document.evaluate(xpath,
  //       document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
  //       null).singleNodeValue;
  //     if (ele) {
  //       ele.click();
  //     }
  //   }, this.assetTab);
  // }

  // openOrdersList() {
  //   I.executeScript(function (xpath) {
  //     let ele = document.evaluate(xpath,
  //       document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
  //       null).singleNodeValue;
  //     if (ele) {
  //       ele.click();
  //     }
  //   }, this.ordersTab);
  //   I.wait(2);
  //   I.scrollPageToBottom();
  //   I.wait(2);
  //   I.scrollPageToBottom();
  // }

}
module.exports = new establishmentPage();
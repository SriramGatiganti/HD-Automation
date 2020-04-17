let page = require('./page.js');
const { I } = inject();

class assetListPage extends page {
    assetLink(name) { return this.currentTab + '//span[text()="Asset Name"]//ancestor::thead//following-sibling::tbody//a[contains(@class,"outputLookupLink") and contains(text(),"' + name + '")]'; }

    // openAsset(assetName) {
    //     I.executeScript(function (xpath) {
    //         let ele = document.evaluate(xpath,
    //             document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
    //             null).singleNodeValue;
    //         if (ele) {
    //             ele.click();
    //         }
    //     }, this.assetLink + assetName + this.xpathEnd);
    // }

}
module.exports = new assetListPage();
let page = require('./page.js');
const { I } = inject();

class opportunityPage extends page {
    personAccountLink(name) { return this.currentTab + '//a[contains(text(),"' + name + '")]'; }

    // openPersonAccount(name) {
    //     I.executeScript(function (xpath) {
    //         let ele = document.evaluate(xpath,
    //             document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
    //             null).singleNodeValue;
    //         if (ele) {
    //             ele.click();
    //         }
    //     }, this.personAccountLink + name + this.xpathEnd);
    // }

}
module.exports = new opportunityPage();
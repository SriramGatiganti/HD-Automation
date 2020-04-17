let page = require('./page.js');
const { I } = inject();

class assetPage extends page {
    get name() {return this.currentTab+'//span[text()="Asset Name"]//parent::div//following-sibling::div//span[contains(@class,"uiOutputText")]';}
    get product() {return this.currentTab+'//span[text()="Product"]//parent::div//following-sibling::div//a[contains(@class,"outputLookupLink")]';}
    get establishment() {return this.currentTab+'//span[text()="Establishment"]//parent::div//following-sibling::div//a[contains(@class,"outputLookupLink ")]';}
    get status() {return this.currentTab+'//span[text()="Status"]//parent::div//following-sibling::div//span[contains(@class,"test-id__field-value slds-form-element__static slds-grow  is-read-only")]';}

}
module.exports = new assetPage();
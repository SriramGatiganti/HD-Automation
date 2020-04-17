const { I } = inject();
const ff = require('./financialForce.js');
const assert = require('assert');

//Global xpath to only look in the active tab
const currentTabXPath = '//section[@class="tabContent active oneConsoleTab"]';
//Global xpath for closing all non active tabs
const closeTabXPath = '//div[contains(@class,"oneGlobalNav oneConsoleNav")]//ancestor::li[not(contains(@class,"slds-is-active active"))]//button[contains(@title,"Close")]';
//Global xpath for closing all non active sub tabs
const closeSubTabXpath = '//ul[contains(@class,"tabBarItems slds-tabs--default__nav")]//ancestor::li[not(contains(@class,"slds-active active"))]//button[contains(@title,"Close")]';

//Person account xpaths
const personAccountEmailXPath = currentTabXPath+'//a[@class="emailuiFormattedEmail"]';
const personAccountMobileXPath = currentTabXPath+'//dd[text()="+722222222222"]';
const personAccountMobileVerifiedXPath = currentTabXPath+'//span[text()="Validated"]';
const personAccountNameXPath = currentTabXPath+'//dd[starts-with(text(),"x8EEn")]';
const personAccountCompanyAddressXPath = currentTabXPath+'//span[text()="Company Address"]//parent::div//following-sibling::div//div[contains(@class,"forceOutputAddressText") and text() != ""]';

//Establishment xpaths
const establishmentAddressesXPath = currentTabXPath+'//lightning-formatted-address';
const establishmentAccountNameXPath = currentTabXPath+'//span[text()="Account Name"]//parent::div//following-sibling::div//span[contains(@class,"uiOutputText")]';
const establishmentTypeXpath = currentTabXPath+'//span[text()="Establishment Type"]//parent::div//following-sibling::div/span/span';

//Asset xpaths
const assetNameXPath = currentTabXPath+'//span[text()="Asset Name"]//parent::div//following-sibling::div//span[contains(@class,"uiOutputText")]';
const productXPath = currentTabXPath+'//span[text()="Product"]//parent::div//following-sibling::div//a[contains(@class,"outputLookupLink")]';
const establishmentXPath = currentTabXPath+'//span[text()="Establishment"]//parent::div//following-sibling::div//a[contains(@class,"outputLookupLink ")]';
const statusXPath = currentTabXPath+'//span[text()="Status"]//parent::div//following-sibling::div//span[contains(@class,"test-id__field-value slds-form-element__static slds-grow  is-read-only")]';


let salesForceData = {
    name: [],
    establishmentName: [],
    email: [],
    password: [],
    personAccount: {
        email: [],
        mobile: [],
        verified: [],
        name: [],
        country: []
    },
    establishment: {
        addresses: [],
        type:[]
    },
    asset: {
        name: [],
        product: [],
        establishment: [],
        status: []
    }
}

async function grabText (text,xp) {
    let temp = await I.grabTextFrom(xp);
    I.addMochawesomeContext({title: 'grabbing text', value: temp})
    if (Array.isArray(temp)) {
      for (var i=0, l=temp.length; i<l; i++)
        if (text.indexOf(temp[i]) === -1 && temp[i] !== '')
            text.push(temp[i]);
    } else {
      text.push(temp);
    }
  }

 

module.exports = {
    salesForceData,
    grabText,
  
  
  async checkSignup(exRes) {
      await this.getPersonAccount();
      this.checkPersonAssertions(exRes);
    
    },
    async checkEstablishmentAddress(exRes) {
        await this.getEstablishmentAddresses();
        this.checkEstablishmentAddressAssertions(exRes);
    },
    async checkEstablishment(exRes) {
        await this.getEstablishment();
        this.checkEstablishmentAssertions(exRes);

    },
    async checkAsset(exRes, asset) {
        await this.getAsset();
        this.checkAssetAssertions(exRes,asset);

    },
  
    async getPersonAccount() {
            
        await grabText(salesForceData.personAccount.email, personAccountEmailXPath);
        await grabText(salesForceData.personAccount.mobile, personAccountMobileXPath);
        await grabText(salesForceData.personAccount.verified, personAccountMobileVerifiedXPath);
        await grabText(salesForceData.personAccount.name, personAccountNameXPath);
        await grabText(salesForceData.personAccount.country, personAccountCompanyAddressXPath);

    },

    async getEstablishmentAddresses() {
        await grabText(salesForceData.establishment.addresses,establishmentAddressesXPath);
    },

    async getEstablishment() {

        await grabText(salesForceData.establishmentName, establishmentAccountNameXPath);
        await grabText(salesForceData.establishment.type, establishmentTypeXpath);

    },

    async getAsset(){
        await grabText(salesForceData.asset.name, assetNameXPath);
        await grabText(salesForceData.asset.product, productXPath);
        await grabText(salesForceData.asset.establishment, establishmentXPath);
        await grabText(salesForceData.asset.status, statusXPath);
    },

    checkPersonAssertions(exRes) {

        let res = true;
        res = ff.assertStictEquality(salesForceData.personAccount.email, exRes.email) && res;
        res = ff.assertStictEquality(salesForceData.personAccount.mobile, exRes.mobile) && res;
        res = ff.assertStictEquality(salesForceData.personAccount.verified, exRes.verified) && res;
        res = ff.assertStictEquality(salesForceData.personAccount.name, exRes.name) && res;
        res = ff.assertStictEquality(salesForceData.personAccount.country, exRes.country) && res;

        assert(res===true);

    },

    checkEstablishmentAddressAssertions(exRes) {
        let res = true;
        res = ff.assertStictEquality(salesForceData.establishment.addresses[0], exRes.estAddress) && res;
        res = ff.assertStictEquality(salesForceData.establishment.addresses[1], exRes.compAddress) && res;     
        assert(res===true);
    },

    checkEstablishmentAssertions(exRes) {
        let res = true;
        res = ff.assertStictEquality(salesForceData.establishmentName, exRes.name) && res;
        res = ff.assertStictEquality(salesForceData.establishment.type, exRes.type) && res;
        assert(res===true);
    },

    checkAssetAssertions(exRes,asset) {
        let res = true;
        let i = salesForceData.asset.product.findIndex(ind => ind == asset);
        res = ff.assertStictEquality(salesForceData.asset.name[i], exRes.name) && res;
        res = ff.assertStictEquality(salesForceData.asset.product[i],exRes.product) && res;
        res = ff.assertStictEquality(salesForceData.asset.establishment[i], exRes.establishment) && res;
        res = ff.assertStictEquality(salesForceData.asset.status[i], exRes.status) && res;
        assert(res===true);
    }
    
}
const { I } = inject();
const assert = require('assert');
const SFDC = require('../public/sfdc.js');

//Global xpath to only look in the active tab
const currentTabXPath = '//section[@class="tabContent active oneConsoleTab"]';
//Global xpath for closing all non active tabs
const closeTabXPath = '//div[contains(@class,"oneGlobalNav oneConsoleNav")]//ancestor::li[not(contains(@class,"slds-is-active active"))]//button[contains(@title,"Close")]';
//Global xpath for closing all non active sub tabs
const closeSubTabXpath = '//ul[contains(@class,"tabBarItems slds-tabs--default__nav")]//ancestor::li[not(contains(@class,"slds-active active"))]//button[contains(@title,"Close")]';


let path = require('path');
let t_d_path = path.join(__dirname, '..', '..', 'function/data', 'financialForceData.txt');
let fs = require("fs");
let endOfLine = require('os').EOL;
let testing_data = fs.readFileSync(t_d_path, "utf-8");
let t_data = testing_data.split(endOfLine);
let input = {
  personName: t_data[0],
  establishmentName: t_data[1],
  email: t_data[2],
  password: t_data[3],
  startDate: t_data[4],
  productCode: t_data[5]
};

let d = input.startDate.slice(6,8);
let m = input.startDate.slice(4,6);
let y = input.startDate.slice(0,4);
let expectedDate = d + '.' + m + '.' + y;


//Init expected results
let ffexpect = {
  personName: input.personName,
  establishmentName: input.establishmentName,
  email: input.email,
  companyName: 'Hospitality Digital GmbH',
  startDate: expectedDate,
  paymentGateway: 'Wirecard',
  currency: 'EUR - Euro',
  amount: 'EUR 20,00',
  endDate: '',
  product: 'RT+WB_Bundle',
  salesPrice: 'EUR 16,81',
  billingTerm:  'Daily' ,
  type: 'Invoice',
  netValue:  'EUR 16,81' ,
  totalValue:  'EUR 16,81' ,
  unitPrice:  '16,810000000' ,
  VATProduct:  true ,
  actualProduct:  true ,
  taxRate:  '18,98%' ,
  netTotal:  '16,81' ,
  taxTotal:  '3,19' ,
  invoiceTotal:  '20,00' ,
  outstandingAmount:  '0,00' ,
  order: {
      status:'Activated',
      isProcessed: true
  },
  billingContract: {
      status: 'Active'
  },
  billingDocument: {
      firstInvoice: true,
      nextInvoices: false,
      status: 'Complete'
  },
  billingSchedule: {
    count: ' items • Sorted by Billing Schedule Name •'
  },
  salesInvoice: {
      paidByCreditCard: true,
      isProcessed: true,
      invoiceStatus: 'Complete',
      paymentStatus: 'Paid'
  }
};
//set expected results based upon product type
if (input.productCode == 'Web Listing') {
  ffexpect.amount = 'EUR 29,90';
  ffexpect.product = 'Web_Listing_premium';
  ffexpect.salesPrice = 'EUR 25,13';
  ffexpect.netValue =  'EUR 25,13' ;
  ffexpect.totalValue =  'EUR 25,13' ;
  ffexpect.unitPrice =  '25,130000000' ;
  ffexpect.netTotal =  '25,13';
  ffexpect.taxTotal =  '4,77';
  ffexpect.invoiceTotal =  '29,90';
} else if (input.productCode == 'Advanced Bundle') {
  ffexpect.amount = 'EUR 20,00';
  ffexpect.product = 'RT+WB_Bundle';
  ffexpect.salesPrice = 'EUR 16,81';
  ffexpect.netValue =  'EUR 16,81' ;
  ffexpect.totalValue =  'EUR 16,81' ;
  ffexpect.unitPrice =  '16,810000000' ;
  ffexpect.netTotal =  '16,81';
  ffexpect.taxTotal =  '3,19';
  ffexpect.invoiceTotal =  '20,00';
};

function daysInMonth(m, y){
  return m===2?y&3||!(y%25)&&y&15?28:29:30+(m+(m>>3)&1);
};


//Global data object array thingy
let financialForceData = {
  personName: [],
  establishmentName: [],
  email: [],
  password: [],
  order: {
    number: [],
    startDate: [],
    status: [],
    amount: [],
    PSPTransactionId: [],
    UID: [],
    accountName: [],
    paymentGateway: [],
    isProcessed: [],
    billingContractNumber: [],
    GUWID: [],
    invoiceNum: [],
    invoiceDate:[expectedDate]
  },
  billingContract: {
    number: [],
    status: [],
    firstBillDate: [],
    companyName: [],
    orderNumber: [],
    currency: [],
    startDate: [],
    endDate: []
  },
  contractLineItem: {
    number: [],
    product: [],
    vat: [],
    startDate: [],
    endDate: [],
    firstBillDate: [],
    salesPrice: [],
    billingTerm: [],
    contractNumber: []
  },
  billingDocument: {
    number: [],
    companyName: [],
    currency: [],
    status: [],
    type: [],
    firstInvoice: []
  },
  billingDocumentLineItem: {
    number: [],
    billingDocumentNumber: [],
    product: [],
    currency: [],
    netValue: [],
    totalValue: [],
    unitPrice: [],
    VATProduct: [],
    actualProduct: []
  },
  billingSchedule: {
    number: [],
    count: []
  },
  salesInvoice: {
    number: [],
    companyName: [],
    paidByCreditCard: [],
    isProcessed: [],
    documentSequence: [],
    GUWID: [],
    orderNumber: [],
    currency: [],
    date: [],
    establishmentName: [],
    originalExternalPSPID: [],
    taxRate: [],
    email: [],
    netTotal: [],
    taxTotal: [],
    invoiceTotal: [],
    invoiceStatus: [],
    paymentStatus: [],
    outstandingAmount: [],
    matchedPaymentCash: [],
    matchedPaymentTransaction: [],
    matchedPaymentType: [],
    matchedPaymentODV: [],
    matchedPaymentMDV: [],
    matchedPaymentStatus: []
  }
};


module.exports = {

  financialForceData,

  // async setResults(product) {
  //   if (product == 'Web Listing') {
  //     ffexpect.amount = 'EUR 29,90';
  //     ffexpect.product = 'Web_Listing_premium';
  //     ffexpect.salesPrice = 'EUR 25,13';
  //     ffexpect.netValue =  'EUR 25,13' ;
  //     ffexpect.totalValue =  'EUR 25,13' ;
  //     ffexpect.unitPrice =  '25,130000000' ;
  //     ffexpect.netTotal =  '25,13';
  //     ffexpect.taxTotal =  '4,77';
  //     ffexpect.invoiceTotal =  '29,90';
  //   } else if (product == 'Advanced Bundle') {
  //     ffexpect.amount = 'EUR 20,00';
  //     ffexpect.product = 'RT+WB_Bundle';
  //     ffexpect.salesPrice = 'EUR 16,81';
  //     ffexpect.netValue =  'EUR 16,81' ;
  //     ffexpect.totalValue =  'EUR 16,81' ;
  //     ffexpect.unitPrice =  '16,810000000' ;
  //     ffexpect.netTotal =  '16,81';
  //     ffexpect.taxTotal =  '3,19';
  //     ffexpect.invoiceTotal =  '20,00';
  //   }

  // },


  // Xpaths
  //generic xpath closer 
  linkXPath2: {xpath: '"]'},
  //Search xpaths
  searchXPath: '//input[@id="159:0;p"]',
  searchButtonXPath: {xpath: '//*[contains(@class,"SEARCH_OPTION")]'},
  searchBoxXPath: {xpath: '//span[@class="mruSearchLabel slds-text-body_regular slds-text-color_default slds-truncate slds-show slds-m-right_large slds-text-align_left slds-grow"]'},
  searchFailedXPath: {xpath: '//div[contains(text(),"give up yet!")]'},
  //Tab navigation xpaths
  relatedTabXPath: {xpath: currentTabXPath+'//span[@class="title"][contains(.,"Related")]'},
  detailsTabXPath: {xpath: currentTabXPath+'//span[@class="title"][contains(.,"Details")]'},

  // Account page xpaths
  assetlinkXPath: {xpath: currentTabXPath+'//th[text()="Asset Name"]//ancestor::thead//following-sibling::tbody//a[contains(@class,"outputLookupLink") and text() = "'+ffexpect.product+'"]'},
  assetTabXPath: {xpath: '//span[text()="Assets" and @title="Assets"]'},

  //Asset page xpaths
  assetXPath: {xpath: currentTabXPath+'//th[@title="Asset Name"]//ancestor::thead//following-sibling::tbody//a[contains(@class,"outputLookupLink") and text() = "'},

  //Order page xpaths
  ordersXPath: {xpath: currentTabXPath+'//span[contains(@class,"forceOutputCurrency") and text() ="'+ffexpect.amount+'"]//ancestor::tr//span[text() ="Activated"]//ancestor::tr//a[contains(@class,"outputLookupLink")and starts-with(text(),"0")]'},
  orderLinkXPath1: {xpath: currentTabXPath+'//span[contains(@class,"forceOutputCurrency") and text() ="'+ffexpect.amount+'"]//ancestor::tr//a[contains(@class,"outputLookupLink")and text() ="'},
  orderPageXPath: {xpath: currentTabXPath+'//span[@title="Orders"]'},
  PSPTransactionIdXPath: {xpath: currentTabXPath+'//span[text()="PSP Transaction ID"]//parent::div//following-sibling::div//span[contains(@class,"uiOutputText")]'},
  UIDXPath: {xpath: currentTabXPath+'//span[text()="UID"]//parent::div//following-sibling::div//span[contains(@class,"uiOutputText")]'},
  accountNameXPath: {xpath: currentTabXPath+'//span[text()="Account Name"]//parent::div//following-sibling::div//a[contains(@class,"textUnderline outputLookupLink")]'},
  orderAmountXPath: {xpath: currentTabXPath+'//span[text()="Order Amount"]//parent::div//following-sibling::div//span[contains(@class,"forceOutputCurrency")]'},
  orderStartDateXPath: {xpath: currentTabXPath+'//span[text()="Order Start Date"]//parent::div//following-sibling::div//span[contains(@class,"uiOutputDate")]'},
  paymentGatewayXPath: {xpath: currentTabXPath+'//span[text()="Payment Gateway"]//parent::div//following-sibling::div/span/span'},
  prepaymentAmountXPath: {xpath: currentTabXPath+'//span[text()="Prepayment Amount"]//parent::div//following-sibling::div//span[contains(@class,"forceOutputCurrency")]'},
  notesAndAttachmentsXPath: {xpath: currentTabXPath+'//span[@title="Notes & Attachments"]'},
  orderSalesInvoiceXPath: {xpath: currentTabXPath+'//span[@title="Title"]//ancestor::thead//following-sibling::tbody//span[contains(@class,"outputTextOverride")]|//span[@title="Title"]//ancestor::thead//following-sibling::tbody//span[contains(@class,"uiOutputDateTime")]'},
  // orderSalesInvoiceXPath: {xpath: currentTabXPath+'//span[@title="Title"]//ancestor::thead//following-sibling::tbody//span[contains(@class,"outputTextOverride")]'},
  orderTabXPath: {xpath: '//span[text()="Order"]'},

  //Billing Contract link xpaths
  billingContractXpath: {xpath: currentTabXPath+'//span[text()="Billing Contract"]//parent::div//following-sibling::div//a[contains(@class,"outputLookupLink") and starts-with(text(),"CT")]'},

  //Billing Contract Page xpaths
  billingContractNumberXPath: {xpath: currentTabXPath+'//span[text()="Contract Number"]//parent::div//following-sibling::div//span[contains(@class,"uiOutputText") and starts-with(text(),"CT")]'},
  
 

  //Contract line item link xpaths
  contractLineItemXPath: {xpath: currentTabXPath+'//th[text()="Product or Service"]//ancestor::thead//following-sibling::tbody//a[contains(@class,"outputLookupLink") and text() = "'+ffexpect.product+'"]//ancestor::tr//a[contains(@class,"outputLookupLink") and starts-with(text(),"CTLI")]'},
    
    // '//th[text()="Contract Line Item Number"]//ancestor::thead//following-sibling::tbody//a[contains(@class,"outputLookupLink")and starts-with(text(),"CTLI")]'},
  contractLineItemLinkXPath: {xpath: currentTabXPath+'//th[text()="Contract Line Item Number"]//ancestor::thead//following-sibling::tbody//a[contains(@class,"outputLookupLink")and text() = "'},

  //Contract line item page xpaths
  salesPriceXPath : {xpath: currentTabXPath+'//span[text()="Sales Price"]//parent::div//following-sibling::div//span[contains(@class,"forceOutputCurrency")]'},
  billingTermXPath: {xpath: currentTabXPath+'//span[text()="Billing Term"]//parent::div//following-sibling::div//a[contains(@class,"textUnderline outputLookupLink")]'},
  contractLineItemNumberXpath: {xpath: currentTabXPath+'//span[text()="Contract Line Item Number"]//parent::div//following-sibling::div//span[contains(@class,"uiOutputText") and starts-with(text(),"CTLI")]'},
  contractNumberXPath: {xpath: currentTabXPath+'//span[text()="Contract"]//parent::div//following-sibling::div//a[contains(@class,"outputLookupLink") and starts-with(text(),"CT")]'},



  //Billing Schedules Xpaths
  relatedBillingSchedulePageXPath: {xpath: currentTabXPath+'//span[@title="Related Billing Schedules"]'},
  billingSchedulesXPath: {xpath: currentTabXPath+'//th[@title="Billing Schedule Name"]//ancestor::thead//following-sibling::tbody//a[contains(@class,"outputLookupLink")and starts-with(text(),"BS")]'},
  billingScheduleLinkXPath: {xpath: currentTabXPath+'//th[@title="Billing Schedule Name"]//ancestor::thead//following-sibling::tbody//a[contains(@class,"outputLookupLink")and text() = "'},
  billingScheduleCountXPath: {xpath: currentTabXPath+'//span[@class="countSortedByFilteredBy"]'},
  billingSchedulesTabXPath: {xpath: '//span[text()="Related Billing Schedules"]'},

  //Billing Document Line Items XPaths
  billingDocumentLineItemsXPath: {xpath: currentTabXPath+'//th[@title="Billing Schedule Name"]//ancestor::thead//following-sibling::tbody//a[contains(@class,"outputLookupLink")and starts-with(text(),"BDLI")]'},
  billingDocumentLineItemLinkXPath: {xpath: currentTabXPath+'//th[@title="Billing Schedule Name"]//ancestor::thead//following-sibling::tbody//a[contains(@class,"outputLookupLink")and text() = "'},
  billingDocumentContractLineItemXPath: {xpath: currentTabXPath+'//span[text()="Contract Line Item"]//parent::div//following-sibling::div//a[contains(@class,"textUnderline outputLookupLink") and starts-with(text(),"CTLI")]'},


  //Billing document line item page xpaths
  documentLineNumberXPath: {xpath: currentTabXPath+'//span[text()="Billing Document"]//parent::div//following-sibling::div//a[contains(@class,"outputLookupLink") and starts-with(text(),"BD")]'},
  netValueXPath: {xpath: currentTabXPath+'//span[text()="Net Value"]//parent::div//following-sibling::div//span[contains(@class,"forceOutputCurrency")]'},
  totalValueXpath: {xpath: currentTabXPath+'//span[text()="Total Value"]//parent::div//following-sibling::div//span[contains(@class,"forceOutputCurrency")]'},
  unitPriceXPath: {xpath: currentTabXPath+'//span[text()="Unit Price"]//parent::div//following-sibling::div//span[contains(@class,"uiOutputNumber")]'},
  VATProductCheckboxXPath: {xpath: currentTabXPath+'//span[text()="VATProduct"]//parent::div//following-sibling::div//img[contains(@class,"checked") and @alt="True"]'},
  actualProductCheckboxXPath: {xpath: currentTabXPath+'//span[text()="ActualProduct"]//parent::div//following-sibling::div//img[contains(@class,"checked") and @alt="True"]'},

  // Billing document xpath
  billingDocumentXPath: {xpath: currentTabXPath+'//span[text()="Billing Document"]//parent::div//following-sibling::div//a[contains(@class,"outputLookupLink") and starts-with(text(),"BD")]'},

  //Billing document page xpaths
  billingDocumentNumberXPath: {xpath: currentTabXPath+'//span[text()="Document Number"]//parent::div//following-sibling::div//span[contains(@class,"uiOutputText") and starts-with(text(),"BD")]'},
  documentStatusXPath: {xpath: currentTabXPath+'//span[text()="Document Status"]//parent::div//following-sibling::div/span/span'},
  documentTypeXPath: {xpath: currentTabXPath+'//span[text()="Document Type"]//parent::div//following-sibling::div/span/span'},
  firstInvoiceXPath: {xpath: currentTabXPath+'//span[text()="FirstInvoice?"]//parent::div//following-sibling::div//img[contains(@class,"checked") and @alt="True"]'},


  //Sales invoice xpaths
  salesInvoiceXPath: {xpath: currentTabXPath+'//span[text()="Sales Invoice"]//parent::div//following-sibling::div//a[contains(@class,"outputLookupLink") and starts-with(text(),"SIN")]'},
  paidByCreditcardCheckboxXPath: {xpath: currentTabXPath+'//span[text()="Paid_By_Creditcard"]//parent::div//following-sibling::div//img[contains(@class,"checked") and @alt="True"]'},
  documentSequenceXPath: {xpath: currentTabXPath+'//span[text()="Document Sequence"]//parent::div//following-sibling::div//span[contains(@class,"uiOutputText")]'},
  establishmentNameXPath: {xpath: currentTabXPath+'//span[text()="Establishment"]//parent::div//following-sibling::div//a[contains(@class,"outputLookupLink")]'},
  originalExternalPSPIDXPath: {xpath: currentTabXPath+'//span[text()="OriginalExternalPSPID"]//parent::div//following-sibling::div//span[contains(@class,"uiOutputText")]'},
  invoiceDateXPath: {xpath: currentTabXPath+'//span[text()="Invoice Date"]//parent::div//following-sibling::div//span[contains(@class,"uiOutputDate")]'},
  taxRateXPath: {xpath: currentTabXPath+'//span[text()="TaxRate"]//parent::div//following-sibling::div//span[contains(@class,"uiOutputPercent")]'},
  salesInvoiceEmailXPath: {xpath: currentTabXPath+'//span[text()="InvoiceEmail"]//parent::div//following-sibling::div//span[contains(@class,"uiOutputTextArea")]'},
  netTotalXPath: {xpath: currentTabXPath+'//span[text()="Net Total"]//parent::div//following-sibling::div//span[contains(@class,"uiOutputNumber")]'},
  taxTotalXPath: {xpath: currentTabXPath+'//span[text()="Tax Total"]//parent::div//following-sibling::div//span[contains(@class,"uiOutputNumber")]'},
  invoiceTotalXPath: {xpath: currentTabXPath+'//span[text()="Invoice Total"]//parent::div//following-sibling::div//span[contains(@class,"uiOutputNumber")]'},
  invoiceStatusXPath: {xpath: currentTabXPath+'//span[text()="Invoice Status"]//parent::div//following-sibling::div//span[contains(@class,"test-id__field-value slds-form-element__static slds-grow  is-read-only")]'},
  paymentStatusXPath: {xpath: currentTabXPath+'//span[text()="Payment Status"]//parent::div//following-sibling::div//span[contains(@class,"test-id__field-value slds-form-element__static slds-grow  is-read-only")]'},
  outstandingAmountXPath: {xpath: currentTabXPath+'//span[text()="Outstanding Value"]//parent::div//following-sibling::div//span[contains(@class,"test-id__field-value slds-form-element__static slds-grow  is-read-only")]'},
  matchedPaymentTableXPath: {xpath: '//th//div[text()="Document Type"]//ancestor::table[@class="list"]'},
  
 
  //Multi use xpaths (used on multiple screens)
  isProcessedCheckboxXPath: {xpath: currentTabXPath+'//span[text()="isProcessed"]//parent::div//following-sibling::div//img[contains(@class,"checked") and @alt="True"]'},
  GUWIDXPath: {xpath: currentTabXPath+'//span[text()="GUWID"]//parent::div//following-sibling::div//span[contains(@class,"uiOutputText")]'},
  statusXPath: {xpath: currentTabXPath+'//span[text()="Status"]//parent::div//following-sibling::div/span/span'},
  startDateXPath: {xpath: currentTabXPath+'//span[text()="Start Date"]//parent::div//following-sibling::div//span[contains(@class,"uiOutputDate")]'},
  endDateXPath: {xpath: currentTabXPath+'//span[text()="End Date"]//parent::div//following-sibling::div//span[contains(@class,"uiOutputDate")]'},
  firstBillDateXPath: {xpath: currentTabXPath+'//span[text()="First Bill Date"]//parent::div//following-sibling::div//span[contains(@class,"uiOutputDate")]'},
  productXPath: {xpath: currentTabXPath+'//span[text()="Product or Service"]//parent::div//following-sibling::div//a[contains(@class,"textUnderline outputLookupLink") and starts-with(text(),"'+ffexpect.product+'")]'},
  currencyXPath: {xpath: currentTabXPath+'//span[text()="Currency"]//parent::div//following-sibling::div/span/span'},
  companyNameXPath: {xpath: currentTabXPath+'//span[text()="Company"]//parent::div//following-sibling::div//a[contains(@class,"textUnderline outputLookupLink")]'},
  orderNumberXPath: {xpath: currentTabXPath+'//span[text()="Order"]//parent::div//following-sibling::div//a[contains(@class,"textUnderline outputLookupLink")]'},

  //logout xpaths
  settingsIconXPath: {xpath: '//div[@class="profileTrigger branding-user-profile bgimg slds-avatar slds-avatar_profile-image-small circular forceEntityIcon"]/span/img[@title="User"]'},
  logOutXPath: {xpath: '//a[@class="profile-link-label logout uiOutputURL"]'},

 

  async SFDCLogin() {

    let sfdc_url;
    let env = process.profile.split(':')[0];
    if (env == 'acc') {
      sfdc_url = 'https://horecadigital--full.lightning.force.com';
      username = 'k.dasugari@reply.de.full';
      password = await SFDC.getPassword('VGVzdEAxMjM=')
    }
    if (env == 'prd') {
      sfdc_url = 'https://horecadigital.my.salesforce.com';
      username = 'k.dasugari@reply.de';
      password = await SFDC.getPassword('VGVzdEAxMjM=');
    }
    I.amOnPage(sfdc_url + '/lightning/n/Add_Leads');
    let header = await I.grabTitle();
    if (header.includes ("Login") || header.includes ("Anmelden")) { 
      I.waitForVisible('#username');
      I.fillField('#username', username);
      I.fillField('#password', password);
      I.click('#Login');
      I.waitForText('Add Leads');
    }
  },

  SFDCLogout() {
    this.closeTabs();
    I.executeScript(function(xpath) {
      let ele = document.evaluate(xpath,
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
      if (ele) {
        ele.click();
      }
    }, this.settingsIconXPath.xpath);
    I.executeScript(function(xpath) {
      let ele = document.evaluate(xpath,
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
      if (ele) {
        ele.click();
      }
    }, this.logOutXPath.xpath);

  },

  //Search functions
  submitSearch(email, personName) {
    financialForceData.email = email;
    financialForceData.personName = personName;
    I.waitForEnabled(this.searchXPath);
    I.click(this.searchXPath);
    I.fillField(this.searchXPath, financialForceData.email);
    
    I.waitForEnabled(this.searchButtonXPath);
    // I.click(this.searchButtonXPath);
    I.click(this.searchBoxXPath);
    //retry since sometimes the first search doesn#t work for some strange reason
    I.executeScript(function(xpath1,xpath2) {
      let ele1 = document.evaluate(xpath1,
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
      if (ele1) {
        let ele2 = document.evaluate(xpath2,
          document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
          null).singleNodeValue;
        ele2.click();
      }
    }, this.searchFailedXPath.xpath,  this.searchBoxXPath.xpath);

    I.waitForText(financialForceData.personName);
    I.click(financialForceData.personName);
    // I.click(this.searchBoxXPath);
  },

  openEstablishment(establishmentName) {
    financialForceData.establishmentName = establishmentName;
    I.waitForText(financialForceData.establishmentName);
    let establishmentXPath = currentTabXPath+'//a[contains(.,"'+ financialForceData.establishmentName +'")]';
    I.executeScript(function(xpath) {
      let ele = document.evaluate(xpath,
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
      if (ele) {
        ele.click();
      }
    }, establishmentXPath);
  },


  openAssetTab() {
    I.executeScript(function(xpath) {
      let ele = document.evaluate(xpath,
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
      if (ele) {
        ele.click();
      }
    }, this.assetTabXPath.xpath);
  },

  openAsset(assetName) {
    let xp = this.assetXPath.xpath + assetName+this.linkXPath2.xpath
    I.executeScript(function(xpath) {
      let ele = document.evaluate(xpath,
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
      if (ele) {
        ele.click();
      }
    }, xp);
  },

  //Order_page functions

  openOrdersPage() {
    I.click(this.orderPageXPath.xpath);
    I.wait(2);
    I.scrollPageToBottom();
    I.wait(2);
    I.scrollPageToBottom();
  },
 
  async openOrder() {
    await this.grabText(financialForceData.order.number,this.ordersXPath.xpath);
    let oNumXPath = this.orderLinkXPath1.xpath+financialForceData.order.number[0]+this.linkXPath2.xpath;
    // I.scrollTo(oNumXPath);
    // I.wait(2);
    I.executeScript(function(xpath) {
      let ele = document.evaluate(xpath,
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
      if (ele) {
        ele.click();
      }
    }, oNumXPath);

  },

  getOrderDetails() {
    this.grabText(financialForceData.order.PSPTransactionId,this.PSPTransactionIdXPath.xpath);
    this.grabText(financialForceData.order.UID,  this.UIDXPath.xpath);
    this.grabText(financialForceData.order.accountName,this.accountNameXPath.xpath);
    this.grabText(financialForceData.order.amount,this.orderAmountXPath.xpath);
    this.grabText(financialForceData.order.startDate,this.orderStartDateXPath.xpath);
    this.grabText(financialForceData.order.status,this.statusXPath.xpath);
    this.grabText(financialForceData.order.paymentGateway,this.paymentGatewayXPath.xpath);
    this.grabText(financialForceData.order.billingContractNumber,this.billingContractXpath.xpath);
    this.grabText(financialForceData.order.GUWID,this.GUWIDXPath.xpath);
    this.checkBoxEval(financialForceData.order.isProcessed,this.isProcessedCheckboxXPath.xpath);   
   
  },

  openOrderInvoices() {
    I.executeScript(function(xpath) {
      let ele = document.evaluate(xpath,
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
      if (ele) {
        ele.click();
      }
    }, this.notesAndAttachmentsXPath.xpath);
    I.wait(2);
    I.scrollPageToBottom();
    I.wait(2);
    I.scrollPageToBottom();

  },

  async getOrderInvoices() {
    let isData = await I.executeScript(function(xpath) {
      let ele = document.evaluate(xpath,
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
      if (ele) {
        return true;
      } else return false;
    }, this.orderSalesInvoiceXPath.xpath);
    if (isData) {
      let salesInvoices = [];
      await this.grabText(salesInvoices,this.orderSalesInvoiceXPath.xpath);
      for (i = 0; i < salesInvoices.length; i+= 2) {
        financialForceData.order.invoiceNum[i] = salesInvoices[i].substring(0,13);
      };
  
      for (i = 1; i < salesInvoices.length; i+= 2) {
        financialForceData.order.invoiceDate[i] = salesInvoices[i].substring(0,10);
      };  
      financialForceData.order.invoiceDate.sort();  
      financialForceData.order.invoiceNum.sort();
    } else {
      financialForceData.order.invoiceDate.push(expectedDate);
      financialForceData.order.invoiceNum.push('');

    }
    //   this.grabText(financialForceData.order.salesInvoices,this.orderSalesInvoiceXPath.xpath);


  },

//   checkOrderDetails() {
//     I.see(financialForceData.order.status);
//     I.see(financialForceData.order.amount);
//     I.see('Billing Contract');
//     I.see('GUWID');
//  //   I.seeCheckboxIsChecked('isProcessed'); 
//   },

    //Billing Contract and Billing Contract Line Item functions  
  openBillingContract () {
    I.executeScript(function(xpath) {
      let ele = document.evaluate(xpath,
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
      if (ele) {
        ele.click();
      }
    }, this.billingContractXpath.xpath);
  },

  async openWLPContractLineItem() {
    await this.grabText(financialForceData.contractLineItem.number, this.contractLineItemXPath.xpath);
    let cNumXPath = this.contractLineItemLinkXPath.xpath+financialForceData.contractLineItem.number[0]+this.linkXPath2.xpath;
    I.executeScript(function(xpath) {
    let ele = document.evaluate(xpath,
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
    null).singleNodeValue;
    if (ele) {
      ele.click();
      }
    }, cNumXPath);  
  },

  getBillingContractDetails() {
    this.grabText(financialForceData.billingContract.status , this.statusXPath.xpath);
    this.grabText(financialForceData.billingContract.number , this.billingContractNumberXPath.xpath);
    this.grabText(financialForceData.billingContract.firstBillDate , this.firstBillDateXPath.xpath);
    this.grabText(financialForceData.billingContract.companyName , this.companyNameXPath.xpath);
    this.grabText(financialForceData.billingContract.orderNumber , this.orderNumberXPath.xpath);
    this.grabText(financialForceData.billingContract.currency , this.currencyXPath.xpath);
    this.grabText(financialForceData.billingContract.startDate , this.startDateXPath.xpath);
    this.grabText(financialForceData.billingContract.endDate , this.endDateXPath.xpath);
  },

  getBillingContractLineItemDetails() {
    this.grabText(financialForceData.contractLineItem.startDate , this.startDateXPath.xpath);
    this.grabText(financialForceData.contractLineItem.endDate , this.endDateXPath.xpath);
    this.grabText(financialForceData.contractLineItem.firstBillDate , this.firstBillDateXPath.xpath);
    this.grabText(financialForceData.contractLineItem.product , this.productXPath.xpath);
    this.grabText(financialForceData.contractLineItem.salesPrice , this.salesPriceXPath.xpath);
    this.grabText(financialForceData.contractLineItem.billingTerm , this.billingTermXPath.xpath);
    this.grabText(financialForceData.contractLineItem.number , this.contractLineItemNumberXpath.xpath);
    this.grabText(financialForceData.contractLineItem.contractNumber , this.contractNumberXPath.xpath);
  },

  //Billing schedule and billing document line item functions
  openBillingSchedulePage() {
    I.click(this.relatedBillingSchedulePageXPath.xpath);
    I.wait(2);
    I.scrollPageToBottom();
    I.wait(2);
    I.scrollPageToBottom();
  },

  // reopenBillingSchedulePage() {
  //   I.executeScript(function(xpath) {
  //     let ele = document.evaluate(xpath,
  //     document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
  //     null).singleNodeValue;
  //     if (ele) {
  //       ele.click();
  //       }
  //     }, this.billingSchedulesTabXPath.xpath);  
  //   I.wait(2);
  //   I.scrollPageToBottom();
  //   I.wait(2);
  //   I.scrollPageToBottom();
  // },
  

  async openBillingDocumentLineItem(day) {
    if (day == 0) {
      await this.grabText(financialForceData.billingSchedule.number,this.billingSchedulesXPath.xpath);
      await this.grabText(financialForceData.billingDocumentLineItem.number, this.billingDocumentLineItemsXPath.xpath);
      await this.grabText(financialForceData.billingSchedule.count, this.billingScheduleCountXPath.xpath);
    }
    let bdlNumXPath = this.billingDocumentLineItemLinkXPath.xpath+financialForceData.billingDocumentLineItem.number[day]+this.linkXPath2.xpath;
    I.executeScript(function(xpath) {
    let ele = document.evaluate(xpath,
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
    null).singleNodeValue;
    if (ele) {
      ele.click();
      }
    }, bdlNumXPath);  
  },

  getBillingDocumentLineItemDetails() {
    this.grabText(financialForceData.billingDocumentLineItem.billingDocumentNumber, this.billingDocumentXPath.xpath);
    this.grabText(financialForceData.billingDocumentLineItem.product, this.productXPath.xpath);
    this.grabText(financialForceData.billingDocumentLineItem.currency, this.currencyXPath.xpath);
    // this.grabText(financialForceData.billingDocumentLineItem.billingDocumentNumber, this.documentLineNumberXPath.xpath);
    this.grabText(financialForceData.billingDocumentLineItem.netValue, this.netValueXPath.xpath);
    // this.grabText(financialForceData.billingDocumentLineItem.totalValue, this.totalValueXpath.xpath);
    this.grabText(financialForceData.billingDocumentLineItem.unitPrice, this.unitPriceXPath.xpath);
    this.checkBoxEval(financialForceData.billingDocumentLineItem.VATProduct, this.VATProductCheckboxXPath.xpath); 
    this.checkBoxEval(financialForceData.billingDocumentLineItem.actualProduct,this.actualProductCheckboxXPath.xpath);
  },

//Billing Document funtions
 
  async openBillingDocument() {
    await this.grabText(financialForceData.billingDocument.number, this.billingDocumentXPath.xpath);
    I.executeScript(function(xpath) {
      let ele = document.evaluate(xpath,
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
      if (ele) {
        ele.click();
      }
    }, this.billingDocumentXPath.xpath);

  },

  getBillingDocumentDetails () {
    this.grabText(financialForceData.billingDocument.companyName, this.companyNameXPath.xpath);
    this.grabText(financialForceData.billingDocument.currency, this.currencyXPath.xpath);
    this.grabText(financialForceData.billingDocument.number, this.billingDocumentNumberXPath.xpath);
    this.grabText(financialForceData.billingDocument.status, this.documentStatusXPath.xpath);
    this.grabText(financialForceData.billingDocument.type, this.documentTypeXPath.xpath);
    this.checkBoxEval(financialForceData.billingDocument.firstInvoice, this.firstInvoiceXPath.xpath); 
  },

  //Sales Invoice functions  

  async openSalesInvoice() {
    await this.grabText(financialForceData.salesInvoice.number,this.salesInvoiceXPath.xpath);
    I.executeScript(function(xpath) {
      let ele = document.evaluate(xpath,
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
      if (ele) {
        ele.click();
      }
    }, this.salesInvoiceXPath.xpath);

  },

  getSalesInvoiceDetails () {
    I.scrollPageToBottom();
    this.grabText(financialForceData.salesInvoice.companyName, this.companyNameXPath.xpath);
    this.checkBoxEval(financialForceData.salesInvoice.isProcessed, this.isProcessedCheckboxXPath.xpath);
    this.checkBoxEval(financialForceData.salesInvoice.paidByCreditCard, this.paidByCreditcardCheckboxXPath.xpath);
    this.grabText(financialForceData.salesInvoice.date, this.invoiceDateXPath.xpath)
    this.grabText(financialForceData.salesInvoice.GUWID, this.GUWIDXPath.xpath);
    this.grabText(financialForceData.salesInvoice.orderNumber, this.orderNumberXPath.xpath);
    this.grabText(financialForceData.salesInvoice.currency, this.currencyXPath.xpath);
    this.grabText(financialForceData.salesInvoice.establishmentName, this.establishmentNameXPath.xpath);
    this.grabText(financialForceData.salesInvoice.originalExternalPSPID, this.originalExternalPSPIDXPath.xpath);
    this.grabText(financialForceData.salesInvoice.taxRate, this.taxRateXPath.xpath);
    this.grabText(financialForceData.salesInvoice.email, this.salesInvoiceEmailXPath.xpath);
    this.grabText(financialForceData.salesInvoice.netTotal, this.netTotalXPath.xpath);
    this.grabText(financialForceData.salesInvoice.taxTotal, this.taxTotalXPath.xpath);
    this.grabText(financialForceData.salesInvoice.invoiceTotal, this.invoiceTotalXPath.xpath);
    this.grabText(financialForceData.salesInvoice.invoiceStatus, this.invoiceStatusXPath.xpath);
    this.grabText(financialForceData.salesInvoice.paymentStatus, this.paymentStatusXPath.xpath);
    this.grabText(financialForceData.salesInvoice.outstandingAmount, this.outstandingAmountXPath.xpath);

    this.grabText(financialForceData.salesInvoice.documentSequence,this.documentSequenceXPath.xpath);   

    //let matchedPaymentTable, this.matchedPaymentTableXPath.xpath);
    //console.log(matchedPaymentTable);
  },


  


  //'Tab' manipulation functions
  openRelatedTab() {
    I.waitForVisible(this.relatedTabXPath.xpath);
    I.waitForText('Related');
    I.executeScript(function(xpath) {
      let ele = document.evaluate(xpath,
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
       if (ele) {
         ele.click();
       }
    }, this.relatedTabXPath.xpath);
    I.wait(2);
    I.scrollPageToBottom();
    I.wait(2);
    I.scrollPageToBottom();
  },
  openDetailsTab() {
    I.waitForVisible(this.detailsTabXPath.xpath);
    I.waitForText('Details');
    I.executeScript(function(xpath) {
      let ele = document.evaluate(xpath,
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
       if (ele) {
         ele.click();
       }
    }, this.detailsTabXPath.xpath);
    // I.wait(2);
    // I.scrollPageToBottom();
    // I.wait(2);
    // I.scrollPageToBottom();
  },
  closeTabs() {
    I.executeScript(function(xpath) {
      let ele = document.evaluate(xpath,
        document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
      for (let i=0; i < ele.snapshotLength; i++) {
        ele.snapshotItem(i).click();
      }; 
    }, closeTabXPath);
  },
  closeSubTabs() {
    I.executeScript(function(xpath) {
      let ele = document.evaluate(xpath,
        document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
      for (let i=0; i < ele.snapshotLength; i++) {
        ele.snapshotItem(i).click();
      }; 
    }, closeSubTabXpath);
  },
  reopenTab(xp) {
    I.executeScript(function(xpath) {
      let ele = document.evaluate(xpath,
      document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
      null).singleNodeValue;
      if (ele) {
        ele.click();
        }
      }, xp);  
    I.wait(2);
    I.scrollPageToBottom();
    I.wait(2);
    I.scrollPageToBottom();
  },

  async grabText (text,xp) {
    try {
      let temp = await I.grabTextFrom(xp);
      if (Array.isArray(temp)) {
        for (var i=0, l=temp.length; i<l; i++)
          if (text.indexOf(temp[i]) === -1 && temp[i] !== '')
              text.push(temp[i]);
      } else {
        text.push(temp);
      }
    } catch (error) {
      console.log('EREOROEROEROEROORERRORRORREROR')
    }
 
  },

  // checkbox validation function
  async checkBoxEval(text, xp) {
  let temp = await I.executeScript(function(xpath) {
    let ele = document.evaluate(xpath,
      document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
      null).singleNodeValue;
    if (ele) {
      return true;
    } else {
      return false;
    }
  }, xp);
  text.push(temp);
},

checkSalesInvoice(input, day) {
 


  // let beginning = new Date(input.startDate.slice(0,4),(input.startDate.slice(4,6)-1),input.startDate.slice(6,8));
  // let rightNow = new Date();
  // rightNow.setHours(0, 0, 0, 0);
  // let noDays = Math.round(( rightNow - beginning) / (1000 * 3600 * 24));
  
  let noBillingSchedules = daysInMonth(parseInt(m,10),parseInt(y,10));

  //Set expected results
  ffexpect.billingSchedule.count = noBillingSchedules + ffexpect.billingSchedule.count;

  
  console.log(ffexpect);
  console.log(financialForceData);
  I.addMochawesomeContext(input.productCode +' Starting assertions from '+ input.startDate);
  var res =  true;
  var passed = true;
  for (i = 0; i < day; i++) {
    I.addMochawesomeContext('Checking day '+ (i+1) + ' out of ' + day + '.  Date is ' + (financialForceData.salesInvoice.date[i]));
    I.addMochawesomeContext('------Checking order-----');
    res =  this.assertStictEquality(ffexpect.startDate , financialForceData.order.startDate) && res;
    res =  this.assertStictEquality(ffexpect.order.status , financialForceData.order.status) && res;
    res =  this.assertStictEquality(ffexpect.amount , financialForceData.order.amount) && res;
    res =  this.assertStictEquality(ffexpect.personName , financialForceData.order.accountName) && res;
    res =  this.assertStictEquality(ffexpect.paymentGateway , financialForceData.order.paymentGateway) && res;
    res =  this.assertStictEquality(ffexpect.order.isProcessed , financialForceData.order.isProcessed) && res;
    if (res) {
      I.addMochawesomeContext('Passed');
    } else { I.addMochawesomeContext('Failed');
      res = true;
      passed = false; 
    };

    I.addMochawesomeContext('-----Checking billing contract-----');
    res =  this.assertStictEquality(ffexpect.billingContract.status, financialForceData.billingContract.status) && res;
    res =  this.assertStictEquality(ffexpect.startDate, financialForceData.billingContract.firstBillDate) && res;
    res =  this.assertStictEquality(ffexpect.companyName, financialForceData.billingContract.companyName) && res;
    res =  this.assertStictEquality(ffexpect.currency, financialForceData.billingContract.currency) && res;
    res =  this.assertStictEquality(ffexpect.startDate, financialForceData.billingContract.startDate) && res;
    res =  this.assertStictEquality(ffexpect.endDate, financialForceData.billingContract.endDate) && res;
    if (res) {
      I.addMochawesomeContext('Passed');
    } else { I.addMochawesomeContext('Failed');
      res = true;
      passed = false;
    };
    I.addMochawesomeContext('-----Checking contract line item-----');
    res =  this.assertStictEquality(ffexpect.product, financialForceData.contractLineItem.product) && res;
    res =  this.assertStictEquality(ffexpect.startDate, financialForceData.contractLineItem.startDate) && res;
    res =  this.assertStictEquality(ffexpect.endDate, financialForceData.contractLineItem.endDate) && res;
    res =  this.assertStictEquality(ffexpect.startDate, financialForceData.contractLineItem.firstBillDate) && res;
    res =  this.assertStictEquality(ffexpect.salesPrice, financialForceData.contractLineItem.salesPrice) && res;
    res =  this.assertStictEquality(ffexpect.billingTerm, financialForceData.contractLineItem.billingTerm) && res;
    if (res) {
      I.addMochawesomeContext('Passed');
    } else { I.addMochawesomeContext('Failed');
      res = true;
      passed = false;
    };    
    I.addMochawesomeContext('-----Checking billing document-----');
    res =  this.assertStictEquality(ffexpect.companyName, financialForceData.billingDocument.companyName[i]) && res;
    res =  this.assertStictEquality(ffexpect.currency, financialForceData.billingDocument.currency[i]) && res;
    res =  this.assertStictEquality(ffexpect.billingDocument.status, financialForceData.billingDocument.status[i]) && res;
    res =  this.assertStictEquality(ffexpect.type, financialForceData.billingDocument.type[i]) && res;
    if (i==0) {
      I.addMochawesomeContext('Checking First invoice');
      res =  this.assertStictEquality(ffexpect.billingDocument.firstInvoice, financialForceData.billingDocument.firstInvoice[i]) && res;
    } else {
      I.addMochawesomeContext('Checking next invoice');
      res =  this.assertStictEquality(ffexpect.billingDocument.nextInvoices, financialForceData.billingDocument.firstInvoice[i]) && res;
    };
    if (res) {
      I.addMochawesomeContext('Passed');
    } else { I.addMochawesomeContext('Failed');
      res = true;
      passed = false;
    };
    I.addMochawesomeContext('-----Checking billing document line item-----');
    res =  this.assertStictEquality(ffexpect.product, financialForceData.billingDocumentLineItem.product[i]) && res;
    res =  this.assertStictEquality(ffexpect.currency, financialForceData.billingDocumentLineItem.currency[i]) && res;
    res =  this.assertStictEquality(ffexpect.netValue, financialForceData.billingDocumentLineItem.netValue[i]) && res;
    // res =  this.assertStictEquality(ffexpect.totalValue, financialForceData.billingDocumentLineItem.totalValue[i]) && res;
    res =  this.assertStictEquality(ffexpect.unitPrice, financialForceData.billingDocumentLineItem.unitPrice[i]) && res;
    res =  this.assertStictEquality(ffexpect.VATProduct, financialForceData.billingDocumentLineItem.VATProduct[i]) && res;
    res =  this.assertStictEquality(ffexpect.actualProduct, financialForceData.billingDocumentLineItem.actualProduct[i]) && res;
    if (res) {
      I.addMochawesomeContext('Passed');
    } else { I.addMochawesomeContext('Failed');
      res = true;
      passed = false;
    };
    I.addMochawesomeContext('-----Checking billing schedule-----');
    res =  this.assertStictEquality(ffexpect.billingSchedule.count, financialForceData.billingSchedule.count) && res;
    if (res) {
      I.addMochawesomeContext('Passed');
    } else { I.addMochawesomeContext('Failed');
      res = true;
      passed = false;
    };
    I.addMochawesomeContext('-----Checking sales invoice-----');
    res =  this.assertStictEquality(ffexpect.companyName, financialForceData.salesInvoice.companyName[i]) && res;
    res =  this.assertStictEquality(ffexpect.salesInvoice.paidByCreditCard, financialForceData.salesInvoice.paidByCreditCard[i]) && res;
    res =  this.assertStictEquality(ffexpect.salesInvoice.isProcessed, financialForceData.salesInvoice.isProcessed[i]) && res;
    res =  this.assertStictEquality(ffexpect.currency, financialForceData.salesInvoice.currency[i]) && res;
    res =  this.assertStictEquality(ffexpect.establishmentName, financialForceData.salesInvoice.establishmentName[i]) && res;
    res =  this.assertStictEquality(ffexpect.taxRate, financialForceData.salesInvoice.taxRate[i]) && res;
    res =  this.assertStictEquality(ffexpect.email, financialForceData.salesInvoice.email[i]) && res;
    res =  this.assertStictEquality(ffexpect.netTotal, financialForceData.salesInvoice.netTotal[i]) && res;
    res =  this.assertStictEquality(ffexpect.taxTotal, financialForceData.salesInvoice.taxTotal[i]) && res;
    res =  this.assertStictEquality(ffexpect.invoiceTotal, financialForceData.salesInvoice.invoiceTotal[i]) && res;
    res =  this.assertStictEquality(ffexpect.salesInvoice.invoiceStatus, financialForceData.salesInvoice.invoiceStatus[i]) && res;
    res =  this.assertStictEquality(ffexpect.salesInvoice.paymentStatus, financialForceData.salesInvoice.paymentStatus[i]) && res;
    res =  this.assertStictEquality(ffexpect.outstandingAmount, financialForceData.salesInvoice.outstandingAmount[i]) && res;
    if (res) {
      I.addMochawesomeContext('Passed');
    } else { I.addMochawesomeContext('Failed');
      res = true;
      passed = false;
    };
    I.addMochawesomeContext('-----Checking links-----');
    res =  this.assertStictEquality(financialForceData.order.number,  financialForceData.billingContract.orderNumber) && res;
    if (i==0) {
      res =  this.assertStictEquality(financialForceData.order.GUWID, financialForceData.salesInvoice.GUWID[i]) && res;
    };
    res =  this.assertStictEquality(financialForceData.order.number, financialForceData.salesInvoice.orderNumber[i]) && res;
    res =  this.assertStictEquality(financialForceData.order.PSPTransactionId, financialForceData.salesInvoice.originalExternalPSPID[i]) && res;
  
    res = this.assertStictEquality(financialForceData.order.invoiceNum[i], financialForceData.salesInvoice.documentSequence[i]) && res;
    // res = this.assertStictEquality(financialForceData.order.invoiceDate[i], financialForceData.salesInvoice.date[i]) && res;

    if (res) {
      I.addMochawesomeContext('Passed');
    } else { I.addMochawesomeContext('Failed');
      res = true;
      passed = false;} 
    
  }
  I.addMochawesomeContext('_____________CHECKS FINISHED__________');

  assert(passed==true);
  
  
},
assertStictEquality (a, b, message = null) {


  try {
   
    // I.addMochawesomeContext(Object.getOwnPropertyNames(a) + a +' === '+b);
    
    assert.strictEqual(a.toString(), b.toString(), message);
    I.addMochawesomeContext('Checking '+a+' === '+b);

  } catch (e) {
    // if (e instanceof AssertionError) {
      // Output expected AssertionErrors.
      I.addMochawesomeContext('FAILURE OF '+a+ ' to match '+b);
      // console.log(e);
      return false;
    // } else {
      // Output unexpected Errors.
      // console.log(e);
    // }
  }
  return true;
}
   
};

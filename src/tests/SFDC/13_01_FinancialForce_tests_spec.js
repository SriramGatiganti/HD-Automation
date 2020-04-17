//read in data from file
let path = require('path');
let t_d_path = path.join(__dirname, '..', '..', 'function/data', 'financialForceData.txt');
let fs = require("fs");
let endOfLine = require('os').EOL;
// var includeFolder = require('include-folder');
// let folder = path.join(__dirname + '..', '..', '..', 'function/financialForce/pages');
// pg = includeFolder(folder);
let page = require('../../function/financialForce/pages/all.pages.js');
let testing_data = fs.readFileSync(t_d_path, "utf-8");
let t_data = testing_data.split(endOfLine);
let input = {
  personName: t_data[0],
  establishmentName: t_data[1],
  email: t_data[2],
  password: t_data[3],
  startDate: t_data[4],
  productCode: t_data[5]
}

let beginning = new Date(input.startDate.slice(0, 4), (input.startDate.slice(4, 6) - 1), input.startDate.slice(6, 8));
let rightNow = new Date();
rightNow.setHours(0, 0, 0, 0);
let noDays = Math.round((rightNow - beginning) / (1000 * 3600 * 24)) +1;


Feature('Financial Force check all @FF_Check_All_First_Invoice');
Scenario('Login to SFDC and check all FF records',
  async function(I, financialForce) {

    // //read in data from file
    // let path = require('path');
    // let t_d_path = path.join(__dirname, '..', 'function/data', 'financialForceData.txt');
    // let fs = require("fs");
    // let endOfLine = require('os').EOL;
    // let testing_data = fs.readFileSync(t_d_path, "utf-8");
    // let t_data = testing_data.split(endOfLine);
    // let input = {
    //   personName: t_data[0],
    //   establishmentName: t_data[1],
    //   email: t_data[2],
    //   password: t_data[3],
    //   startDate: t_data[4]
    // };

    I.addMochawesomeContext({
      title: 'Input data',
      value: input
    })
    var product 
    if (input.productCode == 'Fast Bundle') {
      product = 'RT+WB_Bundle'
    } else {
      product = 'Web_Listing_premium';
    }
    financialForce.setEstablishmentData(input.email, input.personName, input.establishmentName);

    // financialForce.setResults(inp);
    await page.main.login();
    // await financialForce.SFDCLogin();

    // I.wait(5);
    // page.main.closeTabs();
    // financialForce.closeTabs();
    I.wait(5);
    await page.main.submitSearch(input.email, input.personName);
    // await financialForce.submitSearch(input.email, input.personName);

    // I.wait(5);
    // financialForce.closeTabs();

    I.wait(5);
    var link = page.personAccount.establishment(input.establishmentName);
    page.personAccount.openPage(link);

    // financialForce.openEstablishment(input.establishmentName);
    //   financialForce.closeSubTabs();

    I.wait(5);
    link = page.establishment.relatedTab;
    page.establishment.openPage(link);
    // financialForce.openRelatedTab();

    I.wait(5);
    link = page.establishment.assetTab;
    page.establishment.openPage(link);
    // financialForce.openAssetTab();

    I.wait(5);
    // financialForce.openAsset('Web_Listing_premium');
    link = page.assetlist.assetLink(product);
    page.assetlist.openPage(link);
    // financialForce.openAsset(input.productCode);
    I.wait(5);
    link = page.personAccount.establishment(input.establishmentName);
    page.asset.openPage(link);
    // financialForce.openEstablishment(input.establishmentName);

    I.wait(5);
    link = page.establishment.ordersTab;
    page.establishment.openPage(link);
    // financialForce.openOrdersPage();

    I.wait(5);
    await financialForce.openOrder();

    I.wait(5);
    
    link = page.order.invoicesTab;
    page.order.openPage(link);
    // financialForce.openOrderInvoices();

    I.wait(5);
    await financialForce.getOrderInvoices();

    I.wait(5);
    financialForce.reopenTab(financialForce.orderTabXPath.xpath);

    I.wait(5);
    financialForce.openDetailsTab();

    I.wait(5);
    financialForce.getOrderDetails();

    I.wait(5);
    financialForce.openBillingContract();

    I.wait(5);
    financialForce.getBillingContractDetails();

    I.wait(5);
    financialForce.openRelatedTab();

    I.wait(5);
    await financialForce.openWLPContractLineItem();

    I.wait(5);
    financialForce.getBillingContractLineItemDetails();

    I.wait(5);
    financialForce.openRelatedTab();

    I.wait(5);
    financialForce.openBillingSchedulePage();

    for (i = 0; i < noDays; i++) {
      console.log(i + ' out of ' + noDays);
      I.wait(5);
      await financialForce.openBillingDocumentLineItem(i);

      I.wait(5);
      financialForce.getBillingDocumentLineItemDetails();

      I.wait(5);
      await financialForce.openBillingDocument();

      I.wait(5);
      financialForce.getBillingDocumentDetails();

      I.wait(5);
      await financialForce.openSalesInvoice();

      I.wait(5);
      financialForce.getSalesInvoiceDetails();

      I.wait(5);
      // financialForce.reopenBillingSchedulePage()
      financialForce.reopenTab(financialForce.billingSchedulesTabXPath.xpath);
    }
    financialForce.SFDCLogout();
  })

Feature('Assert @assert');
Scenario('assert',
  function(financialForce) {
    // console.log(input);
    financialForce.checkSalesInvoice(input, noDays);

  })

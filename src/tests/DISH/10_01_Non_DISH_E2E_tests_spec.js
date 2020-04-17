const {
  wizard,
  url,
  res_url,
  d_url
} = require('../../function/newHydra/wizard_data_provider_new');
let user = wizard.user;
let env = process.profile.split(':')[2];
let wait_time = 10;


Feature('Website builder and reservation tool unsubscription @wb_res_unsubscribe');
Scenario('WB and RES unsubscription',
  async function(I, DISH, NewHydra, ResFunc, SFDC) {
    NewHydra.landing(url + 'logout');
    NewHydra.login(user);
    NewHydra.openTab('account');
    //Unsubscribe from WB
    I.waitForVisible('.btn-danger.btn');
    I.click('.btn-danger.btn');
    I.waitForVisible('#establishmentDeletePassword');
    I.fillField('#establishmentDeletePassword', user.password);
    I.click('.btn.btn-danger.delete');
    //I.waitForText('Your request for accounts deletion has been successfully sent.');
    //Check from SFDC
    I.wait(5);
    const res = await SFDC.getSfdcAccestToken();
    let title = await I.grabTitle();
    const establishment = await SFDC.getIdByAttrAndInfo('Name', wizard.contact.businessName, res.instance_url, res.access_token, title);
    I.say('Find ' + establishment.records.length + ' establishment account.');
    let assets = await SFDC.getIdByAttrAndInfo('Establishment__c', establishment.records[0].Id, res.instance_url, res.access_token, '', 'Asset');
    let assetInfo;
    for (var i = 0; i < assets.records.length; i++) {
      assetInfo = await SFDC.getObjectByTypeAndId('Asset', assets.records[i].Id, res.instance_url, res.access_token);
      I.say('Asset name:' + assetInfo.Name + ' Status:' + assetInfo.Status);
    }
    //Unsubscribe from Reservation tool
    NewHydra.landing(res_url + 'settings/account');
    I.waitForVisible('.btn-primary.btn');
    I.click('Delete Account');
    I.waitForVisible('(//input[@id="password"])[2]');
    I.appendField('(//input[@id="password"])[2]', user.password);
    I.click('.btn-danger.btn.btn-primary.submit');
    //I.waitForText('Deletion in progress');
    //Check from SFDC
    I.wait(5);
    title = await I.grabTitle();
    for (var i = 0; i < assets.records.length; i++) {
      assetInfo = await SFDC.getObjectByTypeAndId('Asset', assets.records[i].Id, res.instance_url, res.access_token);
      I.say('Asset name:' + assetInfo.Name + ' Status:' + assetInfo.Status);
    }
    //Check from WB
    NewHydra.landingBusinessPage(wizard, "");
    I.see('404');
    I.see('This page could not be found.');
    //Check from RT
    I.amOnPage(res_url);
    NewHydra.landing(wizard.r_url);
    I.see('The online reservation service is currently not available.');
  })


Feature('DISH register E2E flow @sfdc_call');
Scenario('DISH SFDC call debug',
  async function(I, DISH, NewHydra, SFDC) {
    const res = await SFDC.getSfdcAccestToken();
    //I.say(JSON.stringify(res, null, 2));
    //Person info
    //const person = await SFDC.getIdByAttrAndInfo('PersonEmail', "pfarquah12q+12@gmail.com", res.instance_url, res.access_token);
    //let personInfo = await SFDC.getObjectByTypeAndId('Account', person.records[0].Id, res.instance_url, res.access_token);
    //let personInfo = await SFDC.getObjectByTypeAndId('Account', '0011i000003wntXAAQ', res.instance_url, res.access_token);
    //I.say(JSON.stringify(personInfo, null, 2));
    //I.say(personInfo.IsDeleted__c);
    //I.say(personInfo.Primary_Role__pc);
    //Est. Info
    const establishment = await SFDC.getIdByAttrAndInfo('Name', "x8EEn autnew 190327140400", res.instance_url, res.access_token);
    let establishmentInfo = await SFDC.getObjectByTypeAndId('Account', establishment.records[0].Id, res.instance_url, res.access_token);
    //let establishmentInfo = await SFDC.getObjectByTypeAndId('Account', '0011i000004xFm5AAE', res.instance_url, res.access_token);
    I.say(JSON.stringify(establishmentInfo, null, 2));
    //I.say('Find ' + person.records.length + ' person account.');
    //I.say('Find ' + establishment.records.length + ' establishment account.');
    /*
    const assets = await SFDC.getIdByAttrAndInfo('Establishment__c', "0011x00000CQq0zAAD", res.instance_url, res.access_token, '', 'Asset');
    let assetInfo = await SFDC.getObjectByTypeAndId('Asset', assets.records[0].Id, res.instance_url, res.access_token);
    I.say('Name:' + assetInfo.Name + '\nStatus:' + assetInfo.Status);
    assetInfo = await SFDC.getObjectByTypeAndId('Asset', assets.records[1].Id, res.instance_url, res.access_token);
    I.say('Name:' + assetInfo.Name + '\nStatus:' + assetInfo.Status);
    */
  })

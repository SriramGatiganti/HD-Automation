const {
  wizard,
  url,
  res_url,
  d_url
} = require('../../function/newHydra/wizard_data_provider_new');
let user = wizard.user;
let env = process.profile.split(':')[2];
let wait_time = 40;
let pcode = wizard.contact.postalCode;

Feature('DISH after registration flow E2E @dish_afterReg_e2e');
Scenario('DISH E2E flow after registration',
  async function(I, DISH, NewHydra, ResFunc, SFDC) {
    let info = {};
    let result; //All the result
    //1. Change 4 in DISH Profile
    NewHydra.landing(d_url + DISH.getCountryCode(wizard.country));
    DISH.login(user);
    wizard.contact.businessName = wizard.contact.businessName.slice(0, -1) + '4';
    wizard.contact.streetNumber = wizard.contact.streetNumber.slice(0, -1) + '4';
    if (wizard.country == 'Turkey') {
      wizard.contact.postalCode = wizard.contact.postalCode.slice(0, -3) + '400';
    } else {
      wizard.contact.postalCode = wizard.contact.postalCode.slice(0, -1) + '4';
    }
    wizard.contact.phone = wizard.contact.phone.slice(0, -1) + '4';
    wizard.contact.city = wizard.contact.city;
    user.firstName = user.firstName + '4';
    user.lastName = user.lastName + '4';
    user.salutation = 'Mrs.';
    user.username = await user.username.replace('@gmail.com', '4@gmail.com');
    NewHydra.landing(d_url + DISH.getCountryCode(wizard.country) + '/user/establishments/');
    DISH.changeEstablishment(wizard, user);
    info = await DISH.getDasEstData();
    NewHydra.landing(d_url + DISH.getCountryCode(wizard.country) + '/user/profile/');
    DISH.changeUser(wizard, user);
    info.person = await DISH.getDasUsrData();
    result = JSON.stringify(info);
    //2. Check change 4 in SFDC
    I.wait(wait_time);
    const res = await SFDC.getSfdcAccestToken();
    let title = await I.grabTitle();
    const person = await SFDC.getIdByAttrAndInfo('PersonEmail', user.username, res.instance_url, res.access_token, title);
    const establishment = await SFDC.getIdByAttrAndInfo('Name', wizard.contact.businessName, res.instance_url, res.access_token, title);
    I.say('Find ' + person.records.length + ' person account.');
    I.say('Find ' + establishment.records.length + ' establishment account.');
    let personInfo = await SFDC.getObjectByTypeAndId('Account', person.records[0].Id, res.instance_url, res.access_token);
    let establishmentInfo = await SFDC.getObjectByTypeAndId('Account', establishment.records[0].Id, res.instance_url, res.access_token);
    info = SFDC.getInfo(personInfo, establishmentInfo);
    result = result + '#' + JSON.stringify(info);
    //3. Check change 4 in Res
    NewHydra.landing(res_url + 'settings/establishment');
    info.establishment = await ResFunc.getDasEstData();
    NewHydra.landing(res_url + 'settings/account');
    info.person = await ResFunc.getUsrData();
    result = result + '#' + JSON.stringify(info);
    //4. Check change 4 in WB
    NewHydra.landing(url + 'dashboard/establishment');
    NewHydra.openTab('establishment');
    info.establishment = await NewHydra.getDasEstData();
    NewHydra.openTab('account');
    info.person = await NewHydra.getUsrData();
    result = result + '#' + JSON.stringify(info);
    //5. Change 5 in WB
    wizard.contact.businessName = wizard.contact.businessName.slice(0, -1) + '7';
    wizard.contact.streetNumber = wizard.contact.streetNumber.slice(0, -1) + '7';
    wizard.contact.postalCode = pcode;
    /*if (wizard.country == 'Turkey') {
      wizard.contact.postalCode = wizard.contact.postalCode.slice(0, -3) + '700';
    } else {
      wizard.contact.postalCode = wizard.contact.postalCode.slice(0, -1) + '7';
    }*/
    wizard.contact.phone = wizard.contact.phone.slice(0, -1) + '7';
    wizard.contact.city = wizard.contact.city;
    user.firstName = user.firstName + '7';
    user.lastName = user.lastName + '7';
    user.salutation = 'Mr.';
    user.username = user.username.replace('@gmail.com', '7@gmail.com');
    NewHydra.landing(url + 'dashboard/establishment');
    NewHydra.openTab('establishment');
    NewHydra.changeRestaurantDetails(wizard.contact);
    I.waitForText('Your changes have been saved.');
    info.establishment = await NewHydra.getDasEstData();
    NewHydra.openTab('account');
    NewHydra.changeUserDetails(user);
    info.person = await NewHydra.getUsrData();
    result = result + '#' + JSON.stringify(info);
    //6. Check the change 5 in SFDC:
    I.wait(wait_time);
    title = await I.grabTitle();
    personInfo = await SFDC.getObjectByTypeAndId('Account', person.records[0].Id, res.instance_url, res.access_token, title);
    establishmentInfo = await SFDC.getObjectByTypeAndId('Account', establishment.records[0].Id, res.instance_url, res.access_token, title);
    info = SFDC.getInfo(personInfo, establishmentInfo);
    result = result + '#' + JSON.stringify(info);
    //7. Check the change 5 in DISH:
    NewHydra.landing(d_url + DISH.getCountryCode(wizard.country) + '/user/establishments/');
    info = await DISH.getDasEstData();
    NewHydra.landing(d_url + DISH.getCountryCode(wizard.country) + '/user/profile/');
    info.person = await DISH.getDasUsrData();
    result = result + '#' + JSON.stringify(info);
    //8. Check the change 5 in Reservation tool
    NewHydra.landing(res_url + 'settings/establishment');
    info.establishment = await ResFunc.getDasEstData();
    NewHydra.landing(res_url + 'settings/account');
    info.person = await ResFunc.getUsrData();
    result = result + '#' + JSON.stringify(info);
    //9. Change 6 in Reservation tool
    user.firstName = user.firstName.slice(0, -1) + '9';
    user.lastName = user.lastName.slice(0, -1) + '9';
    user.salutation = 'Mrs.';
    user.username = user.username.replace('@gmail.com', '9@gmail.com');
    ResFunc.changeUserDetails(user);
    info.person = await ResFunc.getUsrData();
    wizard.contact.businessName = wizard.contact.businessName.slice(0, -1) + '9';
    wizard.contact.streetNumber = wizard.contact.streetNumber.slice(0, -1) + '9';
    if (wizard.country == 'Turkey') {
      wizard.contact.postalCode = wizard.contact.postalCode.slice(0, -3) + '900';
    } else {
      wizard.contact.postalCode = wizard.contact.postalCode.slice(0, -1) + '9';
    }
    wizard.contact.phone = wizard.contact.phone.slice(0, -1) + '9';
    wizard.contact.city = wizard.contact.city;
    NewHydra.landing(res_url + 'settings/establishment');
    ResFunc.changeEstDetails(wizard.contact);
    info.establishment = await ResFunc.getDasEstData();
    result = result + '#' + JSON.stringify(info);
    //10. Check change 6 in SFDC
    I.wait(wait_time);
    title = await I.grabTitle();
    personInfo = await SFDC.getObjectByTypeAndId('Account', person.records[0].Id, res.instance_url, res.access_token, title);
    establishmentInfo = await SFDC.getObjectByTypeAndId('Account', establishment.records[0].Id, res.instance_url, res.access_token, title);
    info = await SFDC.getInfo(personInfo, establishmentInfo);
    result = result + '#' + JSON.stringify(info);
    //11. Check the change 6 in DISH:
    NewHydra.landing(d_url + DISH.getCountryCode(wizard.country) + '/user/establishments/');
    info = await DISH.getDasEstData();
    NewHydra.landing(d_url + DISH.getCountryCode(wizard.country) + '/user/profile/');
    info.person = await DISH.getDasUsrData();
    result = result + '#' + JSON.stringify(info);
    //15. Check the change 6 in WB
    NewHydra.landing(url + 'dashboard/establishment');
    NewHydra.openTab('establishment');
    info.establishment = await NewHydra.getDasEstData();
    NewHydra.openTab('account');
    info.person = await NewHydra.getUsrData();
    result = result + '#' + JSON.stringify(info);
    //logout
    NewHydra.landing(d_url + DISH.getCountryCode(wizard.country));
    DISH.logout();

    let steps = ["1. Change 4 in DISH profile", "2. Check the change 4 in SFDC", "3. Check change 4 in Reservation tool", "4. Check the change 4 in WB", "5. Change 5 in Website builder", "6. Check the change 5 in SFDC", "7. Check the change 5 in DISH profile", "8. Check the change 5 in reservation tool", "9. Change 6 in Reservation tool", "10. Check the change 6 in SFDC", "11. Check the change 6 in DISH profile", "15. Check the change 6 in WB"];
    I.say(await SFDC.getResult(steps, result));
  })

Feature('Website builder and reservation tool unsubscription @dish_user_delete');
Scenario('Delete user from DISH',
  async function(I, DISH, NewHydra, ResFunc, SFDC) {
    I.wait(wait_time);
    NewHydra.landing(d_url + DISH.getCountryCode(wizard.country));
    DISH.login(user);
    DISH.deleteUser(user.password);
    //Check from SFDC
    I.wait(wait_time);
    const res = await SFDC.getSfdcAccestToken();
    let title = await I.grabTitle();
    const establishment = await SFDC.getIdByAttrAndInfo('Name', wizard.contact.businessName, res.instance_url, res.access_token, title);
    const person = await SFDC.getIdByAttrAndInfo('PersonEmail', user.username, res.instance_url, res.access_token, title);
    I.say('Find ' + establishment.records.length + ' establishment account.');
    I.say('Find ' + person.records.length + ' person account.');
    let personInfo = await SFDC.getObjectByTypeAndId('Account', person.records[0].Id, res.instance_url, res.access_token);
    I.say("Person delete status: " + personInfo.IsDeleted__c);
    if (establishment.records.length != 0) {
      let assets = await SFDC.getIdByAttrAndInfo('Establishment__c', establishment.records[0].Id, res.instance_url, res.access_token, '', 'Asset');
      let assetInfo;
      for (var i = 0; i < assets.records.length; i++) {
        assetInfo = await SFDC.getObjectByTypeAndId('Asset', assets.records[i].Id, res.instance_url, res.access_token);
        I.say('Asset name:' + assetInfo.Name + ' Status:' + assetInfo.Status);
      }
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

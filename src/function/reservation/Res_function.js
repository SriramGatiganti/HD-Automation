const user = require('../data/user').user;

let I;

const d = new Date();
var n = d.getDay();
if (n == 0) {
  n = 7;
};
const day = d.getDate();

let RTPages = {
  wizardPages: {
    tcsAgree: '.wizardTerms-checkAgree',
    nextStep: '//button[@type="submit"]',
    addOpenTime: '.addTimeSetting',
    inputWeekdays: '//select[contains(@class,"weekdays-input")]',
    startHour: '//div[@class="startingTime"]//input[@data-field="hours"]',
    startMin: '//div[@class="startingTime"]//input[@data-field="mins"]',
    endHour: '//div[@class="endingTime"]//input[@data-field="hours"]',
    endMin: '//div[@class="endingTime"]//input[@data-field="mins"]',
    seatNumber: '#wizard-seatNumbers-seatNumbers',
    groupSize: '#wizard-groupSizes-groupSize',
    groupSizeAuto: '#wizard-groupSizes-groupSizeAuto',
    contactCountryCode: '#wizard-contactDetails-prefix',
    contactPhone: '#wizard-contactDetails-phoneNumber',
    notificationCountryCode: '#wizard-notificationSetting-prefix',
    notificationPhone: '#wizard-notificationSetting-phoneNumber',
    notEnableOnWB: '#wizard-websiteIntegration-usingInternetPresence-no',
    linkToDashboard: '.btn-primary.btn-lg'
  },
  homePage: {
    acceptCookie: '//button[contains(@class,"btn-accept-cookies")]',
    loginButton: '//a[@href="/login"]',
    username: '#username',
    password: '#password',
    ssoLogin: '#kc-login'
  },
  dashboardPages: {
    //reservations dashboard
    reservationsButton: '//a[@href="/reservations"]',
    addReservation: '(//a[contains(@href,"/reservation/add?date=")])',
    addReservationLastName: '#reservation-fieldLn',
    addReservationSuggest: '.tt-suggestion.tt-selectable',
    reservationStatus: '//div[contains(.,"NAME") and @class="item-row"]//div[contains(@class,"status-dropdown-toggle")]',
    reservationCancel: '//div[contains(.,"NAME") and @class="item-row"]//ul/li[1]/a',
    reservationCancelConfirm: '//div[@class="modal-footer"]/button[contains(@class,"btn-danger submit-button") and .!=""]',
    reservationArrived: '//div[contains(.,"NAME") and @class="item-row"]//ul/li[2]/a',
    //not confirmed
    reservationsNotConfirmed: '//a[@href="/reservations?requestedOnly=true"]',
    confirmReservation: '//button[@data-status="CONFIRMED"]',
    confirmReservationConfirm: '.btn.submit-button.btn-success',
    rejectReservation: '//button[@data-status="REJECTED"]',
    rejectReservationConfirm: '//button[@class="btn btn-danger submit-button" and .!=""]',
    //reservation details
    reservationDetails: '//div[@class="item-customer-name" and contains(.,"firstName")]',
    reservationDetailsSlot: '//select[@id="reservation-slot"]',
    reservationDetailsFirstName: '//div[@id="reservation-fieldFn"]/div/p',
    reservationDetailsLastName: '//div[@id="reservation-fieldLn"]/div/p',
    reservationDetailsEmail: '#reservation-fieldEm',
    reservationDetailsPhone: '#reservation-fieldPn',
    //Settings
    settingsDropdown: '//li[@class="dropdown"]',
    //reservation settings
    reservationSettings: '//li/a[@href="/settings/reservation"]',
    reservationDuration: '#reservation-reservationDuration',
    reservationMinLeadTime: '#reservation-reservationMinLeadTime',
    reservationMaxAutoConfirmCapacity: '#reservation-reservationMaxAutoConfirmCapacity',
    //reservable settins
    reservablesSettings: '//li/a[@href="/settings/reservables"]',
    reservablesCapacity: '#reservables-capacity',
    //reservation hours settings
    reservationTimesSettings: '//a[@href="/settings/reservationTimes"]',
    editReservationHours: '//a[@class="btn btn-default btn-round btn-borderless"]',
    selectDays: '(//select[@class="weekdays-input form-control"])[1]',
    addTimeSetting: '.btn.btn-default.addTimeSetting',
    addSelectDays: '(//select[@class="weekdays-input form-control"])[2]',
    startHour: '(//div[@class="startingTime"]//input[@data-field="hours"])[2]',
    startMin: '(//div[@class="startingTime"]//input[@data-field="mins"])[2]',
    endHour: '(//div[@class="endingTime"]//input[@data-field="hours"])[2]',
    endMin: '(//div[@class="endingTime"]//input[@data-field="mins"])[2]',
    startAMPM: '(//div[@class="startingTime"]//span[contains(.,VALUE)])',
    endAMPM: '(//div[@class="endingTime"]//span[contains(.,VALUE)])',
    exceptionSettings: '//a[contains(@href,"exceptionalHours")]',
    exceptionAddDay: '//input[@placeholder="Please select"]',
    exceptionDay: '//td[@class="day" and text()=targetDay]',
    removeException: '//button[@title="Removes the selected exception"]',
    removeConfirm: '.action-button-confirm.btn.btn-danger',
    //establishment settings:
    establishmentSettings: '//a[@href="/settings/establishment"]',
    establishmentName: '#establishment-name',
    establishmentPhoneNumber: '#establishment-phoneNumber',
    establishmentStreet: '#establishment-street',
    establishmentZipCode: '#establishment-zipCode',
    establishmentCity: '#establishment-city',
    establishmentCountryCode: '//button[@data-id="reservation-countryCode"]',
    establishmentEmail: '#establishment-email',
    //account settings:
    accountSettings: '//a[@href="/settings/account"]',
    userUsername: '#account-username',
    userFirstName: '#account-userFirstName',
    userLastName: '#account-userLastName',
    userSalutation: '#account-salutation',
    userSalutationSelect: '//button[@data-id="account-salutation"]',
    userSaveButton: '.btn.btn-primary.btn-save-user-profile',
    userPassword: '#password',
    deleteButton: '.btn-danger.btn',
    deletePassword: '(//input[@id="password"])[2]',
    deleteConfirm: '.btn-danger.btn.btn-primary.submit',
    changePasswordButton: '//a[contains(@href,"/account/password")]',
    //Integration settings
    integrationSettings: '//a[@href="/settings/integration"]',
    widgetOptions: '#dropDownCodeReservationWidget',
    widgetURL: "(//code[contains(text(),'widget/hydra')])",
    //General
    saveButton: '.btn.btn-primary.submit',
    successMessage: '.alert-success',
    logoutButton: 'a[href="/logout"]',
    mobileHiddenMenu: '.navbar-toggle.collapsed'
  },
  widgetPages: {
    reserveNow: '#btnReserve',
    capacity: '#capacity',
    date: '#date',
    reserveDay: '//td[@class="active day" and text()=targetDay]',
    disabledDay: '//td[@class="disabled disabled-date day" and .="targetDay"]',
    slot: '#slot',
    firstName: '#firstName',
    lastName: '#lastName',
    email: '#email',
    phoneNumber: '#phoneNumber',
    purpose: '#purpose',
    message: '#message',
    tcsAccept: '#termsAndConditions',
    confirm: '#btnConfirm',
    reservationMessage: '.message'
  }
}

module.exports = {

  _init() {
    I = actor();
  },
  RTPages,
  //Login reservation admin panel
  login(details) {
    I.amOnPage(user.r_url + 'logout');
    I.setCookie({
      name: 'DISABLE_TRACKING',
      value: 'true'
    });
    //Close cookie
    I.executeScript(function(xpath) { //Agree to cookie
      let ele = document.evaluate(xpath,
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
      if (ele) {
        ele.click();
      }
    }, this.RTPages.homePage.acceptCookie);
    I.waitForVisible(this.RTPages.homePage.loginButton);
    I.click(this.RTPages.homePage.loginButton);
    I.wait(1);
    I.executeScript(function(xpath) {
      let ele = document.evaluate(xpath,
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
      if (ele) {
        ele.click();
      }
    }, this.RTPages.homePage.loginButton);
    I.waitForElement(this.RTPages.homePage.username);
    I.fillField(this.RTPages.homePage.username, details.username);
    I.fillField(this.RTPages.homePage.password, details.password);
    I.click(this.RTPages.homePage.ssoLogin);
    I.waitForVisible(this.RTPages.dashboardPages.reservationsButton);
  },
  registerResWiz(details, exist = 0) {
    I.waitForVisible(this.RTPages.wizardPages.tcsAgree);
    I.click(this.RTPages.wizardPages.tcsAgree);
    I.click(this.RTPages.wizardPages.nextStep);
    I.waitInUrl('/wizard/1');
    //Add reservation hours for non-existing establishment
    if (exist == 0) { //If the website builder opening time is default, then not show
      I.click(this.RTPages.wizardPages.addOpenTime);
      I.waitForElement(this.RTPages.wizardPages.inputWeekdays);
      I.selectOption(this.RTPages.wizardPages.inputWeekdays, ["1", "2", "3", "4", "5", "6", "7"]);
      I.fillField(this.RTPages.wizardPages.startHour, '12');
      I.fillField(this.RTPages.wizardPages.startMin, '00');
      I.fillField(this.RTPages.wizardPages.endHour, '12');
      I.fillField(this.RTPages.wizardPages.endMin, '00');
    };
    I.click(this.RTPages.wizardPages.nextStep);
    I.waitInUrl('/wizard/2');
    //Seats
    I.seeInField(this.RTPages.wizardPages.seatNumber, '20');
    I.click(this.RTPages.wizardPages.nextStep);
    I.waitInUrl('/wizard/3');
    //Group size
    I.fillField(this.RTPages.wizardPages.groupSize, '20');
    I.fillField(this.RTPages.wizardPages.groupSizeAuto, '5');
    I.click(this.RTPages.wizardPages.nextStep);
    I.waitInUrl('/wizard/4');
    I.click(this.RTPages.wizardPages.nextStep);
    I.waitInUrl('/wizard/5');
    //Contact
    I.selectOption(this.RTPages.wizardPages.contactCountryCode, details.countryCode);
    I.fillField(this.RTPages.wizardPages.contactPhone, details.contact.phone);
    //Notification
    I.selectOption(this.RTPages.wizardPages.notificationCountryCode, 'DE');
    I.fillField(this.RTPages.wizardPages.notificationPhone, '1633735500');
    I.click(this.RTPages.wizardPages.nextStep);
    I.waitInUrl('/wizard/6');
    I.waitForElement(this.RTPages.wizardPages.notEnableOnWB);
    I.click(this.RTPages.wizardPages.notEnableOnWB);
    I.click(this.RTPages.wizardPages.nextStep);
    I.waitInUrl('/wizard/success/uniqueFlow');
    I.click(this.RTPages.wizardPages.linkToDashboard);
    I.waitInUrl('/reservations');
  },
  //Make new reservation after 3 hours
  async newReservation(details) {
    let purposes = ['BUSINESS', 'CASUAL_DINING', 'SPECIAL_OCCASION'];
    I.waitForVisible(this.RTPages.widgetPages.reserveNow);
    I.wait(2);
    I.selectOption(this.RTPages.widgetPages.capacity, details.capacity);
    I.click(this.RTPages.widgetPages.date);
    I.waitForVisible(this.RTPages.widgetPages.reserveDay.replace('targetDay', day));
    I.click(this.RTPages.widgetPages.reserveDay.replace('targetDay', day));
    I.selectOption(this.RTPages.widgetPages.slot, details.slot);
    I.click(this.RTPages.widgetPages.reserveNow);
    I.appendField(this.RTPages.widgetPages.firstName, details.first_name);
    I.appendField(this.RTPages.widgetPages.lastName, details.last_name);
    I.appendField(this.RTPages.widgetPages.email, details.email);
    I.appendField(this.RTPages.widgetPages.phoneNumber, details.phone);
    I.selectOption(this.RTPages.widgetPages.purpose, purposes[Math.floor(Math.random() * purposes.length)]);
    I.appendField(this.RTPages.widgetPages.message, details.message);
    I.click(this.RTPages.widgetPages.tcsAccept);
    I.click(this.RTPages.widgetPages.confirm);
    I.waitForVisible(this.RTPages.widgetPages.reservationMessage);
    let result = await I.grabTextFrom(this.RTPages.widgetPages.reservationMessage);
    return result;
  },
  //view edit window
  viewReservation(code, details) {
    I.see(details.message);
    I.see(details.slot.toUpperCase());
    I.click(this.RTPages.dashboardPages.reservationDetails.replace('firstName', details.first_name));
    I.waitForElement(this.RTPages.dashboardPages.reservationDetailsSlot);
    I.see(details.first_name, this.RTPages.dashboardPages.reservationDetailsFirstName);
    I.see(details.last_name, this.RTPages.dashboardPages.reservationDetailsLastName);
    I.seeInField(this.RTPages.dashboardPages.reservationDetailsEmail, details.email);
    I.seeInField(this.RTPages.dashboardPages.reservationDetailsPhone, details.phone);
    I.see(details.message);
    I.click(this.RTPages.dashboardPages.saveButton);
    I.waitForVisible(this.RTPages.dashboardPages.successMessage);
  },
  logout() {
    I.waitForVisible(this.RTPages.dashboardPages.logoutButton);
    I.click(this.RTPages.dashboardPages.logoutButton);
    I.waitForVisible(this.RTPages.homePage.loginButton);
  },
  //Cancel reservation
  cancelReservation(name) {
    I.waitForElement(this.RTPages.dashboardPages.reservationStatus.replace('NAME', name));
    I.click(this.RTPages.dashboardPages.reservationStatus.replace('NAME', name))
    I.waitForVisible(this.RTPages.dashboardPages.reservationCancel.replace('NAME', name));
    I.click(this.RTPages.dashboardPages.reservationCancel.replace('NAME', name));
    I.waitForVisible(this.RTPages.dashboardPages.reservationCancelConfirm);
    I.click(this.RTPages.dashboardPages.reservationCancelConfirm);
    I.waitForVisible(this.RTPages.dashboardPages.successMessage);
    I.waitForInvisible(this.RTPages.dashboardPages.successMessage);
  },
  //Arrived reservation
  arriveReservation(name) {
    I.waitForElement(this.RTPages.dashboardPages.reservationStatus.replace('NAME', name));
    I.click(this.RTPages.dashboardPages.reservationStatus.replace('NAME', name));
    I.waitForVisible(this.RTPages.dashboardPages.reservationArrived.replace('NAME', name));
    I.click(this.RTPages.dashboardPages.reservationArrived.replace('NAME', name));
    I.waitForVisible(this.RTPages.dashboardPages.successMessage);
    I.waitForInvisible(this.RTPages.dashboardPages.successMessage);
  },
  confirmReservation() {
    I.waitForVisible(this.RTPages.dashboardPages.reservationsNotConfirmed);
    I.click(this.RTPages.dashboardPages.reservationsNotConfirmed);
    I.waitForVisible(this.RTPages.dashboardPages.confirmReservation);
    I.click(this.RTPages.dashboardPages.confirmReservation);
    I.waitForVisible(this.RTPages.dashboardPages.confirmReservationConfirm);
    I.click(this.RTPages.dashboardPages.confirmReservationConfirm);
    I.waitForVisible(this.RTPages.dashboardPages.successMessage);
    I.waitForInvisible(this.RTPages.dashboardPages.successMessage);
    I.click(this.RTPages.dashboardPages.reservationsButton);
  },
  rejectReservation() {
    I.waitForVisible(this.RTPages.dashboardPages.reservationsNotConfirmed);
    I.click(this.RTPages.dashboardPages.reservationsNotConfirmed);
    I.waitForVisible(this.RTPages.dashboardPages.rejectReservation);
    I.click(this.RTPages.dashboardPages.rejectReservation);
    I.waitForVisible(this.RTPages.dashboardPages.rejectReservationConfirm);
    I.click(this.RTPages.dashboardPages.rejectReservationConfirm);
    I.waitForVisible(this.RTPages.dashboardPages.successMessage)
    I.waitForInvisible(this.RTPages.dashboardPages.successMessage);
  },
  setReservationSettings(settings) {
    I.click(this.RTPages.dashboardPages.settingsDropdown);
    I.wait(1);
    I.click(this.RTPages.dashboardPages.reservationSettings);
    I.waitInUrl('/settings/reservation');
    I.selectOption(this.RTPages.dashboardPages.reservationDuration, settings.duration); //reservation duration, e.g. 0.5 hours
    I.selectOption(this.RTPages.dashboardPages.reservationMinLeadTime, settings.leadtime); //reservation min lead time e.g. 0 minutes
    I.selectOption(this.RTPages.dashboardPages.reservationMaxAutoConfirmCapacity, settings.autoconfirm); //reservation min lead time e.g. 0 minutes
    I.click(this.RTPages.dashboardPages.saveButton); //save
    I.waitForVisible(this.RTPages.dashboardPages.successMessage);
  },
  setReservationSeats(n) {
    I.click(this.RTPages.dashboardPages.settingsDropdown);
    I.wait(1);
    I.click(this.RTPages.dashboardPages.reservablesSettings);
    I.waitInUrl('/settings/reservables');
    I.fillField(this.RTPages.dashboardPages.reservablesCapacity, n);
    I.click(this.RTPages.dashboardPages.saveButton);
    I.waitForVisible(this.RTPages.dashboardPages.successMessage);
    I.wait(2);
  },
  removeAccount(user) {
    I.executeScript(function(c) { //If portrait view then click hidden menu
      let ele = document.querySelector(c);
      if (ele.offsetParent != null) {
        ele.click();
      };
    }, this.RTPages.dashboardPages.mobileHiddenMenu);
    I.click(this.RTPages.dashboardPages.settingsDropdown);
    I.waitForVisible(this.RTPages.dashboardPages.establishmentSettings);
    I.click(this.RTPages.dashboardPages.establishmentSettings);
    I.waitForVisible(this.RTPages.dashboardPages.accountSettings);
    I.click(this.RTPages.dashboardPages.accountSettings);
    I.waitForVisible(this.RTPages.dashboardPages.deleteButton);
    I.click(this.RTPages.dashboardPages.deleteButton);
    I.waitForVisible(this.RTPages.dashboardPages.deletePassword);
    I.fillField(this.RTPages.dashboardPages.deletePassword, user.password);
    I.click(this.RTPages.dashboardPages.deleteConfirm);
    I.waitForVisible(this.RTPages.dashboardPages.successMessage);
  },
  checkIntegration() {
    I.executeScript(function(c) {
      let ele = document.querySelector(c);
      if (ele.offsetParent != null) {
        ele.click();
      };
    }, this.RTPages.dashboardPages.mobileHiddenMenu);
    I.click(this.RTPages.dashboardPages.integrationSettings);
    I.waitForVisible(this.RTPages.dashboardPages.widgetOptions);
    I.selectOption(this.RTPages.dashboardPages.widgetOptions, 'Pop-out Link');
  },
  changeUserDetails(u) {
    I.waitForVisible(this.RTPages.dashboardPages.userUsername);
    I.fillField(this.RTPages.dashboardPages.userUsername, u.username);
    I.fillField(this.RTPages.dashboardPages.userFirstName, u.firstName);
    I.fillField(this.RTPages.dashboardPages.userLastName, u.lastName);
    I.selectOption(this.RTPages.dashboardPages.userSalutation, u.salutation);

    I.click(this.RTPages.dashboardPages.userSaveButton);
    //Enter name for change login
    I.waitForVisible(this.RTPages.dashboardPages.userPassword);
    I.fillField(this.RTPages.dashboardPages.userPassword, u.password);
    I.click(this.RTPages.dashboardPages.saveButton);
    I.waitForVisible(this.RTPages.dashboardPages.successMessage);
  },
  changeEstDetails(e) {
    I.waitForVisible(this.RTPages.dashboardPages.establishmentName);
    I.fillField(this.RTPages.dashboardPages.establishmentName, e.businessName);
    I.fillField(this.RTPages.dashboardPages.establishmentPhoneNumber, e.phone);
    I.fillField(this.RTPages.dashboardPages.establishmentStreet, e.streetName + ' ' + e.streetNumber);
    I.fillField(this.RTPages.dashboardPages.establishmentZipCode, e.postalCode);
    I.fillField(this.RTPages.dashboardPages.establishmentCity, e.city);
    I.click(this.RTPages.dashboardPages.saveButton);
    I.waitForVisible(this.RTPages.dashboardPages.successMessage);
  },
  async getUsrData() {
    await I.waitForVisible(this.RTPages.dashboardPages.userSalutationSelect);
    let salutation = await I.grabAttributeFrom(this.RTPages.dashboardPages.userSalutationSelect, 'title');
    let firstName = await I.grabValueFrom(this.RTPages.dashboardPages.userFirstName);
    let lastName = await I.grabValueFrom(this.RTPages.dashboardPages.userLastName);
    let email = await I.grabValueFrom(this.RTPages.dashboardPages.userUsername);
    let result = await {
      "salutation": salutation[0],
      "firstName": firstName[0],
      "lastName": lastName[0],
      "email": email[0]
    };
    I.say(result);
    return await result;
  },
  async getDasEstData() {
    await I.waitForVisible(this.RTPages.dashboardPages.establishmentName);
    let name = await I.grabValueFrom(this.RTPages.dashboardPages.establishmentName);
    let street = await I.grabValueFrom(this.RTPages.dashboardPages.establishmentStreet);
    let zipCode = await I.grabValueFrom(this.RTPages.dashboardPages.establishmentZipCode);
    let city = await I.grabValueFrom(this.RTPages.dashboardPages.establishmentCity);
    let country = await await I.grabAttributeFrom(this.RTPages.dashboardPages.establishmentCountryCode, 'title');
    let phone = await I.grabValueFrom(this.RTPages.dashboardPages.establishmentPhoneNumber);
    let email = await I.grabValueFrom(this.RTPages.dashboardPages.establishmentEmail);
    let result = await {
      "name": name[0],
      "street": street[0],
      "zipCode": zipCode[0],
      "city": city[0],
      "country": country[0],
      "phone": phone[0],
      "email": email[0]
    };
    I.say(result);
    return await result;
  },
  SetReservationHours() {
    I.executeScript(function(c) { //If portrait view then click hidden menu
      let ele = document.querySelector(c);
      if (ele.offsetParent != null) {
        ele.click();
      };
    }, this.RTPages.dashboardPages.mobileHiddenMenu);
    I.waitForVisible(this.RTPages.dashboardPages.settingsDropdown);
    I.click(this.RTPages.dashboardPages.settingsDropdown);
    I.waitForVisible(this.RTPages.dashboardPages.reservationTimesSettings);
    I.click(this.RTPages.dashboardPages.reservationTimesSettings);
    I.waitInUrl('/reservationTimes');
  },
  RemoveTodayOpeningHours() {
    I.waitForVisible(this.RTPages.dashboardPages.editReservationHours);
    I.click(this.RTPages.dashboardPages.editReservationHours);
    I.waitForElement(this.RTPages.dashboardPages.selectDays);
    I.selectOption(this.RTPages.dashboardPages.selectDays, String(n));
    I.click(this.RTPages.dashboardPages.saveButton);
    I.waitForVisible(this.RTPages.dashboardPages.successMessage);
  },
  AddTodayOpeningHours() {
    I.waitForVisible(this.RTPages.dashboardPages.editReservationHours);
    I.click(this.RTPages.dashboardPages.editReservationHours);
    I.waitForVisible(this.RTPages.dashboardPages.addTimeSetting);
    I.click(this.RTPages.dashboardPages.addTimeSetting);
    I.selectOption(this.RTPages.dashboardPages.addSelectDays, String(n));
    I.fillField(this.RTPages.dashboardPages.startHour, '12');
    I.fillField(this.RTPages.dashboardPages.startMin, '00');
    I.fillField(this.RTPages.dashboardPages.endHour, '12');
    I.fillField(this.RTPages.dashboardPages.endMin, '00');
    I.click(this.RTPages.dashboardPages.saveButton);
    I.waitForVisible(this.RTPages.dashboardPages.successMessage);
  },
  SetOpeningHoursasCurrent() {
    //starting time
    I.fillField(this.RTPages.dashboardPages.startHour.replace('[2]', '[' + n * 2 + ']'), '12');
    I.fillField(this.RTPages.dashboardPages.startMin.replace('[2]', '[' + n * 2 + ']'), '00');
    I.click(this.RTPages.dashboardPages.startAMPM.replace('VALUE', 'am') + '[' + n * 2 + ']');
    I.wait(1);
    I.click(this.RTPages.dashboardPages.startAMPM.replace('VALUE', 'pm') + '[' + n * 2 + ']');
    //ending time
    I.fillField(this.RTPages.dashboardPages.endHour.replace('[2]', '[' + n * 2 + ']'), '12');
    I.fillField(this.RTPages.dashboardPages.endMin.replace('[2]', '[' + n * 2 + ']'), '00');
    I.click(this.RTPages.dashboardPages.endAMPM.replace('VALUE', 'am') + '[' + n * 2 + ']');
    I.wait(1);
    I.click(this.RTPages.dashboardPages.endAMPM.replace('VALUE', 'pm') + '[' + n * 2 + ']');

    I.click(this.RTPages.dashboardPages.saveButton);
    I.waitForVisible(this.RTPages.dashboardPages.successMessage);
  },
  AddTodayasException() {
    I.waitForVisible(this.RTPages.dashboardPages.exceptionSettings);
    I.click(this.RTPages.dashboardPages.exceptionSettings);
    I.waitForVisible(this.RTPages.dashboardPages.exceptionAddDay);
    I.click(this.RTPages.dashboardPages.exceptionAddDay);
    I.click(this.RTPages.dashboardPages.exceptionDay.replace('targetDay', day));
    I.click(this.RTPages.dashboardPages.saveButton);
    I.waitForVisible(this.RTPages.dashboardPages.successMessage);
  },
  RemoveTodayasException() {
    I.waitForVisible(this.RTPages.dashboardPages.exceptionSettings);
    I.click(this.RTPages.dashboardPages.exceptionSettings);
    I.waitForVisible(this.RTPages.dashboardPages.removeException);
    I.click(this.RTPages.dashboardPages.removeException);
    I.waitForVisible(this.RTPages.dashboardPages.removeConfirm);
    I.click(this.RTPages.dashboardPages.removeConfirm);
    I.waitForInvisible(this.RTPages.dashboardPages.removeConfirm);
    I.click(this.RTPages.dashboardPages.saveButton);
    I.waitForVisible(this.RTPages.dashboardPages.successMessage);
  },
  TodayNotAvailable() {
    I.click(this.RTPages.widgetPages.date);
    I.seeElement(this.RTPages.widgetPages.disabledDay.replace('targetDay', day))
  },
  TodayAvailable() {
    I.click(this.RTPages.widgetPages.date);
    I.seeElement(this.RTPages.widgetPages.reserveDay.replace('targetDay', day))
  }
};

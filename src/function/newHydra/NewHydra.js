const {
  wizard,
  url,
  res_url
} = require('../../function/newHydra/wizard_data_provider_new');

let I;
let env = require('../newHydra/wizard_data_provider_new').env;

let WBPages = {
  wizardPages: {
    tcsAgree: '//label[contains(@class,"wizardTerms-checkAgree-label")]/span',
    nextStep: '.btn-primary-white',
    addOpenTime: '.addTimeSetting',
    inputWeekdays: '//select[contains(@class,"weekdays-input")]',
    startHour: '//div[@class="startingTime"]//input[@data-field="hours"]',
    startMin: '//div[@class="startingTime"]//input[@data-field="mins"]',
    endHour: '//div[@class="endingTime"]//input[@data-field="hours"]',
    endMin: '//div[@class="endingTime"]//input[@data-field="mins"]',
    subdomain: '#subdomain',
    domain: '//span[.="domain"]/../span',
    establishmentEmail: '#wizard-additionalInfo-email',
    establishmentPhone: '#wizard-additionalInfo-phoneNumber',
    imprintInput: '(//input[@type="text"])[imprint]',
    createWLButton: '//label[@for="wizard-registration-google"]/span',
    disableNextButton: '//button[@disabled]',
    acceptWLTcs: '//label[@for="wizard-registration-acceptedTerms"]/span',
    preview: '.mod-wizard-preview',
    continueButton: '.btn.btn-primary.btn-continue'
  },
  homePage: {
    acceptCookie: '//button[contains(@class,"btn-accept-cookies")]',
    login: '//a[(@data-calming-action="loginDish") or (@href="/login")]',
    firstLogin: '//a[@href="/login"]',
    username: '#username',
    emailTab: '#email-tab',
    password: '#password',
    ssoLogin: '#kc-login'
  },
  dashboardPages: {
    logout: '//a[@href="/logout"]',
    saveButton: '(//button[@type="submit"])',
    confirmButton: '.btn.btn-primary.btn-confirm',
    password: '(//input[@id="password"])',
    successMessage: '.alert-success',
    errorMessage: '.alert-danger',
    remove: '(//button[@class="btn btn-danger btn-remove"])',
    removeConfirm: '.btn.btn-danger',
    //Restaurant details:
    establishmentName: '//input[@name="name"]',
    establishmentPhonePrefix: '#establishment-phonePrefix',
    establishmentPhoneNumber: '#establishment-phoneNumber',
    establishmentStreet: '#establishment-street',
    establishmentEmail: '#establishment-email',
    establishmentZipCode: 'establishment-zipCode',
    establishmentCity: 'establishment-city',
    establishmentCountry: '//label[contains(.,"Country")]/..//p',
    keepMySpelling: '//button[contains(.,"Keep my spelling")]',
    showContactForm: '//label[@for="establishment-showContactFormOnWebsite"]/span',
    socialNetworkSelect: '//select[@name="socialNetworks[0]"]',
    inputSocialNetwork: '//input[@name="urls[0]"]',
    //Reservation Options
    reservationToolOption: '//label[@for="RESERVATION_TOOL"]/span',
    reservationToolLink: '//a[contains(@href,"reservation") and @target="_blank"]',
    emailReservationInput: '#EMAIL-data',
    emailOption: '//label[@for="EMAIL"]/span',
    phoneOption: '//label[@for="PHONE"]/span',
    phoneReservationPrefix: '//select[@name="phonePrefix"]',
    phoneReservationNumber: '#PHONE-data',
    //domain
    subdomain: '#subdomain',
    domain: '//span[.="targetDomain"]/../span',
    //design
    designUpload: '(//input[@type="file"])',
    darkening: '(//div[@class="slider-tick-label"])',
    fontOption: '(//select[@name="titleFont"]/option)',
    titleFont: '#titleFont-font',
    subtitleFont: '#subtitleFont-font',
    bodyFont: '#bodyFont-font',
    imageLogo: '.imageLogo',
    deleteLogo: '.btn.btn-danger.btn-delete-logo',
    showLogo: '//input[@id="showLogoOnWebsite"]/../span',
    //Gallery
    uploadImage: '#imageFile',
    updateGallery: '.btn.btn-warning.update',
    galleryDescription: '(//textarea)',
    listDescription: '//ul[@id="sortable-list"]//textarea',
    editGallery: '//ul[@id="sortable-list"]//a[@class="btn-edit"]',
    cancelChangeGallery: '//ul[@id="sortable-list"]//a[@class="btn-cancel"]',
    saveChangeGallery: '//ul[@id="sortable-list"]//a[@class="btn-save"]',
    deleteGallery: '//ul[@id="sortable-list"]//a[@class="btn-delete"]',
    //Imprint
    imprintFieldValue: '//label[contains(@for,"establishment-imprintFieldValue")]',
    imprintInput: '(//input[@type="text"])',
    //description
    headerWelcomeTitle: '#header-welcomeTitle',
    headerTitle: '#header-title',
    headerDescription: '.note-editable',
    manualDescription: '//label[@for="radio-option-manual"]',
    autoDescription: '//label[@for="radio-option-automatic"]',
    multipleLanguage: '//label[@for="multiLanguageDescription"]/span',
    generateButton: '.generate-link',
    loadingState: '.mod-header-details.auto-generated.loading',
    //Menu
    uploadMenu: '#file-menu-field',
    menuTitle: '#title-0',
    deleteMenu: '(//button[contains(@class,"btn-remove-menu")])',
    //Story:
    uploadFile: '(//div[@class="mod-dashboard-content-story"])[number]/form[2]/input[@type="file"]',
    metroImage: '.btn.btn-changeImage',
    storyList: '.stories-list',
    voucherList: '.vouchers-list',
    //Weblisting:
    webListingTCs: '.checkbox-control',
    activateWLButton: '//button[@type="submit"]',
    wlPage: '.ubicus-manage-link',
    wlPersonIcon: '//div[@aria-haspopup="true"]',
    //Opening time
    addTimeSettings: '.btn.btn-default.addTimeSetting',
    exceptionDay: '(//div[@class="form-group start-date-group"])[1]',
    selectDay: '//td[text()=targetDay and contains(@class,"day")]',
    exceptionName: '//input[@class="form-control name"]',
    removeTimeInterval: '(//span[contains(@class,"removeTimeInterval")])',
    weekDayTimeSettings: '//select[@name="weekdayTimeSettings[number].timeIntervals[0].keyName"]',
    addExceptionTime: '//tbody/tr[8]/td[4]/button',
    exceptionTimeSettings: '//select[@name="exceptionalTimeSettings[0].timeIntervals[0].keyName"]',
    //Content
    storyList: '.stories-list',
    addItem: '(//div[contains(@class,"add-section-button")]//button[@type="button"])',
    title: '(//input[@name="title"])',
    subTitle: '(//input[@name="subtitle"])',
    text: '(//div[@class="note-editable"])',
    url: '(//input[@name="url"])',
    openGallery: '.btn.btn-primary.openGallery',
    showMoreImages: '//li[@class="viewMore"]/a',
    selectImage: '(//li/img)',
    removeStory: '(//span[@class="fas fa-trash-alt mod-remove-block"])',
    // Account
    userSalutation: '#user-salutation',
    userFirstName: '#user-name',
    userLastName: '#user-lastname',
    username: '#user-login',
    saveUser: '.wait.btn-primary.btn.btn-save-user-profile-link',
    delete: '.btn-danger.btn',
    deleteConfirm: '.btn.btn-danger.delete',
    newPassword: '#password-new',
    confirmPassword: '#password-confirm',
    ssoSave: '//button[@value="Save"]',
    ssoBack: '.btn-cancel.back-link',
    changePassword: '//a[@class="btn-primary btn"]',
    //Footer
    footerImprint: '//a[@href="/imprint"]',
    footerFAQ: '//a[@href="/faq"]',
    footerTerms: '//a[@href="/termsofuse"]',
    footerPrivacy: '//a[@href="/privacy"]',
    //changeLanguage
    languageDropdown: '//li[@class="dropdown language"]/a',
    languageOption: '//a[contains(.,"language")]',
    country: '(//div[@class="form-group"]/label)[2]',
    //dataPrivacy
    dataPrivacyLink: '//div[@class="mod-dashboard-data-privacy"]/div/div/h3[num]',
    exportData: '//a[@href="/dashboard/exportData"]',
    //FoodOrder
    foLabel: '//h2[1]',
    foodordertoggle: '//div[contains(@class,"food-ordering-switch")]//span[@class="lever"]',
    selectCashChkBox: '//div[contains(@class,"avaiablePaymentOptions-container")]//li[1]//label[1]//span[1]',
    selectPickupChkBox: '//div[contains(@class,"avaiableServices-container")]//li[1]//label[1]//span[1]',
    foText1: 'body.page-dashboard.page-dashboard-foodOrdering:nth-child(2) div.content:nth-child(7) div.container div.row div.col-sm-12 div.mod-dashboard-foodOrdering form.form-horizontal.-ajax-form-submit:nth-child(4) > p:nth-child(1)',
    foText2: 'body.page-dashboard.page-dashboard-foodOrdering:nth-child(2) div.content:nth-child(7) div.container div.row div.col-sm-12 div.mod-dashboard-foodOrdering form.form-horizontal.-ajax-form-submit:nth-child(4) p:nth-child(2) > strong:nth-child(1)',
    foText3: 'body.page-dashboard.page-dashboard-foodOrdering:nth-child(2) div.content:nth-child(7) div.container div.row div.col-sm-12 div.mod-dashboard-foodOrdering form.form-horizontal.-ajax-form-submit:nth-child(4) > p:nth-child(3)',
    foSrvContainer: '//div[contains(@class,"avaiableServices-container")]',
    foPmtContainer: '//div[@class="avaiablePaymentOptions-container"]'
  },
  website: {
    story: '.story-block',
    image: '.image-block',
    aboutUs: '.mod-website-about-us',
    reservationToolBox: '.reservation-tool-box',
    reservationToolFrame: '//iframe[contains(@src,"/widget/hydra")]',
    openingTime: '.mod-website-opening-times',
    exceptionTime: '//tr[@class="exceptional"]',
    openingTimeEntry: '/html/body/section[5]/div[2]/table/tbody/tr[number]/td/div[2]',
    exceptionTimeEntry: '//tr[@class="exceptional"]',
    reservationButton: '//a[@href="#reservation"]',
    reservationForm: '.mod-website-form',
    reservationFormName: '#ReservationForm-name-field',
    reservationFormEmail: '#ReservationForm-email-field',
    reservationFormPhone: '#ReservationForm-phone-field',
    reservationFormDate: '//label[@for="date-field"]',
    reservationFormDateChoose: '//td[not(contains(@class,"xdsoft_disabled"))]//div[.="27"]',
    reservationFormTime: '//div[@class="xdsoft_time " and .="02:30 pm"]',
    reservationFormSeat: '//label[@for="seats-field"]',
    reservationFormMessage: '//label[@for="ReservationForm-message-field"]',
    reservationFormSend: '//button[@type="submit"]',
    serviceSection: '.mod-website-services',
    paymentSection: '.mod-website-payments',
    menuSection: '.menu',
    storyImage: '.image-box',
    storySection: '.story-block',
    welcomeTitle: '.welcome-text.brand-color.brand-titleFont',
    title: '//div[@class="title"]/h2',
    description: '//*[contains(@class,"description")]',
    logoImg: '//img[contains(@src,"x8EEn")]',
    gallery: '.caption',
    imprint: '//div[@class="lightbox active"]',
    foodorderbtn1: '.mod-foodOrdering-btn',
    foodorderIcon: '//i[@class="icon_food-ordering"]',
    fOName: '//div[@class="form-holder"]//input[@id="name-field"]',
    fOEmail: '//input[@id="$email-field"]',
    foPhone: '//input[@id="$phone-field"]',
    foMessage: '//textarea[@id="$message-field"]',
    foPaymentCash: '//input[@id="CASH"]',
    foPaymentCC: '//input[@id="CREDIT_CARD"]',
    foPaymentDC: '//input[@id="DEBIT_CARD"]',
    foPaymentEC: '//input[@id="EC_CARD"]',
    foPickup: '//input[@id="PICKUP"]',
    foDelivery: '//input[@id="DELIVERY"]',
    foAddressArea: '//textarea[@id="address-field"]',
    foSubmitBtn: 'div.row:nth-child(10) > button:nth-child(1)',
    foSucessMsg: '//div[@class="form-holder"]//div[@class="success-cell"]',
    foCashDsbl: '//input[@id="CASH" and @disabled=""]',
    foPymtDsbl: '//input[@id="PICKUP" and @disabled=""]'
  }
}
module.exports = {

  _init() {
    I = actor();
  },
  WBPages,
  landing(u, delay = 0) {
    I.amOnPage(u);
    if (delay != 0) {
      I.wait(delay);
    }
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
    }, this.WBPages.homePage.acceptCookie);
  },
  login(user) {
    I.waitForVisible(this.WBPages.homePage.login);
    I.click(this.WBPages.homePage.login);
    I.wait(1);
    I.executeScript(function(xpath) {
      let ele = document.evaluate(xpath,
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
      if (ele) {
        ele.click();
      }
    }, this.WBPages.homePage.firstLogin);
    I.waitForVisible(this.WBPages.homePage.username);
    I.click(this.WBPages.homePage.emailTab);
    I.fillField(this.WBPages.homePage.username, user.username);
    I.fillField(this.WBPages.homePage.password, user.password);
    I.click(this.WBPages.homePage.ssoLogin);
    I.waitForVisible(this.WBPages.dashboardPages.logout);
  },
  landingBusinessPage(w, v) {
    I.amOnPage('https://' + w.subdomain + '.' + w.domain + "/" + v);
    I.setCookie({
      name: 'DISABLE_TRACKING',
      value: 'true'
    });
    I.executeScript(function(xpath) {
      let ele = document.evaluate(xpath,
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
      if (ele) {
        ele.click();
      }
    }, this.WBPages.homePage.acceptCookie);
  },
  async changeRestaurantDetails(r) {
    I.waitInUrl('/dashboard/establishment');
    I.waitForVisible(this.WBPages.dashboardPages.establishmentName);
    I.wait(2);
    I.fillField(this.WBPages.dashboardPages.establishmentName, r.businessName);
    I.selectOption(this.WBPages.dashboardPages.establishmentPhonePrefix, r.dialCode);
    I.fillField(this.WBPages.dashboardPages.establishmentPhoneNumber, r.phone);
    I.fillField(this.WBPages.dashboardPages.establishmentStreet, r.streetName + ' ' + r.streetNumber);
    I.fillField(this.WBPages.dashboardPages.establishmentEmail, r.email);
    //Clear field
    I.executeScript(function(id) {
      document.getElementById(id).value = "";
    }, this.WBPages.dashboardPages.establishmentZipCode);
    I.fillField('#' + this.WBPages.dashboardPages.establishmentZipCode, r.postalCode);
    //New since R1.7
    I.wait(2);
    I.executeScript(function(xpath) {
      let ele = document.evaluate(xpath,
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
      if (ele) {
        ele.click();
      }
    }, this.WBPages.dashboardPages.keepMySpelling);
    I.wait(2);
    //After change post code, starts to pop up
    I.executeScript(function(id) {
      document.getElementById(id).value = "";
    }, this.WBPages.dashboardPages.establishmentCity);
    I.fillField('#' + this.WBPages.dashboardPages.establishmentCity, r.city);
    //Turn off contact box for new release
    I.click(this.WBPages.dashboardPages.showContactForm);
    //Sometimes appear again
    I.wait(2);
    I.executeScript(function(xpath) {
      let ele = document.evaluate(xpath,
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
      if (ele) {
        ele.click();
      }
    }, this.WBPages.dashboardPages.keepMySpelling);
    I.wait(2);
    I.click(this.WBPages.dashboardPages.saveButton);
  },
  changeUserDetails(u) {
    I.waitForElement(this.WBPages.dashboardPages.userSalutation);
    I.selectOption(this.WBPages.dashboardPages.userSalutation, u.salutation);
    I.fillField(this.WBPages.dashboardPages.userFirstName, u.firstName);
    I.fillField(this.WBPages.dashboardPages.userLastName, u.lastName);
    I.fillField(this.WBPages.dashboardPages.username, u.username);
    I.click(this.WBPages.dashboardPages.saveUser);
    //Enter name for change login
    I.waitForVisible(this.WBPages.dashboardPages.password);
    I.fillField(this.WBPages.dashboardPages.password, u.password);
    I.click(this.WBPages.dashboardPages.saveButton);
    I.waitForVisible(this.WBPages.dashboardPages.successMessage);
  },
  verify_page(r) {
    Object.values(r).forEach(function(key) {
      I.see(key);
    });
  },
  verify_arr(t) {
    let a = t.split(',');
    for (let i = 0; i < a.length; i++) {
      I.seeElement('.icon.icon_' + a[i]);
    };
  },
  checkbox_arr(t) {
    let array = t.split(',');
    let nextButton;
    let xpath;
    I.executeScript(function(arr) {
      for (i = 0; i < arr.length; i++) {
        xpath = '//label[@for="item-' + arr[i] + '"]/span[1]'
        nextButton = document.evaluate(xpath,
          document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
          null).singleNodeValue;
        nextButton.scrollIntoView()
        nextButton.click();
      };
    }, array);
  },
  changeSocialNetwork(r) {
    I.waitForVisible(this.WBPages.dashboardPages.establishmentName);
    I.selectOption(this.WBPages.dashboardPages.socialNetworkSelect, r.type);
    I.wait(1)
    //I.clearField('//input[@name="urls[0]"]');
    I.executeScript(function(xpath) {
      let ele = document.evaluate(xpath,
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
      ele.value = 'http://www.google.com';
    }, this.WBPages.dashboardPages.inputSocialNetwork);
    I.click(this.WBPages.dashboardPages.saveButton + '[2]');
    I.waitForVisible(this.WBPages.dashboardPages.errorMessage);
    I.executeScript(function(xpath, x) {
      let ele = document.evaluate(xpath,
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
      ele.value = x;
    }, this.WBPages.dashboardPages.inputSocialNetwork, r.content);
    I.click(this.WBPages.dashboardPages.saveButton + '[2]');
    I.waitForVisible(this.WBPages.dashboardPages.successMessage);
  },
  openTab(name) {
    I.amOnPage(url + 'dashboard/' + name);
  },
  random_time(s) {
    let h = Math.floor(Math.random() * 12);
    let m = Math.floor(Math.random() * 60);
    //let amPm = (h < 12 ? " AM" : " PM");
    if (s == " PM") {
      h = h + 12;
    };
    let hFormat = (h < 10 ? "0" : "");
    let hFormat_2 = (h % 12 < 10 ? "0" : "");
    let mFormat = (m < 10 ? "0" : "");

    return hFormat_2 + (h % 12) + s + ':' + mFormat + m + ":" + hFormat + h;
  },
  turnOnHDReservation() {
    I.waitForVisible(this.WBPages.dashboardPages.reservationToolOption);
    I.click(this.WBPages.dashboardPages.reservationToolOption);
    I.click(this.WBPages.dashboardPages.saveButton + '[3]');
    I.waitForVisible(this.WBPages.dashboardPages.successMessage);
    I.waitForInvisible(this.WBPages.dashboardPages.successMessage);
  },
  turnOffHDReservation() {
    I.waitForVisible(this.WBPages.dashboardPages.reservationToolOption);
    I.click(this.WBPages.dashboardPages.reservationToolOption);
    I.click(this.WBPages.dashboardPages.saveButton + '[3]');
    I.waitForVisible(this.WBPages.dashboardPages.confirmButton);
    I.click(this.WBPages.dashboardPages.confirmButton);
    I.waitForVisible(this.WBPages.dashboardPages.successMessage);
    I.waitForInvisible(this.WBPages.dashboardPages.successMessage);
  },
  chooseMetroImage() {
    I.waitForVisible(this.WBPages.dashboardPages.openGallery);
    I.wait(2);
    I.click(this.WBPages.dashboardPages.openGallery);
    I.waitForVisible(this.WBPages.dashboardPages.showMoreImages);
    I.click(this.WBPages.dashboardPages.showMoreImages);
    I.wait(2);
    I.waitForVisible(this.WBPages.dashboardPages.showMoreImages);
    I.click(this.WBPages.dashboardPages.showMoreImages);
    I.wait(2);
    let xpath = this.WBPages.dashboardPages.selectImage + '[' + (Math.floor(Math.random() * 40) + 1) + ']';
    I.executeScript(function(x) {
      let ele = document.evaluate(x,
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
      ele.click();
    }, xpath);
  },
  async removeAccount(u, w) {
    I.amOnPage(u + 'logout');
    this.login(w.user);
    this.openTab('account');
    I.waitForVisible(this.WBPages.dashboardPages.userFirstName);
    let status = await I.grabTextFrom(this.WBPages.dashboardPages.delete);
    I.say(status);
    if (status.indexOf("Deletion in progress") == -1) {
      I.click(this.WBPages.dashboardPages.delete);
      I.waitForVisible(this.WBPages.dashboardPages.password);
      I.fillField(this.WBPages.dashboardPages.password + '[2]', w.user.password);
      I.click(this.WBPages.dashboardPages.deleteConfirm);
      I.waitForVisible(this.WBPages.dashboardPages.successMessage);
    }
  },
  lowerFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1).replace(' ', '');
  },
  logout() {
    I.waitForVisible(this.WBPages.dashboardPages.logout);
    I.click(this.WBPages.dashboardPages.logout);
    I.waitForVisible(this.WBPages.homePage.login);
  },
  async getDasEstData() {
    await I.waitForVisible(this.WBPages.dashboardPages.establishmentName);
    let name = await I.grabValueFrom(this.WBPages.dashboardPages.establishmentName);
    let street = await I.grabValueFrom(this.WBPages.dashboardPages.establishmentStreet);
    let zipCode = await I.grabValueFrom('#' + this.WBPages.dashboardPages.establishmentZipCode);
    let city = await I.grabValueFrom('#' + this.WBPages.dashboardPages.establishmentCity);
    let country = await I.grabTextFrom(this.WBPages.dashboardPages.establishmentCountry);
    let phone = await I.grabValueFrom(this.WBPages.dashboardPages.establishmentPhoneNumber);
    let email = await I.grabValueFrom(this.WBPages.dashboardPages.establishmentEmail);
    let result = await {
      "name": name[0],
      "street": street[0],
      "zipCode": zipCode[0],
      "city": city[0],
      "country": country,
      "phone": phone[0],
      "email": email[0]
    };
    I.say(result);
    return await result;
  },
  async getUsrData() {
    await I.waitForElement(this.WBPages.dashboardPages.userSalutation);
    let salutation = await I.grabValueFrom(this.WBPages.dashboardPages.userSalutation);
    let firstName = await I.grabValueFrom(this.WBPages.dashboardPages.userFirstName);
    let lastName = await I.grabValueFrom(this.WBPages.dashboardPages.userLastName);
    let email = await I.grabValueFrom(this.WBPages.dashboardPages.username);
    let result = await {
      "salutation": salutation[0],
      "firstName": firstName[0],
      "lastName": lastName[0],
      "email": email[0]
    };
    I.say(result);
    return await result;
  },
  changePassword(u) {
    I.waitForVisible(this.WBPages.dashboardPages.password);
    I.fillField(this.WBPages.dashboardPages.password, u.password);
    I.fillField(this.WBPages.dashboardPages.newPassword, u.password);
    I.fillField(this.WBPages.dashboardPages.confirmPassword, u.password);
    I.click(this.WBPages.dashboardPages.ssoSave);
    I.waitForVisible(this.WBPages.dashboardPages.successMessage);
    I.click(this.WBPages.dashboardPages.ssoBack);
  },
  deleteStory() {
    I.waitForVisible(this.WBPages.dashboardPages.remove);
    I.click(this.WBPages.dashboardPages.remove);
    I.waitForVisible(this.WBPages.dashboardPages.removeConfirm);
    I.click(this.WBPages.dashboardPages.removeConfirm);
    I.waitForVisible(this.WBPages.dashboardPages.successMessage);
  },
  addStory(s, n) {
    I.waitForVisible(this.WBPages.dashboardPages.title + '[' + n + ']');
    I.fillField(this.WBPages.dashboardPages.title + '[' + n + ']', s.story_title);
    I.fillField(this.WBPages.dashboardPages.subTitle + '[' + n + ']', s.story_subtitle);
    I.fillField(this.WBPages.dashboardPages.text + '[' + n + ']', s.story_description);
    I.fillField(this.WBPages.dashboardPages.url + '[' + n + ']', s.story_url);
  },
  checkStory(s) {
    I.seeElement(this.WBPages.website.story);
    I.seeElement(this.WBPages.website.image);
    I.see(s.story_title, this.WBPages.website.aboutUs);
    I.see(s.story_subtitle, this.WBPages.website.aboutUs);
    I.see(s.story_description, this.WBPages.website.aboutUs);
    I.seeElement('//a[@href="' + s.story_url + '"]');
  },
  addContentBlock() {
    I.waitForVisible(this.WBPages.dashboardPages.storyList);
    I.click(this.WBPages.dashboardPages.storyList);
    I.waitForVisible(this.WBPages.dashboardPages.addItem);
    I.click(this.WBPages.dashboardPages.addItem);
  },
  deleteStoryFromList() {
    I.waitForVisible(this.WBPages.dashboardPages.removeStory);
    I.click(this.WBPages.dashboardPages.removeStory);
    I.waitForVisible(this.WBPages.dashboardPages.removeConfirm);
    I.click(this.WBPages.dashboardPages.removeConfirm);
    I.waitForVisible(this.WBPages.dashboardPages.successMessage);
  },
  registerWB(details, add_check = 0) {
    if (!([3].includes(add_check)) && details.country != 'Russia') {
      //Accept T&Cs
      I.waitForVisible(this.WBPages.wizardPages.tcsAgree);
      I.click(this.WBPages.wizardPages.tcsAgree);
      I.click(this.WBPages.wizardPages.nextStep);
    };
    //Add opening time:
    I.waitForVisible(this.WBPages.wizardPages.addOpenTime);
    I.click(this.WBPages.wizardPages.addOpenTime);
    I.waitForElement(this.WBPages.wizardPages.inputWeekdays);
    I.selectOption(this.WBPages.wizardPages.inputWeekdays, ['1', '2', '3', '4', '5', '6', '7']);
    I.fillField(this.WBPages.wizardPages.startHour, '12');
    I.fillField(this.WBPages.wizardPages.startMin, '00');
    I.fillField(this.WBPages.wizardPages.endHour, '12');
    I.fillField(this.WBPages.wizardPages.endMin, '00');
    I.click(this.WBPages.wizardPages.nextStep);
    //Facilities
    I.waitInUrl('wizard/2');
    this.checkbox_arr(details.facility);
    //Payments Options
    this.checkbox_arr(details.payment);
    I.click(this.WBPages.wizardPages.nextStep);
    //Offerings
    I.waitInUrl('wizard/3');
    this.checkbox_arr(details.type);
    I.click(this.WBPages.wizardPages.nextStep);
    //Sub Domain
    I.waitInUrl('wizard/4');
    I.fillField(this.WBPages.wizardPages.subdomain, details.subdomain);
    I.click(this.WBPages.wizardPages.domain.replace('domain', details.domain.replace(env + '.', '')));
    I.fillField(this.WBPages.wizardPages.establishmentPhone, details.contact.phone);
    I.fillField(this.WBPages.wizardPages.establishmentEmail, details.contact.email);
    I.click(this.WBPages.wizardPages.nextStep);
    //Upload Menu
    I.waitInUrl('wizard/5');
    I.click(this.WBPages.wizardPages.nextStep);
    //Imprint
    let array = [];
    if (details.country != "Russia") {
      I.waitInUrl('wizard/6');
      array = details.imprint.split(",");
      for (let i = 1; i <= array.length; i++) {
        I.fillField(this.WBPages.wizardPages.imprintInput.replace('imprint', i.toString()), array[i - 1]);
      };
      I.click(this.WBPages.wizardPages.nextStep);
    };
    //Claiming Service
    if (details.country != "Russia") {
      I.waitInUrl('wizard/7');
      I.click(this.WBPages.wizardPages.createWLButton);
      I.waitForVisible(this.WBPages.wizardPages.disableNextButton);
      I.click(this.WBPages.wizardPages.acceptWLTcs);
      I.waitForInvisible(this.WBPages.wizardPages.disableNextButton);
      I.click(this.WBPages.wizardPages.createWLButton);
      I.click(this.WBPages.wizardPages.nextStep);
    }
    //Preview
    I.waitInUrl('wizard/8');
    I.seeElement(this.WBPages.wizardPages.preview);
    I.click(this.WBPages.wizardPages.nextStep);
    //Last step
    I.waitInUrl('/success');
  },
  //Scroll to reservation frame
  NavigateToFrame() {
    I.waitForElement(this.WBPages.website.reservationToolBox);
    I.waitForVisible(this.WBPages.website.reservationToolBox);
    I.scrollTo(this.WBPages.website.reservationToolFrame);
    I.switchTo(this.WBPages.website.reservationToolFrame);
  },
  AddTodayasException(day) {
    I.click(this.WBPages.dashboardPages.addTimeSettings);
    I.scrollPageToBottom();
    I.wait(1);
    I.click(this.WBPages.dashboardPages.exceptionDay);
    I.waitForVisible(this.WBPages.dashboardPages.selectDay.replace('targetDay', day));
    I.click(this.WBPages.dashboardPages.selectDay.replace('targetDay', day));
    I.fillField(this.WBPages.dashboardPages.exceptionName, 'Testing automation');
  },
  //Turn on Food Oder Toggle
  turnOnFoodOrderToggle() {
    I.waitForVisible(this.WBPages.dashboardPages.foodordertoggle);
    I.click(this.WBPages.dashboardPages.foodordertoggle);
    I.waitForVisible(this.WBPages.dashboardPages.saveButton)
    I.click(this.WBPages.dashboardPages.saveButton)
    I.waitForVisible(this.WBPages.dashboardPages.successMessage)
  },
  //Turn off Food Oder Toggle
  turnOffFoodOrderToggle() {
    I.waitForVisible(this.WBPages.dashboardPages.foodordertoggle);
    I.click(this.WBPages.dashboardPages.foodordertoggle);
    I.waitForVisible(this.WBPages.dashboardPages.saveButton)
    I.click(this.WBPages.dashboardPages.saveButton)
    I.waitForVisible(this.WBPages.dashboardPages.successMessage)
  },
  //Navigate to food order form
  navigateTofoodOrderForm() {
    I.waitForVisible(this.WBPages.website.foodorderbtn1);
    I.click(this.WBPages.website.foodorderbtn1);
    I.seeElement(this.WBPages.website.foodorderIcon)
  },
  //Select checkbox
  selectOptionChkbox() {
    I.click(this.WBPages.dashboardPages.selectCashChkBox);
    I.click(this.WBPages.dashboardPages.selectPickupChkBox);
    I.click(this.WBPages.dashboardPages.saveButton);
    I.waitForVisible(this.WBPages.dashboardPages.successMessage);

  },
  //Submit food order form with give options
  SubmitfoodOrderForm(user, PaymentOptn, deliveryOptn) {
    I.fillField(this.WBPages.website.fOName, user.firstName);
    I.fillField(this.WBPages.website.fOEmail, user.username);
    I.fillField(this.WBPages.website.foPhone, user.phone);
    I.fillField(this.WBPages.website.foMessage, 'Test Automation');
    //Select payment option
    if (PaymentOptn == 'cash') {
      I.click(this.WBPages.website.foPaymentCash);
    } else if (PaymentOptn == 'CreditCard') {
      I.click(this.WBPages.website.foPaymentCC)
    } else if (PaymentOptn == 'DebitCard') {
      I.click(this.WBPages.website.foPaymentDC)
    } else {
      I.click(this.WBPages.website.foPaymentEC)
    }
    //Select deliver option
    if (deliveryOptn == 'delivery') {
      I.click(this.WBPages.website.foDelivery);
      I.fillField(this.WBPages.website.foAddressArea, 'Test Address for Automation');
    } else {
      I.click(this.WBPages.website.foPickup);
    }
    I.click(this.WBPages.website.foSubmitBtn);
    I.waitForVisible(this.WBPages.website.foSucessMsg);
    I.seeElement(this.WBPages.website.foSucessMsg)
  },
};

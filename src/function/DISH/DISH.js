let I;
let env = require('../newHydra/wizard_data_provider_new').env;

let DISHPages = {
  homePage: {
    signUpButton: '(//a[contains(@href,"user/sign-up")])',
    loginButton: '//li[@class="login"]/a',
    profileIcon: '//a[contains(@href,"/user/profile")]',
    tools: '//a[contains(@href,"/tools/")]'
  },
  signUpPage: {
    firstName: '#firstName',
    lastName: '#lastName',
    countryCode: '#phone-country-iso-code',
    phoneNumber: '#phone-national-number',
    acceptTCs: '(//label/span)[1]',
    verifyPhoneNumber: '//input[@type="submit"]',
    verificationCode: '#verificationCode',
    nextButton: '.submit.btn-submit',
    userEmail: '#email',
    userPassword: '#password',
    userPasswordConfirmation: '#password-confirmation',
    roleBoth: '//label[@for="role-owner"]'
  },
  profilePage: {
    logOutButton: '.btn.btn-dish-secondary',
    addEstablishment: '.btn.btn-dish-primary',
    salutation: '(//input[@checked="checked"])[1]',
    firstName: '#first-name',
    lastName: '#last-name',
    phone: '#mobile-number',
    email: '#current-email',
    establishmentName: '#establishmentName',
    establishmentStreet: '#establishmentStreet',
    establishmentPostalCode: '#establishmentPostalCode',
    establishmentCity: '#establishmentCity',
    establishmentCountry: '#establishmentCountryName',
    companyName: '#companyName',
    companyStreet: '#companyStreet',
    companyPostalCode: '#companyPostalCode',
    companyCity: '#companyCity',
    companyCountry: '#companyCountryName',
    submitButton: '(//input[@type="submit"])[1]',
    successMessage: '.alert-success',
    newEmail: '#new-email',
    repeatNewEmail: '#repeat-new-email',
    password: '#password',
    submitButton2: '(//input[@type="submit"])[2]',
    deleteAccount: '//a[contains(@href,"/user/delete-account/")]',
    deleteText: '#deleteText',
    deleteConfirm: '#delete-account-confirm-page',
    hiddenDeleteText: '.help-block.d-hide',
    changePasswordButton: '//a/span[@class="change-password-button"]'
  },
  loginPage: {
    emailTab: '#email-tab',
    username: '#username',
    password: '#password',
    loginButton: '#kc-login'
  },
  addEstablishmentPage: {
    establishmentName: '#establishmentName',
    establishmentType: '#establishmentType',
    establishmentCountryCode: '#establishmentCountryCode',
    nextButton: '.submit.btn-submit',
    companyName: '#companyName',
    companyStreet: '#companyStreet',
    companyPostalCode: '#companyPostalCode',
    companyCity: '#companyCity',
    estAddressSameAsCompany: '//input[@id="same-as-company"]',
    detailsEstablishmentName: '.mod-establishment-name',
    establishmentStreet: '#establishmentStreet',
    establishmentPostalCode: '#establishmentPostalCode',
    establishmentCity: '#establishmentCity',
    successIcon: '.mod-success-flow-image'
  },
  toolPage: {
    selectEstablishment: '#cartEstablishmentId',
    getProduct: '(//button[@class="join-now"])[product]',
    orderButton: '//button[@type="submit"]',
    WBProduct: '.mod-tool-website',
    RTProduct: '.mod-tool-reservation',
    WLProduct: '.mod-tool-ubicus'
  },
  salesFlowPage: {
    product: '(//div[@class="input-holder checkbox"]/label/span)[product]',
    orderButton: '//input[@type="submit"]',
    salesId: '#sales-id',
    salesPassword: '#password',
    salesChannel: '#salesChannel',
    submitButton: '.submit.btn-submit'
  },
  shopPage: {
    noMetroCard: '//input[@id="checkout-metroCardUsage-NO_CARD"]/..',
    submitButton: '//button[@type="submit"]',
    establishmentName: '#addEstablishment-establishmentBasic-name',
    establishmentType: '#addEstablishment-establishmentBasic-type',
    establishmentCountry: '#addEstablishment-establishmentBasic-country',
    companyName: '#addEstablishment-companyDetails-name',
    companyStreet: '#checkout-companyAddressStreet',
    companyPostalCode: '#checkout-companyAddressZipCode',
    companyCity: '#checkout-companyAddressCity',
    vatConfirmButton: "swal2-confirm",
    establishmentDetailsName: '.establishmentDetailsName',
    estAddressSameAsCompany: '.checkbox-control',
    establishmentStreet: '#addEstablishment-establishmentDetails-address-street',
    establishmentPostalCode: '#addEstablishment-establishmentDetails-address-zipCode',
    establishmentCity: '#addEstablishment-establishmentDetails-address-city',
    existingEstName: '#checkout-restaurantName',
    existingEstStreet: '#checkout-customerAddressStreet',
    existingEstPostalCode: '#checkout-customerAddressZipCode',
    existingEstCity: '#checkout-customerAddressCity',
    checkOutButton: '.btn.btn-dish-primary.btn-lg',
    acceptTCs: '.checkbox-control',
    getStartedLink: '//a[@target="_blank"]'
  }
};

module.exports = {
  _init() {
    I = actor();
  },
  DISHPages,
  //Functions
  getCountryCode(country) {
    const dish_countries = ['Germany', 'Italy', 'France', 'Croatia', 'Austria', 'Belgium', 'Czech Republic', 'Hungary', 'Portugal', 'Spain', 'Turkey', 'Ukraine', 'Poland', 'Netherlands', 'Romania'];
    const dish_codes = ['DE', 'IT', 'FR', 'HR', 'AT', 'BE', 'CZ', 'HU', 'PT', 'ES', 'TR', 'UA', 'PL', 'NL', 'RO'];
    return dish_codes[dish_countries.indexOf(country)];
  },
  getCategory(category) {
    const test_data_categories = ['bakery', 'bar', 'bistro', 'butcher', 'cafe', 'canteen', 'catering', 'confectionery', 'cookingSchool', 'creperie', 'diner', 'foodtruck', 'heuriger', 'hotel', 'kiosk', 'nightclub', 'restaurant', 'shishabar'];
    const dish_categories = ['BAKERY', 'BAR', 'BISTRO', 'BUTCHER', 'CAFE', 'CANTEEN', 'CATERING', 'CONFECTIONERY', 'COOKING_SCHOOL', 'CREPERIE', 'DINER', 'FOODTRUCK', 'HEURIGER', 'HOTEL', 'KIOSK', 'NIGHTCLUB', 'RESTAURANT', 'SHISHA_BAR'];
    return dish_categories[test_data_categories.indexOf(category)];
  },
  getValidVATNumber(country) {
    const dish_countries = ['Germany', 'Italy', 'France', 'Croatia', 'Austria', 'Belgium', 'Czech Republic', 'Hungary', 'Portugal', 'Spain', 'Turkey', 'Ukraine', 'Poland', 'Netherlands', 'Romania'];
    const vat_numbers = ['815768910', '12934530150', '40303265045', '01038689798', 'U13585627', '0428759497', '25123891', '12892312', '500258554', 'B80172737', '5522833679', '5522833679', '5222865105', '004495445B01', '12'];
    return vat_numbers[dish_countries.indexOf(country)];
  },
  getInValidVATNumber(country) {
    const dish_countries = ['Germany', 'Italy', 'France', 'Croatia', 'Austria', 'Belgium', 'Czech Republic', 'Hungary', 'Portugal', 'Spain', 'Turkey', 'Ukraine', 'Poland', 'Netherlands', 'Romania'];
    const vat_numbers = ['81576891', '1293453015', '4030326504', '0103868979', 'U1358562', '04287594', '2512389', '1289231', '50025855', 'B8017273', '5522833', '552283', '522286510', '004495445B', '1'];
    return vat_numbers[dish_countries.indexOf(country)];
  },
  signup(w) {
    I.waitForVisible(this.DISHPages.homePage.signUpButton);
    I.click(this.DISHPages.homePage.signUpButton);
    I.wait(2);
    I.waitForVisible(this.DISHPages.signUpPage.firstName);
    //First step
    I.fillField(this.DISHPages.signUpPage.firstName, w.user.firstName);
    I.fillField(this.DISHPages.signUpPage.lastName, w.user.lastName);
    I.selectOption(this.DISHPages.signUpPage.countryCode, '+7');
    I.fillField(this.DISHPages.signUpPage.phoneNumber, '22222222222');
    I.click(this.DISHPages.signUpPage.acceptTCs);
    I.click(this.DISHPages.signUpPage.verifyPhoneNumber);
    //Verification code
    I.waitForVisible(this.DISHPages.signUpPage.verificationCode);
    I.fillField(this.DISHPages.signUpPage.verificationCode, '0000');
    I.click(this.DISHPages.signUpPage.nextButton);
    //Email and country
    I.waitForVisible(this.DISHPages.signUpPage.userEmail);
    I.fillField(this.DISHPages.signUpPage.userEmail, w.user.username);
    I.click(this.DISHPages.signUpPage.nextButton);
    //I.click('.submit.btn-submit');
    //Set Password
    I.waitForVisible(this.DISHPages.signUpPage.userPassword);
    I.fillField(this.DISHPages.signUpPage.userPassword, w.user.password);
    I.fillField(this.DISHPages.signUpPage.userPasswordConfirmation, w.user.password);
    I.click(this.DISHPages.signUpPage.nextButton);
    //Work status
    I.waitForVisible(this.DISHPages.signUpPage.roleBoth);
    I.click(this.DISHPages.signUpPage.roleBoth);
    I.click(this.DISHPages.signUpPage.nextButton);
  },
  login(u) {
    I.waitForVisible(this.DISHPages.homePage.loginButton);
    I.click(this.DISHPages.homePage.loginButton);
    //Login via email
    I.waitForVisible(this.DISHPages.loginPage.emailTab);
    I.click(this.DISHPages.loginPage.emailTab);
    I.wait(1);
    I.fillField(this.DISHPages.loginPage.username, u.username);
    I.fillField(this.DISHPages.loginPage.password, u.password);
    I.click(this.DISHPages.loginPage.loginButton);
    I.waitForVisible(this.DISHPages.homePage.profileIcon);
    //I.waitForVisible('//li[@class="logout"]/a');
  },
  logout() {
    I.waitForVisible(this.DISHPages.homePage.profileIcon);
    I.click(this.DISHPages.homePage.profileIcon);
    I.waitForVisible(this.DISHPages.profilePage.firstName);
    I.waitForVisible(this.DISHPages.profilePage.logOutButton);
    I.click(this.DISHPages.profilePage.logOutButton);
    I.waitForVisible(this.DISHPages.homePage.loginButton);
  },
  changeLang(l) {
    I.click('.languages.has-dropdown');
    I.click(l);
  },
  visibleClick(e) {
    I.waitForVisible(e);
    I.click(e);
  },
  clickEveryXpath(x, num) {
    I.say(num);
    for (var i = 1; i <= num; i++) {
      I.click('(' + x + ')[' + i + ']');
      I.wait(1);
    };
  },
  sendValidVAT(country) {
    I.waitForVisible('//input[@name="companyDetailsForm.vatNumber"]');
    I.fillField('//input[@name="companyDetailsForm.vatNumber"]', this.getValidVATNumber(country));
  },
  sendInValidVAT(country) {
    I.waitForVisible('//input[@name="companyDetailsForm.vatNumber"]');
    I.fillField('//input[@name="companyDetailsForm.vatNumber"]', this.getInValidVATNumber(country));
  },
  purchaseProduct(details, name, product, exist = 0, sales = 0, wait = 0) {
    //exist: 0 - no establishment before, newly added
    //exist: 1 - one establishment
    //exist: 2 - ignore previous one, add a new one
    if (sales == 0) {
      I.waitForVisible(this.DISHPages.homePage.tools);
      I.click(this.DISHPages.homePage.tools);
      I.waitForVisible(name);
      I.click(name);
    } else {
      //1:WB premium, 2:RES premium, 3:Res basic, 4:Web listing premium, 5:Web listing basic
      I.waitForVisible(this.DISHPages.salesFlowPage.product.replace('product', product));
      I.click(this.DISHPages.salesFlowPage.product.replace('product', product));
    }
    //Choose establishment option
    //Click add new establishment button
    I.waitForElement(this.DISHPages.toolPage.selectEstablishment);
    if (exist == 1) {
      I.selectOption(this.DISHPages.toolPage.selectEstablishment, details.contact.businessName);
    } else if (exist == 2) {
      I.selectOption(this.DISHPages.toolPage.selectEstablishment, 'Create new establishment');
      I.wait(2);
    }
    //Continue
    if (sales == 0) {
      I.waitForVisible(this.DISHPages.toolPage.getProduct.replace('product', product));
      //I.waitForEnabled(this.DISHPages.toolPage.getProduct.replace('product', product));
      I.click(this.DISHPages.toolPage.getProduct.replace('product', product)); //1:premium, 2:basic
    } else {
      I.click(this.DISHPages.salesFlowPage.orderButton);
    }
    I.waitForVisible(this.DISHPages.shopPage.noMetroCard);
    I.click(this.DISHPages.shopPage.noMetroCard);
    I.wait(1); //Wait for the Submit button to move
    I.click(this.DISHPages.shopPage.submitButton);
    //Fill in details
    if (exist == 0 || exist == 2) {
      //Enter establishment information
      I.waitForVisible(this.DISHPages.shopPage.establishmentName);
      I.fillField(this.DISHPages.shopPage.establishmentName, details.contact.businessName);
      I.selectOption(this.DISHPages.shopPage.establishmentType, this.getCategory(details.category));
      I.selectOption(this.DISHPages.shopPage.establishmentCountry, details.country);
      I.click(this.DISHPages.shopPage.submitButton);
      //Enter company details
      I.waitForVisible(this.DISHPages.shopPage.companyName);
      I.fillField(this.DISHPages.shopPage.companyName, details.company.businessName);
      I.fillField(this.DISHPages.shopPage.companyStreet, details.company.streetName + ' ' + details.company.streetNumber);
      I.fillField(this.DISHPages.shopPage.companyPostalCode, details.company.postalCode);
      I.fillField(this.DISHPages.shopPage.companyCity, details.company.city);
      I.click(this.DISHPages.shopPage.submitButton);
      I.wait(2);
      I.executeScript(function(c) {
        let ele = document.getElementsByClassName(c);
        if (ele.length > 0) {
          ele[0].click();
        }
      }, this.DISHPages.shopPage.vatConfirmButton);
      //Enter establishment details
      I.waitForVisible(this.DISHPages.shopPage.establishmentDetailsName);
      I.see(details.contact.businessName, this.DISHPages.shopPage.establishmentDetailsName);
      I.click(this.DISHPages.shopPage.estAddressSameAsCompany);
      I.fillField(this.DISHPages.shopPage.establishmentStreet, details.contact.streetName + ' ' + details.contact.streetNumber);
      I.fillField(this.DISHPages.shopPage.establishmentPostalCode, details.contact.postalCode);
      I.fillField(this.DISHPages.shopPage.establishmentCity, details.contact.city);
    } else if (exist == 1) {
      I.waitForVisible(this.DISHPages.shopPage.existingEstName);
      I.seeInField(this.DISHPages.shopPage.existingEstName, details.contact.businessName);
      I.seeInField(this.DISHPages.shopPage.existingEstStreet, details.contact.streetName + ' ' + details.contact.streetNumber);
      I.seeInField(this.DISHPages.shopPage.existingEstPostalCode, details.contact.postalCode);
      I.seeInField(this.DISHPages.shopPage.existingEstCity, details.contact.city);
      I.click('Mr.');
    };
    I.click(this.DISHPages.shopPage.submitButton);
    if (wait != 0) {
      I.wait(wait);
    }
    I.waitForVisible(this.DISHPages.shopPage.checkOutButton);
    I.executeScript(function(c) {
      let ele = document.getElementsByClassName(c);
      if (ele.length > 0) {
        ele[0].click();
      }
    }, this.DISHPages.shopPage.vatConfirmButton);
    I.waitForVisible(this.DISHPages.shopPage.acceptTCs);
    I.click(this.DISHPages.shopPage.acceptTCs);
    I.click(this.DISHPages.shopPage.checkOutButton);
    //Not premium web listing, then OK
    if (!((name == ".mod-tool-ubicus" || name == "Advanced Bundle") && product == 1)) {
      I.waitForVisible(this.DISHPages.shopPage.getStartedLink);
      I.click(this.DISHPages.shopPage.getStartedLink);
    }
  },
  saleslogin() {
    I.waitForVisible(this.DISHPages.salesFlowPage.salesId);
    I.fillField(this.DISHPages.salesFlowPage.salesId, 'autnew');
    I.fillField(this.DISHPages.salesFlowPage.salesPassword, 'HoReCa_17');
    let channels = ['MCC Salesforce', 'Instore Promotion', 'MCC External Sales', 'MCC Call Center'];
    I.selectOption(this.DISHPages.salesFlowPage.salesChannel, channels[Math.floor(Math.random() * channels.length)]);
    I.click(this.DISHPages.salesFlowPage.submitButton);
    I.waitForText(': autnew');
  },
  async getDasUsrData() {
    I.waitForVisible(this.DISHPages.profilePage.firstName);
    let salutation = await I.grabValueFrom(this.DISHPages.profilePage.salutation);
    let firstName = await I.grabValueFrom(this.DISHPages.profilePage.firstName);
    let lastName = await I.grabValueFrom(this.DISHPages.profilePage.lastName);
    let phone = await I.grabTextFrom(this.DISHPages.profilePage.phone);
    let email = await I.grabValueFrom(this.DISHPages.profilePage.email);
    let result = await {
      "salutation": salutation[0],
      "firstName": firstName[0],
      "lastName": lastName[0],
      "phone": phone[0],
      "email": email[0]
    };
    I.say(result);
    return await result;
  },
  async getDasEstData() {
    I.waitForVisible(this.DISHPages.profilePage.establishmentName);
    let e_name = await I.grabValueFrom(this.DISHPages.profilePage.establishmentName);
    let e_street = await I.grabValueFrom(this.DISHPages.profilePage.establishmentStreet);
    let e_zipCode = await I.grabValueFrom(this.DISHPages.profilePage.establishmentPostalCode);
    let e_city = await I.grabValueFrom(this.DISHPages.profilePage.establishmentCity);
    let e_country = await I.grabValueFrom(this.DISHPages.profilePage.establishmentCountry);

    let c_name = await I.grabValueFrom(this.DISHPages.profilePage.companyName);
    let c_street = await I.grabValueFrom(this.DISHPages.profilePage.companyStreet);
    let c_zipCode = await I.grabValueFrom(this.DISHPages.profilePage.companyPostalCode);
    let c_city = await I.grabValueFrom(this.DISHPages.profilePage.companyCity);
    let c_country = await I.grabValueFrom(this.DISHPages.profilePage.companyCountry);

    let result = await {
      "establishment": {
        "name": e_name[0],
        "street": e_street[0],
        "zipCode": e_zipCode[0],
        "city": e_city[0],
        "country": e_country[0]
      },
      "company": {
        "name": c_name[0],
        "street": c_street[0],
        "zipCode": c_zipCode[0],
        "city": c_city[0],
        "country": c_country[0]
      }
    };
    I.say(result);
    return await result;
  },
  changeEstablishment(w, u) {
    I.waitForVisible(this.DISHPages.profilePage.establishmentName);
    I.fillField(this.DISHPages.profilePage.establishmentName, w.contact.businessName);
    I.fillField(this.DISHPages.profilePage.establishmentStreet, w.contact.streetName + ' ' + w.contact.streetNumber);
    I.fillField(this.DISHPages.profilePage.establishmentPostalCode, w.contact.postalCode);
    I.fillField(this.DISHPages.profilePage.establishmentCity, w.contact.city);
    I.click(this.DISHPages.profilePage.submitButton);
    I.waitForVisible(this.DISHPages.profilePage.successMessage);
  },
  changeUser(w, u) {
    I.waitForVisible(this.DISHPages.profilePage.firstName);
    I.click(u.salutation);
    I.fillField(this.DISHPages.profilePage.firstName, u.firstName);
    I.fillField(this.DISHPages.profilePage.lastName, u.lastName);
    I.click(this.DISHPages.profilePage.submitButton);
    I.waitForVisible(this.DISHPages.profilePage.successMessage);
    I.fillField(this.DISHPages.profilePage.newEmail, u.username);
    I.fillField(this.DISHPages.profilePage.repeatNewEmail, u.username);
    I.fillField(this.DISHPages.profilePage.password, u.password);
    I.click(this.DISHPages.profilePage.submitButton2);
    I.waitForVisible(this.DISHPages.profilePage.successMessage);
  },
  deleteUser(p) {
    I.waitForVisible(this.DISHPages.homePage.profileIcon);
    I.click(this.DISHPages.homePage.profileIcon);
    I.waitForVisible(this.DISHPages.profilePage.deleteAccount);
    I.click(this.DISHPages.profilePage.deleteAccount);
    I.waitForVisible(this.DISHPages.profilePage.deleteText);
    I.fillField(this.DISHPages.profilePage.deleteText, "notdelete");
    I.click(this.DISHPages.profilePage.deleteConfirm);
    I.wait(3);
    I.waitForDetached(this.DISHPages.profilePage.hiddenDeleteText);
    I.clearField(this.DISHPages.profilePage.deleteText);
    I.fillField(this.DISHPages.profilePage.deleteText, "delete");
    I.click(this.DISHPages.profilePage.deleteConfirm);
    I.waitForVisible(this.DISHPages.profilePage.password);
    I.fillField(this.DISHPages.profilePage.password, p);
    //I.fillField('#password-confirmation', p);
    I.click(this.DISHPages.profilePage.submitButton);
    I.waitForVisible(this.DISHPages.profilePage.successMessage);
  },
  linkestablishment(w, exist = 0) {
    I.waitForVisible(this.DISHPages.homePage.profileIcon);
    I.click(this.DISHPages.homePage.profileIcon);
    I.waitForVisible(this.DISHPages.profilePage.addEstablishment);
    I.click(this.DISHPages.profilePage.addEstablishment);
    I.waitForVisible(this.DISHPages.addEstablishmentPage.establishmentName);
    I.fillField(this.DISHPages.addEstablishmentPage.establishmentName, w.contact.businessName);
    I.waitForElement(this.DISHPages.addEstablishmentPage.establishmentType);
    I.selectOption(this.DISHPages.addEstablishmentPage.establishmentType, w.category);
    if (exist == 0) {
      I.selectOption(this.DISHPages.addEstablishmentPage.establishmentCountryCode, this.getCountryCode(w.country));
    }
    I.click(this.DISHPages.addEstablishmentPage.nextButton);
    I.waitForVisible(this.DISHPages.addEstablishmentPage.companyName);
    I.fillField(this.DISHPages.addEstablishmentPage.companyName, w.company.businessName);
    I.fillField(this.DISHPages.addEstablishmentPage.companyStreet, w.company.streetName + ' ' + w.company.streetNumber);
    I.fillField(this.DISHPages.addEstablishmentPage.companyPostalCode, w.company.postalCode);
    I.fillField(this.DISHPages.addEstablishmentPage.companyCity, w.company.city);
    I.click(this.DISHPages.addEstablishmentPage.nextButton);
    //Establishment Details
    I.waitForElement(this.DISHPages.addEstablishmentPage.estAddressSameAsCompany);
    I.executeScript(function(xpath) {
      let ele = document.evaluate(xpath,
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
      if (ele) {
        ele.click();
      }
    }, this.DISHPages.addEstablishmentPage.estAddressSameAsCompany);
    I.see(w.contact.businessName, this.DISHPages.addEstablishmentPage.detailsEstablishmentName);
    I.fillField(this.DISHPages.addEstablishmentPage.establishmentStreet, w.contact.streetName + ' ' + w.contact.streetNumber);
    I.fillField(this.DISHPages.addEstablishmentPage.establishmentPostalCode, w.contact.postalCode);
    I.fillField(this.DISHPages.addEstablishmentPage.establishmentCity, w.contact.city);
    I.click(this.DISHPages.addEstablishmentPage.nextButton);
    I.waitForVisible(this.DISHPages.addEstablishmentPage.successIcon);
  },
  registerWL(details, NewHydra, add_check = 0) {
    if (!([3].includes(add_check)) && details.country != 'Russia') {
      //Accept T&Cs
      I.waitForVisible('a.cc-btn.cc-allow');
      I.click('a.cc-btn.cc-allow');
    };
    I.say('Clicked accept cookies and looking for agree terms and conditions');
    I.executeScript(function() {
      let pageTitle = '//h2[contains(.,"Terms of use")]';
      let page = document.evaluate(pageTitle,
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
      if (page) {
        let xpath = '//div[@class="mat-checkbox-inner-container"]';
        let ele = document.evaluate(xpath,
          document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
          null).singleNodeValue;
        if (ele) {
          ele.click();
          xpath = '//button[contains(.,"Confirm")]';
          ele = document.evaluate(xpath,
            document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
            null).singleNodeValue;
          ele.click();
        }
      }
    });
    I.waitForText('Your Restaurant');
    //Register this is copied from wb, do not know how to adapt for wl
    if (!([2, 3].includes(add_check))) {
      if (details.country == 'Russia') {
        I.waitForText('Credentials');
        I.selectOption('#wizard-registration-salutation', 'Mr.');
        I.fillField('#wizard-registration-firstName', details.user.firstName);
        I.fillField('#wizard-registration-lastName', details.user.lastName);
        I.fillField('#wizard-registration-email', details.user.username);
        I.fillField('#wizard-registration-password', details.user.password);
        I.fillField('#wizard-registration-repassword', details.user.password);
        I.click('.checkbox-control');
        I.click('.btn.btn-primary.btn-continue');
        //Login changed after SSO in place
        I.waitForText('Forgot Password');
        I.fillField('#username', details.user.username);
        I.fillField('#password', details.user.password);
        I.click('#kc-login');
      };
    };
    //I land in the first onboarding screen, select country and insert phone number
    I.fillField('//input[@formcontrolname="phone"]', details.contact.phone);
    I.click('Next');
    //second onboarding screen
    I.waitForText('Contact Information');
    //I.fillField('//input[@formcontrolname="email"]', details.user.username);
    //I.waitForVisible('//input[@formcontrolname="website"]', 'google.com');
    //I.fillField('//input[@formcontrolname="website"]', 'google.com');
    //I.click('#mat-input-7');   <--- element not found error
    I.waitForVisible('//div[@class="row buttons d-flex justify-content-between pad"]');
    I.click('//div[@class="row buttons d-flex justify-content-between pad"]');
    I.waitForVisible('#cdk-step-content-0-1 > div.container.ng-star-inserted > form > div.row.buttons.d-flex.justify-content-between.pad > button:nth-child(2)');
    I.click('#cdk-step-content-0-1 > div.container.ng-star-inserted > form > div.row.buttons.d-flex.justify-content-between.pad > button:nth-child(2)');
    // Should be on 3rd onboarding screen
    I.waitForText('Your offer');
    I.click('Pizza');
    I.click('//mat-panel-title[contains(.,"Services")]');
    I.waitForText('Accessible');
    I.click('Accessible');
    I.click('//mat-panel-title[contains(.,"Payment methods")]');
    I.waitForText('Amex');
    I.click('Amex');
    I.waitForEnabled('(//button[@type="submit"])[2]')
    I.click('(//button[@type="submit"])[2]');
    // Final onboarding screen
    I.waitForVisible('(//button[@type="submit"])[3]')
    //I.click('Register');
    I.wait(5);
    I.click('//button[.="Register"]');
    // Dashboard view
    I.waitForText(details.contact.businessName);
  },
  openWL() {
    I.waitForText('Web Listing');
    I.click('Web Listing');
    I.switchToNextTab();
    I.waitForText('Profile Completeness');
  },
  orderPayment(w, method = 'CC') {
    if (method == 'CC') {
      I.waitForText('Credit Card');
      I.click('Credit Card');
      I.waitForVisible('#wirecard-integrated-payment-page-frame');
      I.switchTo('#wirecard-integrated-payment-page-frame');
      I.waitForVisible('#pp-cc-first-name');
      I.fillField('#pp-cc-first-name', w.user.firstName);
      I.fillField('#pp-cc-last-name', w.user.lastName);
      I.fillField('#pp-cc-account-number', '4012000300001003');
      I.fillField('#pp-cc-cvv', '003');
      I.fillField('#pp-cc-expiration-date', '01');
      I.appendField('#pp-cc-expiration-date', '23');
    } else {
      I.waitForText('SEPA');
      I.click('SEPA');
      I.waitForVisible('#wirecard-integrated-payment-page-frame');
      I.switchTo('#wirecard-integrated-payment-page-frame');
      I.waitForVisible('#pp-sepa-first-name');
      I.fillField('#pp-sepa-first-name', w.user.firstName);
      I.fillField('#pp-sepa-last-name', w.user.lastName);
      I.fillField('#pp-sepa-iban', 'DE02500105170137075030');
      I.scrollIntoView('#license-checkbox')
      I.checkOption('#license-checkbox');
    }
    I.switchTo();
    I.waitForText('Pay Now');
    I.click('Pay Now');
    I.waitForText('Navigate back');
    I.click('Navigate back');
  }
}

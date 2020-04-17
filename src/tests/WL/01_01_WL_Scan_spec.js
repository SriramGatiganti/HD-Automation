const {
    wizard,
    url,
    res_url
  } = require('../../function/newHydra/wizard_data_provider_new');
  let user = wizard.user;
  let d_url = url.replace('website.', 'www.');
  
  
  Feature('WL Scanner Page @wl_scan_est');
  Scenario('Scan establishment',
    function(I, DISH, NewHydra) {
      NewHydra.landing(d_url + DISH.getCountryCode(wizard.country));
      DISH.login(user);
      I.click('//*[@id="shared-header-menu-holder"]/div/ul[1]/li[2]')
      I.waitForText('Web Listing')
      I.click('//*[@id="tools"]/div[3]/div')
      I.seeInField('input#establishment-name', wizard.contact.businessName);
      I.seeInField('input#address', wizard.contact.streetName + ' ' + wizard.contact.streetNumber)
      I.seeInField('input#city', wizard.contact.city)
      I.seeInField('input#postcode', wizard.contact.postalCode)
      I.seeInField('input#phone-national-number', '+722222222222')
      I.click('button#scanner-submit.submit.btn-submit')
      I.switchToNextTab();
      I.waitForText('Google Reviews')
      I.see('Bing')
      I.see('Facebook')
      I.see('Yelp')
      I.closeCurrentTab();
      DISH.logout();
    })
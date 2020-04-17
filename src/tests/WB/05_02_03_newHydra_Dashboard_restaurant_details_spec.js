const random = require('../../function/public/random');
const {
  wizard,
  url,
  res_url
} = require('../../function/newHydra/wizard_data_provider_new');
let browser = process.profile.split(':')[1];

Feature('New Hydra Dashboard @newHydra_dashboard');
//Feature('New Hydra Dashboard @debug');

Scenario('Change Restaurant Details',
  async (I, NewHydra) => {
    let restaurant_details = {
      businessName: 'x8EEn ' + random.string(8),
      dialCode: '+49',
      phone: "1633735500",
      streetName: random.string(10),
      email: random.email(),
      streetNumber: random.string(8),
      postalCode: random.number(5),
      city: random.city(wizard.country.toLowerCase())
    };
    //Not for Edge
    if (browser != 'edge') {
      NewHydra.landing(url + 'logout');
      NewHydra.login(wizard.user);
      NewHydra.openTab('establishment');
      await NewHydra.changeRestaurantDetails(restaurant_details);
      I.waitForText('Your changes have not been saved. Please correct the errors below.')
      NewHydra.logout();
    }
  });

Scenario('Add Social Networks',
  (I, NewHydra) => {
    NewHydra.landing(url + 'logout');
    NewHydra.login(wizard.user);

    let socialNetwork_details = {
      type: "Instagram",
      content: "https://www.instagram.com/hd"
    };
    NewHydra.openTab('establishment');
    NewHydra.changeSocialNetwork(socialNetwork_details);
    NewHydra.logout();

    //wizard.subdomain = subdomain;
    NewHydra.landingBusinessPage(wizard, "");
    I.seeElement('//a[@href="' + socialNetwork_details.content + '"]');
  });

Scenario('Remove SocialNetwork Link',
  (I, NewHydra) => {
    NewHydra.landing(url + 'logout');
    NewHydra.login(wizard.user);

    let socialNetwork_details = {
      type: "Instagram",
      content: "https://www.instagram.com/hd"
    };

    NewHydra.openTab('establishment');
    I.wait(2);
    I.waitForVisible('.btn.btn-danger.remove');
    I.click('.btn.btn-danger.remove');
    I.click('(//button[@type="submit"])[2]');
    I.waitForVisible('.alert.alert-success.-ajax-form-submit-msg');
    NewHydra.logout();

    //wizard.subdomain = subdomain;
    NewHydra.landingBusinessPage(wizard, "");
    I.dontSeeElement('//a[@href="' + socialNetwork_details.content + '"]');
  });

Scenario('Check hiding contact phone or Email',
  (I, NewHydra) => {
    NewHydra.landing(url + 'logout');
    NewHydra.login(wizard.user);
    NewHydra.openTab('establishment');
    I.wait(2);
    let xpath = '//span[@class="checkbox-control"]';
    //Hide name
    I.waitForVisible('(' + xpath + ')[1]');
    I.click('(' + xpath + ')[1]');
    I.click('(//button[@type="submit"])[1]');
    I.waitForText('Your changes have been saved.');
    NewHydra.landingBusinessPage(wizard, "");
    I.dontSeeElement('//section/div/h2');
    //Hide phone
    NewHydra.landing(url);
    NewHydra.openTab('establishment');
    I.waitForVisible('(' + xpath + ')[2]');
    I.click('(' + xpath + ')[2]');
    I.click('(//button[@type="submit"])[1]');
    I.waitForText('Your changes have been saved.');
    NewHydra.landingBusinessPage(wizard, "#contact");
    I.dontSeeElement('//div[@class="contact-block"]//i[contains(@class,"icon_phone")]');
    //Hide also Email
    NewHydra.landing(url);
    NewHydra.openTab('establishment');
    I.waitForVisible('(' + xpath + ')[3]');
    I.click('(' + xpath + ')[3]');
    I.click('(//button[@type="submit"])[1]');
    I.waitForText('Your changes have been saved.');
    NewHydra.landingBusinessPage(wizard, "#contact");
    I.dontSeeElement('//div[@class="contact-block"]//i[contains(@class,"icon_mail")]');
    //Get phone and Email back
    NewHydra.landing(url);
    NewHydra.openTab('establishment');
    I.waitForVisible('(' + xpath + ')[3]');
    I.click('(' + xpath + ')[1]');
    I.click('(' + xpath + ')[2]');
    I.click('(' + xpath + ')[3]');
    I.click('(//button[@type="submit"])[1]');
    I.waitForText('Your changes have been saved.');
    NewHydra.landingBusinessPage(wizard, "#contact");
    I.seeElement('//section/div/h2');
    I.seeElement('.icon_phone');
    I.seeElement('.icon_mail');

    //logout
    NewHydra.landing(url);
    NewHydra.logout();
  });

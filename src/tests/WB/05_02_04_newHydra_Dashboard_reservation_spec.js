const random = require('../../function/public/random');
const {
  wizard,
  url,
  res_url
} = require('../../function/newHydra/wizard_data_provider_new');

Feature('New Hydra Dashboard @newHydra_dashboard');
//Feature('New Hydra Dashboard @debug');

Scenario('Activate Email Reservation',
  (I, NewHydra) => {
    NewHydra.landing(url + 'logout');
    NewHydra.login(wizard.user);
    NewHydra.openTab('reservation');
    I.waitForVisible(NewHydra.WBPages.dashboardPages.emailReservationInput);
    I.fillField(NewHydra.WBPages.dashboardPages.emailReservationInput, 'testreser0@gmail.com');
    I.click(NewHydra.WBPages.dashboardPages.emailOption);
    I.click(NewHydra.WBPages.dashboardPages.saveButton + '[1]');
    I.waitForVisible(NewHydra.WBPages.dashboardPages.successMessage);
    NewHydra.logout();

    NewHydra.landingBusinessPage(wizard, "#contact-form");
    I.seeElement(NewHydra.WBPages.website.reservationButton);
    I.seeElement(NewHydra.WBPages.website.reservationForm);
    within(NewHydra.WBPages.website.reservationForm, () => {
      I.fillField(NewHydra.WBPages.website.reservationFormName, 'Test');
      I.fillField(NewHydra.WBPages.website.reservationFormEmail, 'testreser0@gmail.com');
      I.fillField(NewHydra.WBPages.website.reservationFormPhone, '+491633735500');
      I.click(NewHydra.WBPages.website.reservationFormDate);
      I.wait(1);
      I.click(NewHydra.WBPages.website.reservationFormDateChoose);
      I.wait(1);
      I.executeScript(function(xpath) {
        let ele = document.evaluate(xpath,
          document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
          null).singleNodeValue;
        ele.click();
      }, NewHydra.WBPages.website.reservationFormTime);
      I.wait(1);
      I.click(NewHydra.WBPages.website.reservationFormSeat);
      I.wait(1);
      I.pressKey('5');
      I.click(NewHydra.WBPages.website.reservationFormMessage);
      I.wait(1);
      I.pressKey('Hello World');
      I.click(NewHydra.WBPages.website.reservationFormSend);
    });
    I.waitForVisible('strong');
  });

Scenario('Deactivate Email Reservation',
  (I, NewHydra) => {
    NewHydra.landing(url + 'logout');
    NewHydra.login(wizard.user);
    NewHydra.openTab('reservation');
    I.waitForVisible(NewHydra.WBPages.dashboardPages.emailOption);
    I.click(NewHydra.WBPages.dashboardPages.emailOption);
    I.click(NewHydra.WBPages.dashboardPages.saveButton + '[1]');
    I.waitForVisible(NewHydra.WBPages.dashboardPages.successMessage);
    NewHydra.logout();

    NewHydra.landingBusinessPage(wizard, "#contact-form");
    I.dontSeeElement(NewHydra.WBPages.website.reservationButton);
  });

Scenario('Activate Phone Reservation',
  (I, NewHydra) => {
    NewHydra.landing(url + 'logout');
    NewHydra.login(wizard.user);
    NewHydra.openTab('reservation');
    I.waitForVisible(NewHydra.WBPages.dashboardPages.phoneOption);
    I.click(NewHydra.WBPages.dashboardPages.phoneOption);
    I.selectOption(NewHydra.WBPages.dashboardPages.phoneReservationPrefix, '+49');
    I.fillField(NewHydra.WBPages.dashboardPages.phoneReservationNumber, '15200000000');
    I.click(NewHydra.WBPages.dashboardPages.saveButton + '[2]');
    I.waitForVisible(NewHydra.WBPages.dashboardPages.successMessage);
    NewHydra.logout();

    NewHydra.landingBusinessPage(wizard, "#reservation");
    I.seeElement(NewHydra.WBPages.website.reservationButton);
    I.see('+4915200000000');
  });

Scenario('Deactivate Phone Reservation',
  (I, NewHydra) => {
    NewHydra.landing(url + 'logout');
    NewHydra.login(wizard.user);
    NewHydra.openTab('reservation');
    I.waitForVisible(NewHydra.WBPages.dashboardPages.phoneOption);
    I.click(NewHydra.WBPages.dashboardPages.phoneOption);
    I.click(NewHydra.WBPages.dashboardPages.saveButton + '[2]');
    I.waitForVisible(NewHydra.WBPages.dashboardPages.successMessage);
    NewHydra.logout();

    NewHydra.landingBusinessPage(wizard, "#reservation");
    I.dontSeeElement(NewHydra.WBPages.website.reservationButton);
    I.dontSee('+4915200000000');
  });

const random = require('../../function/public/random');
const {
  wizard,
  url,
  res_url
} = require('../../function/newHydra/wizard_data_provider_new');

Feature('Dashboard - Turn on Reservation @e2e_reservation');
//Feature('Dashboard - Turn on Reservation @debug');

Scenario('Activate HD Reservation',
  function(I, NewHydra, ResFunc) {
    //After logout DISH, website builder not log out
    I.amOnPage(url + 'logout');
    NewHydra.landing(url);
    NewHydra.login(wizard.user);
    NewHydra.openTab('reservation');
    NewHydra.turnOnHDReservation();
    //Check the link to open reservation tool
    I.waitForVisible(NewHydra.WBPages.dashboardPages.reservationToolLink);
    I.click(NewHydra.WBPages.dashboardPages.reservationToolLink);
    I.switchToNextTab();
    I.waitForVisible(ResFunc.RTPages.dashboardPages.reservationsButton);
    I.closeCurrentTab();
    NewHydra.logout();
    //Check on website
    NewHydra.landingBusinessPage(wizard, '#reservation');
    I.waitForVisible(NewHydra.WBPages.website.reservationToolBox);
  });

Scenario('Remove today reservation hours',
  function(I, NewHydra, ResFunc) {
    I.amOnPage(res_url + 'logout');
    I.wait(1);
    ResFunc.login(wizard.user);
    ResFunc.SetReservationHours();
    ResFunc.RemoveTodayOpeningHours();
    ResFunc.logout();
    NewHydra.landingBusinessPage(wizard, '');
    NewHydra.NavigateToFrame();
    ResFunc.TodayNotAvailable();
  });

Scenario('Add today reservation hours',
  function(I, NewHydra, ResFunc) {
    ResFunc.login(wizard.user);
    ResFunc.SetReservationHours();
    ResFunc.AddTodayOpeningHours();
    ResFunc.logout();
    NewHydra.landingBusinessPage(wizard, '');
    NewHydra.NavigateToFrame();
    ResFunc.TodayAvailable();
  });

Scenario('Add today as exception',
  function(I, NewHydra, ResFunc) {
    ResFunc.login(wizard.user);
    ResFunc.SetReservationHours();
    ResFunc.AddTodayasException();
    ResFunc.logout();
    NewHydra.landingBusinessPage(wizard, '');
    NewHydra.NavigateToFrame();
    ResFunc.TodayNotAvailable();
  });

Scenario('Remove today as exception',
  function(I, NewHydra, ResFunc) {
    ResFunc.login(wizard.user);
    ResFunc.SetReservationHours();
    ResFunc.RemoveTodayasException();
    ResFunc.logout();
    NewHydra.landingBusinessPage(wizard, '');
    NewHydra.NavigateToFrame();
    ResFunc.TodayAvailable();
  });

Scenario('Change reservations settings',
  function(I, ResFunc) {
    const settings = {
      duration: '30 minutes',
      leadtime: '0 minutes',
      autoconfirm: '5 people'
    };
    ResFunc.login(wizard.user);
    ResFunc.setReservationSettings(settings);
    ResFunc.logout();
  });

Scenario('Change reservations seats',
  function(I, ResFunc) {
    let seats = '100';
    ResFunc.login(wizard.user);
    ResFunc.setReservationSeats(seats);
    ResFunc.logout();
  });

Scenario('Change password',
  function(I, ResFunc, NewHydra) {
    ResFunc.login(wizard.user);
    I.amOnPage(res_url + 'settings/account');
    I.waitForVisible(ResFunc.RTPages.dashboardPages.changePasswordButton);
    I.click(ResFunc.RTPages.dashboardPages.changePasswordButton);
    NewHydra.changePassword(wizard.user);
    ResFunc.logout();
  });

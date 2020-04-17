const random = require('../../function/public/random');
const {
  wizard,
  url,
  res_url
} = require('../../function/newHydra/wizard_data_provider_new');
//wizard.user.r_url = res_url;

Feature('Reservation - Change Settings @reservation_dashboard');
//Feature('Reservation - Change Settings @debug');

Scenario('Remove today reservation hours',
  function(I, NewHydra, ResFunc) {
    I.amOnPage(res_url + 'logout');
    ResFunc.login(wizard.user);
    ResFunc.SetReservationHours();
    ResFunc.RemoveTodayOpeningHours();
    ResFunc.logout();
    NewHydra.landing(wizard.r_url);
    ResFunc.TodayNotAvailable();
  });

Scenario('Add today reservation hours',
  function(I, NewHydra, ResFunc) {
    ResFunc.login(wizard.user);
    ResFunc.SetReservationHours();
    ResFunc.AddTodayOpeningHours();
    ResFunc.logout();
    NewHydra.landing(wizard.r_url);
    ResFunc.TodayAvailable();
  });

Scenario('Add today as exception',
  function(I, NewHydra, ResFunc) {
    ResFunc.login(wizard.user);
    ResFunc.SetReservationHours();
    ResFunc.AddTodayasException();
    ResFunc.logout();
    NewHydra.landing(wizard.r_url);
    ResFunc.TodayNotAvailable();
  });

Scenario('Remove today as exception',
  function(I, NewHydra, ResFunc) {
    ResFunc.login(wizard.user);
    ResFunc.SetReservationHours();
    ResFunc.RemoveTodayasException();
    ResFunc.logout();
    NewHydra.landing(wizard.r_url);
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
    NewHydra.changePassword(user);
    ResFunc.logout();
  });

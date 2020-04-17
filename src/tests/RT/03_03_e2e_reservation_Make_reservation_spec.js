const random = require('../../function/public/random');
let user = require('../../function/data/user').user;
//let remFunc = require('../../function/public/activate_and_delete');
const {
  wizard,
  url,
  res_url
} = require('../../function/newHydra/wizard_data_provider_new');
user.r_url = res_url;
user.username = wizard.user.username;

const d = new Date();
let h = d.getHours();
let l_h;
let ampm;
let r_h;
if (wizard.country == 'Ukraine' || wizard.country == 'Russia' || wizard.country == 'Turkey' || wizard.country == 'Romania') {
  l_h = h + 2;
} else if (wizard.country == 'Portugal') {
  l_h = h;
} else {
  l_h = h + 1;
};
ampm = l_h >= 12 ? ':30 pm' : ':30 am';
r_h = l_h % 12 == 0 ? 12 : l_h % 12;
let r_hour = ("0" + r_h).slice(-2) + ampm; //Reservation 1 hour later

Feature('Reservation - Make Reservation @e2e_reservation');
//Feature('Reservation - Make Reservation @debug');

Scenario('New auto confirm reservation and cancel',
  async function(I, NewHydra, ResFunc) {
    const reservationDetails = {
      first_name: random.string(4),
      last_name: random.string(4),
      phone: user.phone,
      email: user.email,
      capacity: '2 people',
      slot: r_hour,
      message: 'Test for auto confirm reservation and cancel'
    };

    NewHydra.landingBusinessPage(wizard, '');
    NewHydra.NavigateToFrame();

    let res_code_t = await ResFunc.newReservation(reservationDetails);
    let res_code = await String(res_code_t).substr(String(res_code_t).indexOf('#'), 4).replace('.', '');

    //Check in reservation admin panel
    ResFunc.login(wizard.user);
    ResFunc.viewReservation(res_code, reservationDetails);
    ResFunc.cancelReservation(reservationDetails.last_name + ', ' + reservationDetails.first_name);
    ResFunc.logout();
  });

Scenario('New auto confirm reservation and arrived',
  async function(I, NewHydra, ResFunc) {
    const reservationDetails = {
      first_name: random.string(4),
      last_name: random.string(4),
      phone: user.phone,
      email: user.email,
      capacity: '5 people',
      slot: r_hour,
      message: 'Test for auto confirm reservation and arrived'
    };

    NewHydra.landingBusinessPage(wizard, '');
    NewHydra.NavigateToFrame();

    let res_code_t = await ResFunc.newReservation(reservationDetails);
    let res_code = await String(res_code_t).substr(String(res_code_t).indexOf('#'), 4);

    //Check in reservation admin panel
    ResFunc.login(wizard.user);
    ResFunc.viewReservation(res_code, reservationDetails);
    ResFunc.arriveReservation(reservationDetails.last_name + ', ' + reservationDetails.first_name);
    ResFunc.logout();
  });


Scenario('New manual confirm reservation and reject',
  async function(I, NewHydra, ResFunc) {
    const reservationDetails = {
      first_name: random.string(4),
      last_name: random.string(4),
      phone: user.phone,
      email: user.email,
      capacity: '10 people',
      slot: r_hour,
      message: 'Test for manual confirm reservation and reject'
    };

    NewHydra.landingBusinessPage(wizard, '');
    NewHydra.NavigateToFrame();

    let res_code_t = await ResFunc.newReservation(reservationDetails);
    let res_code = await String(res_code_t).substr(String(res_code_t).indexOf('#'), 4);

    //Check in reservation admin panel
    ResFunc.login(wizard.user);
    ResFunc.viewReservation(res_code, reservationDetails);
    ResFunc.rejectReservation();
    ResFunc.logout();
  });

Scenario('New manual confirm reservation and confirm then cancel',
  async function(I, NewHydra, ResFunc) {
    const reservationDetails = {
      first_name: random.string(4),
      last_name: random.string(4),
      phone: user.phone,
      email: user.email,
      capacity: '10 people',
      slot: r_hour,
      message: 'Test for manual confirm reservation and confirm then cancel'
    };


    NewHydra.landingBusinessPage(wizard, '');
    NewHydra.NavigateToFrame();

    let res_code_t = await ResFunc.newReservation(reservationDetails);
    let res_code = await String(res_code_t).substr(String(res_code_t).indexOf('#'), 4);

    //Check in reservation admin panel
    ResFunc.login(wizard.user);
    ResFunc.viewReservation(res_code, reservationDetails);
    ResFunc.confirmReservation();
    ResFunc.cancelReservation(reservationDetails.last_name + ', ' + reservationDetails.first_name);
    ResFunc.logout();
  });

Scenario('New manual confirm reservation and confirm then arrived',
  async function(I, NewHydra, ResFunc) {
    const reservationDetails = {
      first_name: random.string(4),
      last_name: random.string(4),
      phone: user.phone,
      email: user.email,
      capacity: '10 people',
      slot: r_hour,
      message: 'Test for manual confirm reservation and confirm then arrived'
    };

    NewHydra.landingBusinessPage(wizard, '');
    NewHydra.NavigateToFrame();

    let res_code_t = await ResFunc.newReservation(reservationDetails);
    let res_code = await String(res_code_t).substr(String(res_code_t).indexOf('#'), 4);

    //Check in reservation admin panel
    ResFunc.login(wizard.user);
    ResFunc.viewReservation(res_code, reservationDetails);
    ResFunc.confirmReservation();
    ResFunc.arriveReservation(reservationDetails.last_name + ', ' + reservationDetails.first_name);
    ResFunc.logout();
  });

Scenario('Reservation from dashboard check auto complete',
  function(I, NewHydra, ResFunc) {
    ResFunc.login(wizard.user);
    I.click(ResFunc.RTPages.dashboardPages.addReservation + '[2]');
    I.waitForVisible(ResFunc.RTPages.dashboardPages.addReservationLastName);
    I.fillField(ResFunc.RTPages.dashboardPages.addReservationLastName, 'x8E');
    I.waitForElement(ResFunc.RTPages.dashboardPages.addReservationSuggest);
  });

//Turn off reservation from website builder
Scenario('Deactivate HD Reservation',
  function(I, NewHydra) {
    I.amOnPage(url + 'logout');
    NewHydra.landing(url);
    NewHydra.login(wizard.user);

    NewHydra.openTab('reservation');
    NewHydra.turnOffHDReservation(); //previously turn on, now off
    NewHydra.logout(); //Last step to logout

    NewHydra.landingBusinessPage(wizard, '#reservation');
    I.dontSeeElement(NewHydra.WBPages.website.reservationToolBox);
  });

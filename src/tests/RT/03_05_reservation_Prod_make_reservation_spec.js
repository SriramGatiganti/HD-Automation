const random = require('../../function/public/random');
let user = require('../../function/data/user').user;

const {
  wizard,
  url,
  res_url
} = require('../../function/newHydra/wizard_data_provider_new');

const d = new Date();
let h = d.getHours();
ampm = h >= 11 ? ':30 pm' : ':30 am';
r_h = (h + 1) % 12 == 0 ? 12 : (h + 1) % 12;
var r_hour = ("0" + r_h).slice(-2) + ampm; //Reservation 1 hour later

Feature('Reservation - Make Reservation @checkReservation');

Scenario('Check making reservation from Hydra website',
  async function(I, ResFunc) {
    const reservationDetails = {
      first_name: random.string(4),
      last_name: random.string(4),
      name: last_name + ', ' + first_name,
      phone: user.phone,
      email: user.email,
      capacity: '2 people',
      slot: r_hour,
      message: 'Test for auto confirm reservation and cancel'
    };

    //Testing 1
    //let url = "https://reservation.horeca.digital/widget/public-85398?foregroundColor=&backgroundColor=&linkColor=&errorColor=&primaryButtonForegroundColor=&primaryButtonBackgroundColor=&secondaryButtonForegroundColor=&secondaryButtonBackgroundColor=";
    let url = 'https://reservation.horeca.digital/widget/hydra-1057821' //Testing 2
    I.amOnPage(url);
    //RestaurantPage.openPageAndCloseCookie(user.url);
    //ResFunc.NavigateToFrame();
    let res_code_t = await ResFunc.newReservation(reservationDetails);
    let res_code = String(res_code_t).substr(String(res_code_t).indexOf('#'), 4).replace('.', '');

    //Check in reservation admin panel
    //user.username = "testing.auto.0123@gmail.com"; Testing 1
    user.username = "testreser0@gmail.com";
    ResFunc.login(user);
    ResFunc.viewReservation(res_code, reservationDetails);
    ResFunc.cancelReservation(reservationDetails.name);
  });

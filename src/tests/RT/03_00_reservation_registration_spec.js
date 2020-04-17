const {
  wizard,
  url,
  res_url
} = require('../../function/newHydra/wizard_data_provider_new');
//wizard.user.r_url = res_url;
//Get current date time
const d = new Date();
let h = d.getHours();
ampm = h >= 11 ? ':30 pm' : ':30 am';
r_h = (h + 1) % 12 == 0 ? 12 : (h + 1) % 12;
var r_hour = ("0" + r_h).slice(-2) + ampm; //Reservation 3 hours later

//Create and test new one
Feature('Standalone Reservation Registration @reservationRegister');

Scenario('Standalone Reservation Verification',
  async function(I, NewHydra, ResFunc) {
    I.wait(5);
    I.say(wizard);

    I.amOnPage(res_url + "?userCountry=RU"); //IP override workaround
    NewHydra.landing(res_url + "register");
    ResFunc.newRegistration(wizard);
    //No more email activation after DISH
    //Wait for the activation Email to be sent
    //I.wait(10);
    //Activate
    /*var title = yield I.grabTitle();
    yield remFunc.activate(user.r_url, wizard.r_time, title).then(function(result) {
      //I.say(result);
    }).catch(function() {
      return Promise.reject();
    });

    I.wait(80);*/
    //### Only registration
    ResFunc.login(wizard.user);
    //Get Standalone URL
    ResFunc.checkIntegration();
    wizard.r_url = await I.grabTextFrom("//code[contains(text(),'widget/hydra')]");
    I.say(wizard.r_url);
    //Add opening hours
    ResFunc.SetReservationHours();
    I.waitForVisible('//a[contains(@href,"reservationHours/edit")]');
    I.click('//a[contains(@href,"reservationHours/edit")]');
    I.waitForVisible('.addTimeSetting');
    I.click('.addTimeSetting');
    I.waitForVisible('.weekdays-input.form-control');
    I.selectOption('//select[@class="weekdays-input form-control"]', ["1", "2", "3", "4", "5", "6", "7"]);
    I.fillField('(//div[@class="startingTime"]//input[@data-field="hours"])', '12');
    I.fillField('(//div[@class="startingTime"]//input[@data-field="mins"])', '00');
    I.fillField('(//div[@class="endingTime"]//input[@data-field="hours"])', '12');
    I.fillField('(//div[@class="endingTime"]//input[@data-field="mins"])', '00');
    I.click('//button[@type="submit"]'); //save
    I.waitForText('Changes successfully saved');
    ResFunc.logout();
    /*
    //Make reservation
    //Check new reservation and cancel
    const reservationDetails = {
      first_name: random.string(4),
      last_name: random.string(4),
      phone: user.phone,
      email: user.email,
      capacity: '3 people',
      slot: r_hour,
      message: 'Test for auto confirm reservation and arrive'
    };
    I.amOnPage(w_url);
    let res_code_t = yield ResFunc.newReservation(reservationDetails);
    let res_code = String(res_code_t).substr(String(res_code_t).indexOf('#'), 4).replace('.', '');

    //Check in reservation admin panel, no need to login this time
    I.amOnPage(user.r_url);
    ResFunc.viewReservation(res_code, reservationDetails);
    //ResFunc.cancelReservation();
    ResFunc.arriveReservation();

    //Deletion part for Reservation tool
    ResFunc.checkIntegration();
    let code = yield I.grabTextFrom("//code[contains(text(),'widget/public-')]");
    code = code.split('public-')[1].split('?')[0];
    console.log(code);
    r = remFunc.remove('public', code, user.r_url);
    I.wait(30); //Wait for the function to finish
    I.say(r);
    ResFunc.removeAccount(user);*/
  });

Feature('Standalone Reservation Registration @reservationExistingRegister');

Scenario('Register reservation tool for existing Non DISH website',
  function(I, NewHydra, ResFunc, DISH) {
    I.amOnPage(res_url + "?userCountry=RU"); //IP override workaround
    NewHydra.landing(res_url + "register");
    ResFunc.extRegistration(wizard);
    //For R2.4
    I.waitForVisible('//select[@name="establishmentSaleforceId"]');
    I.selectOption('//select[@name="establishmentSaleforceId"]', wizard.contact.businessName);
    I.wait(2);
    DISH.registerRes(wizard, ResFunc, res_url, 1);
    //ResFunc.checkIntegration();
    ResFunc.logout();
  });

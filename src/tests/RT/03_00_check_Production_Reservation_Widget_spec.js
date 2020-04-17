Feature('Verify Production Reservation @reservationVerify');

Scenario('Verify Reservation Widget',
  (I) => {
    I.amOnPage("https://reservation.horeca.digital/widget/hydra-25738?&amp;eid=hydra-25738");
    I.see("Online reservation");
    I.see("Foodtruck Kathrin");
  });

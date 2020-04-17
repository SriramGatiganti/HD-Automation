const {
  wizard,
  url,
  res_url
} = require('../../function/newHydra/wizard_data_provider_new');
let user = wizard.user;

Feature('New Hydra Dashboard @TestnewHydra_dashboard');

Scenario('Turn on/off foodorder form  and check the options available',
  function(I, NewHydra) {
    NewHydra.landing(url + 'logout');
    NewHydra.login(user);
    NewHydra.openTab('foodOrdering');
    I.waitForVisible(NewHydra.WBPages.dashboardPages.foLabel);
    I.seeElement(NewHydra.WBPages.dashboardPages.foText1);
    I.seeElement(NewHydra.WBPages.dashboardPages.foText2);
    I.seeElement(NewHydra.WBPages.dashboardPages.foText3);
    //Turn on the toggle
    NewHydra.turnOnFoodOrderToggle();
    I.seeElement(NewHydra.WBPages.dashboardPages.foSrvContainer);
    I.seeElement(NewHydra.WBPages.dashboardPages.foPmtContainer);    
    //Turn off the toggle
    NewHydra.turnOffFoodOrderToggle();
    I.dontSeeElement(NewHydra.WBPages.dashboardPages.foSrvContainer);
    I.dontSeeElement(NewHydra.WBPages.dashboardPages.foPmtContainer);
    //Logout New Hydra
    NewHydra.logout();
  });

Scenario('Check and submit Food Order form on Webite',
  function(I, NewHydra) {
    NewHydra.landing(url + 'logout');
    NewHydra.login(user);
    NewHydra.openTab('foodOrdering');
    //Turn on the toggle
    NewHydra.turnOnFoodOrderToggle();
    //Go to website
    NewHydra.landingBusinessPage(wizard, "");
    I.seeElement(NewHydra.WBPages.website.foodorderbtn1);
    //Navigate to food order form on website
    NewHydra.navigateTofoodOrderForm();
    //Enter form detetails and submit
    NewHydra.SubmitfoodOrderForm(user, 'cash', 'delivery');
  });

Scenario('check food order options based on dashborad settings',
  function(I, NewHydra) {
    NewHydra.landing(url + 'logout');
    NewHydra.login(user);
    NewHydra.openTab('foodOrdering');
    //unselect chck box from Dashboard
    NewHydra.selectOptionChkbox();
    //Go to website
    NewHydra.landingBusinessPage(wizard, "");
    I.seeElement(NewHydra.WBPages.website.foodorderbtn1);
    //Navigate to food order form on website
    NewHydra.navigateTofoodOrderForm();
    //check unselected options are disabled
    I.seeElement(NewHydra.WBPages.website.foCashDsbl);
    I.seeElement(NewHydra.WBPages.website.foPymtDsbl);
  });

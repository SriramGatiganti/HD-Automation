const {
  wizard,
  url,
  res_url
} = require('../../function/newHydra/wizard_data_provider_new');
let user = wizard.user;
const maxwaittime = 40;

Feature('New Hydra Dashboard @newHydra_dashboard');
//Feature('New Hydra Dashboard @debug');

Scenario('Check footers',
  function(I, NewHydra) {
    NewHydra.landing(url + 'logout');
    NewHydra.login(user);
    NewHydra.openTab('account');
    I.waitForVisible(NewHydra.WBPages.dashboardPages.footerImprint);
    I.click(NewHydra.WBPages.dashboardPages.footerImprint);
    I.waitInUrl('/imprint');
    I.wait(2);
    I.click(NewHydra.WBPages.dashboardPages.footerFAQ);
    I.waitInUrl('/faq');
    I.wait(2);
    I.click(NewHydra.WBPages.dashboardPages.footerTerms);
    I.waitInUrl('/termsofuse');
    I.wait(2);
    I.click(NewHydra.WBPages.dashboardPages.footerPrivacy);
    I.waitForText('/privacy');
    NewHydra.logout();
  });

Scenario('Check dashboard switch language',
  function(I, NewHydra) {
    let lang = ['Čeština', 'Deutsch', 'English', 'Español', 'Français', 'Hrvatski', 'Italiano', 'Magyar', 'Nederlands', 'Polski', 'Português', 'Türkçe', 'Русский']
    let tran = ['Země', 'Land', 'Country', 'País', 'Pays', 'Država', 'Paese', 'Ország', 'Land', 'Kraj', 'País', 'Ülke', 'Страна']
    //Dashboard
    NewHydra.landing(url + 'logout');
    NewHydra.login(user);
    NewHydra.openTab('establishment');
    for (let i = 0; i < lang.length; i++) {
      I.waitForVisible(NewHydra.WBPages.dashboardPages.languageDropdown);
      I.click(NewHydra.WBPages.dashboardPages.languageDropdown);
      I.waitForVisible(NewHydra.WBPages.dashboardPages.languageOption.replace('language', lang[i]));
      I.click(NewHydra.WBPages.dashboardPages.languageOption.replace('language', lang[i]));
      I.waitForText(tran[i], maxwaittime, NewHydra.WBPages.dashboardPages.country);
    }
    NewHydra.logout();
  });

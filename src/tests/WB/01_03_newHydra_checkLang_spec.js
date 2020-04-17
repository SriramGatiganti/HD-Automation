const {
  wizard,
  url,
  res_url
} = require('../../function/newHydra/wizard_data_provider_new');

Feature('New Hydra Check @NewHydra_checkLang');
//Feature('New Hydra Check @debug');

Scenario('New Hydra Check wizard language switch',
  function(I, NewHydra) {
    lang = ['Čeština', 'Deutsch', 'English', 'Español', 'Français', 'Hrvatski', 'Italiano', 'Magyar', 'Nederlands', 'Polski', 'Português', 'Türkçe', 'Русский']
    tran = ['Země', 'Land', 'Country', 'País', 'Pays', 'Država', 'Paese', 'Ország', 'Land', 'Kraj', 'País', 'Ülke', 'Страна']

    //Wizard Flow
    NewHydra.landing(url);
    I.click('//a[@href="/wizard"]');
    let i;
    for (i = 0; i < lang.length; i++) {
      I.waitForVisible('.dropdown-toggle');
      I.click('.dropdown-toggle');
      I.waitForVisible('//a[contains(.,"' + lang[i] + '")]');
      I.click('//a[contains(.,"' + lang[i] + '")]'); //Choose language
      I.waitForText(tran[i], 40, '.mod-headline'); //translated
    }
  });

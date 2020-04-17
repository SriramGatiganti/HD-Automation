const {
  wizard,
  url,
  res_url,
  d_url,
  language
} = require('../../function/newHydra/wizard_data_provider_new');

Feature('DISH Frontend @dish_all_urls');
Scenario('DISH all URLs check',
  async function(I, DISH, NewHydra) {
    const LanguageDetect = require('languagedetect');
    const lngDetector = new LanguageDetect();
    //let dish_countries = ['DE', 'IT', 'FR', 'HR', 'XX', 'TR', 'BE', 'ES', 'HU', 'PL', 'AT', 'PT', 'CZ', 'UA'];
    let dish_countries = [process.profile.split(':')[3]];
    let languages = ['en', 'de', 'it', 'fr', 'hr', 'hu', 'tr', 'nl', 'pt', 'uk', 'cs', 'pl', 'es'];
    let languages_mapping = ['english', 'german', 'italian', 'french', 'croatian', 'hungarian', 'turkish', 'dutch', 'portuguese', 'ukrainian', 'slovak', 'polish', 'spanish'];
    //let sub_urls = ['contact'];
    let sub_urls = ['home', 'tools', 'tools/website-builder/', 'tools/reservation-tool/', 'know-how', 'connect',
      'user/sign-up', 'terms-of-use',
      'data-privacy', 'imprint', 'contact', 'get-app'
    ]
    if (wizard.country == "Turkey") {
      sub_urls = ['home', 'tools', 'tools/website-builder/', 'tools/reservation-tool/',
        'user/sign-up', 'other-pages/data-privacy-shakejob/', 'other-pages/data-privacy-menu-kit/',
        'other-pages/data-privacy-cockpit/', 'other-pages/data-privacy-zeitgold/',
        'other-pages/data-privacy-staffbook/', 'other-pages/data-privacy-badgebox/'
      ]
    }
    let result = '';
    let overall;
    let current_url;
    let current_lang;
    let links_num;
    let link;

    for (var s in sub_urls) {
      for (var l in languages) {
        for (var c in dish_countries) {
          if (['DE', 'IT'].indexOf(dish_countries[c]) == -1) {
            if (['know-how', 'connect'].indexOf(sub_urls[s]) != -1) {
              continue;
            }
          }
          //Other situation
          current_url = d_url + dish_countries[c] + '/' + languages[l] + '/' + sub_urls[s];
          NewHydra.landing(current_url);
          //Identify error codes
          overall = await I.grabTextFrom('//body');
          if (overall.indexOf('Page Not Found') != -1) {
            result = result + current_url + ' Page Not Found' + '\n';
          }
          if (overall.indexOf('Oops, an error occurred!') != -1) {
            result = result + current_url + ' Oops, an error occurred' + '\n';
          }
          if (overall.indexOf('Uncaught TYPO3 Exception') != -1) {
            result = result + current_url + ' Uncaught TYPO3 Exception' + '\n';
          }
          //Check languages
          current_lang_1 = await lngDetector.detect(overall, 1);
          current_lang_2 = await lngDetector.detect(overall, 2);
          I.say("Current languages: " + current_lang_1 + ' ' + current_lang_2);
          I.say("Expected language: " + languages_mapping[l]);
          //Not match the first and 2nd language
          if (!String(current_lang_1).includes(languages_mapping[l]) && !String(current_lang_2).includes(languages_mapping[l])) {
            if (languages_mapping[l] == 'slovak') {
              if (!String(current_lang).includes('czech')) {
                result = result + current_url + ' Language not matched' + '\n';
              }
            } else {
              result = result + current_url + ' Language not matched' + '\n';
            };
          };
          //Check if URLs are of same country and languages
          links_num = await I.grabNumberOfVisibleElements('//a[contains(@href,"dish.co")]');
          I.say(links_num);
          for (var n = 1; n <= links_num; n++) {
            link = await I.grabAttributeFrom('(//a[contains(@href,"dish.co")])[' + n + ']', 'href');
            I.say(link);
            if (link != d_url && (!String(link).includes('/' + dish_countries[c] + '/' + languages[l]))) {
              if (!String(link).includes('mailto:')) {
                if (current_url != 'http://www.dish.co/') { //Exception on data privacy page
                  result = result + current_url + ' Country or language in the link not matched ' + link + '\n'
                  break;
                }
              };
            };
          }
          I.wait(1);
        }
      }
    }
    I.say('\nErrors:\n' + result);
  })

Feature('Check SFDC user Emails @sfdc_check_emails');
//Feature('Check SSO @debug');

Scenario('Check SFDC User Emails',
  async function(I, NewHydra) {
    let sfdc_url;
    let env = process.profile.split(':')[2];
    if (env == 'dev') {
      sfdc_url = '';
    }
    if (env = 'acc') {
      sfdc_url = 'https://test.salesforce.com/';
    }
    if (env = 'prd') {
      sfdc_url = 'https://horecadigital.my.salesforce.com';
    }

    I.amOnPage(sfdc_url);
    I.fillField('#username', 'g.zhou@reply.de');
    I.fillField('#password', '');
    I.click('#Login');
    I.wait(10);

    let sfdc_user_ids = ['']
    let b_url = 'https://horecadigital.lightning.force.com/lightning/r/Account/'
    let my_url = '';
    let email = '';
    let result = '';

    for (var i = 0; i < sfdc_user_ids.length; i++) {
      my_url = b_url + sfdc_user_ids[i] + '/view?0.source=alohaHeader';
      I.amOnPage(my_url);
      I.wait(2);
      I.waitForVisible('(//a[contains(@href,"mailto")])[1]');
      email = await I.grabTextFrom('(//a[contains(@href,"mailto")])[1]');
      I.say(sfdc_user_ids[i] + '\t' + email);
      result = result + email + '\n';
    }
    I.say(result);
  });

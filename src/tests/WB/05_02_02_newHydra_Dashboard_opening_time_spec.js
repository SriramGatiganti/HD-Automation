const {
  wizard,
  url,
  res_url
} = require('../../function/newHydra/wizard_data_provider_new');
let i = 0;
let time_text = "";
const d = new Date();
const day = d.getDate();

Feature('New Hydra Dashboard @newHydra_dashboard');
//Feature('New Hydra Dashboard @debug');

Scenario('Remove Opening Times',
  async (I, NewHydra) => {
    NewHydra.landing(url + 'logout');
    NewHydra.login(wizard.user);
    NewHydra.openTab('openingHours');
    I.waitForVisible(NewHydra.WBPages.dashboardPages.removeTimeInterval);
    let num = await I.grabNumberOfVisibleElements(NewHydra.WBPages.dashboardPages.removeTimeInterval);
    //remove weekly time
    for (i = 1; i <= num; i++) {
      I.click(NewHydra.WBPages.dashboardPages.removeTimeInterval);
    }
    //Save and logout
    I.click(NewHydra.WBPages.dashboardPages.saveButton); //Save it
    I.waitForVisible(NewHydra.WBPages.dashboardPages.successMessage);
    NewHydra.logout();

    NewHydra.landingBusinessPage(wizard, "#times");
    I.dontSeeElement(NewHydra.WBPages.website.openingTime);
    I.dontSeeElement(NewHydra.WBPages.website.exceptionTime);
  });

Scenario('Opening Times cross-check for invalid input',
  (I, NewHydra) => {
    NewHydra.landing(url + 'logout');
    NewHydra.login(wizard.user);
    NewHydra.openTab('openingHours');
    I.waitForVisible(NewHydra.WBPages.dashboardPages.addTimeSettings);
    let start_time = [];
    let end_time = [];
    for (i = 0; i < 7; i++) {
      if (i % 2 == 0) {
        start_time.push(NewHydra.random_time(' PM'));
        end_time.push('12 PM:59:12');
      } else {
        start_time.push(NewHydra.random_time(' AM'));
        end_time.push(NewHydra.random_time(' AM'));
      };
      start_time[i] = start_time[i].replace('00', '12');
      end_time[i] = end_time[i].replace('00', '12');
      I.click('//tbody/tr[' + (i + 1) + ']/td[3]/button');
      I.waitForElement(NewHydra.WBPages.dashboardPages.weekDayTimeSettings.replace('number', i).replace('keyName', 'startHour'));
      I.selectOption(NewHydra.WBPages.dashboardPages.weekDayTimeSettings.replace('number', i).replace('keyName', 'startHour'), start_time[i].split(':')[0]);
      I.selectOption(NewHydra.WBPages.dashboardPages.weekDayTimeSettings.replace('number', i).replace('keyName', 'startMinute'), start_time[i].split(':')[1]);
      I.selectOption(NewHydra.WBPages.dashboardPages.weekDayTimeSettings.replace('number', i).replace('keyName', 'endHour'), end_time[i].split(':')[0]);
      I.selectOption(NewHydra.WBPages.dashboardPages.weekDayTimeSettings.replace('number', i).replace('keyName', 'endMinute'), end_time[i].split(':')[1]);
    };

    I.click(NewHydra.WBPages.dashboardPages.saveButton); //Save it
    I.waitForVisible(NewHydra.WBPages.dashboardPages.errorMessage);
    //I.waitForVisible('Your inputs could not been saved. Please correct the highlighted errors.');
    //I.waitForText('Time intervals are overlapping.');
    NewHydra.logout();
  })

Scenario('Add Opening Times',
  (I, NewHydra) => {
    NewHydra.landing(url + 'logout');
    NewHydra.login(wizard.user);
    NewHydra.openTab('openingHours');
    I.waitForVisible(NewHydra.WBPages.dashboardPages.addTimeSettings);
    let start_time = [];
    let end_time = [];

    for (i = 0; i < 7; i++) {
      start_time.push(NewHydra.random_time(' AM'));
      end_time.push(NewHydra.random_time(' PM'));
      start_time[i] = start_time[i].replace('00', '12');
      end_time[i] = end_time[i].replace('00', '12');
      I.click('//tbody/tr[' + (i + 1) + ']/td[3]/button');
      I.waitForElement(NewHydra.WBPages.dashboardPages.weekDayTimeSettings.replace('number', i).replace('keyName', 'startHour'));
      I.selectOption(NewHydra.WBPages.dashboardPages.weekDayTimeSettings.replace('number', i).replace('keyName', 'startHour'), start_time[i].split(':')[0]);
      I.selectOption(NewHydra.WBPages.dashboardPages.weekDayTimeSettings.replace('number', i).replace('keyName', 'startMinute'), start_time[i].split(':')[1]);
      I.selectOption(NewHydra.WBPages.dashboardPages.weekDayTimeSettings.replace('number', i).replace('keyName', 'endHour'), end_time[i].split(':')[0]);
      I.selectOption(NewHydra.WBPages.dashboardPages.weekDayTimeSettings.replace('number', i).replace('keyName', 'endMinute'), end_time[i].split(':')[1]);
    };
    //Exception for today
    NewHydra.AddTodayasException(day);
    let start_time_e = NewHydra.random_time(' AM').replace('00', '12');
    let end_time_e = NewHydra.random_time(' PM').replace('00', '12');
    I.click(NewHydra.WBPages.dashboardPages.addExceptionTime);
    I.selectOption(NewHydra.WBPages.dashboardPages.exceptionTimeSettings.replace('keyName', 'startHour'), start_time_e.split(':')[0]);
    I.selectOption(NewHydra.WBPages.dashboardPages.exceptionTimeSettings.replace('keyName', 'startMinute'), start_time_e.split(':')[1]);
    I.selectOption(NewHydra.WBPages.dashboardPages.exceptionTimeSettings.replace('keyName', 'endHour'), end_time_e.split(':')[0]);
    I.selectOption(NewHydra.WBPages.dashboardPages.exceptionTimeSettings.replace('keyName', 'endMinute'), end_time_e.split(':')[1]);
    //Save and logout
    I.click(NewHydra.WBPages.dashboardPages.saveButton); //Save it
    I.waitForVisible(NewHydra.WBPages.dashboardPages.successMessage);
    NewHydra.logout();

    //Check Opening Times
    NewHydra.landingBusinessPage(wizard, "#times");
    for (i = 0; i < 7; i++) {
      time_text = start_time[i].split(':')[0].split(' ')[0] + ":" + start_time[i].split(':')[1] + ' ' + start_time[i].split(':')[0].split(' ')[1] + " – " + end_time[i].split(':')[0].split(' ')[0] + ":" + end_time[i].split(':')[1] + ' ' + end_time[i].split(':')[0].split(' ')[1];
      I.see(time_text, NewHydra.WBPages.website.openingTimeEntry.replace('number', (i + 1)));
    }
    //Exception Check
    I.see('Testing automation');
    time_text = start_time_e.split(':')[0].split(' ')[0] + ":" + start_time_e.split(':')[1] + ' ' + start_time_e.split(':')[0].split(' ')[1] + " – " + end_time_e.split(':')[0].split(' ')[0] + ":" + end_time_e.split(':')[1] + ' ' + end_time_e.split(':')[0].split(' ')[1];
    I.see(time_text, NewHydra.WBPages.website.exceptionTimeEntry);
  });

const expandIcon = '#gc-timeperiod > div.gc-timeperiod__dropdown-arrow.ng-star-inserted > svg';
const previousDayIcon = '#gc-timeperiod__string-container > div.gc-date-choose__prev > svg';
const yearlyResolution = '#gc-timepicker > gc-fixed-value-slider > div:nth-child(4)';
const monthlyResolution = '#gc-timepicker > gc-fixed-value-slider > div.gc-fixed-value-slider__part.selected.ng-star-inserted';
const weeklyResolution = '#gc-timepicker > gc-fixed-value-slider > div:nth-child(2) > div.gc-fixed-value-slider__tick-text';
const dailyResolution = '#gc-timepicker > gc-fixed-value-slider > div:nth-child(1) > div.gc-fixed-value-slider__tick-text';
const customSelectionDay = '#gc-timeperiod__string-container > div.gc-timeperiod-string > span.ng-star-inserted';
const customSelectionDayConfirm = '#gc-timepicker > app-date-range-picker > div > div.gc-date-range-picker__footer.ng-star-inserted > button.gcButton.primary.regular > div';
//const customSelectionStart = '//*[@id="gc-timepicker"]/app-date-range-picker/div/div[1]/form/gc-text-field[1]/div/div[1]/input';
const customSelectionStart = '#gc-timepicker > app-date-range-picker > div > div.gc-date-range-picker__inputfield-container > form > gc-text-field:nth-child(1) > div > div.gc-text-field__infix > input';
const customSelectionEnd = '#gc-timepicker > app-date-range-picker > div > div.gc-date-range-picker__inputfield-container > form > gc-text-field:nth-child(3) > div > div.gc-text-field__infix > input';
//const customSelectionEnd = '//*[@id="gc-timepicker"]/app-date-range-picker/div/div[1]/form/gc-text-field[2]/div/div[1]/input';

module.exports = {
  openDateFilter: expandIcon,
  slideToPreviousDay: previousDayIcon,
  selectYearlyResolution: yearlyResolution,
  selectMonthlyResolution: monthlyResolution,
  selectWeeklyResolution: weeklyResolution,
  selectDailyResolution: dailyResolution,
  openCustomSelection: customSelectionDay,
  confirmCustomSelection: customSelectionDayConfirm,
  setDaySelectionStart: customSelectionStart,
  setDaySelectionFinish: customSelectionEnd
}

let browser;
let desiredCapabilities;
let url;
let result = {};
// codeceptjs run --steps --verbose --profile 'sau:gzhou:prd:chrome:800x1280:Windows 10:2560x1440' > log.txt

//instruction:
//sau - sauce labs environment, loc - local environment
//username - only applicable in sau option
//acc - acceptance environment, prd - production environment
//browser - chrome, firefox, ie, safari, edge
//windowSize - browser window size:800x1280, maimize...
//sauce labs settings:
//platforms: "Windows 10", "Windows 8.1","macOS 10.12" and so on
//screen resolution: 1280x1024, maximize...

module.exports = {
  readProfile(x) {
    var profile = x.split(':');

    switch (profile[0]) {
      case 'acc':
        url = 'https://acc.eatbu.com';
        break;
      case 'prd':
        url = 'https://eatbu.com';
        break;
      case 'dev':
        url = 'https://eatbu.com:10443';
        break;
      case 'stg':
        url = 'https://stg.eatbu.com';
        break;
    };

    /*
    ,
    "loggingPrefs": {
      "performance": "ALL"
    },
    "platform": profile[5] + " " + profile[4] + " " + profile[6],
    */
    //Browser
    switch (profile[1]) {
      case 'headless':
        browser = 'chrome';
        desiredCapabilities = {
          "browserName": "chrome",
          "chromeOptions": {
            "args": ["headless", "disable-gpu", "--window-size=1280,800", "lang=en", 'user-agent=Mozilla/5.0 (' + profile[0] + ') AppleWebKit/537.36 (KHTML, like Gecko) testing_automation ' + profile[1]],
            "w3c": false
          }
        };
        break;
      case 'chrome':
        browser = 'chrome';
        desiredCapabilities = {
          "browserName": "chrome",
          "chromeOptions": {
            "args": ["lang=en",
              "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36 testing_automation",
              "disable-notifications",
            ],
            "w3c": false
          }
        };
        break;
      case 'firefox':
        browser = 'firefox';
        desiredCapabilities = {
          "browserName": "firefox",
          "moz:firefoxOptions": {
            "prefs": {
              "intl.accept_languages": "en"
            }
          }
        };
        break;
      case 'ie':
        browser = 'internet explorer';
        browser = 'internet explorer';
        desiredCapabilities = {
          "browserName": "internet explorer"
        };
        break;
      case 'safari':
        browser = 'safari';
        desiredCapabilities = {
          "browserName": "safari"
        };
        break;
      case 'edge':
        browser = 'MicrosoftEdge';
        desiredCapabilities = {
          "browserName": "MicrosoftEdge"
        };
        break;
    };

    if (profile[1] == 'edge') {
      result = {
        "url": url,
        "browser": browser,
        "seleniumArgs": {
          "javaArgs": [
            '-Dwebdriver.edge.driver="D:\\tools\\MicrosoftWebDriver.exe"'
          ]
        },
        "windowSize": 'maximize',
        "desiredCapabilities": desiredCapabilities
      }
    } else {
      result = {
        "url": url,
        "browser": browser,
        "windowSize": 'maximize',
        "desiredCapabilities": desiredCapabilities
      }
    };

    return result;
  }
};

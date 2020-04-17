const m_appPackage = "de.horecadigital.dishhubmobileapp";
const m_appActivity = "de.horecadigital.dishhubmobileapp.views.activities.SplashActivity";
const m_deviceName = "Nokia 6.1";
const m_platformVersion = "9";
//const m_app = "./DishHubMobile_RELEASE.apk"

exports.config = {
  "tests": "./src/mobile_tests/*_spec.js",
  "timeout": 10000,
  "output": "./output",
  "helpers": {
    "Appium": {
      "platform": "Android",
      "desiredCapabilities": {
        "appPackage": m_appPackage,
        "appActivity": m_appActivity,
        "deviceName": m_deviceName,
        "platformVersion": m_platformVersion,
        "automationName": "appium",
        "full-reset": true
        //"app": m_app
      },
      "waitForTimeout": 40000
    }
  },
  "include": {},
  "bootstrap": false,
  "mocha": {
    reporterOptions: {
      "codeceptjs-cli-reporter": {
        stdout: "-",
        options: {
          verbose: false,
          steps: true,
        }
      },
      mochawesome: {
        stdout: "./output/console.log",
        options: {
          reportDir: "./output",
          reportFilename: "report"
        }
      }
    }
  },
  "name": "MobileTest"
};

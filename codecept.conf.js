const profile_reader = require('./src/function/public/process_profile');

let helper;

if (typeof process.profile == 'undefined') {
  process.profile = "acc:chrome:1:DISH";
};

const profile = profile_reader.readProfile(process.profile);

let restart = true;
if (process.profile.split(':')[2] != 0) {
  restart = false;
};

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


/*
	   "platform": "Windows 10",
	   "version": "61.0",
*/

//SauceLabs
/*
	  "port": "4445",
	  "user": "gzhou",
      "key": "f03ba7e8-9d8c-4ac6-9ce3-a83b4d13be03",
*/

/*
	  profile.url,
      profile.browser,
	  profile.windowSize,
      profile.desiredCapabilities

	  Saucelabs:
		"port":port,
		"user":user,
		"key":key,

	  "url":profile.url,
	  "browser":profile.browser,
	  "windowSize":profile.windowSize,
	  "desiredCapabilities":profile.desiredCapabilities
*/
/*direct connect
"host": "ondemand.saucelabs.com",
"port": 80,
*/

helpers = {
  "WebDriver": {
    "waitforTimeout": 10000,
    "coloredLogs": true,
    "url": profile.url,
    "browser": profile.browser,
    "restart": restart,
    "remoteFileUpload": false,
    "disableScreenshots": true,
    "windowSize": 'maximize',
    "desiredCapabilities": profile.desiredCapabilities,
    "timeouts": {
      "script": 90000,
      "page load": 90000
    },
    "waitForTimeout": 40000

  },
  "Mochawesome": {
    "uniqueScreenshotNames": "false"
  },
  "MyHelper": {
    "require": "./src/function/public/testing_result.js"
  }
}

//console.log(process.argv);
//var test_files="./src/tests/"+process.argv[7]+"/*_spec.js";
//console.log("./src/tests/"+process.argv[7]+"/*_spec.js");

exports.config = {
  "tests": "./src/tests/*/*_spec.js",
  "timeout": 10000,
  "output": "./output",
  helpers,
  "include": {
    "I": "./steps_file.js",
    NewHydra: "./src/function/newHydra/NewHydra.js",
    ResFunc: "./src/function/reservation/Res_function.js",
    CockpitFunc: "./src/function/cockpit/Cockpit_func.js",
    DISH: "./src/function/DISH/DISH.js",
    SFDC: "./src/function/public/sfdc.js",
    financialForce: './src/function/financialForce/financialForce.js',
    salesForce: './src/function/financialForce/salesForce.js'
  },
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
  "multiple": {
    "retresco_mul_services": {
      // run only tests containing "@smoke" in name
      "grep": "@retresco_mul_services",
      // use firefox and different chrome configurations
      "outputName": "mul",
      "browsers": ["chrome"]
    },
    "parallel": {
      // Splits tests into 2 chunks
      "chunks": 2
    }
  },
  "name": "E2ETest"
};

//console.log(exports.config);

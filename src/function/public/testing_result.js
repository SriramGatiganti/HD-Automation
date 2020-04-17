'use strict';

let Helper = codecept_helper;

var rightNow = new Date();
var cur_time = rightNow.toISOString().slice(0, 19).replace(/-/g, "").replace(/T/g, "").replace(/:/g, "");

var logFile = "log.txt";
var outputFile = "timereport_" + cur_time + ".txt";
var test_name;
var db_name;
var env = process.profile.split(':')[2];
var cloud = process.profile.split(':')[0];

if (env == 'acc') {
  db_name = 'Acc_Tests';
};
if (env == 'prd') {
  db_name = 'Prd_Tests';
};
if (env == 'dev') {
  db_name = 'Dev_Tests';
}
if (env == 'stg') {
  db_name = 'Stg_Tests';
}
var profile_file = 'my.properties';


class MyHelper extends Helper {
  // before/after hooks
  _test(test) {
    test_name = cur_time + "_" + test.title;
    /*
    this.helpers['WebDriver'].browser.setCookie({
      name: 'DISABLE_TRACKING',
      value: 'true'
    });
    let b = this.helpers['WebDriver'].browser;
    test_name = cur_time + "_" + b.desiredCapabilities.platform + '_' + b.desiredCapabilities.browserName + "_" + test.title;
    var script = "sauce:job-name=" + test_name;
    this.helpers['WebDriver'].browser.execute(script);
    console.log("\n" + "https://saucelabs.com/beta/tests/" + b.requestHandler.sessionID + "\n"); // Show SauceLabs URL

    var fs = require('fs');
    fs.writeFile(profile_file, "SAUCELABS_LINK=https://saucelabs.com/beta/tests/" + b.requestHandler.sessionID, function(err) {
      if (err) {
        return console.log(err);
      }
    });
    */
  };

  _failed() {
    let b = this.helpers['WebDriver'].browser;
    b.execute("sauce:job-result=failed");
    let pngName = test_name.replace(/ /g, '').replace('.', '_').replace('(', '_').replace(')', '_') + '_failed.png';
    return this.helpers['WebDriver'].saveScreenshot(pngName);
    //close for testing
    /*
    if (process.profile.split(":")[3] == "chrome" && cloud == "sau") { // && process.profile.split(":")[7] == 1
      return b.log('performance').then((log) => {
        //console.log(log.value);
        log.value.forEach(function(entry) {
          console.log(entry);
        });
      });
    };*/
  };

  _passed() {
    let b = this.helpers['WebDriver'].browser;
    b.execute("sauce:job-result=passed");
    //return this.helpers['WebDriver'].saveScreenshot(test_name + '_passed.png');
    /*
    if (process.profile.split(":")[3] == "chrome") {
      return b.log('performance').then((log) => {
        //console.log(log.value);
        log.value.forEach(function(entry) {
          console.log(entry);
        });
      });
    };*/
  };

  _finishTest() {
    /*
        let b = this.helpers['WebDriver'].browser;
        var line_1 = "";
        var state = -1;
        var fs = require("fs");
        var lines = fs.readFileSync(logFile, 'utf8').toString().split('\n');
        //var result="Test_Description;Test_result_string;Step_runtime_s";
        var result;
        var test_suite_name = "";
        var test_name = "";
        var sep_chr = "\t";
        var MongoClient = require('mongodb').MongoClient;
        //var url = "mongodb://192.168.1.17:7927/t_data";
        var url = "mongodb://Load2DB:=)PO87iu@127.0.0.1:7927/t_data"; //?ssl=true
        //var options = {sslValidate: false};
        let n_flag = check_network_issue(lines);
        let step_num = 1;
        let test_result;
        var results_arr = [];
        var step;

        lines.forEach(function(line) {
          if (line != "") {
            if (line.indexOf(" --") > -1) { //Testing Suite found
              test_suite_name = line.replace(' --', '').trim();
              state = 0; //Look for Test name
              result = '{"test_suite_name":"' + test_suite_name +
                '","browser":"' + b.desiredCapabilities.browserName +
                '","platform":"' + b.desiredCapabilities.platform;
              return;
            }
            if (state == 0 && /^  [a-zA-Z]/.test(line) && line.indexOf('Screenshot') == -1 && line.indexOf(' > [') == -1) { //Test name
              //test_name = test_suite_name + sep_chr + line.slice(0, line.length).trim();
              //result = result + test_name + sep_chr + cur_time;
              result = result + '","scenario_name":"' + line.slice(0, line.length).trim() + '","test_time_stamp":"' + cur_time + '",';
              state = 3; // Check Testing steps state
              return;
            };
            if (state == 3 && /^I /.test(line.trim())) { //Step line
              line_1 = line.trim();
              if (line_1.indexOf('sec")') > -1) { //time in the same line
                var n = line_1.lastIndexOf("(");
                var r_time = line_1.slice(n + 1, line_1.length - 6).replace('"', '');
                step = String(step_num + " " + line_1.slice(0, n).trim().replace(/[^a-zA-Z ]/g, " ").replace(/\s\s+/g, ' ').trim());
                step_num = step_num + 1;
                result = result + '"' + step + '":' + r_time + ',';
                state = 3; //Looking for next step
                return;
              } else {
                state = 2; // Check finish time state for new line
                return;
              }
            };

            if (state == 2 && line.indexOf('sec")') > -1) { // Time line for other steps
              line = line.trim();
              var n = line.lastIndexOf("(");
              var r_time = line.slice(n + 1, line.length - 6).replace('"', '');;
              step = String(step_num + " " + line_1.slice(0, n).trim().replace(/[^a-zA-Z ]/g, " ").replace(/\s\s+/g, ' ').trim());
              result = result + '"' + step + '":' + r_time + ',';
              state = 3; //Looking for next step
              return;
            };

            if (line.indexOf("OK in") > -1) { //Test result OK
              var test_result = (line + '').trim().split(' ');
              result = result.slice(0, result.length - 1) + ',"result":"' + "OK" + '","test_run_time":' + / ([0-9]*?)ms/.exec(line)[1] + "}";
              console.log(result);
              results_arr.push(JSON.parse(result));
              state = 0;
              return;
            };

            if (line.indexOf("FAILED in") > -1) { //Test result Failed, exclude SauceLabs issue

              let t_result;
              if (n_flag) {
                t_result = "SL_Issue";
              } else {
                t_result = "FAILED"
              };
              var test_result = (line + '').trim().split(' ');
              result = result.slice(0, result.length - 1) + ',"result":"' + t_result + '","test_run_time":' + / ([0-9]*?)ms/.exec(line)[1] + "}";
              console.log(result);
              results_arr.push(JSON.parse(result));
              state = 0;
              return; //Look for new one
            };
          }
        });

        //Insert Into Mongo DB
        if (result) {
          MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            if (results_arr.length != 0) {
              db.collection(db_name).insertMany(results_arr, function(err, res) {
                if (err) throw err;
                console.log("Successfully inserted: ", res);
              });
            };
            db.close();
          });
          */
  };

  /*
    function check_network_issue(l) {
      let n_errors = ["A session id is required for this command but", "Invalid message: Due to a previous error, this job has already finished", "has already finished, and can't receive further commands", "ERR_CONNECTION_RESET", "ERR_CONNECTION_TIMED_OUT", "Invalid message: ERROR Internal Server Error"]
      for (var i = 0, l_len = l.length; i < l_len; i++) {
        for (var j = 0, n_len = n_errors.length; j < n_len; j++) {
          if (l[i].indexOf(n_errors[j]) > -1) {
            return 1;
          };
        };
      };
      return 0
    };
  };
  */
}

module.exports = MyHelper;

# E2E Test Automation

## Installation
1. Install GIT first: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
2. Connect to our VPN, at the first time, clone the repository:
```
git clone http://52.57.238.143/gzhou/E2E_test_automation.git
```
3. Run the command in the repository folder E2E_Test_Automation at the first time:
```
npm install
```
4. In the future, you can use the following command in the repository folder to update the codes:
```
git pull
```

## Usage
1. After start the selenium standalone server, then you can run the  commands to run the test cases in the folder src/tests/\*\_spec.js in local machine:
Windows:
```
node ./node_modules/codeceptjs/bin/codecept.js run --grep "@createWebsite" --steps --debug --profile 'loc::prd:chrome:maximize:::1'| Out-File log.txt -encoding Utf8
```
Linux
```
node ./node_modules/codeceptjs/bin/codecept.js run --grep "@createWebsite" --steps --debug --profile 'loc::prd:chrome:maximize:::1'> log.txt
```
  **loc::prd:chrome:maximize::**
  - {prd,acc}: *environment*
  - {chrome,firefox}: *browser*
  - {maximize, 800x1280...}: *window size for browsers*

2. After opening the sauce labs proxy, then you can use the following commands to run tests in Sauce Labs:

  (Reference: https://wiki.saucelabs.com/display/DOCS/Test+Configuration+Options#TestConfigurationOptions-SpecifyingtheScreenResolution)
Windows:
```
node ./node_modules/codeceptjs/bin/codecept.js run --grep "@createWebsite" --steps --debug --profile 'sau:gzhou:prd:firefox:1000x1280:Windows 10:1280x1024:1'| Out-File log.txt -encoding Utf8
```
Linux:
```
node ./node_modules/codeceptjs/bin/codecept.js run --grep "@createWebsite" --steps --debug --profile 'sau:gzhou:prd:firefox:1000x1280:Windows 10:1280x1024:1'> log.txt
```
**sau:gzhou:prd:firefox:1000x1280:Windows 10:1280x1024**

  Besides the same arguments as 3rd point, the different arguments are:
  - {gzhou,...}: *user account for saucelabs*
  - {'Windows 10', 'Windows 8.1','macOS 10.12',...}: *supported OS in Sauce labs.*
  - {1280x1024}: *supported screen resolution in Sauce labs*

## Current Scope
1. **Hydra creating website:**
  - *01_hydra_create_website_register_spec.js*
2. **Hydra dashboard test cases:**
  - *02_01_dashboard_domain_spec.js*
  - *02_dashboard_account_spec.js*
  - *02_dashboard_design_and_content_spec.js*
  - *02_dashboard_imprint_spec.js*
  - *02_dashboard_menu_spec.js*
  - *02_dashboard_reservationtools_spec.js*
  - *02_dashboard_restaurantinfo_spec.js*
  - *02_dashboard_services_spec.js*
3. **Reservation tool:**
  - *03_01_reservation_Turn_On_spec.js*
  - *03_02_reservation_Make_reservation_spec.js*
  - *03_03_reservation_Change_settings_spec.js*

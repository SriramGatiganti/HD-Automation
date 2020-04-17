@echo off
set FILE_LIST=(testreser0+autnewbakery180808111323@gmail.com testreser0+autnewbar180808111323@gmail.com testreser0+autnewbistro180808111323@gmail.com testreser0+autnewbutcher180808111323@gmail.com testreser0+autnewcafe180808111323@gmail.com testreser0+autnewcanteen180808111323@gmail.com testreser0+autnewcatering180808111323@gmail.com testreser0+autnewcookingSchool180808111323@gmail.com testreser0+autnewdiner180808111323@gmail.com testreser0+autnewfoodtruck180808111323@gmail.com testreser0+autnewhotel180808111323@gmail.com testreser0+autnewkiosk180808111323@gmail.com testreser0+autnewnightclub180808111323@gmail.com testreser0+autnewrestaurant180808111323@gmail.com)

REM set FILE_LIST=(testreser0+autnewbakery180709092142@gmail.com)

for %%i in %FILE_LIST% do (
start cmd /c node ./node_modules/codeceptjs/bin/codecept.js run --grep "@retresco_services|@retresco_offerings" --steps --debug --profile "headless:gzhou:acc:chrome:maximize:Windows 10:2560x1600:3:4:%%i" ^>result_%%i.log
)
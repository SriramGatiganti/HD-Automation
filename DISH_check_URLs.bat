@echo off
set COUNTRY_LIST=(DE IT FR HR TR BE HU AT PT CZ UA PL ES NL XX)
'REM ES XX

for %%i in %COUNTRY_LIST% do (
start cmd /c node ./node_modules/codeceptjs/bin/codecept.js run --grep "@dish_all_urls" --steps --debug --profile "loc:gzhou:prd:chrome:maximize:Windows 10:2560x1600:2:4:%%i" ^>output\result_%%i.log
timeout /t 10
)

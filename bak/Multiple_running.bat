@echo off
REM set COUNTRY_LIST=(DE IT FR HR TR BE HU AT PT CZ UA)
REM Non DISH: PL ES
set COUNTRY_LIST=(UA)

for /l %x in (1, 1, 100) do (
	REM start cmd /c node ./node_modules/codeceptjs/bin/codecept.js run --grep "@dish_wb_res_e2e|@dish_afterReg_e2e" --steps --debug --profile "loc:gzhou:acc:chrome:maximize:Windows 10:2560x1600:2:4:%%i" ^>output\result_%%i.log
	start cmd /c node ./node_modules/codeceptjs/bin/codecept.js run --grep "@dish_wb_res_e2e|@dish_afterReg_e2e" --steps --debug --profile "loc:gzhou:acc:chrome:maximize:Windows 10:2560x1600:2:4:%%i" ^>output\result_%%i.log
	timeout /t 20
)

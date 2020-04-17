@echo off
set /p env="Enter Environment (dev,acc,stg,prd): "
set /p comp="Enter Components (all,dish,wb_ndish,wb_cndish,wb_dish,wb_cdish,wb_ru,wb_cru,res_ndish,res_cndish,res_dish,res_cdish,te,agg,sso): "
set tests=""

IF "%comp%"=="all" (
    start cmd /c node ./node_modules/codeceptjs/bin/codecept.js run --grep "@dish_frontend|@dish_check_all_countries" --steps --debug --profile "loc::%env%:chrome:maximize:::3" ^>testing_1.log
	timeout /t 1
	start cmd /c node ./node_modules/codeceptjs/bin/codecept.js run --grep "@newHydra_version|@newHydra_createWebsite|@newHydra_dashboard" --steps --debug --profile "loc::%env%:chrome:maximize:::2:4" ^>testing_2.log
	timeout /t 1
	start cmd /c node ./node_modules/codeceptjs/bin/codecept.js run --grep "@newHydra_ru_createWebsite|@newHydra_dashboard" --steps --debug --profile "loc::%env%:chrome:maximize:::3:4:RU" ^>testing_3.log
	timeout /t 1
	start cmd /c node ./node_modules/codeceptjs/bin/codecept.js run --grep "@dish_register|@dish_purchase_wb|@newHydra_dashboard" --steps --debug --profile "loc::%env%:chrome:maximize:::2:4:DISH" ^>testing_4.log	
	timeout /t 1
	start cmd /c node ./node_modules/codeceptjs/bin/codecept.js run --grep "@reservationRegister|@reservation_dashboard" --steps --debug --profile "loc::%env%:chrome:maximize:::2:4" ^>testing_5.log
	timeout /t 1
	start cmd /c node ./node_modules/codeceptjs/bin/codecept.js run --grep "@dish_register|@dish_purchase_res|@reservation_dashboard" --steps --debug --profile "loc::%env%:chrome:maximize:::2:4:DISH" ^>testing_6.log
)

IF "%comp%"=="dish" (
    start cmd /c node ./node_modules/codeceptjs/bin/codecept.js run --grep "@dish_frontend" --steps --debug --profile "loc::%env%:chrome:maximize:::3" ^>testing_%comp%.log
)

IF "%comp%"=="wb_ndish" (
	if "%env%"=="prd" (
		set tests="@newHydra_version"
	)
    start cmd /c node ./node_modules/codeceptjs/bin/codecept.js run --grep "%tests%|@newHydra_createWebsite|@newHydra_dashboard" --steps --debug --profile "loc::%env%:chrome:maximize:::2:4" ^>testing_%comp%.log
)

IF "%comp%"=="wb_cndish" (
    start cmd /c node ./node_modules/codeceptjs/bin/codecept.js run --grep "@newHydra_createWebsite" --steps --debug --profile "loc::%env%:chrome:maximize:::2:4" ^>testing.log_%comp%.log
)

IF "%comp%"=="wb_dish" (
	if "%env%"=="prd" (
		set tests="@newHydra_version"
	)
	start cmd /c node ./node_modules/codeceptjs/bin/codecept.js run --grep "@dish_register|@dish_purchase_wb|@newHydra_dashboard" --steps --debug --profile "loc::%env%:chrome:maximize:::2:4:DISH" ^>testing_%comp%.log
)

IF "%comp%"=="wb_cdish" (
    start cmd /c node ./node_modules/codeceptjs/bin/codecept.js run --grep "@dish_register|@dish_purchase_wb" --steps --debug --profile "loc::%env%:chrome:maximize:::2:4:DISH" ^>testing_%comp%.log
)

IF "%comp%"=="wb_ru" (
    start cmd /c node ./node_modules/codeceptjs/bin/codecept.js run --grep "@newHydra_ru_createWebsite|@newHydra_dashboard" --steps --debug --profile "loc::%env%:chrome:maximize:::3:4:RU" ^>testing_%comp%.log
)

IF "%comp%"=="wb_cru" (
    start cmd /c node ./node_modules/codeceptjs/bin/codecept.js run --grep "@newHydra_ru_createWebsite" --steps --debug --profile "loc::%env%:chrome:maximize:::3:4:RU" ^>testing_%comp%.log
)

IF "%comp%"=="res_ndish" (
    start cmd /c node ./node_modules/codeceptjs/bin/codecept.js run --grep "@reservationRegister|@reservation_dashboard" --steps --debug --profile "loc::%env%:chrome:maximize:::2:4" ^>testing_%comp%.log
)

IF "%comp%"=="res_cndish" (
    start cmd /c node ./node_modules/codeceptjs/bin/codecept.js run --grep "@reservationRegister" --steps --debug --profile "loc::%env%:chrome:maximize:::2:4" ^>testing_%comp%.log
)

IF "%comp%"=="res_dish" (
	start cmd /c node ./node_modules/codeceptjs/bin/codecept.js run --grep "@dish_register|@dish_purchase_res|@reservation_dashboard" --steps --debug --profile "loc::%env%:chrome:maximize:::2:4:DISH" ^>testing_%comp%.log
)

IF "%comp%"=="res_cdish" (
	start cmd /c node ./node_modules/codeceptjs/bin/codecept.js run --grep "@dish_register|@dish_purchase_res" --steps --debug --profile "loc::%env%:chrome:maximize:::2:4:DISH" ^>testing_%comp%.log
)

IF "%comp%"=="te" (
    start cmd /c node ./node_modules/codeceptjs/bin/codecept.js run --grep "@ax_multiLang|@ax_change_multiLang" --steps --debug --profile "loc::%env%:chrome:maximize:::3" ^>testing_%comp%.log
)

IF "%comp%"=="agg" (
    start cmd /c node ./node_modules/codeceptjs/bin/codecept.js run --grep "@agg_frontend" --steps --debug --profile "loc::%env%:chrome:maximize:::3" ^>testing_%comp%.log
)

IF "%comp%"=="sso" (
    start cmd /c node ./node_modules/codeceptjs/bin/codecept.js run --grep "@sso_admin" --steps --debug --profile "loc::%env%:chrome:maximize:::3" ^>testing_%comp%.log
)

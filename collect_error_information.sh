#!/bin/bash

#Backup Logs
cp log.txt output/$(ls -t output | head -n1 | sed -e 's/png/log/g')

#Ticket problem description
PROBLEM_DESCRIPTION_FILE='problem.txt'
> $PROBLEM_DESCRIPTION_FILE
echo "Please check the ticket created by testing automation. Detailed information as below: " > $PROBLEM_DESCRIPTION_FILE
echo "">> $PROBLEM_DESCRIPTION_FILE
echo "Sauce Labs link:" >> $PROBLEM_DESCRIPTION_FILE
cat my.properties | sed -e 's/.*=\(.*\).*/\1/' >> $PROBLEM_DESCRIPTION_FILE
echo "">> $PROBLEM_DESCRIPTION_FILE
echo "Errors in the browser logs:" >> $PROBLEM_DESCRIPTION_FILE
grep "message: " log.txt | grep '"status":' | grep -v '"status":2' | grep -v '"status":3' | sed -e 's/.*HTTP\/1\.1 \(.*\)\\\\r\\\\nServer\:.*/\1/' >> $PROBLEM_DESCRIPTION_FILE
echo "">> $PROBLEM_DESCRIPTION_FILE

#Attached File Path
> attach.txt
ls -t output | head -2 | tail -1 | awk '{printf("output/%s",$0);exit}'> attach.txt

#Ticket title
ERROR_CODE=$(grep "message: " log.txt | grep '"status":' | grep -v '"status":2' | grep -v '"status":3' |sed -e 's/.*\"status\"\:\(.*\)\"\,\"timing\".*/\1/' | sed -e 's/\,\"statusText\"\:\"/ /g' | sort | uniq | sed ':a;N;$!ba;s/\n/,/g')
STEP=$(grep -B 1 "(NaN sec)" log.txt | head -1)
PREFIX=$(grep "\-\-" log.txt | head -1)
TITLE=$PREFIX$ERROR_CODE" - "$STEP
echo $TITLE > title.txt
#printf "\n" >> title.txt
#cat my.properties | sed -e 's/.*=\(.*\).*/\1/' >> title.txt

#Insert errors found into Mongo DB
test_time_stamp=$(grep "test_time_stamp" log.txt | sed -e "s/.* '\(.*\)',/\1/")
comm='/usr/bin/mongo 127.0.0.1:7927/t_data -u Load2DB -p "=)PO87iu" --eval '"'var document = {\"test_time_stamp\" : \""$test_time_stamp"\",\"error_codes\" : \""$ERROR_CODE"\"};db.Error_Codes.insert(document);';"
# --ssl --sslAllowInvalidCertificates
eval $comm

#For Reservation Deletion
#Standalone one
if grep -E "reservationRegister|newHydra_E2E_Flow|newHydra_createWebsite" log.txt;
#&& [[ ! -z $(grep "Activate statusCode: 200" log.txt) ]] && [[ -z $(grep "Remove statusCode: 200" log.txt) ]];
then
      grep '{"name":"username"}'  log.txt | head -1 | awk '{print $2}' FS=', "' | awk '{print $1}' FS='"'>reservation_account.txt
fi
#Hydra one
#if [[ ! -z $(grep "SetupAndReserve" log.txt) ]]; #&& [[ ! -z $(grep "I am on page \"/logout\"" log.txt) ]] && [[ -z $(grep "Remove statusCode: 200" log.txt) ]];
#then
#      grep '{"name":"username"}'  log.txt | head -1 | awk '{print $2}' FS=', "' | awk '{print $1}' FS='"'>reservation_account.txt
#fi
#Only Hydra
if grep -E "SetupAndReserve|createWebsite" log.txt;
#[[ ! -z $(grep "createWebsite" log.txt) ]] && [[ ! -z $(grep repeatRegister log.txt) ]];
then
      grep emailRegister  log.txt | head -1 | awk '{print $2}' FS=', "' | awk '{print $1}' FS='"'>reservation_account.txt
fi
#Clear log file
>log.txt

# If there is reservation left-over, then clean it up
if [ -s reservation_account.txt ];
then
  if grep "createWebsite" title.txt; #Only Hydra
    then
      node --no-warnings ./node_modules/codeceptjs/bin/codecept.js run --grep "@removehaccount" --steps --debug --profile 'sau:gzhou:prd:chrome:2560x1600:Windows 10:2560x1600:1' || true;
  elif grep -E "reservationRegister|newHydra_E2E_Flow" title.txt; #Only Reservation
    then
      node --no-warnings ./node_modules/codeceptjs/bin/codecept.js run --grep "@removeReservation" --steps --debug --profile 'sau:gzhou:prd:chrome:2560x1600:Windows 10:2560x1600:1' || true;
  elif grep "SetupAndReserve" title.txt; #Old Hydra E2E
    then
      node --no-warnings ./node_modules/codeceptjs/bin/codecept.js run --grep "@removehaccount|@removeReservation" --steps --debug --profile 'sau:gzhou:prd:chrome:2560x1600:Windows 10:2560x1600:1:4' || true;
  fi
  >reservation_account.txt
fi

cd ..

for /f %%i in ('expo url:apk') do set VAR=%%i
cd build
wsl wget "%VAR%" -O app.apk
adb install -r app.apk --streaming
pause
expo build:android
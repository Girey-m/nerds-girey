@echo off
echo ================================================
echo     RentHouse
echo ================================================
echo.

echo start PHP server...
start "PHP Server" cmd /k "php -S localhost:8080 -t public"

echo start Gulp + BrowserSync...
start "Gulp + BrowserSync" cmd /k "gulp"

echo.
echo ================================================
echo Project started!
echo.
echo PHP server: http://localhost:8080
echo Interface with auto-refresh: http://localhost:3000
echo.
echo To stop, simply close both opened windows.
echo ================================================
@echo off
setlocal
cd /d "%~dp0"
title VICEPASS - Local Starter
set "PORT=8000"

where py >nul 2>nul
if %errorlevel%==0 (
  set "PYTHON=py -3"
) else (
  where python >nul 2>nul
  if errorlevel 1 (
    echo [ERROR] Python no esta instalado o no esta en PATH.
    echo Instala Python 3 desde https://www.python.org/downloads/ y vuelve a abrir STARTER.bat.
    pause
    exit /b 1
  )
  set "PYTHON=python"
)

for /f "tokens=5" %%P in ('netstat -ano ^| findstr /R /C:":%PORT% .*LISTENING"') do set "PID=%%P"
if defined PID (
  echo [INFO] El puerto %PORT% ya esta en uso. Se intentara abrir VICEPASS igualmente.
) else (
  echo [INFO] Iniciando servidor local VICEPASS en el puerto %PORT%...
  start "VICEPASS Local Server" /min cmd /c "%PYTHON% -m http.server %PORT% --bind 127.0.0.1"
  timeout /t 2 /nobreak >nul
)

set "URL=http://127.0.0.1:%PORT%/"
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
  start "" "%ProgramFiles%\Google\Chrome\Application\chrome.exe" "%URL%"
) else if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" (
  start "" "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" "%URL%"
) else (
  start "" "%URL%"
)
echo.
echo VICEPASS esta disponible en %URL%
echo Para cerrar el servidor, cierra la ventana "VICEPASS Local Server".
echo.
endlocal

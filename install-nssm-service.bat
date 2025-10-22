@echo off
REM ========================================
REM Hillside CRM Portal - NSSM Service Installation
REM Port: 7070
REM ========================================

echo.
echo ========================================
echo Hillside CRM Portal - Service Kurulum
echo ========================================
echo.

REM Admin kontrolu
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo HATA: Bu script Yonetici olarak calistirilmalidir!
    echo Sag tik yapip "Run as Administrator" secin.
    pause
    exit /b 1
)

REM Proje dizini
set PROJECT_DIR=%~dp0
set NODE_PATH=C:\Program Files\nodejs\node.exe
set NEXT_BIN=%PROJECT_DIR%node_modules\next\dist\bin\next

echo Proje dizini: %PROJECT_DIR%
echo Node.js yolu: %NODE_PATH%
echo Next.js bin: %NEXT_BIN%
echo.

REM Node.js kontrolu
if not exist "%NODE_PATH%" (
    echo HATA: Node.js bulunamadi!
    echo Node.js'i https://nodejs.org adresinden indirin.
    pause
    exit /b 1
)

REM NSSM kontrolu
where nssm >nul 2>&1
if %errorLevel% neq 0 (
    echo HATA: NSSM bulunamadi!
    echo NSSM'i PATH'e ekleyin veya bu scriptle ayni klasore koyun.
    pause
    exit /b 1
)

echo NSSM ile service kuruluyor...
echo.

REM Eski service varsa kaldir
nssm stop "HillsideCRMPortal" >nul 2>&1
nssm remove "HillsideCRMPortal" confirm >nul 2>&1

REM Service kur
nssm install "HillsideCRMPortal" "%NODE_PATH%" "%NEXT_BIN%" start

REM Service ayarlarini yap
nssm set "HillsideCRMPortal" AppDirectory "%PROJECT_DIR%"
nssm set "HillsideCRMPortal" DisplayName "Hillside CRM Portal"
nssm set "HillsideCRMPortal" Description "Hillside CRM Portal - Next.js Application (Port 7070)"
nssm set "HillsideCRMPortal" Start SERVICE_AUTO_START

REM Environment variables
nssm set "HillsideCRMPortal" AppEnvironmentExtra NODE_ENV=production PORT=7070

REM Stdout/Stderr log dosyalari
nssm set "HillsideCRMPortal" AppStdout "%PROJECT_DIR%logs\service-output.log"
nssm set "HillsideCRMPortal" AppStderr "%PROJECT_DIR%logs\service-error.log"

REM Log rotation
nssm set "HillsideCRMPortal" AppStdoutCreationDisposition 4
nssm set "HillsideCRMPortal" AppStderrCreationDisposition 4
nssm set "HillsideCRMPortal" AppRotateFiles 1
nssm set "HillsideCRMPortal" AppRotateOnline 1
nssm set "HillsideCRMPortal" AppRotateSeconds 86400
nssm set "HillsideCRMPortal" AppRotateBytes 1048576

REM Logs klasoru olustur
if not exist "%PROJECT_DIR%logs\" mkdir "%PROJECT_DIR%logs"

echo.
echo Service basariyla kuruldu!
echo.
echo Service baslatiliyor...
nssm start "HillsideCRMPortal"

if %errorLevel% equ 0 (
    echo.
    echo ========================================
    echo BASARILI!
    echo ========================================
    echo.
    echo Service: Hillside CRM Portal
    echo Port: 7070
    echo URL: http://localhost:7070
    echo.
    echo Service Yonetimi:
    echo   Baslat : nssm start HillsideCRMPortal
    echo   Durdur : nssm stop HillsideCRMPortal
    echo   Restart: nssm restart HillsideCRMPortal
    echo   Durum  : nssm status HillsideCRMPortal
    echo.
    echo Veya services.msc ile Windows Services'den yonetin.
    echo.
    echo Loglar: %PROJECT_DIR%logs\
    echo ========================================
) else (
    echo.
    echo HATA: Service baslatilirken hata olustu!
    echo.
    echo Loglari kontrol edin:
    echo   %PROJECT_DIR%logs\service-error.log
    echo.
    echo Veya Event Viewer'i kontrol edin:
    echo   eventvwr.msc
)

echo.
pause

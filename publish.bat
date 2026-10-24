@echo off
title StreamRadar — Public HTTPS Tunnel Publisher
echo Starting local StreamRadar server on 127.0.0.1:8080...
start "StreamRadar Local Server" powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1" -NoBrowser
timeout /t 2 >nul
echo Opening public HTTPS tunnel (look for the https://...lhr.life link below)...
ssh -T -o StrictHostKeyChecking=no -o ServerAliveInterval=30 -R 80:127.0.0.1:8080 nokey@localhost.run
pause

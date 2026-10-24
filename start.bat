@echo off
title StreamRadar — Streaming & Season Availability Search Engine
echo Starting StreamRadar local server & JustWatch GraphQL proxy on http://localhost:8080 ...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause

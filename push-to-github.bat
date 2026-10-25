@echo off
title Push StreamRadar to GitHub (kariem-bot/MySearchEngin)
cd /d "%~dp0"
echo ==========================================================
echo   Uploading StreamRadar to GitHub:
echo   https://github.com/kariem-bot/MySearchEngin.git
echo ==========================================================
echo.
echo Staging and committing changes...
git add -A
git commit -m "Update StreamRadar: English/Arabic streaming search with strict country filtering" 2>nul
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/kariem-bot/MySearchEngin.git

echo.
echo Pushing to GitHub main branch...
git push -u origin main
echo.
if %errorlevel% equ 0 (
  echo ==========================================================
  echo   SUCCESS! Uploaded to GitHub successfully.
  echo   Repository: https://github.com/kariem-bot/MySearchEngin
  echo ==========================================================
) else (
  echo ==========================================================
  echo   If asked for authentication, sign in with your GitHub
  echo   account or use a GitHub Personal Access Token (PAT).
  echo ==========================================================
)
pause

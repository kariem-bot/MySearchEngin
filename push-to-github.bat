@echo off
title Push StreamRadar to GitHub (kariem-bot/MySearchEngin)
cd /d "%~dp0"
echo ==========================================================
echo   Uploading StreamRadar to GitHub:
echo   https://github.com/kariem-bot/MySearchEngin.git
echo ==========================================================
echo.
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/kariem-bot/MySearchEngin.git
git push -u origin main --force
echo.
echo ==========================================================
echo   Upload finished! Now enable GitHub Pages:
echo   1. Go to https://github.com/kariem-bot/MySearchEngin/settings/pages
echo   2. Under "Build and deployment" -^> Source, select "Deploy from a branch" (main / root) or "GitHub Actions".
echo   3. Or import https://github.com/kariem-bot/MySearchEngin on https://vercel.com/new
echo ==========================================================
pause

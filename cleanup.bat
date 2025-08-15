@echo off
REM Cleanup script to remove files marked for deletion
REM Run this script locally to complete the cleanup

echo Removing conflicting files from mixed build tool setup...
echo.

REM Remove Vite-related files
if exist "vite.config.js" (
  del vite.config.js
  echo Removed vite.config.js
)

if exist "index.html" (
  del index.html
  echo Removed root index.html
)

if exist "src\main.jsx" (
  del "src\main.jsx"
  echo Removed src\main.jsx
)

REM Remove duplicate files
if exist "src\musicTheory.js" (
  del "src\musicTheory.js"
  echo Removed src\musicTheory.js - keeping src\utils\musicTheory.js
)

if exist "src\audioUtils.js" (
  del "src\audioUtils.js"
  echo Removed src\audioUtils.js - audio handled in Piano.js
)

echo.
echo Cleanup complete! The project now uses Create React App exclusively.
echo.
echo To commit these deletions, run:
echo   git add -A
echo   git commit -m "Remove conflicting Vite files and duplicates"
echo   git push
echo.
echo To start the development server, run:
echo   npm install
echo   npm start
pause

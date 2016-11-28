@echo off
echo Are you sure you want to compile this for all OSs?
pause
electron-packager . --all --out ./publish/ --ignore=/js --ignore=/css --ignore=/node_modules --ignore=webpack.config.js
pause